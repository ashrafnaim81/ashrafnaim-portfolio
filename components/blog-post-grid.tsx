'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Eye, Search } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/futuristic/glass-card';
import { cn } from '@/lib/utils';

// Data ringkas yang disediakan di pelayan. Tarikh sudah diformat di pelayan supaya
// paparan sama di pelayan dan pelayar (zon waktu berbeza boleh menukar hari).
export interface BlogGridPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage: string | null;
  date: string;
  views: number;
  category: string | null;
  tags: string[];
  bilingual: boolean;
}

const ALL = 'Semua';

function normalise(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Carian dan tapisan kategori berjalan di pelayar; semua artikel BM sudah dimuatkan.
export function BlogPostGrid({ posts }: { posts: BlogGridPost[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => !!c))).sort()],
    [posts],
  );

  const visible = useMemo(() => {
    const words = normalise(query).split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (category !== ALL && p.category !== category) return false;
      if (words.length === 0) return true;
      const haystack = normalise([p.title, p.summary, p.category ?? '', ...p.tags].join(' '));
      return words.every((w) => haystack.includes(w));
    });
  }, [posts, query, category]);

  return (
    <>
      {/* Carian & tapisan */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari artikel..."
              aria-label="Cari artikel"
              className="w-full rounded-full border border-border/70 bg-card/70 py-2 pl-10 pr-4 backdrop-blur-md transition-shadow focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tapis mengikut kategori">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <Badge
                  variant={category === c ? 'default' : 'outline'}
                  className={cn('cursor-pointer transition-colors', category !== c && 'hover:bg-primary hover:text-primary-foreground')}
                >
                  {c}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid artikel */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Artikel Terkini</h2>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {visible.length} artikel
          </p>
        </div>

        {posts.length === 0 ? (
          <GlassCard className="py-12">
            <CardContent className="text-center">
              <p className="text-muted-foreground">Tiada artikel diterbitkan lagi.</p>
              <p className="text-sm text-muted-foreground mt-2">Sila semak semula kemudian.</p>
            </CardContent>
          </GlassCard>
        ) : visible.length === 0 ? (
          <GlassCard className="py-12">
            <CardContent className="text-center">
              <p className="text-muted-foreground">Tiada artikel yang sepadan dengan carian anda.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setQuery('');
                  setCategory(ALL);
                }}
              >
                Papar semua artikel
              </Button>
            </CardContent>
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {visible.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <GlassCard className="h-full overflow-hidden">
                  {post.coverImage && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                      <Eye className="h-4 w-4 ml-auto" />
                      <span>{post.views}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                    {post.bilingual && (
                      <span className="mt-2 w-fit rounded-full border border-border/70 px-2 py-0.5 text-xs text-muted-foreground">
                        BM · EN
                      </span>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.category && (
                        <Badge variant="default" className="text-xs">
                          {post.category}
                        </Badge>
                      )}
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full">
                      Baca Selanjutnya
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
