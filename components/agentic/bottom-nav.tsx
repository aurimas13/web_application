'use client';

import { MessageSquare, Inbox, Bot, Eye } from 'lucide-react';

export type Tab = 'chat' | 'inbox' | 'agents' | 'vision';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  inboxBadge?: number;
}

const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'agents', label: 'Agents', icon: Bot },
  { id: 'vision', label: 'Vision', icon: Eye },
];

export default function BottomNav({ activeTab, onTabChange, inboxBadge = 0 }: BottomNavProps) {
  return (
    <nav className="border-t border-stone-200 bg-[#FAF7F0]/95 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const showBadge = tab.id === 'inbox' && inboxBadge > 0;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 transition-all duration-200 ${
                isActive ? 'text-teal-700' : 'text-slate-500 active:text-slate-700'
              }`}
            >
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-700 rounded-full" />
              )}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-all ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center leading-none shadow-sm">
                    {inboxBadge > 9 ? '9+' : inboxBadge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
