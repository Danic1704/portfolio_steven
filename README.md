# Steven Daye — Portfolio

A premium, production-ready portfolio for **Steven Daye** — Senior Frontend Engineer & Frontend Technical Lead.

Dark, cinematic, editorial. A custom Three.js "frontend architecture" hero, GSAP + Lenis motion, and a content layer sourced strictly from Steven's CV (no fabricated facts).

## Stack

- **Next.js 16.3** (App Router, Turbopack, static rendering) + React 19
- **TypeScript** · strict
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Three.js / @react-three/fiber 9 / drei 10 / postprocessing** — hero architecture scene
- **GSAP + @gsap/react + Lenis** — scroll & entrance motion
- **lucide-react** — icons · **clsx + tailwind-merge** — utilities
- **Geist Sans + Geist Mono** via `next/font`

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
npm run build      # production build (Turbopack)
```

## Highlights

- **Hero** — layered 3D architecture (UI → STATE → BFF → API/AI → DATA) with warm key light + cool rim, matte materials, data-packet dots, bloom (quality-gated), pointer parallax, and a scroll-driven camera pull-back that hands off to the page.
- **Quality tiers** — `full` / `reduced` / `minimal` by viewport; DPR capped at 2 desktop / 1 mobile; shadows + postprocessing dropped on lower tiers; static fallback when WebGL is unavailable; canvas error boundary.
- **Motion** — Lenis smooth scroll synced to GSAP ScrollTrigger; entrance timelines; scroll reveals; magnetic buttons; desktop custom cursor with `VIEW` / `TALK` states.
- **Accessibility** — `prefers-reduced-motion` disables all motion (including Lenis, GSAP, cursor); keyboard focus rings; semantic landmarks; aria labels; sr-only name in the hero `h1`; AA contrast tokens.
- **SEO** — full metadata, Open Graph, JSON-LD (Person + WebSite), sitemap, robots, generated favicon.
- **Sections** — Selected Work (with case studies), How I work, Experience (date-free, per CV), Tech stack (interactive wall), About, Contact, Footer.

## Structure

```
src/
  app/            layout, page, work/[slug] case studies, sitemap, robots, icon
  components/     hero · three · layout · motion · smooth + section components
  data/           profile, projects, experience, technologies, principles
  config/         site config
  hooks/          media query, reduced motion, pointer fine
  lib/            utils, lenis registry, scroll progress bridge
```

## Content source

All facts (companies kept generic where required, metrics, stack, languages) come from Steven's CV. Project stacks were verified against the actual codebases where available. No years are fabricated — the experience timeline is date-free.