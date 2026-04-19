'use client';

import { useState } from 'react';
import BottomNav, { type Tab } from '@/components/agentic/bottom-nav';
import ChatTab from '@/components/agentic/chat-tab';
import AgentsTab from '@/components/agentic/agents-tab';
import VisionTab from '@/components/agentic/vision-tab';
import HeroOverlay from '@/components/agentic/hero-overlay';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [showHero, setShowHero] = useState(true);

  return (
    <div className="h-[100dvh] flex flex-col bg-zinc-950 max-w-lg mx-auto relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'agents' && <AgentsTab />}
        {activeTab === 'vision' && <VisionTab />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {showHero && <HeroOverlay onEnter={() => setShowHero(false)} />}
    </div>
  );
}
