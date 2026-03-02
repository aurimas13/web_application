'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles } from 'lucide-react';
import AgenticAction from './agentic-action';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'agentic';
  timestamp: Date;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      'Welcome to Nexos. I\'m your AI workspace assistant. I can help you analyze data, generate reports, and coordinate with your team.\n\nTry typing "Run daily report" to see an agentic workflow in action.',
    type: 'text',
    timestamp: new Date(),
  },
];

const AI_RESPONSES = [
  "I've analyzed the latest metrics. Your team's productivity is up 12% this sprint. Would you like me to break down the details by team member?",
  'Based on current pipeline data, I forecast a 23% increase in Q2 revenue. I can prepare a detailed projection report if needed.',
  "I've cross-referenced the customer feedback with our product roadmap. There are 3 high-impact items we should prioritize. Want me to create action items?",
  "The competitive analysis is ready. I've identified 4 key differentiators and 2 areas where we need to strengthen our position.",
  "I've reviewed the latest sprint metrics. The engineering team completed 94% of planned story points. Shall I schedule a retrospective?",
  'Your customer churn rate decreased by 8% this month. The retention campaigns are showing positive results across all segments.',
];

function getAIResponse(): string {
  return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
}

function isAgenticCommand(message: string): boolean {
  const lower = message.toLowerCase().trim();
  return (
    lower.includes('run daily report') ||
    lower.includes('run report') ||
    lower.includes('generate report')
  );
}

export default function ChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      type: 'text',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const isAgentic = isAgenticCommand(trimmed);
    const delay = isAgentic ? 800 : 1000 + Math.random() * 800;

    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isAgentic ? '' : getAIResponse(),
        type: isAgentic ? 'agentic' : 'text',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, delay);
  }, [input, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">Nexos AI</h2>
          <p className="text-[10px] text-emerald-400 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            } animate-message-in`}
          >
            {msg.type === 'agentic' ? (
              <AgenticAction />
            ) : (
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-sky-500 text-white rounded-br-lg'
                    : 'bg-zinc-800/80 text-zinc-200 rounded-bl-lg'
                }`}
              >
                <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-message-in">
            <div className="bg-zinc-800/80 rounded-2xl rounded-bl-lg px-4 py-3">
              <div className="flex gap-1.5 items-center h-5">
                <span
                  className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                  style={{ animationDelay: '0ms', animationDuration: '0.8s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                  style={{ animationDelay: '150ms', animationDuration: '0.8s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                  style={{ animationDelay: '300ms', animationDuration: '0.8s' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 py-3 border-t border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/30 rounded-2xl px-4 py-2.5 focus-within:border-sky-500/40 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Message Nexos AI...'
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              input.trim() && !isTyping
                ? 'bg-sky-500 text-white hover:bg-sky-400 active:scale-95'
                : 'bg-zinc-700/40 text-zinc-600'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
