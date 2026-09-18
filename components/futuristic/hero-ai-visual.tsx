'use client';

import { useEffect, useRef } from 'react';

/**
 * Visual AI bergerak di belakang potret hero: rangkaian neural grafit dengan
 * denyut emas, klip gelung 5 saat (~80 KB).
 *
 * Komponen ini MESTI diletakkan di luar mana-mana pembalut Framer Motion.
 * `transform` mencipta stacking context terasing, dan di dalamnya
 * `mix-blend-mode` tidak lagi dapat "melihat" latar halaman, jadi latar putih
 * video akan muncul sebagai petak. Di luar pembalut itu, mod multiply
 * melenyapkan putih (tema cerah) dan mod screen melenyapkan hitam selepas
 * video diterbalikkan (tema gelap). Rujuk .hero-ai-visual dalam globals.css.
 */
export function HeroAiVisual({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Hormati tetapan pengguna: kekal pada poster pegun, tiada main automatik.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.play().catch(() => {
      /* Pelayar menyekat main automatik: poster kekal dipaparkan. */
    });
  }, []);

  return (
    <div aria-hidden className={`hero-ai-visual pointer-events-none ${className}`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-neural-poster.jpg"
        className="h-full w-full object-cover"
      >
        <source src="/media/hero-neural.webm" type="video/webm" />
        <source src="/media/hero-neural.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
