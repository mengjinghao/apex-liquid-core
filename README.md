# APEX.CORE — Liquid Interface

> WebGL Mercury Surface + Hyper Folding Transition + Generative Dashboard

A cinematic single-page experience built with **Next.js 16 + TypeScript + Tailwind CSS 4 + React Three Fiber + Framer Motion**.

## Features

- **MercurySurface** — Real-time WebGL liquid mercury sphere with GLSL shaders. Mouse movement creates metallic ripples; the sphere rotates following the cursor.
- **HyperFolding** — 3D fold transition (rotateX 0→90° + scale + blur) that physically collapses the intro to reveal the dashboard.
- **Dashboard** — Generative metric cards with animated SVG wave paths and glassmorphism.

## Flow

1. **Liquid State** — A mercury sphere floats in darkness. Move your mouse to create ripples.
2. **Click to Transmit** — The sphere folds into the 4th dimension and dissolves.
3. **Neural Link Established** — The data dashboard materializes.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| 3D / WebGL | @react-three/fiber + three.js |
| Animation | Framer Motion |
| Shaders | Custom GLSL (vertex + fragment) |

## Getting Started

```bash
bun install
bun run dev
```

Open http://localhost:3000

## Build

```bash
bun run build
bun run start
```

## License

MIT
