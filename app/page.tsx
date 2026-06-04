'use client';

import { useState, useCallback } from 'react';
import {
  Linkedin,
  Github,
  ExternalLink,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
} from 'lucide-react';
import BottomNav, { type Tab } from '@/components/agentic/bottom-nav';
import ChatTab from '@/components/agentic/chat-tab';
import AgentsTab from '@/components/agentic/agents-tab';
import VisionTab from '@/components/agentic/vision-tab';
import InboxTab from '@/components/agentic/inbox-tab';
import HeroOverlay from '@/components/agentic/hero-overlay';
import SettingsSheet from '@/components/agentic/settings-sheet';
import { ToastProvider, useToast } from '@/components/agentic/toast';
import type { Decision, InboxItem } from '@/components/agentic/types';

const SEED_INBOX: InboxItem[] = [
  {
    id: 'seed-1',
    agent: 'Quote Approver',
    title: 'Acme Corp renewal — 18% discount (off-policy)',
    summary:
      '3-year renewal at $312k ARR with 18% discount. Standard policy caps at 15%. Win-rate at this tier historically 78%.',
    amount: '$312,000 ARR',
    priority: 'high',
    receivedAt: '8 min ago',
    status: 'pending',
  },
  {
    id: 'seed-2',
    agent: 'Deal Risk Analyzer',
    title: 'Globex ($240k) — champion left company',
    summary:
      'Primary champion left Globex 4 days ago. No replacement contact identified. Deal in stage 4, close date in 18 days.',
    priority: 'high',
    receivedAt: '32 min ago',
    status: 'pending',
  },
  {
    id: 'seed-3',
    agent: 'Renewal Watcher',
    title: 'Initech renewal at risk — 47 days out',
    summary:
      'Usage down 31% over the last 60 days. CSM open ticket > 5 days. NPS dropped from 8.4 to 6.1. Recommend exec sponsor outreach.',
    amount: '$185,000 / yr',
    priority: 'high',
    receivedAt: '1 hr ago',
    status: 'pending',
  },
  {
    id: 'seed-4',
    agent: 'Quote Approver',
    title: 'Wonka Industries multi-year — within policy',
    summary:
      '2-year deal at $127k TCV. Discount 11% (within 15% policy). Auto-approves in 4 hrs unless rejected.',
    amount: '$127,000 TCV',
    priority: 'medium',
    receivedAt: '2 hrs ago',
    status: 'pending',
  },
  {
    id: 'seed-5',
    agent: 'Outbound Sequencer',
    title: 'Drafted: Series B fintech CFO touch — 24 reps',
    summary:
      'Personalized outbound drafts ready for review. Targeting CFOs at Series B fintechs with > $20M ARR.',
    priority: 'medium',
    receivedAt: '3 hrs ago',
    status: 'approved',
  },
];

function AppShell({
  inbox,
  onResolve,
  settingsOpen,
  setSettingsOpen,
  onOpenHero,
}: {
  inbox: InboxItem[];
  onResolve: (id: string, decision: Decision) => void;
  settingsOpen: boolean;
  setSettingsOpen: (v: boolean) => void;
  onOpenHero: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const { push } = useToast();

  const pendingCount = inbox.filter((i) => i.status === 'pending').length;

  const handleChatApproval = useCallback(
    (item: InboxItem, decision: Decision) => {
      onResolve(item.id, decision);
      push(
        decision === 'approved' ? 'success' : 'info',
        decision === 'approved' ? 'Approved & notified team' : 'Rejected — agent informed'
      );
    },
    [onResolve, push]
  );

  return (
    <div className="h-full w-full flex flex-col bg-[#FAF7F0] relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && (
          <ChatTab
            onResolveApproval={handleChatApproval}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}
        {activeTab === 'inbox' && <InboxTab items={inbox} onResolve={onResolve} />}
        {activeTab === 'agents' && <AgentsTab />}
        {activeTab === 'vision' && <VisionTab />}
      </div>
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        inboxBadge={pendingCount}
      />
      <SettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onViewCaseStudy={onOpenHero}
      />
    </div>
  );
}

export default function Home() {
  const [inbox, setInbox] = useState<InboxItem[]>(SEED_INBOX);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showHero, setShowHero] = useState(true);

  const handleResolve = useCallback((id: string, decision: Decision) => {
    setInbox((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: decision } : i))
    );
  }, []);

  const pendingCount = inbox.filter((i) => i.status === 'pending').length;

  return (
    <ToastProvider>
      {/* Mobile & tablet: full-screen app */}
      <div className="h-[100dvh] w-full max-w-lg mx-auto lg:hidden relative overflow-hidden bg-[#FAF7F0]">
        <AppShell
          inbox={inbox}
          onResolve={handleResolve}
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
          onOpenHero={() => setShowHero(true)}
        />
        {showHero && <HeroOverlay onEnter={() => setShowHero(false)} />}
      </div>

      {/* Desktop: showcase frame with phone mockup + side context */}
      <div className="hidden lg:flex h-[100dvh] w-full items-center justify-center bg-[#EFEADF] overflow-hidden">
        <div className="grid grid-cols-12 gap-8 max-w-7xl w-full px-8 items-center">
          {/* Left: intro */}
          <aside className="col-span-4 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-teal-700 font-semibold mb-2">
                Sales-Ops AI · Product Case Study
              </p>
              <h1 className="text-4xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Agentic Mobile
              </h1>
              <p className="text-lg text-slate-700 mt-2 leading-snug">
                AI Sales-Ops workspace for CROs, VP Sales, and RevOps leaders on the go.
              </p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sales leaders run revenue from their phones — but Salesforce, Outreach, and Gong are desktop-first. Approvals stall, deals slip. This prototype shows how
              <span className="text-slate-900 font-medium"> action-oriented generative UI</span> works on mobile: the AI renders approval cards, pipeline standups, and forecast tiles right inside the chat feed. Every decision is one tap.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: '5', l: 'Native sales agents', Icon: TrendingUp },
                { v: '9', l: 'Agent templates', Icon: Target },
                { v: 'Voice', l: 'Speech-to-text input', Icon: Zap },
              ].map((m) => (
                <div
                  key={m.l}
                  className="bg-white border border-stone-200 rounded-xl p-3 text-center shadow-sm"
                >
                  <m.Icon className="w-4 h-4 text-teal-700 mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-slate-900">{m.v}</div>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{m.l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'TypeScript', 'Tailwind', 'OpenAI', 'Supabase', 'Netlify'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white border border-stone-200 text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.15em] text-teal-700 font-semibold mb-2">
                What&apos;s real, not staged
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex gap-2"><span className="text-emerald-600">✓</span>Streaming GPT-4o-mini chat with sales-tuned prompt</li>
                <li className="flex gap-2"><span className="text-emerald-600">✓</span>Voice input (Web Speech API)</li>
                <li className="flex gap-2"><span className="text-emerald-600">✓</span>In-chat quote/discount approval cards</li>
                <li className="flex gap-2"><span className="text-emerald-600">✓</span>Sales-Ops agent templates marketplace</li>
                <li className="flex gap-2"><span className="text-emerald-600">✓</span>Integrations panel — connect/disconnect UI (Salesforce, Gong, Outreach)</li>
              </ul>
            </div>
          </aside>

          {/* Center: phone frame */}
          <div className="col-span-4 flex justify-center">
            <div className="relative">
              <div className="w-[390px] h-[800px] rounded-[3rem] bg-slate-900 p-3 shadow-2xl shadow-slate-900/40">
                <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-[#FAF7F0] relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30" />
                  <AppShell
                    inbox={inbox}
                    onResolve={handleResolve}
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                    onOpenHero={() => setShowHero(true)}
                  />
                  {showHero && <HeroOverlay onEnter={() => setShowHero(false)} />}
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
                Fractional AI Engineer, AI Product Manager, or AI Architect
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                I design and ship vertical AI products end-to-end — from product strategy and PRDs to working prototypes deployed to production. This Sales-Ops workspace is one such end-to-end build.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <a
                  href="https://aurimas.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white text-slate-900 text-xs font-semibold hover:bg-amber-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Portfolio
                </a>
                <a
                  href="https://www.linkedin.com/in/aurimasnausedas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/aurimas13/web_application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <Github className="w-3.5 h-3.5" />
                  Code
                </a>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.15em] text-indigo-700 font-semibold mb-2">
                Try it on the phone
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                <li><span className="font-semibold text-slate-900">Chat:</span> tap a suggestion or type &ldquo;Run pipeline standup&rdquo; for a live workflow.</li>
                <li><span className="font-semibold text-slate-900">Inbox{pendingCount > 0 ? ` (${pendingCount})` : ''}:</span> approve or reject queued quote/deal/renewal decisions.</li>
                <li><span className="font-semibold text-slate-900">Agents:</span> 5 native sales agents, 9 templates to install.</li>
                <li><span className="font-semibold text-slate-900">⚙ Settings:</span> Salesforce/Gong/Outreach connections + case study.</li>
              </ul>
            </div>

            <p className="text-center text-[11px] text-slate-500">
              <Sparkles className="inline w-3 h-3 text-amber-500 mr-1" />
              Every button is wired. Every transition works. Try it.
            </p>
          </aside>
        </div>
      </div>
    </ToastProvider>
  );
}
