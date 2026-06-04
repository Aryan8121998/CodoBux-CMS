"use client";

import React, { useState } from "react";
import { CMSProvider, useCMS } from "@/context/CMSContext";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { PRESET_TEMPLATES } from "@/lib/templates";

// Inner Page Component to use the useCMS hook
const CMSWorkspace: React.FC = () => {
  const {
    canUndo,
    canRedo,
    undo,
    redo,
    exportJSON,
    importJSON,
    loadTemplate,
    resetCMS,
    isHydrated
  } = useCMS();

  // Modal states
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);

  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mobile active tab view state
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    const root = document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const handleExport = () => {
    const data = exportJSON();

    // Trigger file download
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `landing-page-blocks-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Also open modal to copy
    setImportText(data);
    setShowExportModal(true);
  };

  const handleCopyExportText = () => {
    navigator.clipboard.writeText(exportJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = () => {
    setImportError(null);
    if (!importText.trim()) {
      setImportError("Please paste some JSON or upload a file first.");
      return;
    }
    const result = importJSON(importText);
    if (result.success) {
      setShowImportModal(false);
      setImportText("");
      setImportError(null);
    } else {
      setImportError(result.error || "Failed to parse configuration.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setImportText(text);
    };
    reader.readAsText(file);
  };

  if (!isHydrated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-white min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wider text-zinc-400 select-none">
            Initializing CMS Studio...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col flex-1 min-h-screen ${theme === "dark" ? "dark bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"}`}>

      {/* Top Toolbar Header */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-40 select-none">

        {/* Logo and Brand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-650 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/10">
            CB
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-white leading-none">
              Codobux CMS
            </h1>
            <span className="text-4xs text-zinc-450 dark:text-zinc-500 uppercase tracking-widest font-bold">
              Landing Page Studio
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* History Undo / Redo */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200/40 dark:border-zinc-700/30">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1.5 rounded-md transition-all ${canUndo
                ? "text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-700 shadow-sm"
                : "text-zinc-350 dark:text-zinc-600 cursor-not-allowed opacity-50"
                }`}
              title="Undo (Ctrl+Z)"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1.5 rounded-md transition-all ${canRedo
                ? "text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-700 shadow-sm"
                : "text-zinc-350 dark:text-zinc-600 cursor-not-allowed opacity-50"
                }`}
              title="Redo (Ctrl+Y)"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z" />
              </svg>
            </button>
          </div>

          {/* Preset Templates Selector */}
          <div className="hidden lg:flex items-center gap-1">
            <span className="text-2xs text-zinc-400 dark:text-zinc-500 font-semibold hidden md:inline select-none">
              Template:
            </span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  loadTemplate(e.target.value);
                  e.target.value = ""; // reset dropdown
                }
              }}
              defaultValue=""
              className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 px-2.5 py-1.5 rounded-lg text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="" disabled>Load Preset...</option>
              {Object.keys(PRESET_TEMPLATES).map((key) => (
                <option key={key} value={key}>
                  {PRESET_TEMPLATES[key].name}
                </option>
              ))}
            </select>
          </div>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

          {/* Import / Export / Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setImportError(null);
                setImportText("");
                setShowImportModal(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-zinc-750 dark:text-zinc-250 border border-zinc-200 dark:border-zinc-750 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition"
              title="Import config from JSON"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="hidden md:inline">Import</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm"
              title="Export configuration as JSON file"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden md:inline">Export</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your layout? This will reset all blocks.")) {
                  resetCMS();
                }
              }}
              className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg transition"
              title="Reset Editor"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white rounded-lg transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Toggle color theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 relative">
        {/* Editor Settings (Left Column) */}
        <div className={`lg:flex flex-shrink-0 ${mobileTab === "editor" ? "flex flex-col flex-1 h-full" : "hidden"}`}>
          <EditorPanel />
        </div>

        {/* Live Preview Screen (Right Column) */}
        <div className={`lg:flex flex-1 ${mobileTab === "preview" ? "flex flex-col flex-1 h-full" : "hidden"}`}>
          <PreviewPanel />
        </div>
      </main>

      {/* Mobile Tab Toggle Navigation */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-1.5 rounded-full shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-1">
        <button
          onClick={() => setMobileTab("editor")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${mobileTab === "editor"
            ? "bg-indigo-650 text-white shadow-sm"
            : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-200"
            }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Build Layout
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${mobileTab === "preview"
            ? "bg-indigo-650 text-white shadow-sm"
            : "text-zinc-550 dark:text-zinc-400 hover:text-zinc-850 dark:hover:text-zinc-200"
            }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Live Preview
        </button>
      </div>

      {/* IMPORT JSON MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-scale-up">
            <div className="px-6 py-4 border-b border-zinc-150 dark:border-zinc-850 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                Import Layout JSON
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {importError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-250 dark:border-red-900/50 text-red-650 dark:text-red-400 text-xs font-semibold rounded-xl">
                  {importError}
                </div>
              )}

              {/* Upload File Input */}
              <div className="space-y-1.5">
                <label className="text-2xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Option A: Upload Config File (.json)
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-zinc-500 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-zinc-155 file:dark:bg-zinc-800 file:text-zinc-805 file:dark:text-zinc-200 file:cursor-pointer hover:file:opacity-90 transition"
                />
              </div>

              <div className="flex items-center justify-center py-1">
                <span className="text-3xs font-extrabold text-zinc-400 dark:text-zinc-600 uppercase select-none">
                  — OR —
                </span>
              </div>

              {/* Paste Text Area */}
              <div className="space-y-1.5">
                <label className="text-2xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Option B: Paste Layout JSON Configuration
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full h-44 text-xs font-mono p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-xl text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder='[\n  {\n    "id": "hero-example",\n    "type": "hero",\n    "content": {\n      "title": "My Landing Page"\n    }\n  }\n]'
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-xs font-bold text-zinc-550 hover:text-zinc-850 dark:hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-5 py-2 text-xs font-bold bg-indigo-650 hover:bg-indigo-750 text-white rounded-lg transition"
              >
                Apply Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT DATA POPUP MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-scale-up">
            <div className="px-6 py-4 border-b border-zinc-150 dark:border-zinc-850 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                Export Layout Config
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Your layout has been downloaded as a JSON file. You can also copy the configuration code directly below to save or transfer manually.
              </p>

              <div className="relative">
                <textarea
                  readOnly
                  value={importText}
                  className="w-full h-44 text-xs font-mono p-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-xl text-zinc-500 dark:text-zinc-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyExportText}
                  className="absolute top-2.5 right-2.5 px-3 py-1.5 text-3xs font-extrabold bg-zinc-250 dark:bg-zinc-800 hover:bg-indigo-650 hover:text-white rounded transition shadow-sm uppercase tracking-wider"
                >
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-5 py-2 text-xs font-bold bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 rounded-lg transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default function Home() {
  return (
    <CMSProvider>
      <CMSWorkspace />
    </CMSProvider>
  );
}
