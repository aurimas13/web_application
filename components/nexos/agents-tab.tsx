'use client';

import { Bot, Brain, ChartBar as BarChart3, FileText, Mail, Zap, ChevronRight, Activity } from 'lucide-react';

const agents = [
  {
    name: 'Data Analyst',
    description:
      'Analyzes datasets and generates insights from your connected data sources.',
    icon: BarChart3,
    status: 'active' as const,
    tasks: 124,
    lastRun: '2 min ago',
  },
  {
    name: 'Report Generator',
    description:
      'Creates comprehensive reports from multiple data streams automatically.',
    icon: FileText,
    status: 'active' as const,
    tasks: 89,
    lastRun: '15 min ago',
  },
  {
    name: 'Email Drafter',
    description:
      'Composes and suggests email responses based on context and history.',
    icon: Mail,
    status: 'idle' as const,
    tasks: 56,
    lastRun: '1 hr ago',
  },
  {
    name: 'Strategy Advisor',
    description:
      'Provides strategic recommendations based on market and internal data.',
    icon: Brain,
    status: 'active' as const,
    tasks: 34,
    lastRun: '5 min ago',
  },
  {
    name: 'Workflow Automator',
    description:
      'Orchestrates multi-step workflows across your integrated tools.',
    icon: Zap,
    status: 'idle' as const,
    tasks: 201,
    lastRun: '30 min ago',
  },
];

export default function AgentsTab() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                AI Agents
              </h2>
              <p className="text-[10px] text-zinc-400">
                {agents.filter((a) => a.status === 'active').length} active of{' '}
                {agents.length} configured
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-400">
              All Systems Normal
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-none">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <button
              key={agent.name}
              className="w-full text-left bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-4 hover:border-zinc-700/50 transition-all duration-200 active:scale-[0.98] group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-800 transition-colors">
                  <Icon className="w-5 h-5 text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-zinc-100">
                      {agent.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span
                      className={`flex items-center gap-1.5 text-[10px] font-medium ${
                        agent.status === 'active'
                          ? 'text-emerald-400'
                          : 'text-zinc-500'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          agent.status === 'active'
                            ? 'bg-emerald-400'
                            : 'bg-zinc-600'
                        }`}
                      />
                      {agent.status === 'active' ? 'Active' : 'Idle'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {agent.tasks} tasks
                    </span>
                    <span className="text-[10px] text-zinc-600">
                      {agent.lastRun}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        <div className="pt-2 pb-4">
          <button className="w-full border border-dashed border-zinc-700/50 rounded-xl p-4 text-center hover:border-sky-500/30 hover:bg-sky-500/5 transition-all duration-200 group">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center group-hover:bg-sky-500/10 transition-colors">
                <Bot className="w-5 h-5 text-zinc-500 group-hover:text-sky-400 transition-colors" />
              </div>
              <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                Configure New Agent
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
