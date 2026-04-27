'use client';

import { useState } from 'react';
import { Inbox, CheckCircle2, X, Clock, DollarSign } from 'lucide-react';
import type { Decision, InboxItem } from './types';

export default function InboxTab({
  items,
  onResolve,
}: {
  items: InboxItem[];
  onResolve: (id: string, decision: Decision) => void;
}) {
  const [filter, setFilter] = useState<'pending' | 'all' | 'resolved'>('pending');

  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const filtered = items.filter((i) =>
    filter === 'all'
      ? true
      : filter === 'pending'
      ? i.status === 'pending'
      : i.status !== 'pending'
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-stone-200 bg-[#FAF7F0] backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-900/15">
            <Inbox className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-slate-900">Inbox</h2>
            <p className="text-[10px] text-slate-500">
              {pendingCount === 0
                ? 'No pending decisions'
                : `${pendingCount} pending decision${pendingCount === 1 ? '' : 's'}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {(['pending', 'all', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-colors ${
                filter === f
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-stone-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
              {f === 'pending' && pendingCount > 0 ? ` · ${pendingCount}` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5 scrollbar-none">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">All caught up</h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed max-w-[240px]">
              No pending approvals. Your agents are running smoothly in the background.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-4 transition-all ${
                item.priority === 'high' && item.status === 'pending'
                  ? 'border-amber-300/70 shadow-sm shadow-amber-200/40'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      {item.agent}
                    </span>
                    {item.priority === 'high' && item.status === 'pending' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-100 text-amber-800 leading-none">
                        High
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" /> {item.receivedAt}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>

              {item.amount && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-stone-100 text-[11px] font-medium text-slate-700">
                  <DollarSign className="w-3 h-3" /> {item.amount}
                </div>
              )}

              <div className="mt-3">
                {item.status === 'pending' ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onResolve(item.id, 'rejected')}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors active:scale-95"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button
                      onClick={() => onResolve(item.id, 'approved')}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  </div>
                ) : (
                  <div
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                      item.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-stone-100 text-slate-600'
                    }`}
                  >
                    {item.status === 'approved' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                    {item.status === 'approved' ? 'Approved' : 'Rejected'}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
