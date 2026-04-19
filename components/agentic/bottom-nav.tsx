'use client';

import { MessageSquare, Bot, Eye } from 'lucide-react';

export type Tab = 'chat' | 'agents' | 'vision';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'vision', label: 'Vision', icon: Eye },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-1 px-6 py-2 transition-all duration-200 ${
                isActive
                  ? 'text-sky-400'
                  : 'text-zinc-500 active:text-zinc-300'
              }`}
            >
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-sky-400 rounded-full" />
              )}
              <Icon className={`w-5 h-5 transition-all ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
              <span className="text-[10px] font-medium tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
