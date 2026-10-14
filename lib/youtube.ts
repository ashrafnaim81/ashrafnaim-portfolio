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

export type PlaylistIntro = {
  text: string;
  link?: { href: string; label: string };
};

export type YtPlaylist = {
  id: string;
  title: string;
  url: string;
  videos: YtVideo[];
  latest: string;
  intro?: PlaylistIntro;
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

// Pengenalan ringkas setiap playlist (dipadankan dengan tajuk; padanan pertama menang,
// jadi corak yang lebih khusus mesti di atas). Playlist baharu tanpa padanan
// dipaparkan tanpa pengenalan.
const INTROS: [RegExp, PlaylistIntro][] = [
  [
    /^panduan delima/i,
    {
      text: 'Panduan penuh untuk guru yang baru menggunakan DELIMa 3.0. Bahagian 1 meliputi log masuk, Kelas Digital, pembantu AI DETa dan Hab Latihan Digital. Bahagian 2 meliputi Ruang Ilmu, Portfolio Digital dan lencana. Mulakan dengan Bahagian 1 jika anda belum pernah log masuk.',
      link: { href: '/blog/panduan-delima-3-0-untuk-guru', label: 'Baca versi bertulis' },
    },
  ],
  [
    /delima.*shorts/i,
    {
      text: 'Video pendek yang setiap satunya menunjukkan satu tugas dalam DELIMa 3.0. Tajuk ditanda (Guru) atau (Murid), jadi anda boleh terus berkongsi video yang sesuai dalam kumpulan kelas atau taklimat sekolah.',
    },
  ],
  [
    /animasi/i,
    {
      text: 'Animasi sains mengikut unit KSSR Tahun 4 hingga 6, dalam Bahasa Melayu dan versi DLP (Bahasa Inggeris). Setiap topik ada video penuh untuk tayangan di kelas dan Shorts yang boleh digunakan sebagai soalan pencetus sebelum pelajaran. Topik setakat ini: kemahiran proses sains, ujian adil, kitaran air dan pernafasan manusia.',
    },
  ],
  [
    /ash and the robot/i,
    {
      text: 'Lagu pendek tentang hidup bersama AI: menulis arahan tanpa henti, kerja rumah yang "siap sendiri" dan pembantu AI yang sentiasa bersetuju. Setiap lagu ada versi penuh dan teaser. Sesuai sebagai pembuka perbincangan tentang penggunaan AI yang bertanggungjawab.',
    },
  ],
  [
    /quest/i,
    {
      text: 'Siri animasi pixel yang menceritakan projek sebenar saya bersama Claude, daripada episod pertama hingga Kerajaan 118 Sekolah. Setiap episod satu projek. Tonton dari EP1 untuk mengikut perkembangannya.',
    },
  ],
  [
    /ai untuk guru/i,
    {
      text: 'Video tentang AI dalam kerja guru: pembantu DETa dalam DELIMa 3.0, AI agentik seperti Claude Cowork, dan pandangan umum tentang AI dalam pendidikan.',
      link: { href: '/blog', label: 'Panduan bertulis di blog' },
    },
  ],
  [
    /sorotan/i,
    {
      text: 'Video sorotan program pendidikan peringkat zon dan kebangsaan, termasuk Jerayawara Dasar Pendidikan Digital Zon Selatan 2024, GenMADANI Zon Selatan dan Pertandingan Bahas Guru Piala Ketua Pengarah Pendidikan Malaysia 2024.',
    },
  ],
  [
    /didiktv/i,
    {
      text: 'Showcase guru Daerah Kluang sebagai calon personaliti DidikTV, terbitan PPD Kluang. Merangkumi pelbagai mata pelajaran sekolah rendah dan menengah.',
    },
  ],
  [
    /tips teknologi/i,
    {
      text: 'Tutorial dari zaman PdPR (2020 hingga 2022): Telegram untuk kelas, Canva melalui akaun DELIMa, kuiz Kahoot, Wordwall dan Quizizz, serta papan pemuka Google Data Studio (kini Looker Studio). Sebahagian antara muka sudah berubah, tetapi langkah asasnya masih berguna.',
    },
  ],
  [
    /^pdpr/i,
    {
      text: 'Rakaman pengajaran saya semasa PdPR: Sains Tahun 6, Reka Bentuk dan Teknologi (RBT) Tahun 4, serta TMK Tahun 6 termasuk Scratch. Asalnya untuk murid sendiri, kini dikongsi sebagai bahan ulang kaji dan contoh untuk guru lain.',
    },
  ],
  [
    /sk bandar t6/i,
    {
      text: 'Kenangan warga SK Bandar T6: video korporat 2019, ucapan sempena PKP dan Ramadan 2020, serta hasil kerja murid.',
    },
  ],
  [
    /^canva/i,
    {
      text: 'Tips Canva untuk guru: menggunakan Canva melalui akaun DELIMa, kesan Smartmockups, elemen Frames dan pengepala Google Form.',
    },
  ],
  [
    /^shorts$/i,
    {
      text: 'Klip pendek lama dari saluran ini, disimpan sebagai arkib.',
    },
  ],
];

function introOf(title: string): PlaylistIntro | undefined {
  return INTROS.find(([re]) => re.test(title))?.[1];
}

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
        intro: introOf(p.snippet.title),
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
