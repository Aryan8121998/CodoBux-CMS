"use client";

import React from "react";
import { useCMS } from "@/context/CMSContext";

const GRADIENTS = [
  { name: "Indigo Violet", value: "from-indigo-600 to-violet-850" },
  { name: "Emerald Teal", value: "from-emerald-500 to-teal-700" },
  { name: "Sunset Gold", value: "from-orange-500 via-rose-500 to-red-650" },
  { name: "Nordic Frost", value: "from-cyan-500 to-blue-600" },
  { name: "Dark Charcoal", value: "from-zinc-900 via-slate-800 to-zinc-950" },
  { name: "Deep Ruby", value: "from-red-800 via-rose-900 to-zinc-950" }
];

export const BlockEditor: React.FC = () => {
  const { blocks, selectedBlockId, updateBlock } = useCMS();

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full">
        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <p className="text-zinc-500 dark:text-zinc-450 text-sm font-medium">
          Select a section on the canvas or from the block list to edit its content.
        </p>
      </div>
    );
  }

  const { type, content } = selectedBlock;

  const handleFieldChange = (key: string, value: any) => {
    updateBlock(selectedBlock.id, { [key]: value });
  };

  // Helper for updating features array
  const handleFeatureChange = (index: number, key: string, value: string) => {
    const updatedFeatures = [...(content.features || [])];
    updatedFeatures[index] = { ...updatedFeatures[index], [key]: value };
    handleFieldChange("features", updatedFeatures);
  };

  const addFeature = () => {
    const updatedFeatures = [
      ...(content.features || []),
      { title: "New Feature Title", description: "Brief description of this feature card." }
    ];
    handleFieldChange("features", updatedFeatures);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = (content.features || []).filter((_: any, i: number) => i !== index);
    handleFieldChange("features", updatedFeatures);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 text-2xs font-extrabold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">
            {type}
          </span>
          <span className="text-3xs text-zinc-400 font-mono select-none">
            ID: {selectedBlock.id.substring(0, 8)}...
          </span>
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          Configure Block Content
        </h3>
      </div>

      <div className="border-t border-zinc-150 dark:border-zinc-850 pt-4 space-y-5">
        {/* HERO BLOCK EDITOR */}
        {type === "hero" && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Heading Title
              </label>
              <textarea
                value={content.title || ""}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                rows={3}
                placeholder="Enter hero main heading"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Subheading Description
              </label>
              <textarea
                value={content.subtitle || ""}
                onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                rows={3}
                placeholder="Enter hero short explanation"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Button Label
                </label>
                <input
                  type="text"
                  value={content.buttonText || ""}
                  onChange={(e) => handleFieldChange("buttonText", e.target.value)}
                  className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g. Sign Up"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Button Action URL
                </label>
                <input
                  type="text"
                  value={content.buttonLink || ""}
                  onChange={(e) => handleFieldChange("buttonLink", e.target.value)}
                  className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g. #pricing"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Background Theme Gradient
              </label>
              <div className="grid grid-cols-3 gap-2">
                {GRADIENTS.map((grad) => (
                  <button
                    key={grad.value}
                    onClick={() => handleFieldChange("bgGradient", grad.value)}
                    className={`h-10 rounded-lg bg-gradient-to-br ${
                      grad.value
                    } border-2 ${
                      content.bgGradient === grad.value
                        ? "border-black dark:border-white ring-2 ring-indigo-500/30 scale-102"
                        : "border-transparent hover:scale-102"
                    } transition-all duration-200 text-[10px] text-white font-bold flex items-center justify-center shadow-sm overflow-hidden`}
                    title={grad.name}
                  >
                    <span className="bg-black/25 px-1.5 py-0.5 rounded text-4xs">
                      {grad.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* FEATURES BLOCK EDITOR */}
        {type === "features" && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Section Main Title
              </label>
              <input
                type="text"
                value={content.sectionTitle || ""}
                onChange={(e) => handleFieldChange("sectionTitle", e.target.value)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                placeholder="e.g. Why Choose Us"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Feature Cards ({content.features?.length || 0})
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-750 flex items-center gap-1 transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Card
                </button>
              </div>

              <div className="space-y-4">
                {(content.features || []).map((feature: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 rounded-xl space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-extrabold text-zinc-400 dark:text-zinc-550 select-none uppercase">
                        Card #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete Card"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={feature.title || ""}
                        onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                        className="w-full text-xs p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition font-medium"
                        placeholder="Feature Title"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <textarea
                        value={feature.description || ""}
                        onChange={(e) => handleFeatureChange(idx, "description", e.target.value)}
                        className="w-full text-xs p-2.5 border border-zinc-200 dark:border-zinc-850 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        rows={2}
                        placeholder="Feature Description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TESTIMONIALS BLOCK EDITOR */}
        {type === "testimonials" && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Section Heading
              </label>
              <input
                type="text"
                value={content.sectionTitle || ""}
                onChange={(e) => handleFieldChange("sectionTitle", e.target.value)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                placeholder="e.g. Client Feedback"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                The Quote Text
              </label>
              <textarea
                value={content.quote || ""}
                onChange={(e) => handleFieldChange("quote", e.target.value)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                rows={4}
                placeholder="Enter quotation context"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Author Name
                </label>
                <input
                  type="text"
                  value={content.authorName || ""}
                  onChange={(e) => handleFieldChange("authorName", e.target.value)}
                  className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Author Role / Organization
                </label>
                <input
                  type="text"
                  value={content.authorRole || ""}
                  onChange={(e) => handleFieldChange("authorRole", e.target.value)}
                  className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g. CEO at Stackly"
                />
              </div>
            </div>
          </>
        )}

        {/* CTA BLOCK EDITOR */}
        {type === "cta" && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                CTA Heading
              </label>
              <textarea
                value={content.heading || ""}
                onChange={(e) => handleFieldChange("heading", e.target.value)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                rows={3}
                placeholder="Enter conversion pitch heading"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Button Label
                </label>
                <input
                  type="text"
                  value={content.buttonText || ""}
                  onChange={(e) => handleFieldChange("buttonText", e.target.value)}
                  className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g. Try for Free"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Button Action URL
                </label>
                <input
                  type="text"
                  value={content.buttonLink || ""}
                  onChange={(e) => handleFieldChange("buttonLink", e.target.value)}
                  className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-850 rounded-xl bg-transparent dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                  placeholder="e.g. #contact"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Background Theme Gradient
              </label>
              <div className="grid grid-cols-3 gap-2">
                {GRADIENTS.map((grad) => (
                  <button
                    key={grad.value}
                    onClick={() => handleFieldChange("bgGradient", grad.value)}
                    className={`h-10 rounded-lg bg-gradient-to-br ${
                      grad.value
                    } border-2 ${
                      content.bgGradient === grad.value
                        ? "border-black dark:border-white ring-2 ring-indigo-500/30 scale-102"
                        : "border-transparent hover:scale-102"
                    } transition-all duration-200 text-[10px] text-white font-bold flex items-center justify-center shadow-sm overflow-hidden`}
                    title={grad.name}
                  >
                    <span className="bg-black/25 px-1.5 py-0.5 rounded text-4xs">
                      {grad.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
