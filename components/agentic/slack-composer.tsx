'use client';

import { useState } from 'react';
import { X, Hash, Send, Loader as Loader2, CircleCheck as CheckCircle2 } from 'lucide-react';
import { useToast } from './toast';

interface SlackComposerProps {
  open: boolean;
  onClose: () => void;
}

const CHANNELS = [
  { id: 'sales-leadership', name: 'sales-leadership', members: 12, recommended: true },
  { id: 'revops', name: 'revops', members: 8 },
  { id: 'pipeline-daily', name: 'pipeline-daily', members: 24 },
  { id: 'exec-team', name: 'exec-team', members: 6 },
];

const DEFAULT_MESSAGE = `:bar_chart: *Pipeline Standup — ${new Date().toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
})}*

• *Coverage:* 3.4x (target 3.0x) :white_check_mark:
• *Commit:* $4.2M / $5.0M (84%)
• *At risk:* 3 deals · $445k

:rotating_light: *Needs exec attention:*
• Acme Corp $185k — champion left, need new CTO intro
• Globex $160k — procurement stalled 21d, escalate legal
• Initech $100k — usage down 32%, trigger save-play

Full report → agentic.aurimas.io`;

export default function SlackComposer({ open, onClose }: SlackComposerProps) {
  const [channel, setChannel] = useState('sales-leadership');
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const { push } = useToast();

  if (!open) return null;

  const handleSend = () => {
    if (status !== 'idle') return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      push('success', `Posted to #${channel}`);
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 1100);
    }, 900);
  };

  const handleOpenSlack = () => {
    // Try the Slack desktop app deep link first; fall back to web.
    const deepLink = `slack://channel?team=&id=${channel}`;
    const webLink = `https://slack.com/app_redirect?channel=${channel}`;
    window.open(deepLink, '_blank');
    setTimeout(() => window.open(webLink, '_blank', 'noopener,noreferrer'), 400);
    push('info', 'Opening Slack…');
  };

  return (
    <div className="absolute inset-0 z-[90]">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-[#FAF7F0] rounded-t-3xl max-h-[92%] overflow-hidden flex flex-col shadow-2xl shadow-slate-900/30 animate-slide-up">
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-300" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4A154B] flex items-center justify-center">
              <span className="text-white text-xs font-black">#</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Post to Slack</h2>
              <p className="text-[10px] text-slate-500">Acme Corp Workspace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors active:scale-95"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none">
          {/* Channel picker */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5 block">
              Channel
            </label>
            <div className="space-y-1.5">
              {CHANNELS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setChannel(c.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors text-left ${
                    channel === c.id
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-stone-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <Hash
                    className={`w-3.5 h-3.5 ${
                      channel === c.id ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  />
                  <span className="text-xs font-semibold flex-1">{c.name}</span>
                  {c.recommended && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        channel === c.id
                          ? 'bg-amber-300 text-slate-900'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Suggested
                    </span>
                  )}
                  <span
                    className={`text-[10px] ${
                      channel === c.id ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {c.members} members
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Message preview / editor */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5 block">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={11}
              className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-200 focus:border-slate-900 outline-none text-[11px] text-slate-800 leading-relaxed font-mono resize-none transition-colors"
            />
            <p className="text-[10px] text-slate-500 mt-1.5">
              {message.length} chars · markdown emoji supported
            </p>
          </div>

          {/* Slack-style preview */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
              Preview as it appears in Slack
            </p>
            <div className="bg-white border border-stone-200 rounded-lg p-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-600 to-teal-800 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">AM</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Agentic Mobile</span>
                    <span className="text-[9px] px-1 py-0.5 rounded bg-stone-200 text-slate-600 font-semibold">
                      APP
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <pre className="text-[11px] text-slate-800 mt-1 whitespace-pre-wrap font-sans leading-relaxed">
                    {message}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-white space-y-2">
          <button
            onClick={handleSend}
            disabled={status !== 'idle'}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] ${
              status === 'sent'
                ? 'bg-emerald-600 text-white'
                : status === 'sending'
                ? 'bg-slate-700 text-white cursor-wait'
                : 'bg-[#4A154B] text-white hover:bg-[#611F69]'
            }`}
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Posting…
              </>
            ) : status === 'sent' ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Posted to #{channel}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Send to #{channel}
              </>
            )}
          </button>
          <button
            onClick={handleOpenSlack}
            className="w-full text-center py-2 rounded-lg text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-stone-100 transition-colors"
          >
            Or open Slack to post manually →
          </button>
        </div>
      </div>
    </div>
  );
}
