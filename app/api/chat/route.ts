import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Log the user message to Supabase
    if (lastUserMessage && supabase) {
      await supabase.from('messages').insert({
        role: lastUserMessage.role,
        content: lastUserMessage.content,
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are Agentic Mobile, a helpful mobile-first AI workspace assistant for B2B enterprise teams. You help users analyze data, generate reports, and coordinate with their team. Be concise and professional.',
        },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
    });

    const assistantContent =
      completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.';

    // Log the assistant response to Supabase
    if (supabase) {
      await supabase.from('messages').insert({
        role: 'assistant',
        content: assistantContent,
      });
    }

    return NextResponse.json({ content: assistantContent });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message ?? 'Internal server error' },
      { status: 500 }
    );
  }
}
