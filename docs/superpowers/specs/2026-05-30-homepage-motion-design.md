# Design Spec — Homepage Motion (Framer Motion)

**Date:** 2026-05-30
**Status:** Approved (design phase)
**Scope:** Homepage only (`app/page.tsx`), light/reversible motion layer

## Goal

Tambah lapisan animasi **ringan & berkelas** pada homepage `ashrafnaim.my` supaya
laman terasa hidup dan moden, tanpa overhaul. "Rasa" motion = **Sederhana (B)**:
stagger lembut, gerakan kecil, easing ease-out berkelas. Kekal sesuai dengan brand
*Teknologis Profesional* Ashraf (bukan salinan bulat Cikgu Aime).

Out of scope (buat masa ini): page lain selain homepage, parallax berat,
scroll-jacking, count-up angka, exit animations.

## Approach

**Framer Motion + komponen client wrapper kecil.** Page kekal sebagai React Server
Components (ambil data Prisma di server). Hanya kandungan dibungkus dengan komponen
client guna-semula. Hover guna CSS `:hover` sahaja (tiada JS/client diperlukan).

Alternatif yang ditolak:
- CSS tulen + IntersectionObserver — page transition susah, kurang lentur; RESUME mahukan Framer Motion.
- Tukar page jadi client sepenuhnya — hilang manfaat server-rendering.

## Motion Tokens ("rasa B")

| Token | Nilai |
|---|---|
| Jarak naik (reveal/stagger) | 16px |
| Jarak naik (page transition) | 10px |
| Tempoh masuk | 0.55s |
| Tempoh hover | 0.25s |
| Tempoh page transition | 0.35s |
| Easing | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Jeda stagger antara item | 0.10s |
| Hover lift | `translateY(-4px)` + glow bayang warna `--secondary` |
| Reveal trigger | `once: true`, cetus bila ~20% elemen masuk view (`amount: 0.2`) |

Token disimpan sebagai pemalar dikongsi dalam `components/motion/tokens.ts` supaya
satu sumber kebenaran (durations, easing, distances, viewport).

## Komponen Baru

Lokasi: `components/motion/`

### `tokens.ts`
Eksport pemalar motion (EASE, DURATION, DISTANCE, STAGGER, VIEWPORT) + varian Framer
yang dikongsi (`fadeUp`, `staggerContainer`, `staggerItem`).

### `reveal.tsx` — `<Reveal>`
- Client component (`'use client'`).
- Props: `children`, `className?`, `delay?` (default 0), `as?` (default `div`).
- `motion.div` dengan `initial={{opacity:0, y:16}}`, `whileInView={{opacity:1, y:0}}`,
  `viewport={{ once:true, amount:0.2 }}`, transition guna token.
- Hormat `useReducedMotion()`: bila true → `initial`/`animate` jadi opacity-only
  (tiada `y`), atau terus tampil.

### `stagger.tsx` — `<Stagger>` + `<StaggerItem>`
- `<Stagger>`: container `motion.div`, `variants=staggerContainer`,
  mod cetus boleh pilih: `trigger="load"` (default, guna `animate`) untuk hero,
  atau `trigger="scroll"` (guna `whileInView`) untuk seksyen bawah.
- `<StaggerItem>`: `motion.div` dengan `variants=staggerItem` (fadeUp 16px).
- Hormat reduced-motion (opacity-only).

### `page-transition.tsx` — `<PageTransition>`
- Client wrapper, fade + naik 10px pada mount (enter-only).
- Digunakan dalam `app/template.tsx`.
- Hormat reduced-motion (opacity-only / instant).

## Fail Diubah

### `app/template.tsx` (BARU)
Balut `children` dengan `<PageTransition>`. `template.tsx` re-mount setiap navigasi,
jadi animasi enter berfungsi untuk semua navigasi ke/dari homepage (auto meluas ke
page lain kemudian tanpa kerja tambahan).

### `app/page.tsx` (UBAH)
Kekal server component. Bungkus kandungan:

| Seksyen | Motion |
|---|---|
| Hero (lajur kiri) | `<Stagger trigger="load">` membungkus badge, h1, jobTitle, description, butang sebagai `<StaggerItem>` |
| Hero (gambar) | `<Reveal>` atau motion fade-in + skala 0.98→1 |
| Stats | `<Stagger trigger="scroll">` — 4 angka, setiap satu `<StaggerItem>` |
| Achievements | `<Stagger trigger="scroll">` membungkus grid; setiap `<Card>` jadi `<StaggerItem>` + class `.hover-lift` |
| Skills | `<Stagger trigger="scroll">` membungkus grid; setiap `<Card>` jadi `<StaggerItem>` + class `.hover-lift` |
| CTA | `<Reveal>` (tajuk + perenggan + butang) |

### `app/globals.css` (UBAH)
Tambah utiliti `.hover-lift`:
```css
@media (prefers-reduced-motion: no-preference) {
  .hover-lift { transition: transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .25s ease; }
  .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 24px hsl(var(--secondary) / .35); }
}
```

### `package.json` (UBAH)
Tambah dependency `framer-motion` (versi terkini stabil yang serasi Next.js 15 / React 19).

## Accessibility & Tema

- **`prefers-reduced-motion`:** semua komponen Framer guna `useReducedMotion()` →
  opacity-only / tampil serta-merta tanpa gerakan. Hover CSS dibungkus
  `@media (prefers-reduced-motion: no-preference)`.
- **Light/dark:** animasi guna transform/opacity sahaja (neutral warna). Glow guna
  `--secondary` (wujud untuk kedua-dua tema).
- **LCP/SEO:** hero ialah above-the-fold — guna animasi *load* (bukan scroll-triggered)
  & pantas supaya tak melambatkan paparan utama. Diketahui: reveal set `opacity:0`
  awal (bergantung JS); diterima untuk laman portfolio ini.

## Pengujian

Manual di **localhost** (`npm run dev`):
1. Light & dark mode — animasi neutral, tiada warna pelik.
2. Hero stagger main bila page dibuka; pantas, tiada lag.
3. Scroll ke bawah — stats/achievements/skills/CTA reveal lembut, sekali sahaja.
4. Hover kad achievements & skills — angkat + glow.
5. Navigate ke page lain & balik homepage — page transition lembut.
6. Toggle `prefers-reduced-motion` (DevTools rendering) — gerakan berhenti, semua
   kandungan tetap nampak penuh.
7. Tiada layout shift; hero muncul pantas (semak DevTools/Lighthouse ringkas).

## Deployment (nota)

VPS `root@72.62.70.20` (`/var/www/ashrafnaim-portfolio`) **bukan git repo** — deploy
manual via build artifact + pm2 (`portfolio`). Perubahan ini di-commit ke git dahulu;
deploy ke live ialah langkah berasingan (di luar skop spec ini).
