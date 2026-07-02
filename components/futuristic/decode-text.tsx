'use client';

import { useEffect, useRef, useState } from 'react';

const CHARSET = '!<>-_\\/[]{}—=+*^?#01';

/**
 * Kesan "decode": huruf rawak menyusun diri menjadi teks sebenar.
 * Terus papar teks penuh apabila prefers-reduced-motion.
 */
export function DecodeText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const totalFrames = Math.min(60, text.length * 3 + 20);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          out += ' ';
        } else if (i < revealed) {
          out += text[i];
        } else {
          out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
      }
      setDisplay(out);
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}
