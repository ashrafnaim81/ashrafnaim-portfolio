import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react';
import { GlassCard } from '@/components/futuristic/glass-card';
import { PageHero } from '@/components/futuristic/page-hero';
import { BlogPostGrid, type BlogGridPost } from '@/components/blog-post-grid';
import { prisma } from '@/lib/prisma';
import { getPairSlug, isTranslation } from '@/lib/blog-i18n';
import { formatBlogDate, readingMinutes } from '@/lib/blog-format';

export const metadata: Metadata = {
  title: 'Blog - Ts. Ashraf bin Naim',
  description: 'Artikel dan pemikiran tentang AI, EdTech, dan transformasi digital dalam pendidikan',
};

// Force dynamic rendering to always show fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      category: true,
      tags: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  // Grid utama: satu kad bagi setiap artikel BM. Versi EN disenaraikan berasingan
  // di bahagian "Articles in English" supaya pembaca berbahasa Inggeris boleh menemuinya.
  return {
    posts: posts.filter((post) => !isTranslation(post.slug)),
    englishPosts: posts.filter((post) => isTranslation(post.slug)),
  };
}

async function getFeaturedPost() {
  // Get the post marked as featured by admin
  const post = await prisma.blogPost.findFirst({
    where: {
      published: true,
      featured: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      category: true,
      tags: true,
    },
  });

  return post;
}

export default async function BlogPage() {
  const [{ posts, englishPosts }, featuredPost] = await Promise.all([
    getBlogPosts(),
    getFeaturedPost(),
  ]);

  // Data ringkas untuk grid klien: tanpa kandungan HTML penuh, tarikh sudah diformat.
  const gridPosts: BlogGridPost[] = posts
    .filter((post) => post.id !== featuredPost?.id)
    .map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      summary:
        post.excerpt ||
        post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150) + '...',
      coverImage: post.coverImage,
      date: formatBlogDate(post.publishedAt || post.createdAt, 'ms', 'short'),
      views: post.views,
      category: post.category?.name ?? null,
      tags: post.tags.map((tag) => tag.name),
      bilingual: getPairSlug(post.slug) !== null,
    }));

  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="Blog"
        description="Perkongsian ilmu tentang AI, EdTech, dan transformasi digital dalam pendidikan"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-4xl mx-auto mb-12">
          <Link href={`/blog/${featuredPost.slug}`}>
            <GlassCard className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[220px] md:min-h-full bg-gradient-to-br from-primary to-secondary">
                  {featuredPost.coverImage && (
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  )}
                  <Badge className="absolute top-4 left-4 bg-white text-primary shadow-sm">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{formatBlogDate(featuredPost.publishedAt || featuredPost.createdAt, 'ms', 'short')}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{readingMinutes(featuredPost.content)} min bacaan</span>
                    <Eye className="h-4 w-4 ml-2" />
                    <span>{featuredPost.views} views</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredPost.excerpt || featuredPost.content.substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    {featuredPost.category && (
                      <Badge>{featuredPost.category.name}</Badge>
                    )}
                    {featuredPost.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag.id} variant="outline">{tag.name}</Badge>
                    ))}
                  </div>
                  <Button className="w-fit">
                    Baca Artikel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </GlassCard>
          </Link>
        </div>
      )}

      <BlogPostGrid posts={gridPosts} />

      {/* Articles in English: versi EN bagi artikel berpasangan (lib/blog-i18n.ts) */}
      {englishPosts.length > 0 && (
        <section className="max-w-6xl mx-auto mt-16" lang="en">
          <h2 className="text-2xl font-bold mb-2">Articles in English</h2>
          <p className="text-muted-foreground mb-6">English versions of selected guides for teachers.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {englishPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <GlassCard className="h-full overflow-hidden">
                  <div className="flex items-center gap-4 p-3">
                    {post.coverImage && (
                      <div className="relative aspect-[16/9] w-28 shrink-0 overflow-hidden rounded-md">
                        <Image src={post.coverImage} alt={post.title} fill sizes="112px" className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatBlogDate(post.publishedAt || post.createdAt, 'en', 'short')}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}

