'use client';

import { useState } from 'react';
import { Check, X, ShieldCheck, DollarSign, Hash, ExternalLink } from 'lucide-react';
import type { Decision, InboxItem } from './types';

export default function ApprovalCard({
  req,
  onResolve,
}: {
  req: InboxItem;
  onResolve: (decision: Decision) => void;
}) {
  const [decision, setDecision] = useState<Decision | null>(null);

  const handle = (d: Decision) => {
    if (decision) return;
    setDecision(d);
    setTimeout(() => onResolve(d), 500);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-lg p-4 max-w-[320px] shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
        </div>
        <span className="text-[10px] font-semibold text-slate-700 tracking-widest uppercase">
          Approval Required
        </span>
      </div>

      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
        {req.agent}
      </p>
      <p className="text-sm font-semibold text-slate-900 leading-snug">{req.title}</p>

      {req.amount && (
        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-stone-100 text-[11px] font-medium text-slate-700">
          <DollarSign className="w-3 h-3" /> {req.amount}
        </div>
      )}

      {req.context && req.context.length > 0 && (
        <ul className="mt-3 space-y-1">
          {req.context.map((c, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      )}

      {req.rationale && (
        <p className="mt-3 text-[11px] italic text-slate-500 leading-relaxed border-l-2 border-stone-200 pl-2">
          {req.rationale}
        </p>
      )}

      {!decision ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => handle('rejected')}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors active:scale-95"
          >
            <X className="w-3.5 h-3.5" /> Reject
          </button>
          <button
            onClick={() => handle('approved')}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors active:scale-95"
          >
            <Check className="w-3.5 h-3.5" /> Approve
          </button>
        </div>
      ) : (
        <div className="mt-3 space-y-2 animate-fade-in">
          <div
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold ${
              decision === 'approved'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-stone-100 text-slate-600'
            }`}
          >
            {decision === 'approved' ? (
              <>
                <Check className="w-3.5 h-3.5" /> Approved · logged to audit trail
              </>
            ) : (
              <>
                <X className="w-3.5 h-3.5" /> Rejected · logged to audit trail
              </>
            )}
          </div>

          {/* Slack-style #approvals post preview */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Hash className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-700">approvals</span>
              <span className="text-[10px] text-slate-400">·</span>
              <span className="text-[10px] text-slate-500">
                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </span>
              <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-stone-200 text-slate-600 font-semibold">
                Slack
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-600 to-teal-800 flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">AM</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-900">
                  Agentic Mobile{' '}
                  <span className="text-[8px] px-1 py-0.5 rounded bg-stone-200 text-slate-600">
                    APP
                  </span>
                </p>
                <pre className="text-[10px] text-slate-700 mt-0.5 whitespace-pre-wrap font-sans leading-snug">
                  {decision === 'approved' ? ':white_check_mark:' : ':x:'}{' '}
                  <span className="font-semibold">
                    {decision === 'approved' ? 'Approved' : 'Rejected'}
                  </span>{' '}
                  by Aurimas{'\n'}
                  *{req.title}*
                  {req.amount ? `\n${req.amount}` : ''}
                  {'\n'}
                  <span className="text-slate-500">
                    Audit ID: AUD-{Math.random().toString(36).substring(2, 8).toUpperCase()} ·{' '}
                    {req.agent}
                  </span>
                </pre>
              </div>
            </div>
            <a
              href={`slack://channel?team=&id=approvals`}
              className="mt-2 flex items-center justify-center gap-1 text-[10px] text-teal-700 font-medium hover:text-teal-800"
            >
              <ExternalLink className="w-2.5 h-2.5" /> Open in Slack
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
