import { prisma } from '@/lib/prisma';
import { getBlogLang } from '@/lib/blog-i18n';

// Perkataan slug yang terlalu umum untuk menunjukkan topik yang sama.
const STOPWORDS = new Set([
  'untuk', 'guru', 'dengan', 'yang', 'dalam', 'lebih', 'cara', 'anda', 'murid', 'pantas', 'kelas',
  'panduan', 'ringkasan', 'ulasan', 'analisis', 'automasi', 'cipta', 'hasilkan', 'jadikan', 'kuasai',
  'lengkap', 'menarik', 'tips', 'idea', 'aktiviti', 'minit', 'beberapa', 'tinggi', 'berkualiti',
  'permudah', 'tugas', 'harian', 'transformasi',
  'teachers', 'teacher', 'guide', 'review', 'with', 'from', 'about',
]);

function topicWords(slug: string): Set<string> {
  return new Set(slug.split('-').filter((w) => w.length >= 4 && !STOPWORDS.has(w)));
}

export interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
}

// Tiga artikel diterbitkan dalam bahasa yang sama, disusun mengikut topik yang paling hampir:
// perkataan slug yang sama (isyarat paling kuat), tag yang sama, kategori yang sama, kemudian terbaru.
export async function getRelatedPosts(
  current: { id: string; slug: string; categoryId: string | null; tags: { id: string }[] },
  limit = 3,
): Promise<RelatedPost[]> {
  const candidates = await prisma.blogPost.findMany({
    where: { published: true, id: { not: current.id } },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      categoryId: true,
      publishedAt: true,
      createdAt: true,
      tags: { select: { id: true } },
    },
  });

  const lang = getBlogLang(current.slug);
  const words = topicWords(current.slug);
  const tagIds = new Set(current.tags.map((t) => t.id));

  return candidates
    .filter((p) => getBlogLang(p.slug) === lang)
    .map((p) => {
      const sharedWords = [...topicWords(p.slug)].filter((w) => words.has(w)).length;
      const sharedTags = p.tags.filter((t) => tagIds.has(t.id)).length;
      const sameCategory = current.categoryId !== null && p.categoryId === current.categoryId ? 1 : 0;
      return { p, score: sharedWords * 3 + sharedTags * 2 + sameCategory };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.p.publishedAt || b.p.createdAt).getTime() - (a.p.publishedAt || a.p.createdAt).getTime(),
    )
    .slice(0, limit)
    .map(({ p }) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, coverImage: p.coverImage }));
}
