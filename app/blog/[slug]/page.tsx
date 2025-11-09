import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft, Eye, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
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

  // Increment view count
  await prisma.blogPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  return post;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Ts. Ashraf bin Naim`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Blog
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto">
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
              <span>{Math.ceil(post.content.length / 1000)} min bacaan</span>
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
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr className="border-t mb-8" />

        {/* Author Info */}
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {post.author.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  Tentang {post.author.name || 'Penulis'}
                </h3>
                <p className="text-muted-foreground">
                  Pendidik berpengalaman yang bersemangat tentang AI, EdTech, dan transformasi digital dalam pendidikan.
                  Berkongsi insights dan pengalaman praktikal untuk membantu pendidik lain.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Newsletter CTA */}
      <div className="mt-16 max-w-2xl mx-auto">
        <Card className="bg-muted">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Suka artikel ini?</h3>
            <p className="text-muted-foreground mb-6">
              Langgan newsletter untuk dapatkan artikel terkini terus ke inbox anda.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email anda..."
                className="flex-1 px-4 py-2 border rounded-md bg-background"
              />
              <Button>Langgan</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
