'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, MessageSquareText, Code2, AppWindow } from 'lucide-react';
import { EASE } from '@/components/motion/tokens';

const PROMPT =
  'Bina kuiz interaktif Sains Tahun 5 tentang Sistem Suria. 10 soalan aneka pilihan, papar markah di akhir.';

const CODE = [
  'const soalan = await ai.jana({',
  "  topik: 'Sistem Suria',",
  '  tahun: 5, bilangan: 10,',
  '});',
  '',
  'papar(<Kuiz soalan={soalan} />);',
];

const PILIHAN = ['Musytari', 'Marikh', 'Zuhal'];

type Fasa = 0 | 1 | 2; // 0 = menaip prompt, 1 = kod dijana, 2 = aplikasi siap

const LANGKAH = [
  { label: 'Prompt', Icon: MessageSquareText },
  { label: 'Kod', Icon: Code2 },
  { label: 'Aplikasi', Icon: AppWindow },
];

/**
 * Demo tiga langkah vibe coding: arahan bahasa biasa -> kod -> aplikasi.
 * Kitaran hanya berjalan semasa seksyen kelihatan, dan pengguna
 * prefers-reduced-motion terus melihat keadaan akhir tanpa animasi.
 */
export function VibeCodingDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  const [fasa, setFasa] = useState<Fasa>(0);
  const [aksara, setAksara] = useState(0);
  const [baris, setBaris] = useState(0);
  const [dijawab, setDijawab] = useState(false);

  useEffect(() => {
    if (reduce) {
      setFasa(2);
      setAksara(PROMPT.length);
      setBaris(CODE.length);
      setDijawab(true);
      return;
    }
    if (!inView) return;

    let t: ReturnType<typeof setTimeout>;
    if (fasa === 0) {
      t = aksara < PROMPT.length
        ? setTimeout(() => setAksara((n) => n + 1), 26)
        : setTimeout(() => setFasa(1), 500);
    } else if (fasa === 1) {
      t = baris < CODE.length
        ? setTimeout(() => setBaris((n) => n + 1), 300)
        : setTimeout(() => setFasa(2), 450);
    } else if (!dijawab) {
      t = setTimeout(() => setDijawab(true), 1100);
    } else {
      // Tahan keadaan akhir, kemudian ulang kitaran.
      t = setTimeout(() => {
        setFasa(0);
        setAksara(0);
        setBaris(0);
        setDijawab(false);
      }, 4200);
    }
    return () => clearTimeout(t);
  }, [inView, reduce, fasa, aksara, baris, dijawab]);

  return (
    <div ref={ref}>
      {/* Penunjuk langkah */}
      <div className="mb-6 flex items-center justify-center gap-2 sm:gap-4">
        {LANGKAH.map(({ label, Icon }, i) => (
          <div key={label} className="flex items-center gap-2 sm:gap-4">
            <div
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-500 sm:text-sm ${
                fasa >= i
                  ? 'border-secondary/50 bg-secondary/10 text-secondary'
                  : 'border-border/70 text-muted-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
            {i < LANGKAH.length - 1 && (
              <ArrowRight
                className={`h-4 w-4 transition-colors duration-500 ${
                  fasa > i ? 'text-secondary' : 'text-muted-foreground/40'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* 1. Prompt */}
        <div className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur-md dark:bg-card/60">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Arahan bahasa biasa
          </p>
          <p className="min-h-[7.5rem] text-sm leading-relaxed text-foreground">
            {PROMPT.slice(0, aksara)}
            {fasa === 0 && (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-secondary" />
            )}
          </p>
        </div>

        {/* 2. Kod */}
        <div className="rounded-2xl border border-border/70 bg-primary p-5 shadow-sm dark:bg-card">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            <span className="ml-2 font-mono text-[11px] text-primary-foreground/50 dark:text-muted-foreground">
              kuiz.tsx
            </span>
          </div>
          <pre className="min-h-[7.5rem] overflow-hidden font-mono text-xs leading-relaxed text-primary-foreground/90 dark:text-foreground/90">
            {CODE.slice(0, baris).map((line, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {line || ' '}
              </motion.div>
            ))}
          </pre>
        </div>

        {/* 3. Aplikasi */}
        <div className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur-md dark:bg-card/60">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Aplikasi sedia diguna
          </p>
          <motion.div
            className="min-h-[7.5rem]"
            initial={false}
            animate={{ opacity: fasa === 2 ? 1 : 0.15, y: fasa === 2 ? 0 : 6 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Soalan 1 / 10</span>
              <span>{dijawab ? 'Markah: 1' : 'Markah: 0'}</span>
            </div>
            <div className="mb-3 h-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-secondary"
                initial={false}
                animate={{ width: dijawab ? '10%' : '0%' }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
            <p className="mb-2 text-sm font-medium">Planet terbesar dalam Sistem Suria?</p>
            <div className="space-y-1.5">
              {PILIHAN.map((p, i) => {
                const betul = i === 0 && dijawab;
                return (
                  <div
                    key={p}
                    className={`flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs transition-colors duration-500 ${
                      betul
                        ? 'border-secondary bg-secondary/10 font-medium text-secondary'
                        : 'border-border/70 text-muted-foreground'
                    }`}
                  >
                    {p}
                    {betul && <Check className="h-3.5 w-3.5" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
