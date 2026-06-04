# AI Workflow Overview

## AI Tools Used
- **Antigravity IDE** – primary coding assistant for implementation, UI tweaks, and refactoring.
- **Gemini 3.5** – used for generating component code, Tailwind styling, and documentation drafts.
- **Claude** (briefly) – consulted to understand project scope and suggest architectural approaches.

## Important AI Chats / Prompts
- *Prompt:* "Create a small CMS‑like Next.js application where users can create and manage a landing page using reusable content blocks. The app should allow users to dynamically add, edit, reorder, and manage content sections while showing live preview updates instantly. Required block types: Hero, Features, Testimonials, CTA."
- *Prompt:* "Design a clean, maintainable editor layout with a left panel for block settings and a right panel for live preview. Emphasize responsive design, consistent spacing, and usability without excessive animations."
- *Prompt:* "Use Context API for state management, including undo/redo history and localStorage persistence."
- *Outcome:* Generated `CMSContext`, block type definitions, editor/preview components, and initial Tailwind theme.

## UI Layout Recommendation
- **Left Panel → Editor / Block Settings**
- **Right Panel → Live Preview**
- Focus on clean hierarchy, maintainable components, responsive breakpoints, and minimal visual complexity.

## Required Block Types
| Block | Editable Fields |
|------|-----------------|
| **Hero** | Title, Subtitle, Button Text, Button Link, Background Gradient |
| **Features** | Section Title, Feature Cards (Title & Description) |
| **Testimonials** | Quote, Author Name |
| **CTA** | Heading, Button Text, Button Link, Background Gradient |

## State Management (Context API)
- Centralized state in `context/CMSContext.tsx`.
- Provides actions: `addBlock`, `updateBlock`, `removeBlock`, `duplicateBlock`, `reorderBlock`, `importJSON`, `exportJSON`, `undo`, `redo`.
- Persists `blocks` to `localStorage` and restores on app load.

*This workflow was crafted with the assistance of the AI tools listed above.*
