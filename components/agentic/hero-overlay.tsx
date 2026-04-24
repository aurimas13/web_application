'use client';

import { useState } from 'react';
import { ArrowLeft, Sparkles, Bot, Eye, MessageSquare, Zap, BarChart3, Linkedin, Github, ExternalLink } from 'lucide-react';

const TECH_STACK = [
  { name: 'Next.js', color: 'text-slate-900' },
  { name: 'React', color: 'text-teal-700' },
  { name: 'TypeScript', color: 'text-blue-700' },
  { name: 'Tailwind CSS', color: 'text-cyan-700' },
  { name: 'OpenAI API', color: 'text-emerald-600' },
  { name: 'Supabase', color: 'text-green-700' },
  { name: 'Vercel', color: 'text-slate-700' },
];

const METRICS = [
  { value: '< 15 min', label: 'Time-to-approval (from hours)', icon: Zap },
  { value: '2+ / session', label: 'Agent runs per mobile session', icon: Bot },
  { value: '40%+', label: 'Zero-state engagement', icon: BarChart3 },
];

const FEATURES = [
  { icon: MessageSquare, title: 'AI Chat', desc: 'GPT-4o-powered conversational assistant with streaming replies' },
  { icon: Bot, title: 'Agent Management', desc: 'Create, configure, pause, and remove AI agents in-app' },
  { icon: Zap, title: 'Agentic Workflows', desc: 'Multi-step automated pipelines with live step-by-step progress' },
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
      className={`absolute inset-0 z-50 bg-[#FAF7F0] overflow-y-auto scrollbar-none transition-all duration-300 ${
        exiting ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Back to portfolio */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm sticky top-0 z-10">
        <a
          href="https://aurimas.io"
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to aurimas.io
        </a>
        <span className="text-[10px] text-slate-400">MVP Prototype</span>
      </div>

      <div className="px-5 py-6 space-y-7 max-w-lg mx-auto">
        {/* Hero headline */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center mx-auto shadow-lg shadow-slate-900/15">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
            Agentic Mobile
          </h1>
          <p className="text-base text-teal-700 font-medium">
            B2B AI Agent Workspace for Decision-Makers on the Go
          </p>
        </div>

        {/* Problem statement */}
        <div className="bg-white border border-stone-200 rounded-xl px-4 py-3.5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-amber-700 font-semibold mb-1.5">
            The Problem
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            B2B leaders need to approve workflows, review agent outputs, and access insights
            <span className="text-slate-900 font-medium"> from their phone</span> —
            but today&apos;s tools return unreadable walls of text on a 6-inch screen.
            Decisions stall for hours because the right person isn&apos;t at their desk.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-white border border-slate-900/15 rounded-xl px-4 py-3.5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-teal-700 font-semibold mb-1.5">
            The Solution
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            <span className="text-slate-900 font-medium">Action-Oriented Generative UI</span> —
            instead of text replies, the AI renders native approval cards, inline charts, and
            live multi-step workflow progress directly in a mobile conversational feed.
          </p>
        </div>

        {/* Key metrics */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-2.5">
            Target Outcomes
          </p>
          <div className="grid grid-cols-3 gap-2">
            {METRICS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="bg-white border border-stone-200 rounded-xl p-3 text-center"
                >
                  <Icon className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                  <div className="text-base font-bold text-slate-900">{m.value}</div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{m.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* What you can try */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-2.5">
            What&apos;s Inside
          </p>
          <div className="space-y-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-center gap-3 bg-white border border-stone-200 rounded-lg px-3 py-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-800">{f.title}</p>
                    <p className="text-[10px] text-slate-500">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-2.5">
            Built With
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TECH_STACK.map((t) => (
              <span
                key={t.name}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium bg-stone-100 border border-stone-200 ${t.color}`}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-white border border-stone-200 rounded-xl px-4 py-4 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-indigo-700 font-semibold">
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
                <p className="text-[10px] font-semibold text-slate-600 mb-0.5">{item.label}</p>
                <p className="text-xs text-slate-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleEnter}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 text-white text-sm font-semibold shadow-lg shadow-slate-900/20 hover:from-slate-800 hover:to-slate-600 transition-all active:scale-[0.98]"
        >
          Explore the Prototype →
        </button>

        <p className="text-center text-[11px] text-slate-500">
          Tip: try typing <span className="font-medium text-slate-700">&quot;Run daily report&quot;</span> in chat to see an agentic workflow in action.
        </p>

        {/* Hire Me / Contact */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl px-5 py-5 text-center space-y-3 shadow-lg shadow-slate-900/20">
          <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300 font-semibold">
            Available for Hire
          </p>
          <p className="text-sm text-white font-medium leading-snug">
            Looking for a Fractional AI Product Manager or AI Architect?
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            I design and ship AI-native products end-to-end — from strategy and PRDs to working prototypes. Let&apos;s build.
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <a
              href="https://aurimas.io"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-slate-900 text-xs font-semibold hover:bg-amber-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Portfolio
            </a>
            <a
              href="https://www.linkedin.com/in/aurimasnausedas/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/aurimas13/web_application"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-400 pt-1">
          Built by <a href="https://aurimas.io" className="text-slate-600 font-medium hover:text-teal-700">Aurimas A. Naus&#279;das</a> · Next.js · OpenAI · Supabase
        </p>

        <div className="h-4" />
      </div>
    </div>
  );
}
