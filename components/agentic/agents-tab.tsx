'use client';

import { useState, useCallback } from 'react';
import {
  Bot,
  Brain,
  ChartBar as BarChart3,
  FileText,
  Mail,
  Zap,
  ChevronRight,
  ChevronLeft,
  Activity,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  AlertCircle,
  Settings,
  X,
  Save,
  Plus,
  Trash2,
} from 'lucide-react';

interface RecentTask {
  id: string;
  title: string;
  status: 'completed' | 'running' | 'failed';
  time: string;
}

interface AgentConfig {
  model: string;
  schedule: string;
  dataSources: string[];
  outputFormat: string;
}

interface Agent {
  name: string;
  description: string;
  icon: typeof BarChart3;
  status: 'active' | 'idle';
  tasks: number;
  lastRun: string;
  successRate: number;
  avgDuration: string;
  recentTasks: RecentTask[];
  config: AgentConfig;
  runHistory: number[];
}

const INITIAL_AGENTS: Agent[] = [
  {
    name: 'Data Analyst',
    description:
      'Analyzes datasets and generates insights from your connected data sources.',
    icon: BarChart3,
    status: 'active',
    tasks: 124,
    lastRun: '2 min ago',
    successRate: 97,
    avgDuration: '45s',
    recentTasks: [
      { id: '1', title: 'Q2 revenue breakdown by region', status: 'completed', time: '2 min ago' },
      { id: '2', title: 'Customer churn correlation analysis', status: 'completed', time: '18 min ago' },
      { id: '3', title: 'Pipeline velocity trend report', status: 'running', time: 'In progress' },
      { id: '4', title: 'Weekly KPI snapshot', status: 'completed', time: '1 hr ago' },
      { id: '5', title: 'Competitor pricing comparison', status: 'failed', time: '2 hrs ago' },
    ],
    config: {
      model: 'GPT-4o',
      schedule: 'On demand + hourly sync',
      dataSources: ['Salesforce CRM', 'BigQuery', 'HubSpot'],
      outputFormat: 'Charts & summary',
    },
    runHistory: [12, 18, 15, 22, 19, 25, 13],
  },
  {
    name: 'Report Generator',
    description:
      'Creates comprehensive reports from multiple data streams automatically.',
    icon: FileText,
    status: 'active',
    tasks: 89,
    lastRun: '15 min ago',
    successRate: 94,
    avgDuration: '2m 10s',
    recentTasks: [
      { id: '1', title: 'Daily standup summary for #engineering', status: 'completed', time: '15 min ago' },
      { id: '2', title: 'Sprint retrospective highlights', status: 'completed', time: '1 hr ago' },
      { id: '3', title: 'Monthly board deck — financials', status: 'completed', time: '3 hrs ago' },
      { id: '4', title: 'Customer success weekly digest', status: 'failed', time: '5 hrs ago' },
    ],
    config: {
      model: 'GPT-4o',
      schedule: 'Daily at 9:00 AM',
      dataSources: ['Jira', 'Confluence', 'Google Sheets'],
      outputFormat: 'PDF & Slack message',
    },
    runHistory: [8, 14, 11, 9, 16, 12, 19],
  },
  {
    name: 'Email Drafter',
    description:
      'Composes and suggests email responses based on context and history.',
    icon: Mail,
    status: 'idle',
    tasks: 56,
    lastRun: '1 hr ago',
    successRate: 91,
    avgDuration: '12s',
    recentTasks: [
      { id: '1', title: 'Follow-up to Acme Corp proposal', status: 'completed', time: '1 hr ago' },
      { id: '2', title: 'Meeting reschedule — Sarah K.', status: 'completed', time: '2 hrs ago' },
      { id: '3', title: 'Partnership intro for Series B lead', status: 'completed', time: '3 hrs ago' },
    ],
    config: {
      model: 'GPT-4o-mini',
      schedule: 'On demand',
      dataSources: ['Gmail', 'Calendar', 'CRM contacts'],
      outputFormat: 'Draft email',
    },
    runHistory: [5, 9, 7, 3, 11, 8, 4],
  },
  {
    name: 'Strategy Advisor',
    description:
      'Provides strategic recommendations based on market and internal data.',
    icon: Brain,
    status: 'active',
    tasks: 34,
    lastRun: '5 min ago',
    successRate: 99,
    avgDuration: '1m 30s',
    recentTasks: [
      { id: '1', title: 'Competitive landscape update — AI SaaS', status: 'completed', time: '5 min ago' },
      { id: '2', title: 'Market sizing for APAC expansion', status: 'running', time: 'In progress' },
      { id: '3', title: 'Pricing strategy recommendation', status: 'completed', time: '2 hrs ago' },
      { id: '4', title: 'Risk assessment — vendor dependency', status: 'completed', time: '4 hrs ago' },
    ],
    config: {
      model: 'GPT-4o',
      schedule: 'Weekly + on demand',
      dataSources: ['Market feeds', 'Internal docs', 'Financial DB'],
      outputFormat: 'Structured brief',
    },
    runHistory: [3, 5, 4, 7, 6, 5, 4],
  },
  {
    name: 'Workflow Automator',
    description:
      'Orchestrates multi-step workflows across your integrated tools.',
    icon: Zap,
    status: 'idle',
    tasks: 201,
    lastRun: '30 min ago',
    successRate: 96,
    avgDuration: '55s',
    recentTasks: [
      { id: '1', title: 'Onboarding pipeline — new hire batch', status: 'completed', time: '30 min ago' },
      { id: '2', title: 'Invoice approval chain — Q2 vendors', status: 'completed', time: '1 hr ago' },
      { id: '3', title: 'Deploy staging → production sync', status: 'failed', time: '2 hrs ago' },
      { id: '4', title: 'Customer ticket escalation routing', status: 'completed', time: '3 hrs ago' },
      { id: '5', title: 'Data backup and compliance check', status: 'completed', time: '5 hrs ago' },
    ],
    config: {
      model: 'GPT-4o-mini',
      schedule: 'Event-driven',
      dataSources: ['Slack', 'Jira', 'Zapier', 'GitHub'],
      outputFormat: 'Action log & notifications',
    },
    runHistory: [20, 28, 35, 22, 30, 25, 41],
  },
];

const AVAILABLE_ICONS = [BarChart3, FileText, Mail, Brain, Zap, Bot];
const MODEL_OPTIONS = ['GPT-4o', 'GPT-4o-mini', 'GPT-4-turbo', 'Claude 3.5 Sonnet'];
const SCHEDULE_OPTIONS = ['On demand', 'Hourly', 'Daily at 9:00 AM', 'Weekly', 'Event-driven'];
const OUTPUT_OPTIONS = ['Charts & summary', 'PDF & Slack message', 'Draft email', 'Structured brief', 'Action log & notifications'];
const ALL_DATA_SOURCES = ['Salesforce CRM', 'BigQuery', 'HubSpot', 'Jira', 'Confluence', 'Google Sheets', 'Gmail', 'Calendar', 'Slack', 'GitHub', 'Zapier', 'Market feeds', 'Internal docs', 'Financial DB', 'CRM contacts'];

function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-10">
      {data.map((val, i) => (
        <div
          key={i}
          className="flex-1 bg-teal-700 rounded-sm min-w-[4px] transition-all"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function TaskStatusIcon({ status }: { status: RecentTask['status'] }) {
  if (status === 'completed')
    return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />;
  if (status === 'running')
    return (
      <div className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
      </div>
    );
  return <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />;
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-medium text-slate-600 block mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-900/15 transition-colors appearance-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function MultiSelectField({
  label,
  selected,
  options,
  onToggle,
}: {
  label: string;
  selected: string[];
  options: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-medium text-slate-600 block mb-1.5">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all active:scale-95 ${
                isSelected
                  ? 'bg-teal-700 border border-teal-700 text-white shadow-sm'
                  : 'bg-stone-100 border border-stone-200 text-slate-500 hover:text-slate-700'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPanel({
  config,
  onSave,
  onClose,
}: {
  config: AgentConfig;
  onSave: (c: AgentConfig) => void;
  onClose: () => void;
}) {
  const [model, setModel] = useState(config.model);
  const [schedule, setSchedule] = useState(config.schedule);
  const [sources, setSources] = useState<string[]>(config.dataSources);
  const [output, setOutput] = useState(config.outputFormat);
  const [saved, setSaved] = useState(false);

  const handleToggleSource = (s: string) => {
    setSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSave = () => {
    onSave({ model, schedule, dataSources: sources, outputFormat: output });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="flex flex-col h-full animate-slide-in">
      <div className="px-4 py-3 border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center hover:bg-stone-100 transition-colors active:scale-95"
            >
              <X className="w-4 h-4 text-slate-700" />
            </button>
            <h2 className="text-sm font-semibold text-slate-900">
              Agent Settings
            </h2>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
              saved
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" /> Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
        <SelectField
          label="AI Model"
          value={model}
          options={MODEL_OPTIONS}
          onChange={setModel}
        />
        <SelectField
          label="Schedule"
          value={schedule}
          options={SCHEDULE_OPTIONS}
          onChange={setSchedule}
        />
        <SelectField
          label="Output Format"
          value={output}
          options={OUTPUT_OPTIONS}
          onChange={setOutput}
        />
        <MultiSelectField
          label="Data Sources"
          selected={sources}
          options={ALL_DATA_SOURCES}
          onToggle={handleToggleSource}
        />
        <div className="h-4" />
      </div>
    </div>
  );
}

function ConfigureNewAgent({ onBack, onCreate }: { onBack: () => void; onCreate: (a: Agent) => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState(MODEL_OPTIONS[0]);
  const [schedule, setSchedule] = useState(SCHEDULE_OPTIONS[0]);
  const [output, setOutput] = useState(OUTPUT_OPTIONS[0]);
  const [sources, setSources] = useState<string[]>([]);
  const [created, setCreated] = useState(false);

  const handleToggleSource = (s: string) => {
    setSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    const iconIdx = Math.floor(Math.random() * AVAILABLE_ICONS.length);
    const newAgent: Agent = {
      name: name.trim(),
      description: description.trim() || `Custom agent: ${name.trim()}`,
      icon: AVAILABLE_ICONS[iconIdx],
      status: 'idle',
      tasks: 0,
      lastRun: 'Never',
      successRate: 0,
      avgDuration: '—',
      recentTasks: [],
      config: {
        model,
        schedule,
        dataSources: sources.length ? sources : ['Manual input'],
        outputFormat: output,
      },
      runHistory: [0, 0, 0, 0, 0, 0, 0],
    };
    onCreate(newAgent);
    setCreated(true);
    setTimeout(() => onBack(), 1200);
  };

  return (
    <div className="flex flex-col h-full animate-slide-in">
      <div className="px-4 py-3 border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center hover:bg-stone-100 transition-colors active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900">
            Configure New Agent
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
        <div>
          <label className="text-[10px] font-medium text-slate-600 block mb-1">
            Agent Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Customer Support Bot"
            className="w-full bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900/15 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-medium text-slate-600 block mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What should this agent do?"
            rows={2}
            className="w-full bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900/15 transition-colors resize-none"
          />
        </div>
        <SelectField label="AI Model" value={model} options={MODEL_OPTIONS} onChange={setModel} />
        <SelectField label="Schedule" value={schedule} options={SCHEDULE_OPTIONS} onChange={setSchedule} />
        <SelectField label="Output Format" value={output} options={OUTPUT_OPTIONS} onChange={setOutput} />
        <MultiSelectField label="Data Sources" selected={sources} options={ALL_DATA_SOURCES} onToggle={handleToggleSource} />

        <button
          onClick={handleCreate}
          disabled={!name.trim() || created}
          className={`w-full py-3 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] ${
            created
              ? 'bg-emerald-100 border border-emerald-500/30 text-emerald-600'
              : name.trim()
              ? 'bg-teal-700 text-white hover:bg-teal-600'
              : 'bg-stone-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {created ? 'Agent Created!' : 'Create Agent'}
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
}

function AgentDetail({
  agent,
  onBack,
  onDelete,
  onUpdateConfig,
}: {
  agent: Agent;
  onBack: () => void;
  onDelete: () => void;
  onUpdateConfig: (c: AgentConfig) => void;
}) {
  const [isRunning, setIsRunning] = useState(agent.status === 'active');
  const [showSettings, setShowSettings] = useState(false);

  const handleToggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const Icon = agent.icon;

  if (showSettings) {
    return (
      <SettingsPanel
        config={agent.config}
        onSave={(c) => {
          onUpdateConfig(c);
        }}
        onClose={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full animate-slide-in">
      <div className="px-4 py-3 border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center hover:bg-stone-100 transition-colors active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center">
            <Icon className="w-4 h-4 text-teal-700" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-slate-900">
              {agent.name}
            </h2>
            <p className="text-[10px] text-slate-600">{agent.description}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scrollbar-none">
        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-all active:scale-[0.98] ${
              isRunning
                ? 'bg-amber-500/15 border border-amber-500/25 text-amber-700'
                : 'bg-emerald-100 border border-emerald-500/25 text-emerald-600'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Agent
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Start Agent
              </>
            )}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors active:scale-95"
          >
            <Settings className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-teal-700">{agent.tasks}</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Total tasks</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-emerald-600">
              {agent.successRate}%
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">Success rate</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-slate-800">
              {agent.avgDuration}
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">Avg duration</p>
          </div>
        </div>

        {/* Run History */}
        <section>
          <h3 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-700" />
            Run History (7 days)
          </h3>
          <div className="bg-white border border-stone-200 rounded-xl p-3">
            <MiniBarChart data={agent.runHistory} />
            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] text-slate-400">7d ago</span>
              <span className="text-[9px] text-slate-400">Today</span>
            </div>
          </div>
        </section>

        {/* Recent Tasks */}
        <section>
          <h3 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-700" />
            Recent Tasks
          </h3>
          <div className="space-y-1.5">
            {agent.recentTasks.length === 0 ? (
              <p className="text-[11px] text-slate-400 text-center py-4">
                No tasks yet. Start this agent to begin.
              </p>
            ) : (
              agent.recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-lg px-3 py-2.5"
                >
                  <TaskStatusIcon status={task.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-800 truncate">{task.title}</p>
                    <p className="text-[10px] text-slate-500">{task.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Configuration */}
        <section>
          <h3 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-teal-700" />
            Configuration
          </h3>
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            {[
              { label: 'Model', value: agent.config.model },
              { label: 'Schedule', value: agent.config.schedule },
              { label: 'Sources', value: agent.config.dataSources.join(', ') },
              { label: 'Output', value: agent.config.outputFormat },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-3 py-2.5 ${
                  i > 0 ? 'border-t border-stone-200' : ''
                }`}
              >
                <span className="text-[11px] font-medium text-slate-600">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-700 text-right max-w-[60%] truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Delete Agent */}
        <button
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500/15 transition-all active:scale-[0.98]"
        >
          <Trash2 className="w-3.5 h-3.5" /> Remove Agent
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
}

export default function AgentsTab() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [selectedAgentIdx, setSelectedAgentIdx] = useState<number | null>(null);
  const [showNewAgent, setShowNewAgent] = useState(false);

  if (showNewAgent) {
    return (
      <ConfigureNewAgent
        onBack={() => setShowNewAgent(false)}
        onCreate={(newAgent) => {
          setAgents((prev) => [...prev, newAgent]);
          setShowNewAgent(false);
        }}
      />
    );
  }

  if (selectedAgentIdx !== null && agents[selectedAgentIdx]) {
    const agent = agents[selectedAgentIdx];
    return (
      <AgentDetail
        agent={agent}
        onBack={() => setSelectedAgentIdx(null)}
        onDelete={() => {
          setAgents((prev) => prev.filter((_, i) => i !== selectedAgentIdx));
          setSelectedAgentIdx(null);
        }}
        onUpdateConfig={(newConfig) => {
          setAgents((prev) =>
            prev.map((a, i) =>
              i === selectedAgentIdx ? { ...a, config: newConfig } : a
            )
          );
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-900/15">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                AI Agents
              </h2>
              <p className="text-[10px] text-slate-600">
                {agents.filter((a) => a.status === 'active').length} active of{' '}
                {agents.length} configured
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-100 border border-emerald-500/20 rounded-full px-2.5 py-1">
            <Activity className="w-3 h-3 text-emerald-600" />
            <span className="text-[10px] font-medium text-emerald-600">
              All Systems Normal
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-none">
        {agents.map((agent, idx) => {
          const Icon = agent.icon;
          return (
            <button
              key={`${agent.name}-${idx}`}
              onClick={() => setSelectedAgentIdx(idx)}
              className="w-full text-left bg-white border border-stone-200 rounded-xl p-4 hover:border-stone-200 transition-all duration-200 active:scale-[0.98] group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-100 transition-colors">
                  <Icon className="w-5 h-5 text-teal-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-900">
                      {agent.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span
                      className={`flex items-center gap-1.5 text-[10px] font-medium ${
                        agent.status === 'active'
                          ? 'text-emerald-600'
                          : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          agent.status === 'active'
                            ? 'bg-emerald-500'
                            : 'bg-stone-200'
                        }`}
                      />
                      {agent.status === 'active' ? 'Active' : 'Idle'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {agent.tasks} tasks
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {agent.lastRun}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        <div className="pt-2 pb-4">
          <button
            onClick={() => setShowNewAgent(true)}
            className="w-full border border-dashed border-stone-200 rounded-xl p-4 text-center hover:border-slate-900/15 hover:bg-stone-50 transition-all duration-200 group"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center group-hover:bg-stone-50 transition-colors">
                <Plus className="w-5 h-5 text-slate-500 group-hover:text-teal-700 transition-colors" />
              </div>
              <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">
                Configure New Agent
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
