<!-- markdownlint-disable MD033 MD041 -->
<div align="center">

  <img src="https://img.shields.io/badge/NUXT-00DC82?style=flat-square&logo=nuxtdotjs&logoColor=white" alt="Nuxt" />
  <img src="https://img.shields.io/badge/VUE-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TAILWIND-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/THREE.JS-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js" />

  <h1>acrokami.dev</h1>

  <p>Personal portfolio & backend engineering showcase.</p>

  <a href="https://acrokami.github.io/" target="_blank"><strong>Live Site ↗</strong></a>

</div>

---

## Overview

This is my personal developer portfolio — a single-page application built to showcase backend architectural thinking and distributed systems experience through a clean, terminal-inspired frontend interface.

**Key principle:** every visual element serves a purpose. High performance, zero unnecessary dependencies, full responsive adaptation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v3 + custom design tokens (`space-*`, `emerald-*`) |
| **3D Graphics** | Three.js (BufferGeometry, custom shape morphing, additive blending, responsive camera adaptation) |
| **Animation** | `@vueuse/motion` |
| **Icons** | Nuxt Icon (`heroicons`, `simple-icons`, `skill-icons`, `mdi`) |
| **SEO** | `useSeoMeta`, OpenGraph, Twitter Cards |

---

## Features

### 3D Particle Background
Custom Three.js canvas rendering 2,500 particles with mathematical morphing across 8 geometric shapes (DNA helix, trefoil knot, 4D tesseract projection, lemniscate, hyperboloid, atomic orbitals, etc.). Includes lifecycle optimization with `Page Visibility API` pauses and mobile viewport-aware scaling.

### UNIX / Terminal Design System
Unified UI metaphor across the entire page:
- `~/acrokami ❯ ./start.sh` — Hero & dynamic runtime metrics
- `~/whoami` — Background, architectural focus, and LeetCode integration
- `~/stack` — Categorized skills with real-time experience inspectors
- `~/projects` — Process/service status and architecture breakdown
- `~/contact --ping` — Direct comms channels
- `~/exit 0` — Footer

### Live Runtime Telemetry
- **Status indicator** (active availability tracking)
- **Response latency** (dynamic jitter simulation, ~8–35ms)
- **Local time** (real-time Kyiv, EEST time zone formatting)
- **Session runtime** (active session counter from page mount)

### Interactive Tech Stack Inspector
Touch- and hover-enabled skill grid with detailed breakdown cards detailing experience timeline and core competencies per technology.

---

## Project Structure

```text
app/
├── components/
│   ├── home/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ProjectSection.vue
│   │   ├── ContactSection.vue
│   │   └── ParticlesBackground.vue    # Optimized Three.js canvas
│   └── layout/
│       ├── AppHeader.vue
│       ├── AppFooter.vue
│       ├── ScrollProgress.vue
│       └── DotGridOverlay.vue
├── public/
│   └── og-image.png
├── app.vue
└── nuxt.config.ts


```

License

MIT — feel free to fork and adapt.
