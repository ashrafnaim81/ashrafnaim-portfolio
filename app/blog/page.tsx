import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Search, Eye } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

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

  return posts;
}

async function getFeaturedPost() {
  // Get the most viewed published post as featured
  const post = await prisma.blogPost.findFirst({
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
      views: 'desc',
    },
  });

  return post;
}

export default async function BlogPage() {
  const [posts, featuredPost] = await Promise.all([
    getBlogPosts(),
    getFeaturedPost(),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Perkongsian ilmu tentang AI, EdTech, dan transformasi digital dalam pendidikan
        </p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari artikel..."
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
            />
          </div>
          <div className="flex gap-2">
            {blogCategories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-4xl mx-auto mb-12">
          <Link href={`/blog/${featuredPost.slug}`}>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-primary to-secondary p-8 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <Badge className="bg-white text-primary">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(featuredPost.publishedAt || featuredPost.createdAt), 'dd MMM yyyy')}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{Math.ceil(featuredPost.content.length / 1000)} min bacaan</span>
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
            </Card>
          </Link>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Artikel Terkini</h2>

        {posts.length === 0 ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <p className="text-muted-foreground">Tiada artikel diterbitkan lagi.</p>
              <p className="text-sm text-muted-foreground mt-2">Sila semak semula kemudian.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.filter((post) => post.id !== featuredPost?.id).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(post.publishedAt || post.createdAt), 'dd MMM yyyy')}</span>
                      <Eye className="h-4 w-4 ml-auto" />
                      <span>{post.views}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.category && (
                        <Badge variant="default" className="text-xs">
                          {post.category.name}
                        </Badge>
                      )}
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full">
                      Baca Selanjutnya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}


        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Muat Lebih Banyak Artikel
          </Button>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 max-w-2xl mx-auto">
        <Card className="bg-muted">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Langgan Newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Dapatkan artikel terkini terus ke inbox anda. Tips, tutorial, dan insights
              tentang AI & EdTech setiap minggu.
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

const blogCategories = ['Semua', 'AI', 'EdTech', 'Tutorial', 'Tips'];
