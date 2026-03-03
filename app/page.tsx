'use client';

import { useState } from 'react';
import BottomNav, { type Tab } from '@/components/agenticflow/bottom-nav';
import ChatTab from '@/components/agenticflow/chat-tab';
import AgentsTab from '@/components/agenticflow/agents-tab';
import VisionTab from '@/components/agenticflow/vision-tab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  return (
    <div className="h-[100dvh] flex flex-col bg-zinc-950 max-w-lg mx-auto relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'agents' && <AgentsTab />}
        {activeTab === 'vision' && <VisionTab />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
