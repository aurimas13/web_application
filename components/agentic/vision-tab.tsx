'use client';

import {
  Eye,
  FileText,
  Clock,
  Users,
  Target,
  Mic,
  Layout,
  TrendingUp,
  Linkedin,
  Github,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { useToast } from './toast';

const microInteractions = [
  {
    title: 'Off-policy quote approval',
    example: '"Approve the Acme renewal — 18% discount."',
  },
  {
    title: 'On-the-go pipeline check',
    example: '"Show me stalled deals over $100k from EMEA."',
  },
  {
    title: 'One-tap workflow run',
    example: '"Run pipeline standup and Slack it to #sales-leadership."',
  },
];

const uxPrinciples = [
  {
    title: 'Action-Oriented Generative UI',
    icon: Layout,
    desc: "Don't just return text. When a deal needs review, render an inline approval card with $amount, context bullets, and Approve/Reject. When a forecast is asked, render Committed/Best/Worst tiles — not paragraphs.",
  },
  {
    title: 'Voice-First Input',
    icon: Mic,
    desc: 'Sales leaders are walking, driving, between meetings. Voice dictation is a primary, fast input method to trigger agents without typing.',
  },
  {
    title: 'Inbox of Decisions',
    icon: Target,
    desc: 'A dedicated inbox tab queues every agent output that needs a human decision — quotes, deal risks, renewal motions — sortable by priority. One tap resolves.',
  },
];

const successMetrics = [
  {
    metric: '< 15 min',
    label: 'Time-to-decision for off-policy quote approvals (from hours)',
    type: 'Decision Velocity',
  },
  {
    metric: '> 2 / day',
    label: 'Agent runs per sales leader per mobile session',
    type: 'Engagement',
  },
  {
    metric: '+8% pts',
    label: 'Forecast accuracy uplift from real-time deal-risk signals',
    type: 'Revenue Impact',
  },
  {
    metric: 'D7 / D30',
    label: 'Mobile retention — voice vs text users',
    type: 'Stickiness',
  },
];

export default function VisionTab() {
  const { push } = useToast();

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-900/15">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Product Vision</h2>
            <p className="text-[10px] text-slate-600">Sales-Ops Mobile · Micro-PRD</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-teal-700" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-teal-700 font-semibold">
                Micro-PRD
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              Sales-Ops Pocket Agent
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Clock className="w-3 h-3" />
                Target: Q3 2026
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Users className="w-3 h-3" />
                CROs · VP Sales · RevOps
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Authored by Aurimas A. Nausėdas — built in &lt; 1 week
            </p>
          </div>

          <div className="h-px bg-stone-100" />

          {/* 1. Problem */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2">
              1. The Problem: Revenue runs from a phone, but tools don&apos;t
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              CROs, VP Sales, and RevOps leaders run revenue from their phones — between meetings, in cars, walking into board rooms. Their day is a stream of decisions: approve a discount, escalate a stalled deal, redirect a rep, sign off on a forecast.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              But the systems that hold their pipeline, forecast, quotes, and call data — Salesforce, Outreach, Gong, Apollo — are desktop-first. Approvals stall in email threads. Off-policy quotes sit for hours. Deal-risk signals arrive too late.
            </p>
          </section>

          {/* 2. Solution */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2">
              2. The Solution: AI-native sales-ops, mobile-first
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A pocket workspace built around <span className="font-medium text-slate-800">action-oriented generative UI</span>. The AI doesn&apos;t reply with paragraphs — it renders the approval card, the pipeline standup, the forecast tile right inside the chat feed. Every decision is one tap.
            </p>
            <p className="text-xs font-medium text-slate-700 mt-3 mb-2">
              Designed for three core micro-interactions:
            </p>
            <div className="space-y-2">
              {microInteractions.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-stone-200 rounded-xl p-3"
                >
                  <h4 className="text-xs font-medium text-slate-800">{item.title}</h4>
                  <p className="text-[11px] text-teal-600 mt-1 leading-relaxed italic">
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Native Sales-Ops Agents */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              3. Native Sales-Ops Agents
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              Five vertical-tuned agents shipped at v1, plus a templates marketplace for new ones:
            </p>
            <div className="space-y-1.5">
              {[
                { name: 'Pipeline Standup', desc: 'Daily summary of pipeline movement and at-risk deals' },
                { name: 'Deal Risk Analyzer', desc: 'Flags stalled deals and missing decision-makers, hourly' },
                { name: 'Quote Approver', desc: 'Reviews quotes against discount policy, routes off-policy for approval' },
                { name: 'Forecast Builder', desc: 'Committed / best / worst case from CRM + Gong call data' },
                { name: 'Outbound Sequencer', desc: 'Personalized outbound, pauses on flagged responses' },
              ].map((a) => (
                <div
                  key={a.name}
                  className="bg-white border border-stone-200 rounded-lg px-3 py-2"
                >
                  <p className="text-xs font-medium text-slate-800">{a.name}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. UX Principles */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-3">
              4. Mobile UX Principles
            </h2>
            <div className="space-y-3">
              {uxPrinciples.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white border border-stone-200 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-md bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-teal-700" />
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed pl-8">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 5. Success Metrics */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-3">5. Success Metrics</h2>
            <div className="space-y-2">
              {successMetrics.map((item) => (
                <div
                  key={item.type}
                  className="bg-white border border-stone-200 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                      {item.type}
                    </span>
                    <span className="text-sm font-bold text-teal-700">{item.metric}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Tech Architecture */}
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-3">Technical Architecture</h2>
            <div className="space-y-2">
              {[
                { layer: 'Frontend', tech: 'Next.js 13 · React · Tailwind · TypeScript' },
                { layer: 'AI Engine', tech: 'OpenAI streaming · Web Speech API' },
                { layer: 'Integrations', tech: 'Salesforce · HubSpot · Outreach · Gong · Apollo' },
                { layer: 'Backend', tech: 'Supabase · Edge Functions' },
                { layer: 'Hosting', tech: 'Vercel · auto-deploy on push' },
              ].map((item) => (
                <div
                  key={item.layer}
                  className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-stone-200"
                >
                  <span className="text-xs font-medium text-slate-700">{item.layer}</span>
                  <span className="text-[11px] text-slate-500 text-right max-w-[60%]">
                    {item.tech}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA — Hire Me */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-5 space-y-3 shadow-lg shadow-slate-900/20">
            <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300 font-semibold">
              Want this for your sales org?
            </p>
            <p className="text-sm text-white font-medium leading-snug">
              I design and ship vertical AI products end-to-end — from PRD to live MVP — as a Fractional AI Engineer, AI PM, or AI Architect.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              This entire prototype shipped in under a week. Ping me to scope yours.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <a
                href="https://aurimas.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => push('info', 'Opening portfolio…')}
                className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-white text-slate-900 text-[11px] font-semibold hover:bg-amber-50 transition-colors active:scale-95"
              >
                <ExternalLink className="w-3 h-3" />
                Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/aurimasnausedas/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => push('info', 'Opening LinkedIn…')}
                className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-slate-800 text-white text-[11px] font-semibold hover:bg-slate-700 transition-colors border border-slate-700 active:scale-95"
              >
                <Linkedin className="w-3 h-3" />
                LinkedIn
              </a>
              <a
                href="mailto:hello@aurimas.io?subject=Sales-Ops%20AI%20build"
                onClick={() => push('info', 'Opening email…')}
                className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-slate-800 text-white text-[11px] font-semibold hover:bg-slate-700 transition-colors border border-slate-700 active:scale-95"
              >
                <Mail className="w-3 h-3" />
                Email
              </a>
            </div>
            <a
              href="https://github.com/aurimas13/web_application"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => push('info', 'Opening source code on GitHub…')}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-transparent text-slate-300 text-[11px] font-medium hover:text-white transition-colors"
            >
              <Github className="w-3 h-3" />
              View source on GitHub
            </a>
          </section>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
