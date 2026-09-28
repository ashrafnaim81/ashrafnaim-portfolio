// Pasangan artikel dwibahasa (BM + Inggeris).
// Disimpan dalam kod, bukan pangkalan data, supaya tiada migrasi skema
// diperlukan pada pelayan produksi. Tambah satu baris bagi setiap pasangan baharu.
// Artikel yang tiada dalam senarai ini dianggap BM sahaja (tiada hreflang).

export type BlogLang = 'ms' | 'en';

const BASE_URL = 'https://ashrafnaim.my';

const PAIRS: { ms: string; en: string }[] = [
  { ms: 'gamma-atau-canva-untuk-slaid-guru', en: 'gamma-vs-canva-for-teachers' },
];

export function getBlogLang(slug: string): BlogLang {
  return PAIRS.some((p) => p.en === slug) ? 'en' : 'ms';
}

// Slug pasangan dalam bahasa lain, atau null jika artikel tiada pasangan.
export function getPairSlug(slug: string): string | null {
  const pair = PAIRS.find((p) => p.ms === slug || p.en === slug);
  if (!pair) return null;
  return pair.ms === slug ? pair.en : pair.ms;
}

// Peta hreflang untuk metadata Next.js dan sitemap.
// Setiap versi menyenaraikan dirinya dan pasangannya; x-default menunjuk ke versi BM.
export function getLanguageAlternates(slug: string): Record<string, string> | null {
  const pair = PAIRS.find((p) => p.ms === slug || p.en === slug);
  if (!pair) return null;
  return {
    ms: `${BASE_URL}/blog/${pair.ms}`,
    en: `${BASE_URL}/blog/${pair.en}`,
    'x-default': `${BASE_URL}/blog/${pair.ms}`,
  };
}

// Label antara muka halaman artikel.
export const BLOG_LABELS = {
  ms: {
    back: 'Kembali ke Blog',
    minRead: 'min bacaan',
    readOther: 'Read this article in English',
    editorNoteTitle: 'Nota penyunting:',
    editorNote:
      'Artikel ini disediakan dengan bantuan alat AI, kemudian disemak dan disunting oleh Ts. Ashraf bin Naim sebelum diterbitkan. Contoh dan saranan di dalamnya berdasarkan pengalaman sebenar dalam pentadbiran dan latihan pendidikan di Malaysia.',
    about: 'Tentang',
    authorBio:
      'Pendidik berpengalaman yang bersemangat tentang AI, EdTech, dan transformasi digital dalam pendidikan. Berkongsi insights dan pengalaman praktikal untuk membantu pendidik lain.',
    newsletterTitle: 'Suka artikel ini?',
    newsletterBody: 'Langgan newsletter untuk dapatkan artikel terkini terus ke inbox anda.',
    emailPlaceholder: 'Email anda...',
    subscribe: 'Langgan',
  },
  en: {
    back: 'Back to Blog',
    minRead: 'min read',
    readOther: 'Baca artikel ini dalam Bahasa Melayu',
    editorNoteTitle: "Editor's note:",
    editorNote:
      'This article was drafted with the help of AI tools, then reviewed and edited by Ts. Ashraf bin Naim before publication. The examples and recommendations are based on real experience in education administration and teacher training in Malaysia.',
    about: 'About',
    authorBio:
      'An educator and professional technologist who trains teachers to use AI and digital tools in their daily work.',
    newsletterTitle: 'Found this useful?',
    newsletterBody: 'Subscribe to get new articles in your inbox.',
    emailPlaceholder: 'Your email...',
    subscribe: 'Subscribe',
  },
} as const;
