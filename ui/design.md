---
name: Ludo Foreplay Night Design System
colors:
  surface: '#04122e'
  surface-dim: '#04122e'
  surface-bright: '#2c3956'
  surface-container-lowest: '#010d29'
  surface-container-low: '#0d1b36'
  surface-container: '#121f3b'
  surface-container-high: '#1d2946'
  surface-container-highest: '#283451'
  on-surface: '#d9e2ff'
  on-surface-variant: '#e1bec3'
  inverse-surface: '#d9e2ff'
  inverse-on-surface: '#23304d'
  outline: '#a9898d'
  outline-variant: '#5a4044'
  surface-tint: '#ffb2bf'
  primary: '#ffb2bf'
  on-primary: '#660027'
  primary-container: '#ff4d80'
  on-primary-container: '#5a0022'
  inverse-primary: '#b90e4f'
  secondary: '#edc157'
  on-secondary: '#3f2e00'
  secondary-container: '#906d00'
  on-secondary-container: '#fff7ee'
  tertiary: '#edb8c8'
  on-tertiary: '#482632'
  tertiary-container: '#b38493'
  on-tertiary-container: '#411f2c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2bf'
  on-primary-fixed: '#3f0016'
  on-primary-fixed-variant: '#90003b'
  secondary-fixed: '#ffdf9b'
  secondary-fixed-dim: '#edc157'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#ffd9e3'
  tertiary-fixed-dim: '#edb8c8'
  on-tertiary-fixed: '#30111d'
  on-tertiary-fixed-variant: '#623b49'
  background: '#04122e'
  on-background: '#d9e2ff'
  surface-variant: '#283451'
  jazz-magenta: '#FF4D80'
  deep-blue: '#14213D'
  foreplay-gold: '#FFD166'
  soft-pink: '#FEC8D8'
  night-black: '#24242A'
  danger-red: '#E63946'
  snow-white: '#FAFAFA'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    letterSpacing: 0.05em
  action-text:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  safe-area: 20px
---

# Design System — Ludo Night (18+ Edition)

_Desain ini terinspirasi dan terstruktur mengikuti arsitektur repo asli:_
- UI halaman = `/src/pages`
- Komponen modular = `/src/components`
- Komponen gameplay = `/src/pages/Play/components`
- State & logika = `/src/state`, `/src/game`

---

## 1. Page Structure & Routes

| Halaman        | Komponen Utama               | Route         | Deskripsi                                |
|----------------|------------------------------|---------------|------------------------------------------|
| Home           | HomePage                     | `/`           | Welcome, mode & player selection, intro  |
| Player Setup   | PlayerSetup                  | `/setup`      | Pilih token, atur reward & musik         |
| Gameplay       | Play, Board, Dice, Token     | `/play`       | Papan ludo, roll dadu, aksi foreplay     |
| How to Play    | HowToPlay                    | `/how-to-play`| Panduan aturan dan tips permainan        |
| Ending         | GameFinishedScreen           | (modal in `/play`) | Pemenang, reward, tombol play music |
| NotFound       | NotFound                     | `*`           | Fallback 404                             |

> Semua halaman diatur via `src/pages` dan router di `src/router.tsx`.

---

## 2. Color System

| Name           | Code        | Use                     |
|----------------|-------------|-------------------------|
| Jazz Magenta   | #FF4D80     | Accent, tombol aksi     |
| Deep Blue      | #14213D     | Background utama        |
| Foreplay Gold  | #FFD166     | Highlight, tiles spesial|
| Soft Pink      | #FEC8D8     | Modal, success          |
| Night Black    | #24242A     | Panel, section, token   |
| Danger Red     | #E63946     | Skip/alert/safe word    |
| Snow White     | #FAFAFA     | Card, readable surface  |

---

## 3. Typography

- **Logo/Heading:** Pacifico, Quicksand, atau sejenisnya
- **Subheading:** Montserrat Bold
- **Konten/Badan:** Inter, Open Sans
- **Action/Truth/Dare:** High-emphasis, italic, magenta gradient

---

## 4. Component Primitives

### Global/Reusable (`/src/components`)
- `<LoadingScreen />` : efek saat inisialisasi
- `<Note />` : catatan/peringatan konsen atau mode
- `<PWAUpdater />` : jika build PWA

### Halaman Utama (`/src/pages/HomePage`)
- Logo + Judul game + badge 18+
- Welcome text dan tagline
- Mode selection: (“Romantic”, “Fun”, “Naughty”)
- Button: Play Now
- Link: How To Play
- Player/Token Picker: 2–4 avatar/aset emoji/token
- Input Reward: preset + custom
- Musik: pilih playlist (opsional pilih dari daftar tema/lampiran link Spotify)
- Consent Checkbox: “Saya & partner siap bermain mode 18+ dengan saling respect.”
- Footer: License & Credit

### Halaman Setup (`/src/pages/PlayerSetup`)
- Komponen PlayerInput: input nama/avatar/token
- Custom grand reward/preset pilihan
- Music preview dan volume control
- Mulai game button

### Gameplay (`/src/pages/Play`)
- Board: `<Board />` (modifikasi dari versi asli)
- Token: `<Token />`
- Dice: `<Dice />` (“Roll!” tombol + auto/manual switch)
- Action Popover/modal: Truth/Dare/Foreplay/Skip prompt (custom berdasarkan mode)
- Game controls: finish now, quit game, play music
- Player status: giliran siapa, jumlah skip tersisa, history last 3 aksi

### Ending Modal (`/src/pages/Play/components/GameFinishedScreen`)
- Winner avatar/name
- Display: grand reward/ending scene
- Musik tombol: play atau suggest (end night)
- Replay/Back to Home

---

## 5. Theming By Mode

- **Romantic:** pink soft, lampu temaram, floral bg, efek blur
- **Fun:** lively yellow-gold, confetti, ikon ekspresif
- **Naughty:** magenta & gold neon, dark panel, efek pulse/vibrate

Mode dipilih di HomePage, diteruskan ke ThemeProvider (context/Redux), dan dipakai seluruh child page.

---

## 6. Action Types (Truth/Dare/Foreplay)

- Truth: pertanyaan personal (“Apa fantasi terliarmu…”)
- Dare: aksi fisik/lisan (“Peluk pasangan selama 30 detik!”)
- Foreplay: aksi explicit (default & custom; “Pilih posisi dan lakukan 2 menit!”)
- Semua list actions diacak, dengan pengelompokan by mode dan boleh editable/expansible (optional).

---

## 7. Musik & Consent Integration

- Halaman awal: consent switch wajib untuk play
- Musik: after finish, muncul tombol “play mood music” (atau playlist gratis non-copyright/Spotify/YouTube link)
- Safety/Safe word: tombol “end night”/“stop now” (visible di semua fase game)

---

## 8. State Structure & File Mapping

- game logic: `src/game/` → logika Ludo (modifikasi untuk rule foreplay)
- player & token: `src/game/players/`, `src/game/tokens/`
- redux state: `src/state/boardSlice`, `src/state/playersSlice`, dst
- action modal: component baru/mix ke `src/pages/Play/components/Game/` atau `Board/`
- finish modal: extend dari `GameFinishedScreen`

---

## 9. Example UX Flow (Visual)

```
[HomePage]
  ↓ play
[PlayerSetup]
  ↓ next
[Play/Board]
  → (landing on special tile → Action Modal)
  → (Button: Finish Now) 
  → (Button: Quit)
  → history moves/status
  ↓ finish
[GameFinishedScreen]
  → Display reward
  → Play music/exit/replay
```

---

## 10. Aksesibilitas & Safety UX

- Modal consent di awal
- Safe word (end instantly) di area visible
- Button besar, readable, kontras
- Dark mode default dengan accent mode sesuai mood

---

## 11. Komponen Baru (Proposal untuk custom game ini)

- `<ForeplayActionModal mode={romantic|fun|naughty} />`
- `<MusicChooser />`
- `<ConsentModal />`
- `<SkipCounter />`
- `<PlayModeBadge />`

---

## 12. Organization Mapping

```
src/
  assets/
  components/
    LoadingScreen/
    Note/
    PWAUpdater/
    ...
  pages/
    HomePage/
    PlayerSetup/
    Play/
      components/
        Board/
        Game/
        Dice/
        Token/
        ForeplayActionModal/   # komponen baru
        GameFinishedScreen/
    HowToPlay/
    NotFound/
    ErrorBoundary/
  state/
    slices/           # Redux
    thunks/
    store.ts
  game/
    bot/
    coords/
    players/
    tokens/
  hooks/
  types/
  utils/
```

---

> Sistem desain ini langsung kompatibel dengan _file tree_ dan arsitektur logika libreludo; kamu bisa fokus di folder Play/ dan komponen terkait game logic, tanpa mengacak-ngacak arsitektur utama.


---
