"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CMSBlock } from "@/lib/types";
import { PRESET_TEMPLATES } from "@/lib/templates";
import { validateCMSBlocks } from "@/lib/validation";

// Helper to generate IDs safely
const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export interface CMSContextType {
  blocks: CMSBlock[];
  selectedBlockId: string | null;
  canUndo: boolean;
  canRedo: boolean;
  addBlock: (type: CMSBlock["type"]) => void;
  updateBlock: (id: string, content: any) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  reorderBlock: (id: string, direction: "up" | "down") => void;
  selectBlock: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  importJSON: (jsonString: string) => { success: boolean; error?: string };
  exportJSON: () => string;
  loadTemplate: (templateName: string) => void;
  resetCMS: () => void;
  isHydrated: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "codobux-cms-blocks";

const DEFAULT_BLOCKS: CMSBlock[] = PRESET_TEMPLATES.saas.blocks;

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blocks, setBlocks] = useState<CMSBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // History stacks
  const [past, setPast] = useState<CMSBlock[][]>([]);
  const [future, setFuture] = useState<CMSBlock[][]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Initial Hydration from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const validation = validateCMSBlocks(saved);
        if (validation.isValid && validation.data) {
          setBlocks(validation.data);
          if (validation.data.length > 0) {
            setSelectedBlockId(validation.data[0].id);
          }
        } else {
          setBlocks(DEFAULT_BLOCKS);
          if (DEFAULT_BLOCKS.length > 0) {
            setSelectedBlockId(DEFAULT_BLOCKS[0].id);
          }
        }
      } else {
        setBlocks(DEFAULT_BLOCKS);
        if (DEFAULT_BLOCKS.length > 0) {
          setSelectedBlockId(DEFAULT_BLOCKS[0].id);
        }
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
      setBlocks(DEFAULT_BLOCKS);
    }
    setIsHydrated(true);
  }, []);

  // 2. Persist state helper
  const saveState = (newBlocks: CMSBlock[]) => {
    setBlocks(newBlocks);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBlocks));
    } catch (e) {
      console.error("Error writing to localStorage", e);
    }
  };

  // 3. Command helper to support Undo/Redo
  const updateStateWithHistory = (newBlocks: CMSBlock[]) => {
    setPast((prev) => [...prev, blocks]);
    setFuture([]); // Clear redo stack on new operation
    saveState(newBlocks);
  };

  // 4. Undo / Redo Actions
  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const remainingPast = past.slice(0, past.length - 1);

    setPast(remainingPast);
    setFuture((prev) => [blocks, ...prev]);
    saveState(previous);

    // Keep selectedBlockId valid
    if (selectedBlockId && !previous.some((b) => b.id === selectedBlockId)) {
      setSelectedBlockId(previous.length > 0 ? previous[0].id : null);
    }
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const remainingFuture = future.slice(1);

    setPast((prev) => [...prev, blocks]);
    setFuture(remainingFuture);
    saveState(next);

    // Keep selectedBlockId valid
    if (selectedBlockId && !next.some((b) => b.id === selectedBlockId)) {
      setSelectedBlockId(next.length > 0 ? next[0].id : null);
    }
  };

  // 5. Block Operations
  const addBlock = (type: CMSBlock["type"]) => {
    let newContent: any = {};
    if (type === "hero") {
      newContent = {
        title: "Double click to edit title",
        subtitle: "Add a compelling description about your core value proposition here.",
        buttonText: "Get Started Now",
        buttonLink: "#",
        bgGradient: "from-indigo-600 to-violet-800"
      };
    } else if (type === "features") {
      newContent = {
        sectionTitle: "High-impact features",
        features: [
          { title: "Instant Live Preview", description: "Edit blocks on the left and see changes live on the right." },
          { title: "Undo/Redo History", description: "Easily revert mistakes or redo design steps." }
        ]
      };
    } else if (type === "testimonials") {
      newContent = {
        sectionTitle: "What our users say",
        quote: "This page builder allows me to publish stunning landing pages in just a few clicks.",
        authorName: "John Doe",
        authorRole: "Head of Marketing"
      };
    } else if (type === "cta") {
      newContent = {
        heading: "Boost your conversions today!",
        buttonText: "Unlock Premium Access",
        buttonLink: "#",
        bgGradient: "from-zinc-900 to-black"
      };
    }

    const newBlock: CMSBlock = {
      id: generateId(),
      type,
      content: newContent
    };

    const nextBlocks = [...blocks, newBlock];
    updateStateWithHistory(nextBlocks);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (id: string, newContent: any) => {
    const nextBlocks = blocks.map((block) => {
      if (block.id === id) {
        return {
          ...block,
          content: { ...block.content, ...newContent }
        };
      }
      return block;
    });
    updateStateWithHistory(nextBlocks);
  };

  const removeBlock = (id: string) => {
    const nextBlocks = blocks.filter((block) => block.id !== id);
    updateStateWithHistory(nextBlocks);
    if (selectedBlockId === id) {
      setSelectedBlockId(nextBlocks.length > 0 ? nextBlocks[0].id : null);
    }
  };

  const duplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find((block) => block.id === id);
    if (!blockToDuplicate) return;

    const duplicated: CMSBlock = {
      id: generateId(),
      type: blockToDuplicate.type,
      content: JSON.parse(JSON.stringify(blockToDuplicate.content))
    };

    // Insert right after the duplicated block
    const index = blocks.findIndex((block) => block.id === id);
    const nextBlocks = [...blocks];
    nextBlocks.splice(index + 1, 0, duplicated);

    updateStateWithHistory(nextBlocks);
    setSelectedBlockId(duplicated.id);
  };

  const reorderBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === blocks.length - 1) return;

    const nextBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    // Swap
    const temp = nextBlocks[index];
    nextBlocks[index] = nextBlocks[targetIndex];
    nextBlocks[targetIndex] = temp;

    updateStateWithHistory(nextBlocks);
  };

  const selectBlock = (id: string | null) => {
    setSelectedBlockId(id);
  };

  const loadTemplate = (templateName: string) => {
    const template = PRESET_TEMPLATES[templateName];
    if (!template) return;

    // Generate fresh IDs for all template blocks to avoid duplication issues
    const freshBlocks = template.blocks.map((block) => ({
      ...block,
      id: generateId(),
      content: JSON.parse(JSON.stringify(block.content))
    }));

    updateStateWithHistory(freshBlocks);
    if (freshBlocks.length > 0) {
      setSelectedBlockId(freshBlocks[0].id);
    }
  };

  const resetCMS = () => {
    updateStateWithHistory([]);
    setSelectedBlockId(null);
  };

  const exportJSON = () => {
    return JSON.stringify(blocks, null, 2);
  };

  const importJSON = (jsonString: string) => {
    const validation = validateCMSBlocks(jsonString);
    if (validation.isValid && validation.data) {
      updateStateWithHistory(validation.data);
      if (validation.data.length > 0) {
        setSelectedBlockId(validation.data[0].id);
      }
      return { success: true };
    }
    return { success: false, error: validation.error };
  };

  return (
    <CMSContext.Provider
      value={{
        blocks,
        selectedBlockId,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
        addBlock,
        updateBlock,
        removeBlock,
        duplicateBlock,
        reorderBlock,
        selectBlock,
        undo,
        redo,
        importJSON,
        exportJSON,
        loadTemplate,
        resetCMS,
        isHydrated
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
