"use client";

import React, { useState, useEffect } from "react";
import { useCMS } from "@/context/CMSContext";
import { BlockList } from "./BlockList";
import { BlockEditor } from "./BlockEditor";
import { PRESET_TEMPLATES } from "@/lib/templates";

export const EditorPanel: React.FC = () => {
  const { addBlock, selectedBlockId, loadTemplate } = useCMS();
  const [activeTab, setActiveTab] = useState<"layout" | "content">("layout");

  // Auto-switch to Content tab when a block is selected
  useEffect(() => {
    if (selectedBlockId) {
      setActiveTab("content");
    }
  }, [selectedBlockId]);

  return (
    <div className="w-full lg:w-[420px] bg-white dark:bg-zinc-900 flex flex-col flex-shrink-0 border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 h-full overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex-shrink-0">
        <button
          onClick={() => setActiveTab("layout")}
          className={`flex-1 py-4 text-center text-xs font-bold border-b-2 transition-all ${
            activeTab === "layout"
              ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 bg-white dark:bg-zinc-900"
              : "border-transparent text-zinc-500 dark:text-zinc-450 hover:text-zinc-800 dark:hover:text-zinc-300"
          }`}
        >
          Manage Layout
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 py-4 text-center text-xs font-bold border-b-2 transition-all ${
            activeTab === "content"
              ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 bg-white dark:bg-zinc-900"
              : "border-transparent text-zinc-500 dark:text-zinc-450 hover:text-zinc-800 dark:hover:text-zinc-300"
          }`}
        >
          Edit Content
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {activeTab === "layout" ? (
          <div className="space-y-6">
            {/* Preset Templates Selector (Mobile/Tablet only) */}
            <div className="lg:hidden p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-150 dark:border-zinc-850 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 animate-fade-in">
                  Preset Template
                </span>
                <span className="block text-3xs text-zinc-450 dark:text-zinc-500 font-medium">
                  Load layout demo
                </span>
              </div>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    loadTemplate(e.target.value);
                    e.target.value = ""; // reset dropdown
                  }
                }}
                defaultValue=""
                className="text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 px-2.5 py-1.5 rounded-lg text-zinc-800 dark:text-zinc-100 focus:outline-none"
              >
                <option value="" disabled>Select...</option>
                {Object.keys(PRESET_TEMPLATES).map((key) => (
                  <option key={key} value={key}>
                    {PRESET_TEMPLATES[key].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Section Buttons Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider select-none">
                Add Landing Page Section
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addBlock("hero")}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850 hover:border-indigo-500/50 hover:bg-indigo-50/10 dark:hover:bg-indigo-950/10 transition group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform duration-200">
                    H
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Hero Section</span>
                    <span className="block text-3xs text-zinc-400 dark:text-zinc-500 font-medium">Header banner</span>
                  </div>
                </button>

                <button
                  onClick={() => addBlock("features")}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850 hover:border-emerald-500/50 hover:bg-emerald-50/10 dark:hover:bg-emerald-950/10 transition group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform duration-200">
                    F
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Features</span>
                    <span className="block text-3xs text-zinc-400 dark:text-zinc-500 font-medium">Grid cards</span>
                  </div>
                </button>

                <button
                  onClick={() => addBlock("testimonials")}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850 hover:border-amber-500/50 hover:bg-amber-50/10 dark:hover:bg-amber-950/10 transition group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform duration-200">
                    T
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">Testimonials</span>
                    <span className="block text-3xs text-zinc-400 dark:text-zinc-500 font-medium">Quotes & reviews</span>
                  </div>
                </button>

                <button
                  onClick={() => addBlock("cta")}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-zinc-150 dark:border-zinc-850 hover:border-purple-500/50 hover:bg-purple-50/10 dark:hover:bg-purple-950/10 transition group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform duration-200">
                    C
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">CTA Section</span>
                    <span className="block text-3xs text-zinc-400 dark:text-zinc-500 font-medium">Action card</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Block list */}
            <div className="border-t border-zinc-150 dark:border-zinc-850 pt-5">
              <BlockList />
            </div>
          </div>
        ) : (
          /* Editor View */
          <BlockEditor />
        )}
      </div>
    </div>
  );
};
