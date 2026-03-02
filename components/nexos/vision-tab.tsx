'use client';

import { Eye, FileText, Clock, Users, Target, Mic, Layout, BarChart3 } from 'lucide-react';

const microInteractions = [
  {
    title: 'Workflow Unblocking',
    example: '"Review and approve the Q3 marketing budget agent output."',
  },
  {
    title: 'On-the-go Retrieval',
    example: '"Summarize the latest compliance risks from the legal agent."',
  },
  {
    title: 'Quick Execution',
    example: '"Trigger the daily standup summary agent and Slack it to the team."',
  },
];

const uxPrinciples = [
  {
    title: 'Action-Oriented Generative UI',
    icon: Layout,
    desc: 'Don\'t just return text. When a user requests data, generate a mini-chart. If a workflow needs approval, generate a native-feeling "Approve / Reject" card right in the chat feed.',
  },
  {
    title: 'Voice-First Input',
    icon: Mic,
    desc: 'Mobile users are walking, driving, or holding a coffee. Voice dictation must be a primary, highly accurate input method to trigger agents effortlessly.',
  },
  {
    title: 'Contextual Zero-State',
    icon: Target,
    desc: 'When the user opens the app, the screen shouldn\'t be blank. It should proactively suggest the right agents based on time of day or pending tasks.',
  },
];

const successMetrics = [
  {
    metric: '>2',
    label: 'Agent Executions per Mobile Session',
    type: 'Primary Engagement',
  },
  {
    metric: '<15 min',
    label: 'Time-to-approval for agentic workflows',
    type: 'Task Velocity',
  },
  {
    metric: 'D7 / D30',
    label: 'Mobile retention — voice vs text users',
    type: 'Retention',
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
            <p className="text-[10px] text-zinc-400">Micro-PRD &mdash; Pocket Agent</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-sky-400 font-semibold">
                Micro-PRD
              </span>
            </div>
            <h1 className="text-xl font-bold text-zinc-100 leading-tight">
              Nexos Mobile Pocket Agent
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <Clock className="w-3 h-3" />
                Target: Q2 2026
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <Users className="w-3 h-3" />
                Prototype / Vision Draft
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1.5">
              Author: Aurimas A. Naus&#279;das
            </p>
          </div>

          <div className="h-px bg-zinc-800/80" />

          {/* 1. The Problem */}
          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-2">
              1. The Problem: The &ldquo;Desk-Bound&rdquo; Bottleneck
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              B2B leaders and decision-makers are not at their laptops 24/7, yet
              business continues. When a critical workflow requires an approval,
              or when a sales leader needs a quick data summary before walking
              into a meeting, traditional SaaS mobile apps fail. They require
              too many taps, complex navigation, and are largely just cramped
              desktop ports.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed mt-2">
              Furthermore, standard AI chatbots on mobile often return useless
              &ldquo;walls of text&rdquo; that are impossible to digest on a
              6-inch screen. Users need to unblock their teams and access
              insights in seconds, not minutes.
            </p>
          </section>

          {/* 2. The Solution */}
          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-2">
              2. The Solution: Nexos Mobile Pocket Agent
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The &ldquo;Pocket Agent&rdquo; is a mobile-first extension of the
              Nexos AI Workspace. Instead of navigating menus, users interact
              with their pre-built, no-code nexos.ai agents via a frictionless,
              conversational interface.
            </p>
            <p className="text-xs font-medium text-zinc-300 mt-3 mb-2">
              Designed for micro-interactions:
            </p>
            <div className="space-y-2">
              {microInteractions.map((item) => (
                <div
                  key={item.title}
                  className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-3"
                >
                  <h4 className="text-xs font-medium text-zinc-200">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-sky-300/70 mt-1 leading-relaxed italic">
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Key Mobile UX Principles */}
          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-3">
              3. Key Mobile UX Principles
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              To succeed in B2B mobile, we must move past the standard
              &ldquo;chat bubble&rdquo; UI. The Pocket Agent relies on three
              core principles:
            </p>
            <div className="space-y-3">
              {uxPrinciples.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 rounded-md bg-sky-500/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-sky-400" />
                      </div>
                      <h4 className="text-xs font-semibold text-zinc-200">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed pl-8">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. Success Metrics */}
          <section>
            <h2 className="text-base font-semibold text-zinc-200 mb-3">
              4. Success Metrics
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              We will measure the success of the Pocket Agent not just by
              logins, but by how effectively it speeds up business operations.
            </p>
            <div className="space-y-2">
              {successMetrics.map((item) => (
                <div
                  key={item.type}
                  className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                      {item.type}
                    </span>
                    <span className="text-sm font-bold text-sky-400">
                      {item.metric}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Architecture (retained from original, relevant to PRD) */}
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

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
