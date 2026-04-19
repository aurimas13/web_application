'use client';

import { useState } from 'react';
import { ArrowLeft, Sparkles, Bot, Eye, MessageSquare, Zap, BarChart3 } from 'lucide-react';

const TECH_STACK = [
  { name: 'Next.js', color: 'text-zinc-100' },
  { name: 'React', color: 'text-sky-400' },
  { name: 'TypeScript', color: 'text-blue-400' },
  { name: 'Tailwind CSS', color: 'text-cyan-400' },
  { name: 'OpenAI API', color: 'text-emerald-400' },
  { name: 'Supabase', color: 'text-green-400' },
  { name: 'Vercel', color: 'text-zinc-300' },
];

const METRICS = [
  { value: '< 15 min', label: 'Time-to-approval (from hours)', icon: Zap },
  { value: '> 2 / session', label: 'Agent executions per mobile session', icon: Bot },
  { value: '40%+', label: 'Zero-state engagement target', icon: BarChart3 },
];

const FEATURES = [
  { icon: MessageSquare, title: 'AI Chat', desc: 'GPT-4o-powered conversational assistant' },
  { icon: Bot, title: 'Agent Management', desc: 'Create, configure, pause, and delete AI agents' },
  { icon: Zap, title: 'Agentic Workflows', desc: 'Multi-step automated pipelines with live progress' },
  { icon: Eye, title: 'Product Vision', desc: 'Full PRD with UX principles and success metrics' },
];

export default function HeroOverlay({ onEnter }: { onEnter: () => void }) {
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 300);
  };

  return (
    <div
      className={`absolute inset-0 z-50 bg-zinc-950 overflow-y-auto scrollbar-none transition-all duration-300 ${
        exiting ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Back to portfolio */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-800/50 bg-zinc-950/90 backdrop-blur-sm sticky top-0 z-10">
        <a
          href="https://aurimas.io"
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to aurimas.io
        </a>
        <span className="text-[10px] text-zinc-600">MVP Prototype</span>
      </div>

      <div className="px-5 py-6 space-y-7 max-w-lg mx-auto">
        {/* Hero headline */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/25">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 leading-tight tracking-tight">
            Agentic Mobile
          </h1>
          <p className="text-base text-sky-400 font-medium">
            B2B AI Agent Workspace for Decision-Makers on the Go
          </p>
        </div>

        {/* Problem statement */}
        <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-xl px-4 py-3.5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-amber-400 font-semibold mb-1.5">
            The Problem
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            B2B leaders need to approve workflows, review agent outputs, and access insights
            <span className="text-zinc-100 font-medium"> from their phone</span> —
            but today&apos;s tools return unreadable walls of text on a 6-inch screen.
            Decisions stall for hours because the right person isn&apos;t at their desk.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-zinc-900/70 border border-sky-500/20 rounded-xl px-4 py-3.5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-sky-400 font-semibold mb-1.5">
            The Solution
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            <span className="text-zinc-100 font-medium">Action-Oriented Generative UI</span> —
            instead of text replies, the AI renders native approval cards, inline charts, and
            live multi-step workflow progress directly in a mobile conversational feed.
          </p>
        </div>

        {/* Key metrics */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-semibold mb-2.5">
            Target Outcomes
          </p>
          <div className="grid grid-cols-3 gap-2">
            {METRICS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-3 text-center"
                >
                  <Icon className="w-4 h-4 text-sky-400 mx-auto mb-1.5" />
                  <div className="text-base font-bold text-zinc-100">{m.value}</div>
                  <p className="text-[9px] text-zinc-500 mt-0.5 leading-tight">{m.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* What you can try */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-semibold mb-2.5">
            What&apos;s Inside
          </p>
          <div className="space-y-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/30 rounded-lg px-3 py-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-200">{f.title}</p>
                    <p className="text-[10px] text-zinc-500">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-semibold mb-2.5">
            Built With
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TECH_STACK.map((t) => (
              <span
                key={t.name}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium bg-zinc-800/70 border border-zinc-700/40 ${t.color}`}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-xl px-4 py-4 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-violet-400 font-semibold">
            Case Study
          </p>
          <div className="space-y-2.5">
            {[
              {
                label: 'Problem',
                text: 'B2B mobile workflows rarely get AI agent treatment — sales, field ops, and service teams work on mobile but AI tools are desktop-first',
              },
              {
                label: 'Approach',
                text: 'Agent-driven mobile MVP for workflow approvals, real-time reporting, and multi-agent orchestration',
              },
              {
                label: 'Role',
                text: 'Concept, prototype, user flow design, full-stack implementation',
              },
              {
                label: 'What this proves',
                text: 'Speed of AI product prototyping — built from zero to deployed MVP in under a week',
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-semibold text-zinc-400 mb-0.5">{item.label}</p>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleEnter}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all active:scale-[0.98]"
        >
          Explore the Prototype →
        </button>

        <p className="text-center text-[10px] text-zinc-600">
          Try typing &quot;Run daily report&quot; in chat to see an agentic workflow in action
        </p>

        <div className="h-4" />
      </div>
    </div>
  );
}
