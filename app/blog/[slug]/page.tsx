import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft, Eye, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import sanitizeHtml from 'sanitize-html';
import { BLOG_LABELS, getBlogLang, getLanguageAlternates, getPairSlug } from '@/lib/blog-i18n';
import { BlogLanguageToggle } from '@/components/blog-language-toggle';
import { getMergedTarget } from '@/lib/blog-redirects';
import { getRelatedPosts } from '@/lib/related-posts';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_URL = 'https://ashrafnaim.my';
// Profil awam yang sama dengan pautan di footer.
const AUTHOR_SAME_AS = [
  'https://www.facebook.com/ashraf.naim.9/',
  'https://www.youtube.com/c/AshrafNaim',
  'https://www.linkedin.com/in/AshrafNaim81/',
];

function absoluteUrl(path: string) {
  return path.startsWith('/') ? `${SITE_URL}${path}` : path;
}

async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      category: true,
      tags: true,
    },
  });

  if (!post) {
    return null;
  }

  // Tambah kiraan views dengan SQL terus. prisma.blogPost.update akan mengemas kini
  // updatedAt (@updatedAt) pada setiap paparan, lalu dateModified dan og:modifiedTime
  // berubah walaupun kandungan tidak disunting.
  await prisma.$executeRaw`UPDATE "BlogPost" SET views = views + 1 WHERE id = ${post.id}`;

  return post;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    select: {
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const languages = getLanguageAlternates(slug);
  const url = `${SITE_URL}/blog/${slug}`;
  const description = post.excerpt || post.title;
  // Pratonton Facebook/WhatsApp memerlukan URL gambar penuh.
  const image = post.coverImage ? absoluteUrl(post.coverImage) : undefined;

  // openGraph dan twitter mesti ditetapkan di sini: jika tidak, artikel
  // mewarisi tajuk, URL dan ringkasan laman utama daripada app/layout.tsx.
  return {
    title: `${post.title} - Ts. Ashraf bin Naim`,
    description,
    alternates: {
      canonical: url,
      ...(languages && { languages }),
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      siteName: 'Ts. Ashraf bin Naim Portfolio',
      locale: getBlogLang(slug) === 'en' ? 'en_GB' : 'ms_MY',
      publishedTime: (post.publishedAt || post.createdAt).toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ['Ts. Ashraf bin Naim'],
      ...(image && { images: [{ url: image, alt: post.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    // Artikel lama yang telah digabungkan: ubah hala kekal ke artikel simpan.
    const target = getMergedTarget(slug);
    if (target) permanentRedirect(`/blog/${target}`);
    notFound();
  }

  const lang = getBlogLang(slug);
  const t = BLOG_LABELS[lang];
  const pairSlug = getPairSlug(slug);
  const related = await getRelatedPosts(post);

  // Data berstruktur schema.org: penulis, tarikh dan bahasa untuk Google.
  // Nama penulis diambil daripada pangkalan data supaya sepadan dengan byline.
  const url = `${SITE_URL}/blog/${slug}`;
  const authorName = post.author.name || 'Ts. Ashraf bin Naim';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt || post.title,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        inLanguage: lang === 'en' ? 'en-GB' : 'ms-MY',
        datePublished: (post.publishedAt || post.createdAt).toISOString(),
        dateModified: post.updatedAt.toISOString(),
        ...(post.coverImage && { image: [absoluteUrl(post.coverImage)] }),
        author: {
          '@type': 'Person',
          name: authorName,
          url: `${SITE_URL}/about`,
          sameAs: AUTHOR_SAME_AS,
        },
        publisher: { '@type': 'Person', name: authorName, url: SITE_URL },
        ...(post.category && { articleSection: post.category.name }),
        ...(post.tags.length > 0 && { keywords: post.tags.map((tag) => tag.name).join(', ') }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Utama', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        // Tukar '<' supaya teks artikel tidak boleh menutup tag skrip.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.back}
          </Button>
        </Link>
        {pairSlug && <BlogLanguageToggle lang={lang} pairSlug={pairSlug} />}
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto" lang={lang}>
        <header className="mb-8">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <Badge variant="default" className="text-sm">
                {post.category.name}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name || 'Admin'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.publishedAt || post.createdAt), 'dd MMMM yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{Math.ceil(post.content.length / 1000)} {t.minRead}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{post.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}

          <hr className="border-t" />
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div
          // Jadual lebar ditatal mendatar dalam kotaknya sendiri, dan video YouTube (width="560")
          // mengecil ikut skrin pada nisbah 16:9, supaya halaman tidak melimpah di telefon.
          className="prose prose-lg dark:prose-invert max-w-none mb-12 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:h-auto [&_iframe]:aspect-video"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.content, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                'img', 'iframe', 'video', 'audio', 'source',
                'h1', 'h2', 'figure', 'figcaption',
              ]),
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                a: ['href', 'name', 'target', 'rel', 'class', 'style'],
                img: ['src', 'alt', 'title', 'width', 'height', 'class', 'style'],
                iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'title'],
                video: ['src', 'controls', 'width', 'height', 'class'],
                audio: ['src', 'controls', 'class'],
                source: ['src', 'type'],
                '*': ['class', 'id', 'style'],
              },
              allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'player.vimeo.com', 'www.slideshare.net'],
            }),
          }}
        />

        <hr className="border-t mb-8" />

        {/* Nota penyunting: pendedahan penggunaan AI.
            Dasar Google membenarkan kandungan berbantukan AI, tetapi menuntut
            semakan manusia dan nilai tambah yang jelas. Nota ini menyatakan
            kedua-duanya secara terbuka pada setiap artikel. */}
        <p className="text-sm text-muted-foreground border-l-2 border-secondary pl-4 mb-8">
          <strong className="text-foreground">{t.editorNoteTitle}</strong> {t.editorNote}
        </p>

        {/* Author Info */}
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {post.author.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  {t.about} {post.author.name || 'Penulis'}
                </h3>
                <p className="text-muted-foreground">
                  {t.authorBio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Artikel berkaitan: bahasa sama, topik paling hampir (lib/related-posts.ts) */}
      {related.length > 0 && (
        <section className="mt-16 max-w-4xl mx-auto" lang={lang}>
          <h2 className="text-2xl font-bold mb-6">{t.related}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-lg">
                  {r.coverImage && (
                    <img
                      src={r.coverImage}
                      alt={r.title}
                      loading="lazy"
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <CardContent className="pt-4">
                    <h3 className="font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    {r.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{r.excerpt}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <div className="mt-16 max-w-2xl mx-auto">
        <Card className="bg-muted">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-2">{t.newsletterTitle}</h3>
            <p className="text-muted-foreground mb-6">
              {t.newsletterBody}
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="flex-1 px-4 py-2 border rounded-md bg-background"
              />
              <Button>{t.subscribe}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
