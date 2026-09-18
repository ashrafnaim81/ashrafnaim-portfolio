'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Penukar warna aksen. Hanya tiga token ditukar (--secondary, --ring, --glow)
 * melalui atribut data-accent pada <html>; nilai token ada dalam globals.css.
 * Identiti Graphite (latar, teks, kad) tidak disentuh, jadi kontras kekal.
 *
 * Pilihan disimpan dalam localStorage dan digunakan semula sebelum cat pertama
 * oleh skrip sebaris dalam app/layout.tsx, supaya tiada kelipan warna.
 */
export const ACCENT_KEY = 'accent';

const ACCENTS = [
  { id: 'gold', label: 'Emas', swatch: 'hsl(42 92% 45%)' },
  { id: 'emerald', label: 'Zamrud', swatch: 'hsl(160 80% 34%)' },
  { id: 'royal', label: 'Biru Diraja', swatch: 'hsl(222 80% 50%)' },
] as const;

type AccentId = (typeof ACCENTS)[number]['id'];

function applyAccent(id: AccentId) {
  const root = document.documentElement;
  if (id === 'gold') delete root.dataset.accent;
  else root.dataset.accent = id;
  try {
    localStorage.setItem(ACCENT_KEY, id);
  } catch {
    /* Mod peribadi atau storan disekat: pilihan kekal untuk sesi ini sahaja. */
  }
}

export function AccentSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<AccentId>('gold');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.accent as AccentId | undefined;
    if (current) setActive(current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Palette className="h-5 w-5" />
        <span className="sr-only">Tukar warna aksen</span>
      </Button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 flex items-center gap-2 rounded-full border border-border/70 bg-background/90 p-2 shadow-lg backdrop-blur-xl"
        >
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              role="menuitemradio"
              aria-checked={active === a.id}
              title={a.label}
              onClick={() => {
                applyAccent(a.id);
                setActive(a.id);
                setOpen(false);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ backgroundColor: a.swatch }}
            >
              {active === a.id && <Check className="h-4 w-4 text-white" />}
              <span className="sr-only">{a.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
