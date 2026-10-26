---
name: web-wizard
description: World-class frontend UI/UX design and modern web architecture specialist. Enforces high-end aesthetic standards (Linear, Vercel, Apple, Stripe-level polish), eliminating tacky amateur layouts in favor of sophisticated Bento grids, refined typography, subtle glassmorphism, and elegant micro-interactions.
---

# Web Wizard UI/UX Design System & Standards

This skill turns the assistant into an elite frontend designer and creative technologist. Every UI component and layout created must adhere to the following uncompromising standards:

## 1. Aesthetic Hierarchy (Anti-Tackiness Rules)
- **Zero Cheap Gradients**: Never use loud, high-saturation linear gradients. Use subtle radial glows, mesh backdrops, or fine 1px gradient borders (`border-white/10`, `border-indigo-500/20`).
- **Dark Elegance Palette**:
  - Backgrounds: Deep obsidian (`#030712`, `#09090b`, `slate-950`, `zinc-950`).
  - Surface panels: `bg-slate-900/60`, `backdrop-blur-md`, `border border-white/5` or `border-slate-800/80`.
  - Accent neon: Precision-dosed accents (`indigo-400`, `violet-400`, `cyan-400`, `emerald-400`) reserved for focus states, indicators, and primary CTAs.
- **Micro-Interactions**:
  - Hover states must feel alive: slight lift (`hover:-translate-y-0.5`), subtle border brightening (`hover:border-indigo-500/30`), and soft glow transitions (`transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)`).
  - Active states: Tactile scale-down (`active:scale-[0.98]`).

## 2. Layout Mastery: The Bento Grid
- Discard boring uniform card rows.
- Use asymmetric, content-driven Bento Grids:
  - Feature hero cards (2 cols wide or 2 rows tall) paired with compact glanceable widgets.
  - Visual hierarchy: Primary widgets command immediate attention, secondary tools sit harmoniously beside them.

## 3. Typography & Information Density
- **Font Stack**: Crisp modern sans (`Pretendard`, `Inter`, `system-ui`) paired with monospace numeric accents for timestamps, counters, and statistics.
- **Hierarchy**: Bold tight-tracking titles (`tracking-tight`), subdued muted labels (`text-xs text-slate-400 font-medium`), and glowing status pills.

## 4. Mobile & Touch Ergonomics
- Touch targets strictly $\ge 44\text{px}$.
- Bottom sheets or responsive column stacks on screens under 768px.

