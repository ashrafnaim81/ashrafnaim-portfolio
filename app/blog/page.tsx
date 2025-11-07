import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Ts. Ashraf bin Naim',
  description: 'Artikel dan pemikiran tentang AI, EdTech, dan transformasi digital dalam pendidikan',
};

export default function BlogPage() {
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
      <div className="max-w-4xl mx-auto mb-12">
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
                <span>15 Mac 2025</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>8 min bacaan</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">
                Panduan Lengkap: Menggunakan AI dalam Bilik Darjah
              </h2>
              <p className="text-muted-foreground mb-4">
                Panduan praktikal bagaimana guru boleh mengintegrasikan AI tools seperti ChatGPT
                dan Canva AI dalam pengajaran harian untuk meningkatkan engagement pelajar...
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Badge>AI dalam Pendidikan</Badge>
                <Badge variant="outline">Tutorial</Badge>
              </div>
              <Button className="w-fit">
                Baca Artikel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Artikel Terkini</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                  <Clock className="h-4 w-4 ml-auto" />
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  Baca Selanjutnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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

const blogPosts = [
  {
    title: '5 Cara ChatGPT Boleh Membantu Guru Setiap Hari',
    excerpt: 'Discover praktikal ways untuk menggunakan ChatGPT dalam perancangan pengajaran, penilaian, dan pengurusan kelas. Dengan contoh prompt yang boleh digunakan terus.',
    date: '10 Mac 2025',
    readTime: '5 min',
    tags: ['AI', 'ChatGPT', 'Tips'],
  },
  {
    title: 'Canva AI: Game Changer untuk Bahan Pengajaran',
    excerpt: 'Bagaimana Canva AI dapat menghasilkan poster, infografik, dan bahan visual yang professional dalam minit. Tutorial lengkap dengan gambar step-by-step.',
    date: '5 Mac 2025',
    readTime: '7 min',
    tags: ['Canva AI', 'Design', 'Tutorial'],
  },
  {
    title: 'Google Classroom vs Microsoft Teams: Mana Lebih Baik?',
    excerpt: 'Perbandingan mendalam antara dua platform pembelajaran popular. Features, kelebihan, kekurangan, dan recommendation berdasarkan saiz sekolah.',
    date: '1 Mac 2025',
    readTime: '10 min',
    tags: ['Google Workspace', 'Microsoft 365', 'Comparison'],
  },
  {
    title: 'Automasi Workflow Sekolah dengan Apps Script',
    excerpt: 'Tutorial hands-on untuk automasi tasks berulang seperti attendance tracking, grade calculation, dan report generation menggunakan Google Apps Script.',
    date: '25 Feb 2025',
    readTime: '12 min',
    tags: ['Automation', 'Google Apps Script', 'Tutorial'],
  },
  {
    title: 'Digital Transformation: Dari Mana Nak Mula?',
    excerpt: 'Panduan praktikal untuk sekolah yang ingin memulakan perjalanan transformasi digital. Langkah demi langkah dengan real examples dari sekolah di Johor.',
    date: '20 Feb 2025',
    readTime: '8 min',
    tags: ['Digital Transformation', 'EdTech', 'Strategy'],
  },
  {
    title: 'Power BI untuk Pendidik: Visualize Data dengan Mudah',
    excerpt: 'Cara menggunakan Power BI untuk create dashboard yang beautiful dan insightful untuk track student performance, attendance, dan school metrics.',
    date: '15 Feb 2025',
    readTime: '9 min',
    tags: ['Power BI', 'Analytics', 'Tutorial'],
  },
  {
    title: 'Hybrid Learning: Best Practices dari Pengalaman Lapangan',
    excerpt: 'Lessons learned dari implementation hybrid learning di 30+ sekolah. Apa yang berjaya, apa yang gagal, dan recommendations untuk sekolah lain.',
    date: '10 Feb 2025',
    readTime: '11 min',
    tags: ['Hybrid Learning', 'Best Practices', 'EdTech'],
  },
  {
    title: 'Cybersecurity untuk Sekolah: Asas yang Perlu Tahu',
    excerpt: 'Panduan asas cybersecurity untuk protect student data, school systems, dan prevent common threats. Practical tips yang senang implement.',
    date: '5 Feb 2025',
    readTime: '6 min',
    tags: ['Cybersecurity', 'Safety', 'Tips'],
  },
  {
    title: 'Video Production untuk Pendidik: Smartphone Sudah Cukup!',
    excerpt: 'Anda tidak perlu equipment mahal untuk produce video pembelajaran quality. Panduan lengkap dari shooting hingga editing dengan smartphone.',
    date: '1 Feb 2025',
    readTime: '10 min',
    tags: ['Video Production', 'Tutorial', 'Content Creation'],
  },
];
