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
      'Welcome to Agentic Mobile. I\'m your AI workspace assistant. I can help you analyze data, generate reports, and coordinate with your team.\n\nTry typing "Run daily report" to see an agentic workflow in action.',
    type: 'text',
    timestamp: new Date(),
  },
];

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

    if (isAgentic) {
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          type: 'agentic',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 800);
    } else {
      const chatHistory = [...messages, userMessage]
        .filter((m) => m.type === 'text')
        .map((m) => ({ role: m.role, content: m.content }));

      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsTyping(false);
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.content ?? 'Sorry, something went wrong.',
            type: 'text',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        })
        .catch(() => {
          setIsTyping(false);
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Failed to reach the server. Please try again.',
            type: 'text',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        });
    }
  }, [input, isTyping, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-900/15">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Agentic Mobile</h2>
          <p className="text-[10px] text-emerald-600 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
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
                    ? 'bg-teal-700 text-white rounded-br-lg'
                    : 'bg-stone-100 text-slate-800 rounded-bl-lg'
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
            <div className="bg-stone-100 rounded-2xl rounded-bl-lg px-4 py-3">
              <div className="flex gap-1.5 items-center h-5">
                <span
                  className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: '0ms', animationDuration: '0.8s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: '150ms', animationDuration: '0.8s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: '300ms', animationDuration: '0.8s' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 py-3 border-t border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-2xl px-4 py-2.5 focus-within:border-slate-900 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Message Agentic Mobile...'
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              input.trim() && !isTyping
                ? 'bg-teal-700 text-white hover:bg-teal-600 active:scale-95'
                : 'bg-stone-200 text-slate-400'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
