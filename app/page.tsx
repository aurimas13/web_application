'use client';

import { useState } from 'react';
import { Linkedin, Github, ExternalLink, Sparkles, Zap, Bot, BarChart3 } from 'lucide-react';
import BottomNav, { type Tab } from '@/components/agentic/bottom-nav';
import ChatTab from '@/components/agentic/chat-tab';
import AgentsTab from '@/components/agentic/agents-tab';
import VisionTab from '@/components/agentic/vision-tab';
import HeroOverlay from '@/components/agentic/hero-overlay';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [showHero, setShowHero] = useState(true);

  const appShell = (
    <div className="h-full w-full flex flex-col bg-[#FAF7F0] relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'agents' && <AgentsTab />}
        {activeTab === 'vision' && <VisionTab />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {showHero && <HeroOverlay onEnter={() => setShowHero(false)} />}
    </div>
  );

  return (
    <>
      {/* Mobile & tablet: full-screen app */}
      <div className="h-[100dvh] w-full max-w-lg mx-auto lg:hidden">
        {appShell}
      </div>

      {/* Desktop: showcase frame with phone mockup + side context */}
      <div className="hidden lg:flex h-[100dvh] w-full items-center justify-center bg-[#EFEADF] overflow-hidden">
        <div className="grid grid-cols-12 gap-8 max-w-7xl w-full px-8 items-center">
          {/* Left: intro */}
          <aside className="col-span-4 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-teal-700 font-semibold mb-2">
                B2B AI · Product Case Study
              </p>
              <h1 className="text-4xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Agentic Mobile
              </h1>
              <p className="text-lg text-slate-700 mt-2 leading-snug">
                A mobile-first AI agent workspace for decision-makers on the go.
              </p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Built to prove that B2B mobile users don&apos;t need walls of text — they need
              <span className="text-slate-900 font-medium"> action-oriented generative UI</span> that
              renders approval cards, charts, and live workflows directly in a conversational feed.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: '< 15 min', l: 'Time-to-approval', Icon: Zap },
                { v: '2+/session', l: 'Agent runs', Icon: Bot },
                { v: '40%+', l: 'Zero-state engage', Icon: BarChart3 },
              ].map((m) => (
                <div key={m.l} className="bg-white border border-stone-200 rounded-xl p-3 text-center shadow-sm">
                  <m.Icon className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-slate-900">{m.v}</div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{m.l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'TypeScript', 'Tailwind', 'OpenAI', 'Supabase', 'Vercel'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white border border-stone-200 text-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </aside>

          {/* Center: phone frame */}
          <div className="col-span-4 flex justify-center">
            <div className="relative">
              {/* Phone bezel */}
              <div className="w-[390px] h-[800px] rounded-[3rem] bg-slate-900 p-3 shadow-2xl shadow-slate-900/40">
                <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-[#FAF7F0] relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30" />
                  {appShell}
                </div>
              </div>
            </div>
          </div>

          {/* Right: hire me */}
          <aside className="col-span-4 space-y-5">
            <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-6 shadow-xl shadow-slate-900/20 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-300 font-semibold">
                Available for Hire
              </p>
              <p className="text-xl text-white font-semibold leading-snug">
                Fractional AI Product Manager & AI Architect
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                I design and ship AI-native products end-to-end — from product strategy and PRDs to
                working prototypes deployed to production. This MVP went from idea to live in under a week.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <a href="https://aurimas.io" className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white text-slate-900 text-xs font-semibold hover:bg-amber-50 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Portfolio
                </a>
                <a href="https://www.linkedin.com/in/aurimasnausedas/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a href="https://github.com/aurimas13/web_application" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
                  <Github className="w-3.5 h-3.5" />
                  Code
                </a>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.15em] text-indigo-700 font-semibold mb-2">
                Case Study
              </p>
              <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <p><span className="font-semibold text-slate-900">Problem:</span> B2B mobile workflows rarely get AI agent treatment — sales, field ops, and service teams work on mobile but AI tools are desktop-first.</p>
                <p><span className="font-semibold text-slate-900">Approach:</span> Agent-driven mobile MVP with approval cards, live multi-step workflows, and full agent CRUD.</p>
                <p><span className="font-semibold text-slate-900">Proves:</span> Speed of AI product prototyping — zero to deployed in under a week.</p>
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-500">
              <Sparkles className="inline w-3 h-3 text-amber-500 mr-1" />
              Try the prototype on the phone — every button works.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
