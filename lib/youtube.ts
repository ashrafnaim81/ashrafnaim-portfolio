// Pengambil data YouTube untuk halaman /videos.
// Menggunakan YouTube Data API v3 (kunci dalam YOUTUBE_API_KEY, pelayan sahaja).
// Setiap panggilan disimpan 15 minit (Data Cache Next.js) supaya kuota harian
// (10,000 unit) tidak terjejas: kira-kira 15 hingga 20 unit setiap kali
// muat semula, paling banyak sekitar 2,000 unit sehari.

const API = 'https://www.googleapis.com/youtube/v3';
const REVALIDATE_SECONDS = 900;
const MAX_PAGES_PER_PLAYLIST = 4; // 4 x 50 = 200 video setiap playlist

// Saluran @AshrafNaim
export const CHANNEL_ID = 'UCBlN23KA2ZiRaRq_GTrQEag';

export type YtVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
};

export type YtPlaylist = {
  id: string;
  title: string;
  url: string;
  videos: YtVideo[];
  latest: string;
};

type ThumbMap = Record<string, { url: string } | undefined>;

async function ytFetch<T>(path: string, params: Record<string, string>): Promise<T | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;
  const qs = new URLSearchParams({ ...params, key });
  try {
    const res = await fetch(`${API}/${path}?${qs}`, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.error('[youtube] API', path, res.status);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error('[youtube] fetch gagal', path, err);
    return null;
  }
}

function pickThumbnail(thumbs: ThumbMap | undefined): string {
  return thumbs?.medium?.url || thumbs?.high?.url || thumbs?.default?.url || '';
}

async function getPlaylistVideos(playlistId: string): Promise<YtVideo[]> {
  const videos: YtVideo[] = [];
  let pageToken = '';
  for (let page = 0; page < MAX_PAGES_PER_PLAYLIST; page++) {
    const data = await ytFetch<{
      nextPageToken?: string;
      items: {
        snippet: { title: string; publishedAt: string; thumbnails?: ThumbMap; resourceId: { videoId: string } };
        contentDetails: { videoId: string; videoPublishedAt?: string };
      }[];
    }>('playlistItems', {
      part: 'snippet,contentDetails',
      playlistId,
      maxResults: '50',
      ...(pageToken ? { pageToken } : {}),
    });
    if (!data) break;
    for (const item of data.items) {
      const title = item.snippet.title;
      // Video peribadi atau dipadam tiada tajuk/lakaran sebenar
      if (title === 'Private video' || title === 'Deleted video') continue;
      const publishedAt = item.contentDetails.videoPublishedAt || item.snippet.publishedAt;
      videos.push({
        id: item.contentDetails.videoId,
        title,
        publishedAt,
        thumbnail: pickThumbnail(item.snippet.thumbnails),
      });
    }
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }
  // Terkini dahulu
  return videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

// Susunan bahagian: kumpulan utama dahulu, selebihnya mengikut video terkini.
const PRIORITY: RegExp[] = [/delima/i, /animasi/i, /ash and the robot|muzik/i, /quest/i];

function priorityOf(title: string): number {
  const i = PRIORITY.findIndex((re) => re.test(title));
  return i === -1 ? PRIORITY.length : i;
}

export async function getChannelPlaylists(): Promise<YtPlaylist[] | null> {
  const data = await ytFetch<{
    items: { id: string; snippet: { title: string } }[];
  }>('playlists', { part: 'snippet', channelId: CHANNEL_ID, maxResults: '50' });
  if (!data) return null;

  const playlists = await Promise.all(
    data.items.map(async (p) => {
      const videos = await getPlaylistVideos(p.id);
      return {
        id: p.id,
        title: p.snippet.title,
        url: `https://www.youtube.com/playlist?list=${p.id}`,
        videos,
        latest: videos[0]?.publishedAt ?? '',
      } satisfies YtPlaylist;
    })
  );

  return playlists
    .filter((p) => p.videos.length > 0)
    .sort((a, b) => {
      const pa = priorityOf(a.title);
      const pb = priorityOf(b.title);
      if (pa !== pb) return pa - pb;
      return b.latest.localeCompare(a.latest);
    });
}
