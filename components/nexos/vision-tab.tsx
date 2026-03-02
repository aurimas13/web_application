'use client';

import { Eye, FileText, Clock, Users } from 'lucide-react';

const targetAudience = [
  {
    role: 'C-Suite Executives',
    desc: 'Quick access to company-wide KPIs and strategic insights',
  },
  {
    role: 'Product Managers',
    desc: 'Sprint analytics, roadmap tracking, and stakeholder updates',
  },
  {
    role: 'Sales Leaders',
    desc: 'Pipeline visibility, deal intelligence, and forecasting',
  },
  {
    role: 'Operations Teams',
    desc: 'Workflow automation and cross-functional coordination',
  },
];

const metrics = [
  { metric: '40%', label: 'Reduction in app switching' },
  { metric: '3x', label: 'Faster report generation' },
  { metric: '60%', label: 'Less manual data entry' },
  { metric: '85%', label: 'User adoption target' },
];

const capabilities = [
  {
    title: 'AI Chat Interface',
    desc: 'Natural language interaction with enterprise data and systems',
  },
  {
    title: 'Agentic Workflows',
    desc: 'Autonomous AI agents that execute multi-step business processes',
  },
  {
    title: 'Smart Reporting',
    desc: 'Auto-generated insights from connected data sources',
  },
  {
    title: 'Team Coordination',
    desc: 'AI-assisted task delegation and progress tracking',
  },
];

export default function VisionTab() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Product Vision
            </h2>
            <p className="text-[10px] text-zinc-400">PRD & Strategic Overview</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-sky-400 font-semibold">
                Product Requirements Document
              </span>
            </div>
            <h1 className="text-xl font-bold text-zinc-100 leading-tight">
              Nexos Mobile Workspace
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <Clock className="w-3 h-3" />
                Version 1.0
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <Users className="w-3 h-3" />
                Enterprise Platform
              </span>
            </div>
          </div>

          <div className="h-px bg-zinc-800/80" />

          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-2">
              Executive Summary
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Nexos Mobile Workspace is an AI-native platform designed to
              empower enterprise teams with intelligent automation, real-time
              insights, and seamless collaboration from any mobile device. Our
              vision is to transform how business professionals interact with
              their data and tools on the go.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-2">
              Problem Statement
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Enterprise teams struggle with fragmented tooling and limited
              mobile access to critical business intelligence. Current solutions
              require switching between multiple apps, leading to context loss
              and decreased productivity. Nexos solves this by unifying AI
              capabilities into a single mobile-native experience.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-3">
              Core Capabilities
            </h2>
            <div className="space-y-2">
              {capabilities.map((item) => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {' '}
                      &mdash; {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-3">
              Target Audience
            </h2>
            <div className="grid gap-2">
              {targetAudience.map((item) => (
                <div
                  key={item.role}
                  className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-3"
                >
                  <h4 className="text-xs font-medium text-zinc-200">
                    {item.role}
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-3">
              Success Metrics
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-3 text-center"
                >
                  <div className="text-lg font-bold text-sky-400">
                    {item.metric}
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-3">
              Technical Architecture
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              Built on a modern, scalable stack optimized for real-time AI
              interactions and enterprise-grade security requirements.
            </p>
            <div className="space-y-2">
              {[
                { layer: 'Frontend', tech: 'Next.js, React, Tailwind CSS' },
                { layer: 'AI Engine', tech: 'Multi-model orchestration layer' },
                { layer: 'Backend', tech: 'Supabase, Edge Functions' },
                { layer: 'Security', tech: 'RLS, JWT auth, E2E encryption' },
              ].map((item) => (
                <div
                  key={item.layer}
                  className="flex items-center justify-between bg-zinc-900/40 rounded-lg px-3 py-2 border border-zinc-800/30"
                >
                  <span className="text-xs font-medium text-zinc-300">
                    {item.layer}
                  </span>
                  <span className="text-[11px] text-zinc-500">{item.tech}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-sky-500/8 border border-sky-500/15 rounded-xl p-4">
            <p className="text-xs text-sky-300/90 leading-relaxed">
              This is a living document. The full PRD content will replace this
              placeholder once provided. This tab supports rich content
              rendering including structured sections, data tables, and visual
              metrics.
            </p>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
