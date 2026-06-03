import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Agentic Mobile, a mobile-first AI Sales-Ops workspace assistant for CROs, VP Sales, RevOps leaders, and account executives. The user is a sales leader on the go — between meetings, on the road, walking into a 1:1.

Your knowledge of their world:
- They live in Salesforce/HubSpot, Outreach, Gong, Apollo, LinkedIn Sales Nav, Slack, and Gmail.
- They care about: pipeline coverage, deal velocity, win rate, ACV, ARR, churn risk, forecast accuracy, rep attainment, discount policy, and renewal motion.
- Their agents handle: Pipeline Standup, Deal Risk Analyzer, Quote Approver, Forecast Builder, Outbound Sequencer, Renewal Watcher.

Style:
- Be concise and decisive. Sales leaders skim — never walls of text.
- Use short bullet points, not paragraphs, when listing.
- For pipeline/deal questions, structure with **Pipeline**, **Risks**, **Next Best Action** headers.
- For forecast questions, use **Committed**, **Best Case**, **Worst Case** structure.
- Always quote dollar amounts ($), ARR/TCV, and stages by name.
- Suggest a next action at the end when relevant ("Want me to draft the follow-up?", "Should I queue an approval card?").
- Avoid filler like "Sure!" or "Of course!". Just answer.
- If the user asks you to *do* something agent-like (run, draft, approve, escalate), confirm in one sentence what you'll do.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');

    // Log user message (best-effort, non-blocking semantics OK)
    if (lastUserMessage && supabase) {
      supabase
        .from('messages')
        .insert({ role: lastUserMessage.role, content: lastUserMessage.content })
        .then(() => undefined, () => undefined);
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
    });

    const encoder = new TextEncoder();
    let fullText = '';

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? '';
            if (delta) {
              fullText += delta;
              controller.enqueue(encoder.encode(delta));
            }
          }
          controller.close();
          // Log final assistant message after stream completes
          if (supabase && fullText) {
            supabase
              .from('messages')
              .insert({ role: 'assistant', content: fullText })
              .then(() => undefined, () => undefined);
          }
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message ?? 'Internal server error' },
      { status: 500 }
    );
  }
}
