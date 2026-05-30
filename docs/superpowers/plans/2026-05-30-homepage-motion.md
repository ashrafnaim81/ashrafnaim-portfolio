# Homepage Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tambah lapisan animasi ringan (Framer Motion) pada homepage `ashrafnaim.my` — hero stagger, reveal-on-scroll, CSS hover-lift, dan page transition — dengan "rasa" Sederhana (B).

**Architecture:** Page kekal React Server Components. Kandungan dibungkus komponen client kecil guna-semula (`Reveal`, `Stagger`/`StaggerItem`, `PageTransition`). Hover guna CSS sahaja. Semua hormat `prefers-reduced-motion` & neutral terhadap light/dark.

**Tech Stack:** Next.js 15.1 (App Router), React 19, TypeScript 5.7, Tailwind, **framer-motion** (baru).

**Spec:** `docs/superpowers/specs/2026-05-30-homepage-motion-design.md`

**Verification approach:** Projek ini tiada test runner. Gate setiap task = `npx tsc --noEmit` (typecheck lulus). Gate akhir = `npm run build` + ujian manual di `npm run dev` (localhost). Ini selari dengan seksyen Pengujian dalam spec.

---

## File Structure

| Fail | Tanggungjawab |
|---|---|
| `components/motion/tokens.ts` (baru) | Pemalar + varian Framer dikongsi (satu sumber kebenaran) |
| `components/motion/reveal.tsx` (baru) | `<Reveal>` — fade+naik bila masuk view |
| `components/motion/stagger.tsx` (baru) | `<Stagger>` + `<StaggerItem>` — masuk satu-satu |
| `components/motion/page-transition.tsx` (baru) | `<PageTransition>` — fade+naik pada mount |
| `app/template.tsx` (baru) | Balut semua page dengan `<PageTransition>` |
| `app/globals.css` (ubah) | Utiliti `.hover-lift` |
| `app/page.tsx` (ubah) | Wire motion ke seksyen homepage |
| `package.json` (ubah) | Tambah `framer-motion` |

---

## Task 1: Pasang framer-motion

**Files:**
- Modify: `package.json` (auto oleh npm)

- [ ] **Step 1: Pasang dependency**

Run:
```bash
npm install framer-motion
```
Expected: `framer-motion` ditambah ke `dependencies` dalam `package.json`, tiada error peer-dependency (serasi React 19).

- [ ] **Step 2: Sahkan terpasang**

Run:
```bash
node -e "console.log(require('framer-motion/package.json').version)"
```
Expected: nombor versi tercetak (cth `11.x` atau `12.x`).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add framer-motion dependency"
```

---

## Task 2: Motion tokens

**Files:**
- Create: `components/motion/tokens.ts`

- [ ] **Step 1: Tulis tokens.ts**

```ts
import type { Variants, Transition } from 'framer-motion';

// Easing "rasa B" (ease-out berkelas).
// Jenis tuple eksplisit (BUKAN `as const`) supaya boleh diberi pada `ease` Framer.
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const DURATION = { enter: 0.55, page: 0.35 } as const;
export const DISTANCE = { reveal: 16, page: 10 } as const;
export const STAGGER = 0.1;

// Trigger reveal: sekali sahaja, bila ~20% elemen masuk view
export const VIEWPORT = { once: true, amount: 0.2 } as const;

const enterTransition: Transition = { duration: DURATION.enter, ease: EASE };

// --- Penuh (gerakan) ---
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.reveal },
  show: { opacity: 1, y: 0, transition: enterTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.reveal },
  show: { opacity: 1, y: 0, transition: enterTransition },
};

// --- Reduced motion (opacity sahaja, tiada gerakan) ---
export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: enterTransition },
};

export const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: enterTransition },
};
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: tiada error.

- [ ] **Step 3: Commit**

```bash
git add components/motion/tokens.ts
git commit -m "feat(motion): add shared motion tokens and variants"
```

---

## Task 3: Reveal component

**Files:**
- Create: `components/motion/reveal.tsx`

- [ ] **Step 1: Tulis reveal.tsx**

```tsx
'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeUpReduced, VIEWPORT } from './tokens';

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? fadeUpReduced : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: tiada error.

- [ ] **Step 3: Commit**

```bash
git add components/motion/reveal.tsx
git commit -m "feat(motion): add Reveal component (reveal-on-scroll)"
```

---

## Task 4: Stagger + StaggerItem

**Files:**
- Create: `components/motion/stagger.tsx`

- [ ] **Step 1: Tulis stagger.tsx**

```tsx
'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerItem, staggerItemReduced, VIEWPORT } from './tokens';

export function Stagger({
  children,
  className,
  trigger = 'load',
}: {
  children: ReactNode;
  className?: string;
  trigger?: 'load' | 'scroll';
}) {
  const animateProps =
    trigger === 'scroll'
      ? { whileInView: 'show' as const, viewport: VIEWPORT }
      : { animate: 'show' as const };

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      {...animateProps}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? staggerItemReduced : staggerItem}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: tiada error.

- [ ] **Step 3: Commit**

```bash
git add components/motion/stagger.tsx
git commit -m "feat(motion): add Stagger and StaggerItem components"
```

---

## Task 5: PageTransition + template.tsx

**Files:**
- Create: `components/motion/page-transition.tsx`
- Create: `app/template.tsx`

- [ ] **Step 1: Tulis page-transition.tsx**

```tsx
'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DURATION, DISTANCE, EASE } from './tokens';

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: DISTANCE.page }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: DURATION.page, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Tulis app/template.tsx**

```tsx
import type { ReactNode } from 'react';
import { PageTransition } from '@/components/motion/page-transition';

export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: tiada error.

- [ ] **Step 4: Commit**

```bash
git add components/motion/page-transition.tsx app/template.tsx
git commit -m "feat(motion): add page transition via template.tsx"
```

---

## Task 6: .hover-lift utility

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Tambah utiliti `.hover-lift` di hujung globals.css**

Tambah blok ini di hujung fail `app/globals.css`:

```css
/* Hover lift untuk kad (CSS sahaja; hormat reduced-motion) */
@media (prefers-reduced-motion: no-preference) {
  .hover-lift {
    transition: transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
      box-shadow 0.25s ease;
  }
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px hsl(var(--secondary) / 0.35);
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: tiada error (CSS tak terkesan; pastikan tiada kerosakan import).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(motion): add .hover-lift CSS utility"
```

---

## Task 7: Wire motion ke app/page.tsx

**Files:**
- Modify: `app/page.tsx`

> Page kekal server component. Kita tambah import dan balut seksyen. Buat setiap Edit ikut turutan.

- [ ] **Step 1: Tambah import komponen motion**

Selepas baris `import { Badge } from '@/components/ui/badge';`, tambah:

```tsx
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
```

- [ ] **Step 2: Hero — lajur kiri jadi Stagger (load)**

Ganti blok ini:

```tsx
            <div className="space-y-6">
              <Badge className="w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                Teknologis Profesional MBOT
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {data.heroTitle}
              </h1>

              <p className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {data.heroJobTitle}
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Hubungi Saya
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Lihat Profil Lengkap</Link>
                </Button>
              </div>
            </div>
```

dengan:

```tsx
            <Stagger trigger="load" className="space-y-6">
              <StaggerItem>
                <Badge className="w-fit">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Teknologis Profesional MBOT
                </Badge>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {data.heroTitle}
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {data.heroJobTitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.heroDescription}
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Hubungi Saya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/about">Lihat Profil Lengkap</Link>
                  </Button>
                </div>
              </StaggerItem>
            </Stagger>
```

> Nota: `space-y-6` kekal pada `<Stagger>`. Setiap `<StaggerItem>` ialah anak langsung, jadi jarak `space-y` masih betul.

- [ ] **Step 3: Hero — gambar dibalut Reveal**

Ganti blok ini:

```tsx
            <div className="relative aspect-[3/4] max-w-md mx-auto">
```

dengan (tambah `<Reveal>` membungkus, kekalkan `<div>` dalam):

```tsx
            <Reveal className="relative aspect-[3/4] max-w-md mx-auto">
```

DAN tukar penutup `</div>` yang sepadan (penutup blok ini, sebelum `</div>` lajur grid) kepada `</Reveal>`. Blok asal berakhir begini:

```tsx
              </div>
            </div>
          </div>
        </div>
      </section>
```

Tukar penutup `<div>` (aspect) yang ketiga dari bawah supaya jadi:

```tsx
              </div>
            </Reveal>
          </div>
        </div>
      </section>
```

> Iaitu: `<div className="relative aspect-[3/4] ...">` → `<Reveal className="relative aspect-[3/4] ...">`, dan `</div>` penutupnya → `</Reveal>`. Reveal di atas-fold; ia dalam view pada load jadi animasi main serta-merta.

- [ ] **Step 4: Stats — Stagger (scroll)**

Ganti blok ini:

```tsx
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <p className={`text-4xl font-bold ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
```

dengan:

```tsx
          <Stagger trigger="scroll" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, index: number) => (
              <StaggerItem key={index} className="text-center">
                <p className={`text-4xl font-bold ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
```

- [ ] **Step 5: Achievements — Stagger (scroll) + hover-lift**

Ganti blok ini:

```tsx
          <div className="grid md:grid-cols-3 gap-6">
            {data.achievements.map((achievement: any, index: number) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className={`h-10 w-10 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'} mb-2`} />
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.period}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
```

dengan:

```tsx
          <Stagger trigger="scroll" className="grid md:grid-cols-3 gap-6">
            {data.achievements.map((achievement: any, index: number) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full hover-lift">
                    <CardHeader>
                      <Icon className={`h-10 w-10 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'} mb-2`} />
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.period}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
```

> `h-full` ditambah supaya kad sama tinggi dalam satu baris stagger; `hover-lift` ganti `hover:shadow-lg transition-shadow`.

- [ ] **Step 6: Skills — Stagger (scroll) + hover-lift**

Ganti blok ini:

```tsx
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.map((skill: any, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <Badge variant="secondary" className="w-fit">{skill.level}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
```

dengan:

```tsx
          <Stagger trigger="scroll" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.map((skill: any, index: number) => (
              <StaggerItem key={index}>
                <Card className="h-full hover-lift">
                  <CardHeader>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <Badge variant="secondary" className="w-fit">{skill.level}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
```

- [ ] **Step 7: CTA — Reveal**

Ganti blok ini:

```tsx
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.ctaTitle}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {data.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">
                Hubungi Saya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/portfolio">Lihat Portfolio</Link>
            </Button>
          </div>
        </div>
```

dengan (balut kandungan dalam `<Reveal>`):

```tsx
        <Reveal className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.ctaTitle}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {data.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">
                Hubungi Saya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/portfolio">Lihat Portfolio</Link>
            </Button>
          </div>
        </Reveal>
```

- [ ] **Step 8: Typecheck**

Run: `npx tsc --noEmit`
Expected: tiada error.

- [ ] **Step 9: Commit**

```bash
git add app/page.tsx
git commit -m "feat(motion): wire homepage sections with reveal, stagger, hover"
```

---

## Task 8: Verifikasi akhir (build + manual localhost)

**Files:** tiada perubahan kod (gate sahaja)

- [ ] **Step 1: Build production lulus**

Run: `npm run build`
Expected: build berjaya, tiada error TypeScript/lint yang menggagalkan build.

- [ ] **Step 2: Jalankan dev & uji manual**

Run: `npm run dev` (buka http://localhost:3000)

Senarai semak (dari spec):
1. Hero stagger main bila page dibuka; pantas, tiada lag.
2. Scroll ke bawah — stats, achievements, skills, CTA reveal lembut (sekali sahaja).
3. Hover kad achievements & skills — angkat + glow ungu.
4. Navigate ke page lain & balik homepage — page transition fade+naik lembut.
5. **Light & dark mode** — animasi neutral, glow nampak elok kedua-dua tema.
6. **Toggle `prefers-reduced-motion`** (Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce") — gerakan berhenti, semua kandungan tetap nampak penuh, hover tak angkat.
7. Tiada layout shift; hero muncul pantas.

- [ ] **Step 3: Commit (jika ada pelarasan kecil semasa ujian)**

```bash
git add -A
git commit -m "polish: tune homepage motion after manual review"
```

> Jika tiada pelarasan diperlukan, langkau commit ini.

---

## Self-Review Notes

- **Spec coverage:** hero stagger (Task 7 Step 2), reveal-on-scroll (Tasks 3,7), hover (Tasks 6,7), page transition (Task 5), reduced-motion (Tasks 2–5), light/dark (Task 6 guna `--secondary`), tokens dikongsi (Task 2), pengujian manual (Task 8). Semua tertutup.
- **Deviasi kecil dari spec:** gambar hero guna `<Reveal>` (fade+naik) bukan skala 0.98→1 — guna-semula komponen sedia ada (YAGNI), elak varian skala sekali-guna. `<Reveal>` tiada prop `delay` (sequencing dikendalikan `Stagger`).
- **Deploy ke VPS** di luar skop pelan ini (langkah manual berasingan).
