import type { BlogLang } from '@/lib/blog-i18n';

const TIME_ZONE = 'Asia/Kuala_Lumpur';
const LOCALE: Record<BlogLang, string> = { ms: 'ms-MY', en: 'en-GB' };

// Tarikh artikel dalam waktu Malaysia. Pelayan berjalan dalam UTC, jadi tanpa zon waktu ini
// artikel yang diterbitkan selepas 4 petang UTC kelihatan sehari lebih awal.
export function formatBlogDate(date: Date, lang: BlogLang = 'ms', month: 'long' | 'short' = 'long') {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: TIME_ZONE,
    day: '2-digit',
    month,
    year: 'numeric',
  }).format(date);
}

// Anggaran minit bacaan daripada bilangan perkataan (200 patah perkataan seminit),
// bukan panjang HTML yang turut mengira tag dan atribut.
export function readingMinutes(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
