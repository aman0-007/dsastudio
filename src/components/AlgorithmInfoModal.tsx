import React, { useState } from 'react';
import { AlgorithmMetadata, SupportedLanguage } from '../types';
import { X, Copy, Check, Terminal, Code2, ListOrdered, Sparkles } from 'lucide-react';

interface AlgorithmInfoModalProps {
  algorithm: AlgorithmMetadata;
  activeLine?: number;
  onClose: () => void;
}

export const AlgorithmInfoModal: React.FC<AlgorithmInfoModalProps> = ({
  algorithm,
  activeLine,
  onClose
}) => {
  // Default language is Java as requested
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('java');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'code' | 'algorithm' | 'pseudocode'>('code');

  const currentCode = selectedLang === 'java' ? algorithm.javaCode : algorithm.pythonCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-mono text-xs font-bold">
              {selectedLang === 'java' ? '☕' : '🐍'}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-tight">
                {algorithm.name}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono capitalize">
                {algorithm.category} Algorithm &bull; Complexity: {algorithm.complexity}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Tabs: Code (Java/Python) | Step-by-Step Algorithm | Pseudocode */}
        <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </button>
            <button
              onClick={() => setActiveTab('algorithm')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'algorithm'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Algorithm Steps</span>
            </button>
            <button
              onClick={() => setActiveTab('pseudocode')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pseudocode'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Pseudocode</span>
            </button>
          </div>

          {/* Language Switcher (Java / Python) - Default Java */}
          {activeTab === 'code' && (
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-mono">
              <button
                onClick={() => setSelectedLang('java')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                  selectedLang === 'java'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Java (Default)
              </button>
              <button
                onClick={() => setSelectedLang('python')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                  selectedLang === 'python'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Python
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm custom-scrollbar">
          
          {/* Complexity Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/60">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Avg Time</span>
              <span className="font-mono font-bold text-slate-800 text-xs sm:text-sm">{algorithm.complexity}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/60">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Best Time</span>
              <span className="font-mono font-semibold text-emerald-600 text-xs sm:text-sm">{algorithm.bestTime}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/60">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Worst Time</span>
              <span className="font-mono font-semibold text-rose-600 text-xs sm:text-sm">{algorithm.worstTime}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/60">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Space</span>
              <span className="font-mono font-bold text-indigo-600 text-xs sm:text-sm">{algorithm.spaceComplexity}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {algorithm.description}
            </p>
          </div>

          {/* Tab 1: Source Code View with copy & line numbers */}
          {activeTab === 'code' && (
            <div className="relative">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-800 text-slate-300 rounded-t-xl text-[11px] font-mono border-b border-slate-700">
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {selectedLang === 'java' ? 'Solution.java' : 'solution.py'}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed custom-scrollbar max-h-[380px]">
                <code>{currentCode}</code>
              </pre>
            </div>
          )}

          {/* Tab 2: Step-by-Step Algorithm Explanation */}
          {activeTab === 'algorithm' && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>How {algorithm.name} Works (Step-by-Step):</span>
              </div>
              <div className="space-y-2">
                {algorithm.algorithmSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 text-xs sm:text-sm leading-relaxed"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Pseudocode View */}
          {activeTab === 'pseudocode' && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 mb-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-600" />
                <span>High-Level Algorithm Logic:</span>
              </div>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-xs overflow-x-auto border border-slate-800 space-y-1">
                {algorithm.pseudocode.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isCurrent = activeLine === lineNum;
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 px-2 py-0.5 rounded-sm transition-colors ${
                        isCurrent
                          ? 'bg-amber-500/20 text-amber-300 font-semibold border-l-2 border-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      <span className="text-slate-500 select-none w-4 text-right shrink-0">{lineNum}</span>
                      <span className="whitespace-pre">{line}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Language default: Java &bull; Click tabs to switch
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-all cursor-pointer text-center"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
