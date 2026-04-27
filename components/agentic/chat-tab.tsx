'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Sparkles,
  Mic,
  MicOff,
  Settings as SettingsIcon,
  TrendingUp,
  CalendarCheck,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import AgenticAction from './agentic-action';
import ApprovalCard from './approval-card';
import { useToast } from './toast';
import type { Decision, InboxItem } from './types';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'agentic' | 'approval';
  approval?: InboxItem;
  timestamp: Date;
  streaming?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Welcome to Agentic Mobile. I'm your AI workspace assistant — I can analyze data, draft reports, run multi-step workflows, and queue approvals for your decision.\n\nTry one of the suggestions below, or ask me anything.",
    type: 'text',
    timestamp: new Date(),
  },
];

const SUGGESTIONS = [
  { icon: TrendingUp, label: 'Run daily report', prompt: 'Run daily report' },
  { icon: ShieldCheck, label: 'Approve Q3 budget', prompt: 'Send the Q3 marketing budget for my approval' },
  { icon: CalendarCheck, label: 'Brief me on next meeting', prompt: 'Brief me on my next meeting' },
  { icon: Mail, label: 'Draft a follow-up email', prompt: 'Draft a follow-up email to the Acme Corp lead' },
];

function isAgenticCommand(message: string): boolean {
  const lower = message.toLowerCase().trim();
  return (
    lower.includes('run daily report') ||
    lower.includes('run report') ||
    lower.includes('generate report')
  );
}

function isApprovalCommand(message: string): InboxItem | null {
  const lower = message.toLowerCase().trim();
  if (lower.includes('q3') && (lower.includes('approve') || lower.includes('approval') || lower.includes('budget'))) {
    return {
      id: `chat-approval-${Date.now()}`,
      agent: 'Finance Agent',
      title: 'Approve Q3 marketing budget — $284,000',
      summary: 'Quarterly budget request submitted by the marketing team for paid acquisition, events, and content.',
      amount: '$284,000',
      context: [
        '12% over Q2 actual spend',
        'Within annual plan envelope',
        'CFO pre-reviewed Apr 22',
      ],
      rationale:
        'Recommended by Finance Agent based on YTD pacing and Q3 pipeline targets. ROI projection: 3.4x.',
      priority: 'high',
      receivedAt: 'Just now',
      status: 'pending',
    };
  }
  if (lower.includes('approve') && (lower.includes('expense') || lower.includes('contract') || lower.includes('vendor'))) {
    return {
      id: `chat-approval-${Date.now()}`,
      agent: 'Compliance Agent',
      title: 'Vendor contract — Datadog renewal',
      summary: 'Annual renewal at $48,200/yr. Terms unchanged. Auto-renews in 6 days unless rejected.',
      amount: '$48,200 / yr',
      context: ['Existing vendor since 2023', 'No security flags', 'Within IT budget'],
      rationale: 'Compliance Agent reviewed terms; no material changes from prior contract.',
      priority: 'medium',
      receivedAt: 'Just now',
      status: 'pending',
    };
  }
  return null;
}

export default function ChatTab({
  onResolveApproval,
  onOpenSettings,
}: {
  onResolveApproval: (item: InboxItem, decision: Decision) => void;
  onOpenSettings: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { push } = useToast();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Voice support detection + recognition setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    setVoiceSupported(true);
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e: any) => {
      setIsListening(false);
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        push('error', `Voice error: ${e.error}`);
      }
    };
    recognitionRef.current = recognition;
  }, [push]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      push('error', 'Voice input not supported in this browser');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        // start() can throw if already started
      }
    }
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
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

      // Agentic workflow trigger
      if (isAgenticCommand(trimmed)) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: '',
              type: 'agentic',
              timestamp: new Date(),
            },
          ]);
        }, 700);
        return;
      }

      // Approval card trigger
      const approval = isApprovalCommand(trimmed);
      if (approval) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: '',
              type: 'approval',
              approval,
              timestamp: new Date(),
            },
          ]);
        }, 600);
        return;
      }

      // Streaming chat
      const chatHistory = [...messages, userMessage]
        .filter((m) => m.type === 'text')
        .map((m) => ({ role: m.role, content: m.content }));

      const aiId = (Date.now() + 1).toString();
      // Insert empty streaming bubble
      setMessages((prev) => [
        ...prev,
        {
          id: aiId,
          role: 'assistant',
          content: '',
          type: 'text',
          timestamp: new Date(),
          streaming: true,
        },
      ]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: chatHistory }),
        });

        if (!res.ok || !res.body) {
          throw new Error('Failed to reach the server');
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = '';
        setIsTyping(false);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          acc += chunk;
          setMessages((prev) =>
            prev.map((m) => (m.id === aiId ? { ...m, content: acc } : m))
          );
        }
        // Finalize
        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, streaming: false } : m))
        );
      } catch {
        setIsTyping(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId
              ? {
                  ...m,
                  content: 'Failed to reach the server. Please try again.',
                  streaming: false,
                }
              : m
          )
        );
        push('error', 'Could not reach the AI server');
      }
    },
    [isTyping, messages, push]
  );

  const handleSend = useCallback(() => sendMessage(input), [sendMessage, input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResolveApproval = (item: InboxItem, decision: Decision) => {
    onResolveApproval(item, decision);
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-resolution`,
        role: 'assistant',
        content:
          decision === 'approved'
            ? `Approved. I've notified the team and updated the record.`
            : `Rejected. The agent has been informed and will hold action.`,
        type: 'text',
        timestamp: new Date(),
      },
    ]);
  };

  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-stone-200 bg-[#FAF7F0]/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
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
              Online · GPT-4o-mini
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors active:scale-95"
          aria-label="Settings"
        >
          <SettingsIcon className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}
          >
            {msg.type === 'agentic' ? (
              <AgenticAction />
            ) : msg.type === 'approval' && msg.approval ? (
              <ApprovalCard
                req={msg.approval}
                onResolve={(d) => handleResolveApproval(msg.approval!, d)}
              />
            ) : (
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-lg'
                    : 'bg-white border border-stone-200 text-slate-800 rounded-bl-lg shadow-sm'
                }`}
              >
                <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                  {msg.streaming && (
                    <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-slate-400 animate-pulse-dot" />
                  )}
                </p>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-message-in">
            <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-lg px-4 py-3 shadow-sm">
              <div className="flex gap-1.5 items-center h-5">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }} />
              </div>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="pt-2 animate-message-in">
            <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-semibold mb-2 px-1">
              Try this
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    onClick={() => sendMessage(s.prompt)}
                    className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-2.5 hover:border-slate-900/30 hover:bg-stone-50 transition-all text-left active:scale-[0.98]"
                  >
                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-teal-700" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-800 leading-tight">
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 py-3 border-t border-stone-200 bg-[#FAF7F0]/90 backdrop-blur-sm">
        {isListening && (
          <div className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[11px] font-medium text-red-700 flex-1">Listening… speak now</span>
            <div className="flex items-center gap-0.5 h-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-0.5 h-full bg-red-500 rounded-full origin-center animate-voice-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2 focus-within:border-slate-900/40 transition-colors shadow-sm">
          {voiceSupported && (
            <button
              onClick={toggleVoice}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Agentic Mobile…"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none min-w-0"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
              input.trim() && !isTyping
                ? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                : 'bg-stone-200 text-slate-400'
            }`}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
