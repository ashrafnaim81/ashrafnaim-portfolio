import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/futuristic/glass-card';
import { PageHero } from '@/components/futuristic/page-hero';
import { getChannelPlaylists, type YtVideo } from '@/lib/youtube';
import { ShortsPrompts } from '@/components/shorts-prompts';
import { SHORTS_PLAYLIST_ID } from '@/lib/shorts-prompts';

export const metadata: Metadata = {
  title: 'Video - Ts. Ashraf bin Naim',
  description:
    'Video panduan DELIMa, animasi pendidikan sains, muzik Ash and The Robot dan eksperimen AI. Disusun mengikut playlist, bermula dengan yang terkini.',
};

export const dynamic = 'force-dynamic';

const INITIAL_VISIBLE = 6;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function VideoCard({ video, playlistId }: { video: YtVideo; playlistId: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}&list=${playlistId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <GlassCard className="h-full overflow-hidden">
        <div className="relative aspect-video bg-muted">
          {video.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
            <Play className="h-10 w-10 text-white drop-shadow" aria-hidden="true" />
          </span>
        </div>
        <div className="space-y-1 p-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</h3>
          <p className="text-xs text-muted-foreground">{formatDate(video.publishedAt)}</p>
        </div>
      </GlassCard>
    </a>
  );
}

export default async function VideosPage() {
  // Playlist "Satu Prompt, Satu Video" sudah dipaparkan dalam sorotan di atas.
  const playlists = (await getChannelPlaylists())?.filter((p) => p.id !== SHORTS_PLAYLIST_ID);

  return (
    <div>
      <PageHero
        eyebrow="Video"
        title="Video"
        description="Semua video saya di YouTube, disusun mengikut playlist dan bermula dengan yang terkini"
      />

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <ShortsPrompts />

        {!playlists || playlists.length === 0 ? (
          <p className="mx-auto max-w-xl py-12 text-center text-muted-foreground">
            Senarai video sedang disediakan. Sementara itu, tonton terus di{' '}
            <a
              href="https://www.youtube.com/c/AshrafNaim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              saluran YouTube saya
            </a>
            .
          </p>
        ) : (
          <>
            <nav aria-label="Playlist" className="mb-10 flex flex-wrap justify-center gap-2">
              {playlists.map((p) => (
                <a key={p.id} href={`#pl-${p.id}`}>
                  <Badge variant="secondary" className="cursor-pointer">
                    {p.title} ({p.videos.length})
                  </Badge>
                </a>
              ))}
            </nav>

            <div className="space-y-14">
              {playlists.map((p) => {
                const visible = p.videos.slice(0, INITIAL_VISIBLE);
                const rest = p.videos.slice(INITIAL_VISIBLE);
                return (
                  <section key={p.id} id={`pl-${p.id}`} className="scroll-mt-24">
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="text-2xl font-bold">
                        {p.title}{' '}
                        <span className="text-base font-normal text-muted-foreground">
                          · {p.videos.length} video
                        </span>
                      </h2>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        Buka playlist di YouTube
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>

                    {p.intro && (
                      <p className="mb-5 max-w-3xl text-muted-foreground">
                        {p.intro.text}
                        {p.intro.link && (
                          <>
                            {' '}
                            <Link href={p.intro.link.href} className="text-primary hover:underline">
                              {p.intro.link.label}
                            </Link>
                          </>
                        )}
                      </p>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {visible.map((v) => (
                        <VideoCard key={v.id} video={v} playlistId={p.id} />
                      ))}
                    </div>

                    {rest.length > 0 && (
                      <details className="mt-4 group/details">
                        <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
                          Lihat semua {p.videos.length} video
                        </summary>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {rest.map((v) => (
                            <VideoCard key={v.id} video={v} playlistId={p.id} />
                          ))}
                        </div>
                      </details>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
