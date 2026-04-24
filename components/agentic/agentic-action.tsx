'use client';

import { useState, useEffect } from 'react';
import { Check, Loader as Loader2, Circle, Zap } from 'lucide-react';

const WORKFLOW_STEPS = [
  { label: 'Connecting to data sources', duration: 1200 },
  { label: 'Fetching CRM records', duration: 1800 },
  { label: 'Running analysis pipeline', duration: 2200 },
  { label: 'Generating report', duration: 1500 },
];

export default function AgenticAction() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
          Agentic Workflow
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
        <div className="mt-4 pt-3 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              Daily report generated successfully
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
