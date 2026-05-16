# LibreLudo Asset Replacement TODO List

This document tracks all emojis that need to be replaced with high-quality SVG icons or custom themed assets to ensure a professional and cohesive visual style.

## Priority 1: Game Tokens & Icons
- [ ] **Fire Emoji (🔥)**: Replace with themed SVG fire icon.
  - Used in: `sessionSlice.ts`, `PlayerSetup.tsx`, `Game.tsx`, `landing.html`, `board.html`
- [ ] **Heart Emoji (💗 / 💖)**: Replace with themed SVG heart icon.
  - Used in: `PlayerSetup.tsx`, `landing.html`, `PlayerInput.tsx`
- [ ] **Dice Emoji (🎲)**: Replace with custom SVG dice icon.
  - Used in: `Navbar.tsx`, `HomePage.tsx`, `HowToPlay.tsx`, `NotFound.tsx`, `PlayerSetup.tsx`, `CaptureActionModal.tsx`
- [ ] **Mask Emoji (🎭)**: Replace with "Dare" themed SVG icon.
  - Used in: `ForeplayActionModal.tsx`, `board.html`, `card.html`, `flow.md`
- [ ] **Crystal Ball Emoji (🔮)**: Replace with "Truth" themed SVG icon.
  - Used in: `ForeplayActionModal.tsx`, `board.html`, `flow.md`
- [ ] **Heart on Fire (❤️‍🔥)**: Replace with "Foreplay" themed SVG icon.
  - Used in: `board.html`, `flow.md`, `PlayerInput.tsx`

## Priority 2: UI Elements & Feedback
- [ ] **Trophy (🏆)**: Replace with 3D Trophy or high-quality PNG.
  - Used in: `GameFinishedScreen.tsx`
- [ ] **Devil (😈)**: Replace with themed "Penalty" SVG icon.
  - Used in: `ForeplayActionModal.tsx`, `CaptureActionModal.tsx`
- [ ] **Target (🎯)**: Replace with SVG for "Getting Started".
  - Used in: `HowToPlay.tsx`
- [ ] **Thermometer (🌡️)**: Replace with SVG for "Intensity".
  - Used in: `HowToPlay.tsx`
- [ ] **Balance Scale (⚖️)**: Replace with SVG for "Penalty/Fair Play".
  - Used in: `HowToPlay.tsx`, `ForeplayActionModal.tsx`
- [ ] **Star (⭐)**: Replace with SVG for "Bonus".
  - Used in: `HowToPlay.tsx`, `Note.tsx`
- [ ] **Warning (⚠️)**: Replace with SVG for "Important Note".
  - Used in: `Note.tsx`

## Priority 3: Player Selection Tokens
- [ ] **Diamond (💎)**: Replace with SVG token.
  - Used in: `PlayerInput.tsx`, `sessionSlice.ts`
- [ ] **Sparkles (✨)**: Replace with SVG token.
  - Used in: `PlayerInput.tsx`
- [ ] **Lips (💋)**: Replace with SVG token.
  - Used in: `PlayerInput.tsx`, `board.html`
- [ ] **Cherries (🍒)**: Replace with SVG token.
  - Used in: `landing.html`
- [ ] **Champagne (🥂)**: Replace with SVG token.
  - Used in: `landing.html`
- [ ] **Rose (🌹)**: Replace with SVG token.
  - Used in: `landing.html`
- [ ] **Black Heart (🖤)**: Replace with SVG token.
  - Used in: `board.html`

## Locations to Update:
- **Components**: `Navbar`, `Note`, `CaptureActionModal`, `ForeplayActionModal`, `GameFinishedScreen`, `Game`, `PlayerInput`
- **Pages**: `HomePage`, `HowToPlay`, `NotFound`, `PlayerSetup`
- **State**: `sessionSlice`
- **Static Assets**: `ui/board.html`, `ui/card.html`, `ui/landing.html`, `README.md`, `ui/flow.md`
