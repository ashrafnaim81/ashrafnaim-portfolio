'use client';

import { useRef, useState } from 'react';
import { Check, Copy, ExternalLink, Play, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/futuristic/glass-card';
import { SectionHeading } from '@/components/futuristic/section-heading';
import { SHORT_PROMPTS, SHORTS_PLAYLIST_ID, type ShortPrompt } from '@/lib/shorts-prompts';

/**
 * Sorotan siri "Satu Prompt, Satu Video" di /videos: kad 9:16 untuk setiap Short,
 * dengan prompt penuh yang boleh dibaca dan disalin terus.
 */

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Pelayar lama atau konteks tidak selamat: guna textarea sementara.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/85"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Disalin' : 'Salin prompt'}
    </button>
  );
}

function ShortCard({ item }: { item: ShortPrompt }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <GlassCard className="flex h-full flex-col overflow-hidden">
      <a
        href={`https://www.youtube.com/shorts/${item.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[9/16] bg-muted"
        aria-label={`Tonton ${item.name} di YouTube`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/media/shorts/${item.slug}.jpg`}
          alt={`Bingkai video ${item.name}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <Badge variant="secondary" className="absolute left-2 top-2 shadow">
          {item.kind === 'watak' ? 'Berwatak' : 'Animasi motion'}
        </Badge>
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
          <Play className="h-10 w-10 text-white drop-shadow" aria-hidden="true" />
        </span>
      </a>

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div>
          <h3 className="font-semibold leading-snug">{item.name}</h3>
          <p className="text-xs text-muted-foreground">Tema: {item.theme}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <CopyButton text={item.prompt} />
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-muted"
          >
            Lihat prompt
          </button>
        </div>
      </div>

      {/* Klik pada latar (luar kotak) atau Esc menutup dialog. */}
      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="w-[min(92vw,44rem)] rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {item.kind === 'watak' ? 'Animasi berwatak' : 'Animasi motion'} · Tema: {item.theme}
            </p>
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed">
          {item.prompt}
        </pre>
        <div className="flex flex-wrap items-center gap-3 border-t border-border p-4">
          <CopyButton text={item.prompt} />
          <a
            href={`https://www.youtube.com/shorts/${item.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Tonton video ini
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </GlassCard>
  );
}

export function ShortsPrompts() {
  return (
    <section id="satu-prompt" className="scroll-mt-24 pb-14">
      <SectionHeading
        eyebrow="Prompt Claude Code"
        title="Satu Prompt, Satu Video"
        description="Setiap video di bawah dibina sepenuhnya oleh Claude Code daripada satu prompt: animasi, muzik dan SFX dijana dengan kod, terus menjadi fail MP4. Salin prompt, tukar tema dan nama program, kemudian tampal dalam ruang Code di Claude Desktop."
      />

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SHORT_PROMPTS.map((item) => (
          <ShortCard key={item.slug} item={item} />
        ))}
      </div>

      <p className="mt-6 text-center text-sm">
        <a
          href={`https://www.youtube.com/playlist?list=${SHORTS_PLAYLIST_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          Tonton kesemua di playlist YouTube
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </p>
    </section>
  );
}
