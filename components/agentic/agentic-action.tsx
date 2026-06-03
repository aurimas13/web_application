'use client';

import { useState, useEffect } from 'react';
import { Check, Loader as Loader2, Circle, Zap, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import { useToast } from './toast';

const WORKFLOW_STEPS = [
  { label: 'Connecting to Salesforce + Gong', duration: 1100 },
  { label: 'Pulling 84 active deals', duration: 1600 },
  { label: 'Scoring deal risk + velocity', duration: 1900 },
  { label: 'Generating standup brief', duration: 1400 },
];

export default function AgenticAction() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    if (isComplete) return;

    const timer = setTimeout(() => {
      if (currentStep >= WORKFLOW_STEPS.length - 1) {
        setIsComplete(true);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, WORKFLOW_STEPS[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, isComplete]);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-lg p-4 max-w-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-md bg-teal-50 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-teal-700" />
        </div>
        <span className="text-[10px] font-semibold text-slate-700 tracking-widest uppercase">
          Pipeline Standup · Live
        </span>
      </div>

      <div className="space-y-3">
        {WORKFLOW_STEPS.map((step, index) => {
          const isActive = index === currentStep && !isComplete;
          const isDone = index < currentStep || isComplete;

          return (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center animate-step-complete">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-teal-700 animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 stroke-[1.5]" />
                )}
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDone
                    ? 'text-slate-700'
                    : isActive
                    ? 'text-slate-900'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
                {isActive && (
                  <span className="inline-flex ml-1">
                    <span className="animate-pulse-dot" style={{ animationDelay: '0ms' }}>.</span>
                    <span className="animate-pulse-dot" style={{ animationDelay: '200ms' }}>.</span>
                    <span className="animate-pulse-dot" style={{ animationDelay: '400ms' }}>.</span>
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="mt-4 pt-3 border-t border-stone-200 space-y-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              Standup ready — 12 reps, 84 deals, 3 risks
            </span>
          </div>

          <div className="bg-stone-50 rounded-lg p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600">Pipeline coverage</span>
              <span className="font-semibold text-emerald-700">3.4x</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600">Deals at risk</span>
              <span className="font-semibold text-amber-700">3 · $445k</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600">Commit vs target</span>
              <span className="font-semibold text-slate-900">$4.2M / $5.0M</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => push('success', 'Standup posted to #sales-leadership')}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-colors active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Slack
            </button>
            <button
              onClick={() => push('info', 'Opening full report…')}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" /> Open <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
