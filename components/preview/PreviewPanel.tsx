"use client";

import React, { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { HeroPreview } from "./blocks/HeroPreview";
import { FeaturesPreview } from "./blocks/FeaturesPreview";
import { TestimonialsPreview } from "./blocks/TestimonialsPreview";
import { CtaPreview } from "./blocks/CtaPreview";

export const PreviewPanel: React.FC = () => {
  const { blocks, selectedBlockId, selectBlock } = useCMS();
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const renderBlock = (block: any) => {
    switch (block.type) {
      case "hero":
        return <HeroPreview content={block.content} />;
      case "features":
        return <FeaturesPreview content={block.content} />;
      case "testimonials":
        return <TestimonialsPreview content={block.content} />;
      case "cta":
        return <CtaPreview content={block.content} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-100 dark:bg-zinc-950/60 overflow-hidden h-full border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800">
      {/* Device Viewport Selector Bar */}
      <div className="h-14 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium ml-2 select-none">
            Live Landing Page Preview
          </span>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center bg-zinc-150 dark:bg-zinc-800 p-0.5 rounded-lg text-sm">
          <button
            onClick={() => setDevice("desktop")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${device === "desktop"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-250"
              }`}
            title="Desktop view"
          >
            {/* Desktop SVG icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => setDevice("tablet")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${device === "tablet"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-250"
              }`}
            title="Tablet view"
          >
            {/* Tablet SVG icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>

        </div>

        {/* Empty space/spacer */}
        <div className="w-32 hidden sm:block"></div>
      </div>

      {/* Simulated Device Frame Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-start lg:justify-center items-start scrollbar-thin">
        <div
          className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden transition-all duration-300 ${device === "desktop"
              ? "w-full max-w-5xl"
              : device === "tablet"
                ? "w-[768px]"
                : "w-[375px]"
            }`}
        >
          {blocks.length === 0 ? (
            <div className="py-32 px-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-zinc-900">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-850 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                Your page is empty
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs leading-relaxed">
                Add content sections from the Editor panel on the left to start building your landing page.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {blocks.map((block) => {
                const isSelected = block.id === selectedBlockId;
                return (
                  <div
                    key={block.id}
                    onClick={() => selectBlock(block.id)}
                    className={`relative cursor-pointer transition-all duration-200 group ${isSelected
                        ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-900 z-20"
                        : "hover:ring-2 hover:ring-zinc-300 dark:hover:ring-zinc-800 hover:ring-offset-1 dark:hover:ring-offset-zinc-900 z-10"
                      }`}
                  >
                    {/* Outline indicator tag */}
                    {isSelected && (
                      <span className="absolute top-2 left-2 px-3 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-md shadow-md pointer-events-none select-none z-30 animate-fade-in uppercase">
                        Editing: {block.type}
                      </span>
                    )}

                    {renderBlock(block)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
