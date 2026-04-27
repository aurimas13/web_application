'use client';

import { useState } from 'react';
import {
  X,
  Sparkles,
  TrendingUp,
  CircleAlert as AlertCircle,
  Mail,
  CalendarCheck,
  Receipt,
  Megaphone,
  HeartPulse,
  ShieldCheck,
  FileSearch,
  Search,
  Plus,
  Check,
} from 'lucide-react';

export interface AgentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: typeof Mail;
  popular?: boolean;
  defaultModel: string;
  defaultSchedule: string;
  defaultSources: string[];
  defaultOutput: string;
}

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'pipeline-standup',
    name: 'Pipeline Standup',
    category: 'Sales',
    description: 'Daily summary of pipeline movement, at-risk deals, and next-best actions for your reps.',
    icon: TrendingUp,
    popular: true,
    defaultModel: 'GPT-4o',
    defaultSchedule: 'Daily at 9:00 AM',
    defaultSources: ['Salesforce CRM', 'Slack'],
    defaultOutput: 'PDF & Slack message',
  },
  {
    id: 'deal-risk',
    name: 'Deal Risk Analyzer',
    category: 'Sales',
    description: 'Flags stalled deals, missing decision-makers, and engagement drops in your top opportunities.',
    icon: AlertCircle,
    popular: true,
    defaultModel: 'GPT-4o',
    defaultSchedule: 'Hourly',
    defaultSources: ['Salesforce CRM', 'Gmail', 'Calendar'],
    defaultOutput: 'Structured brief',
  },
  {
    id: 'inbox-triage',
    name: 'Inbox Triage',
    category: 'Productivity',
    description: 'Reads incoming email, categorizes by intent, and drafts responses for your review.',
    icon: Mail,
    popular: true,
    defaultModel: 'GPT-4o-mini',
    defaultSchedule: 'Event-driven',
    defaultSources: ['Gmail', 'CRM contacts'],
    defaultOutput: 'Draft email',
  },
  {
    id: 'meeting-prep',
    name: 'Meeting Prep',
    category: 'Productivity',
    description: 'Pulls context on attendees, recent threads, and prior meeting notes 30 min before each call.',
    icon: CalendarCheck,
    defaultModel: 'GPT-4o-mini',
    defaultSchedule: 'Event-driven',
    defaultSources: ['Calendar', 'Gmail', 'Internal docs'],
    defaultOutput: 'Structured brief',
  },
  {
    id: 'expense-approver',
    name: 'Expense Approver',
    category: 'Finance',
    description: 'Reviews expense submissions against policy and flags anomalies for your approval.',
    icon: Receipt,
    defaultModel: 'GPT-4o',
    defaultSchedule: 'Event-driven',
    defaultSources: ['Financial DB', 'Internal docs'],
    defaultOutput: 'Action log & notifications',
  },
  {
    id: 'compliance-watcher',
    name: 'Compliance Watcher',
    category: 'Legal',
    description: 'Monitors contracts, communications, and approvals for regulatory and policy violations.',
    icon: ShieldCheck,
    defaultModel: 'GPT-4o',
    defaultSchedule: 'Hourly',
    defaultSources: ['Internal docs', 'Slack', 'Gmail'],
    defaultOutput: 'Structured brief',
  },
  {
    id: 'cs-pulse',
    name: 'Customer Success Pulse',
    category: 'CS',
    description: 'Surfaces at-risk accounts, NPS shifts, and renewal blockers across your book of business.',
    icon: HeartPulse,
    defaultModel: 'GPT-4o',
    defaultSchedule: 'Daily at 9:00 AM',
    defaultSources: ['HubSpot', 'BigQuery', 'Internal docs'],
    defaultOutput: 'Charts & summary',
  },
  {
    id: 'market-intel',
    name: 'Market Intelligence',
    category: 'Strategy',
    description: 'Tracks competitor moves, funding news, and market trends relevant to your strategy.',
    icon: FileSearch,
    defaultModel: 'GPT-4o',
    defaultSchedule: 'Daily at 9:00 AM',
    defaultSources: ['Market feeds', 'Internal docs'],
    defaultOutput: 'Structured brief',
  },
  {
    id: 'campaign-launcher',
    name: 'Campaign Launcher',
    category: 'Marketing',
    description: 'Coordinates multi-channel campaign launches across email, social, and ads with approvals.',
    icon: Megaphone,
    defaultModel: 'GPT-4o',
    defaultSchedule: 'Event-driven',
    defaultSources: ['Gmail', 'Slack', 'HubSpot'],
    defaultOutput: 'Action log & notifications',
  },
];

const CATEGORIES = ['All', 'Sales', 'Productivity', 'Finance', 'CS', 'Strategy', 'Marketing', 'Legal'];

export default function TemplatesModal({
  open,
  onClose,
  onInstall,
  installedIds,
}: {
  open: boolean;
  onClose: () => void;
  onInstall: (template: AgentTemplate) => void;
  installedIds: Set<string>;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  if (!open) return null;

  const filtered = AGENT_TEMPLATES.filter((t) => {
    const matchesCategory = category === 'All' || t.category === category;
    const matchesQuery =
      !query.trim() ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="absolute inset-0 z-[80]">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-[#FAF7F0] rounded-t-3xl max-h-[92%] overflow-hidden flex flex-col shadow-2xl shadow-slate-900/30 animate-slide-up">
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-300" />
        </div>

        <div className="px-5 py-3 border-b border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-semibold text-slate-900">Agent Templates</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors active:scale-95"
            >
              <X className="w-4 h-4 text-slate-700" />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2 mb-3 focus-within:border-slate-900 transition-colors">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates…"
              className="flex-1 bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  category === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-stone-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5 scrollbar-none">
          {filtered.length === 0 ? (
            <div className="text-center text-xs text-slate-500 py-12">
              No templates match your search.
            </div>
          ) : (
            filtered.map((t) => {
              const installed = installedIds.has(t.id);
              const Icon = t.icon;
              return (
                <div
                  key={t.id}
                  className="bg-white border border-stone-200 rounded-xl p-3.5 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-teal-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <h3 className="text-sm font-semibold text-slate-900">{t.name}</h3>
                      {t.popular && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-100 text-amber-800 leading-none">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      {t.category}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onInstall(t)}
                    disabled={installed}
                    className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                      installed
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                    }`}
                  >
                    {installed ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
