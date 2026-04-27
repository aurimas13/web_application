'use client';

import { useState } from 'react';
import { Check, X, ShieldCheck, DollarSign } from 'lucide-react';
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
        <div
          className={`mt-3 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold ${
            decision === 'approved'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-stone-100 text-slate-600'
          }`}
        >
          {decision === 'approved' ? (
            <>
              <Check className="w-3.5 h-3.5" /> Approved
            </>
          ) : (
            <>
              <X className="w-3.5 h-3.5" /> Rejected
            </>
          )}
        </div>
      )}
    </div>
  );
}
