"use client";

import React from "react";
import { useCMS } from "@/context/CMSContext";

export const BlockList: React.FC = () => {
  const {
    blocks,
    selectedBlockId,
    selectBlock,
    removeBlock,
    duplicateBlock,
    reorderBlock
  } = useCMS();

  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl py-12">
        <svg className="w-10 h-10 text-zinc-350 dark:text-zinc-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-zinc-500 dark:text-zinc-450 text-xs font-semibold mb-1">
          No sections on page
        </p>
        <p className="text-zinc-400 dark:text-zinc-500 text-3xs max-w-[200px]">
          Choose a section from the &quot;Add Section&quot; buttons above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-extrabold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider mb-2 select-none">
        Layout Structure
      </h3>
      <div className="space-y-2">
        {blocks.map((block, index) => {
          const isSelected = block.id === selectedBlockId;
          const isFirst = index === 0;
          const isLast = index === blocks.length - 1;

          return (
            <div
              key={block.id}
              onClick={() => selectBlock(block.id)}
              className={`group flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-indigo-50/70 border-indigo-500 dark:bg-indigo-950/20 dark:border-indigo-500/80 shadow-sm"
                  : "bg-white border-zinc-150 hover:bg-zinc-50 hover:border-zinc-350 dark:bg-zinc-900 dark:border-zinc-850 dark:hover:bg-zinc-850/60 dark:hover:border-zinc-800"
              }`}
            >
              {/* Left side info */}
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Visual badge indicator based on type */}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-3xs font-extrabold capitalize select-none ${
                    block.type === "hero"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
                      : block.type === "features"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                      : block.type === "testimonials"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400"
                  }`}
                >
                  {block.type.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white capitalize truncate">
                    {block.type} Section
                  </span>
                  <span className="text-3xs text-zinc-400 dark:text-zinc-500 font-mono truncate">
                    {block.id.substring(0, 8)}
                  </span>
                </div>
              </div>

              {/* Right side quick actions (shows on hover, and always shows for selected) */}
              <div
                className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${
                  isSelected ? "opacity-100" : ""
                }`}
                onClick={(e) => e.stopPropagation()} // Prevent selectBlock on action click
              >
                {/* Reorder Buttons */}
                <button
                  type="button"
                  disabled={isFirst}
                  onClick={() => reorderBlock(block.id, "up")}
                  className={`p-1.5 rounded-lg transition ${
                    isFirst
                      ? "text-zinc-300 dark:text-zinc-800 cursor-not-allowed"
                      : "text-zinc-500 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-white"
                  }`}
                  title="Move Up"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => reorderBlock(block.id, "down")}
                  className={`p-1.5 rounded-lg transition ${
                    isLast
                      ? "text-zinc-300 dark:text-zinc-800 cursor-not-allowed"
                      : "text-zinc-500 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-white"
                  }`}
                  title="Move Down"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Duplicate Button */}
                <button
                  type="button"
                  onClick={() => duplicateBlock(block.id)}
                  className="p-1.5 text-zinc-500 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-white rounded-lg transition"
                  title="Duplicate Block"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 rounded-lg transition"
                  title="Remove Block"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
