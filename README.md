<p align="center">
  <!-- TODO: Replace with new logo -->
  <img src="https://libreludo.org/icons/favicon.png" alt="Ludo Foreplay Night Logo" width="120" />
</p>

<h1 align="center">🎲 Ludo Foreplay Night</h1>

<p align="center">
  A spicy twist on the classic Ludo game. Designed for couples to connect, laugh, and explore through Truth or Dare mechanics tied directly to the gameplay.
</p>

---

## ✨ Current Features (The "Vibe" Update)

- 🎮 **2 Player Intimate Matches** – Built specifically for couples.
- 🔥 **Vibe Modes** – Choose your mood: **Romantic**, **Fun**, or **Naughty**. The game dynamically changes challenges based on the selected vibe.
- 🃏 **Integrated Truth or Dare** – Landing on special tiles triggers Truth or Dare cards tailored to your chosen Vibe and current "Heat Level".
- ⚧ **Linked Gender Selection** – Seamless player setup with linked male/female selection.
- ⚡ **No Bots** – Pure human-to-human connection.
- 📱 **Responsive & PWA Ready** – Play smoothly on your phone browser.

---

## 🗺️ Roadmap & TODOs (Upcoming Features)

We are actively developing the game to be more versatile and visually dynamic. Here is the upcoming roadmap:

### 1. Fundamental Logic & Modes
- [ ] **Implement "Classic / Normal" Mode:** Add an option to play standard Ludo without Truth/Dare mechanics.
- [ ] **Unlock 4-Player Support:** Re-enable 2-4 player selection (primarily for Classic Mode).
- [ ] **Toggle Special Tiles:** Ensure challenge tiles are disabled when Classic Mode is selected.

### 2. Visuals & Theming
- [ ] **Vibe-Based Theming:** Dynamically change CSS variables (backgrounds, accents) based on the selected Vibe (e.g., darker/neon for Naughty, bright for Fun).
- [ ] **Dynamic Board Styling:** Adjust the colors of the Ludo board to match the active theme.
- [ ] **SVG Gender Icons:** Replace text labels ('Male', 'Female') in the Setup screen with high-quality SVG icons.

### 3. Content & Onboarding
- [ ] **Revamp Landing Page:** Update `HomePage.tsx` to better market both the "Spicy" and "Classic" aspects of the game.
- [ ] **Update "How to Play":** Clearly separate the rules for standard Ludo movement from the Meta-Game (Truth/Dare mechanics).
- [ ] **Interactive Previews:** Add subtle visual cues on the landing page when switching between modes.

### 4. Extra Polish
- [ ] **Custom Rewards Screen:** Enhance the victory screen to better highlight the pre-agreed "Reward".
- [ ] **"Hot Seat" Progression:** Fine-tune how the "Heat Level" increases as the game progresses.

---

## ⚙️ Tech Stack

- **React 19** + **Vite**
- **Redux Toolkit** for state management
- **TypeScript**
- **Vanilla CSS Modules** (No Tailwind)

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```