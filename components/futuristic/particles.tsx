'use client';

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Rangkaian nod bergerak (canvas ringan) — nod berhubung dengan garis
 * apabila berdekatan; ikon visual "rangkaian teknologi".
 * Statik/tiada apabila prefers-reduced-motion.
 */
export function Particles({
  density = 50,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let nodes: Node[] = [];
    let hue = '221 90% 52%';

    const readHue = () => {
      hue = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim() || hue;
    };
    readHue();
    const observer = new MutationObserver(readHue);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const [h, s, l] = hue.split(' ');
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h}, ${s}, ${l}, 0.5)`;
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(${h}, ${s}, ${l}, ${
              0.16 * (1 - dist / LINK)
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 -z-[8] h-full w-full ${className ?? ''}`}
    />
  );
}
