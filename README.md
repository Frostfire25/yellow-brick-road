# 🌈 The Yellow Brick Road — Alexander Elguezabal's Portfolio

An immersive 3D portfolio website inspired by *The Wizard of Oz*. Walk down the Yellow Brick Road in first-person and explore my education, skills, experience, and projects through themed Oz landmarks.

**🔗 [Live Site](https://frostfire25.github.io/ResumePortfolio/)**

---

## ✨ Features

- **First-person 3D walkthrough** — WASD + mouse look navigation through a Wizard of Oz fantasy world
- **Auto-walk mode** — "Follow the Road" button for a guided tour along the path
- **6 themed zones** along a winding yellow brick road:

| Zone | Oz Inspiration | Content |
|------|----------------|---------|
| 🏠 Kansas Farmhouse | Dorothy's home | Landing — name, title, welcome |
| 🍄 Munchkinland | Colorful village | Education — Merrimack College |
| 🧠 Scarecrow's Crossroads | Scarecrow's field | Skills & Technologies |
| ⚙️ Tin Man's Workshop | Tin Man's forest | Professional Experience timeline |
| 🦁 Lion's Clearing | Enchanted forest | Featured Projects (interactive) |
| 🏰 The Emerald City | The destination | Contact links — GitHub, LinkedIn, Email |

- **Interactive elements** — Click experience pillars and project portal stones to see details
- **Professional 3D assets** — [Kenney Nature Kit](https://kenney.nl/assets/nature-kit) (CC0) models for trees, flowers, rocks, mushrooms, fences
- **Drei effects** — Realistic sky, volumetric clouds, sparkle particles, floating animations, reflective floors, starry backdrop
- **Post-processing** — Bloom and vignette effects
- **Responsive** — Mobile touch joystick support

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| 3D Engine | [React Three Fiber](https://r3f.docs.pmnd.rs/) + [Three.js](https://threejs.org/) |
| 3D Helpers | [@react-three/drei](https://drei.docs.pmnd.rs/) (Sky, Cloud, Sparkles, Float, Stars, Text, MeshReflectorMaterial) |
| Post-processing | [@react-three/postprocessing](https://github.com/pmndrs/postprocessing) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| 3D Assets | [Kenney Nature Kit](https://kenney.nl/assets/nature-kit) (CC0 license) |
| Deployment | GitHub Pages via [gh-pages](https://www.npmjs.com/package/gh-pages) |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Frostfire25/ResumePortfolio.git
cd ResumePortfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 📁 Project Structure

```
src/
├── App.tsx                 # Canvas + scene wrapper
├── main.tsx                # Entry point
├── index.css               # Tailwind + animations
├── store/
│   └── useStore.ts         # Zustand state (zone, navigation, modals)
├── data/
│   └── resume.ts           # All resume content (education, experience, projects, skills, contact)
├── components/
│   ├── Scene.tsx            # 3D scene orchestrator
│   ├── Road.tsx             # Yellow brick road (CatmullRom spline + procedural brick texture)
│   ├── Controls.tsx         # First-person WASD + PointerLock + auto-walk
│   ├── Environment.tsx      # Sky, clouds, ground, Kenney trees/flowers/rocks/bushes
│   ├── HUD.tsx              # 2D overlay (zone name, progress bar, controls hint, modals)
│   └── WelcomeModal.tsx     # Welcome overlay on load
├── zones/
│   ├── Kansas.tsx           # Zone 0: Intro
│   ├── Munchkinland.tsx     # Zone 1: Education
│   ├── Scarecrow.tsx        # Zone 2: Skills
│   ├── TinMan.tsx           # Zone 3: Experience
│   ├── Lion.tsx             # Zone 4: Projects
│   └── EmeraldCity.tsx      # Zone 5: Contact
├── effects/
│   └── PostProcessing.tsx   # Bloom + vignette
public/
└── models/nature/           # 44 Kenney Nature Kit GLB models
```

---

## 🎨 Credits

- **3D Nature Assets**: [Kenney](https://kenney.nl/assets/nature-kit) — CC0 Public Domain
- **Inspiration**: *The Wizard of Oz* (1939)

---

## 📄 License

This project is open source. Kenney assets are CC0 (public domain).
