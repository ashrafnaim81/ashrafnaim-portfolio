# Spec: Redesign "Premium Tech" (light-first) — ashrafnaim.my

**Tarikh:** 2026-07-02
**Status:** Diluluskan (arah gaya + skop) — menunggu semakan spec
**Branch:** `redesign/premium-tech`

## Matlamat

Menaik taraf identiti visual laman awam ashrafnaim.my daripada rupa shadcn/ui lalai
kepada gaya **"Premium Tech"** — futuristik halus, korporat, bercahaya lembut —
sesuai dengan imej Teknologis Profesional MBOT.

## Bukan matlamat (non-goals)

- Tiada perubahan pada admin panel (`app/admin`), API (`app/api`), auth, atau skema Prisma.
- Tiada perubahan kandungan — semua teks/imej kekal datang dari DB.
- Tiada library baru (guna `framer-motion`, `next/font`, Tailwind sedia ada).
- Tiada deploy ke VPS sehingga kelulusan selepas preview.

## Keputusan yang diluluskan

| Keputusan | Pilihan |
|---|---|
| Arah gaya | Premium Tech (aurora, kaca, glow, grid halus) |
| Skop | Semua halaman awam + Navigation + Footer |
| Tema lalai | **Light-first** — `defaultTheme="system"` kekal; mod cerah ialah sasaran design utama, mod gelap di-tune penuh |

## A. Identiti visual

### Warna (CSS variables dalam `app/globals.css`)

Evolusi identiti biru/ungu sedia ada, bukan penggantian:

- **Light (utama):** latar putih-sejuk dengan sedikit rona biru (bukan putih tulen),
  primary biru elektrik (~`221 90% 52%`), secondary violet (~`262 85% 58%` — dialih
  daripada ungu neon 280 100% 70% yang kontras rendah atas putih), aksen cyan untuk
  glow/garis, border lebih sejuk.
- **Dark:** navy-hitam dalam (~`228 30% 6%`), bukan hitam pekat; primary/secondary
  versi lebih cerah untuk kontras.
- Tambah token baru: `--glow` (warna cahaya), `--surface-glass` (rona kad kaca).
- Kontras teks kekal minimum WCAG AA dalam kedua-dua mod.

### Tipografi

- **Space Grotesk** (`next/font/google`, self-host) untuk semua heading — variable `--font-display`.
- **Inter** kekal untuk body.
- Label "eyebrow" seksyen guna `font-mono` kecil huruf besar berjarak (cth. `// PENCAPAIAN`).
- `tailwind.config.ts`: tambah `fontFamily.display`.

## B. Komponen baru — `components/futuristic/`

Semua kesan latar **CSS tulen** (tiada canvas/WebGL, tiada JS runtime tambahan):

1. **`aurora-background.tsx`** — 2-3 blob radial-gradient besar (primary/secondary/cyan),
   blur tinggi, animasi hanyut perlahan (~20-30s), opacity rendah atas latar cerah.
   Statik apabila `prefers-reduced-motion`.
2. **`grid-pattern.tsx`** — grid teknikal halus (CSS `linear-gradient` berulang atau SVG),
   mask radial supaya pudar ke tepi. Statik.
3. **`glass-card.tsx`** — pembungkus/varian `Card`: `backdrop-blur`, latar separa telus,
   border 1px separa telus, glow lembut ketika hover (ganti `hover-lift` di halaman awam).
4. **`section-heading.tsx`** — eyebrow monospace + tajuk Space Grotesk + garis aksen
   gradient pendek; digunakan di SEMUA seksyen halaman awam untuk konsistensi.

## C. Perubahan per fail

| Fail | Perubahan |
|---|---|
| `app/globals.css` | Token warna baru light+dark, utiliti `.text-gradient`, `.glow-ring`, kemaskini `.text-shimmer` & `.hover-lift` ke palet baru |
| `app/layout.tsx` | Tambah Space Grotesk melalui `next/font`; `defaultTheme` kekal `system` |
| `tailwind.config.ts` | `fontFamily.display`, keyframes aurora |
| `components/navigation.tsx` | Bar kaca terapung (rounded-full, blur, jarak dari atas), penanda aktif meluncur (Framer Motion `layoutId`), logo dengan titik glow |
| `components/footer.tsx` | Kaca gelap/cerah ikut tema, garis gradient di atas, susun atur kekal |
| `app/page.tsx` | Hero: aurora + grid, foto berbingkai gradient + glow ring; stats dalam jalur kaca; achievements/skills guna `GlassCard` + `SectionHeading`; CTA gradient mesh |
| `app/about/page.tsx` | Hero banner kecil konsisten + `SectionHeading` + `GlassCard` |
| `app/portfolio/page.tsx` | Sama — kad projek jadi `GlassCard` dengan glow hover |
| `app/blog/page.tsx` | Sama — kad artikel `GlassCard` |
| `app/talks/page.tsx` | Sama — senarai/timeline dengan aksen gradient |
| `app/contact/page.tsx` | Sama — borang dalam `GlassCard`, input dengan focus ring glow |

Halaman kekal Server Components; komponen futuristik dekoratif tidak perlukan state
(kecuali navigation yang memang sudah `'use client'`).

## D. Prestasi & aksesibiliti

- Semua animasi hormat `prefers-reduced-motion` (ikut corak `components/motion/tokens.ts`).
- Font self-host melalui `next/font` — tiada FOUT/permintaan luaran.
- Kesan latar CSS sahaja — tiada impak bundle JS; sasaran: tiada penurunan skor Lighthouse.
- Kontras AA dikekalkan; ikon/teks atas kaca diuji dalam kedua-dua mod.

## E. Preview & rollback

1. Semua kerja di branch `redesign/premium-tech`; `main` tidak disentuh.
2. Preview: `npm run dev` secara local (DB SQLite local — JANGAN tukar provider dalam
   commit, lihat memory `prisma-provider-local-vs-live`), screenshot semua halaman
   (light + dark) dikongsi untuk semakan; URL localhost diberi untuk terokaan sendiri.
3. Deploy HANYA selepas kelulusan, ikut proses rsync+pm2 sedia ada (memory
   `deploy-process-vps`), dengan backup automatik + `portfolio-rollback.sh` di VPS.
4. Tolak design → buang branch; laman live kekal tidak berubah.

## Risiko & mitigasi

- **Kaca atas latar cerah kurang kontras** → border + bayang lembut memastikan kad
  jelas; uji kedua-dua mod sebelum preview.
- **`npm install` di VPS perlukan `--legacy-peer-deps`** (konflik peer sedia ada) —
  tiada dependency baru ditambah, jadi risiko rendah.
- **Prisma provider** — pastikan `prisma/schema.prisma` kekal `postgresql` dalam
  sebarang commit.
