'use client';

import { useState } from 'react';
import {
  X,
  User,
  Bell,
  Plug,
  Moon,
  Sun,
  Shield,
  LogOut,
  ChevronRight,
  Slack,
  Mail,
  Github,
  Database,
  Calendar,
  FileText,
} from 'lucide-react';
import { useToast } from './toast';

interface Integration {
  name: string;
  icon: typeof Slack;
  connected: boolean;
  category: string;
}

const INITIAL_INTEGRATIONS: Integration[] = [
  { name: 'Slack', icon: Slack, connected: true, category: 'Messaging' },
  { name: 'Gmail', icon: Mail, connected: true, category: 'Email' },
  { name: 'HubSpot', icon: Database, connected: true, category: 'CRM' },
  { name: 'Salesforce', icon: Database, connected: false, category: 'CRM' },
  { name: 'Notion', icon: FileText, connected: true, category: 'Docs' },
  { name: 'GitHub', icon: Github, connected: false, category: 'Dev' },
  { name: 'Google Calendar', icon: Calendar, connected: true, category: 'Calendar' },
];

export default function SettingsSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { push } = useToast();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState({
    approvals: true,
    digests: true,
    failures: true,
  });
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);

  const toggleIntegration = (name: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, connected: !i.connected } : i
      )
    );
    const cur = integrations.find((i) => i.name === name);
    push('success', cur?.connected ? `${name} disconnected` : `${name} connected`);
  };

  const toggleNotif = (k: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const handleSignOut = () => {
    push('info', 'Sign-out is mocked in this prototype');
  };

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[80]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#FAF7F0] rounded-t-3xl max-h-[88%] overflow-hidden flex flex-col shadow-2xl shadow-slate-900/30 animate-slide-up">
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200">
          <h2 className="text-base font-semibold text-slate-900">Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors active:scale-95"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-none">
          {/* Profile */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white text-base font-semibold shadow-sm">
              AN
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Aurimas A. Nausėdas</p>
              <p className="text-[11px] text-slate-500 truncate">aurimas@aurimas.io · Pro plan</p>
            </div>
            <button
              onClick={() => push('info', 'Profile editor coming soon')}
              className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Appearance */}
          <Section icon={theme === 'light' ? Sun : Moon} title="Appearance">
            <div className="bg-white border border-stone-200 rounded-xl p-1 flex">
              {(['light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    push('info', `Theme set to ${t} (preview only)`);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                    theme === t
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  {t}
                </button>
              ))}
            </div>
          </Section>

          {/* Notifications */}
          <Section icon={Bell} title="Notifications">
            <div className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100">
              <NotifRow
                label="Approval requests"
                desc="Push when an agent needs your decision"
                on={notifications.approvals}
                onToggle={() => toggleNotif('approvals')}
              />
              <NotifRow
                label="Daily digests"
                desc="Morning summary of agent activity"
                on={notifications.digests}
                onToggle={() => toggleNotif('digests')}
              />
              <NotifRow
                label="Agent failures"
                desc="Alert when an agent fails or stalls"
                on={notifications.failures}
                onToggle={() => toggleNotif('failures')}
              />
            </div>
          </Section>

          {/* Integrations */}
          <Section icon={Plug} title="Integrations">
            <div className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100">
              {integrations.map((i) => {
                const Icon = i.icon;
                return (
                  <button
                    key={i.name}
                    onClick={() => toggleIntegration(i.name)}
                    className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-stone-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-900 leading-tight">{i.name}</p>
                      <p className="text-[10px] text-slate-500 leading-tight">{i.category}</p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-1 rounded-md ${
                        i.connected
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-stone-100 text-slate-500'
                      }`}
                    >
                      {i.connected ? 'Connected' : 'Connect'}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Security */}
          <Section icon={Shield} title="Security">
            <button
              onClick={() => push('info', 'Two-factor setup coming soon')}
              className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-stone-50 transition-colors"
            >
              <div className="text-left">
                <p className="text-xs font-medium text-slate-900">Two-factor authentication</p>
                <p className="text-[10px] text-slate-500">Add an extra layer of protection</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </Section>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-stone-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors active:scale-[0.99]"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>

          <p className="text-center text-[10px] text-slate-400 pb-4">
            Agentic Mobile · v0.2.0 · Built by Aurimas A. Nausėdas
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Bell;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2 px-1">
        <Icon className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function NotifRow({
  label,
  desc,
  on,
  onToggle,
}: {
  label: string;
  desc: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-stone-50 transition-colors text-left"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-900 leading-tight">{label}</p>
        <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{desc}</p>
      </div>
      <div
        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
          on ? 'bg-emerald-500' : 'bg-stone-300'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            on ? 'translate-x-[18px]' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  );
}
