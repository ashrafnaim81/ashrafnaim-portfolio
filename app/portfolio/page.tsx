import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio - Ts. Ashraf bin Naim',
  description: 'Portfolio projek dan sistem yang dibangunkan oleh Ts. Ashraf bin Naim',
};

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Projek dan sistem yang telah dibangunkan untuk memajukan pendidikan
          melalui teknologi
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            {category}
          </Badge>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center text-white font-bold text-xl`}>
                  {project.icon}
                </div>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
              <CardTitle className="text-xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {project.link && (
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={project.link} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Project
                    </Link>
                  </Button>
                </div>
              )}

              {project.impact && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-primary">Impact:</strong> {project.impact}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">Ada Projek untuk Saya?</h2>
            <p className="mb-6 opacity-90">
              Saya sedia untuk membantu dalam projek transformasi digital,
              sistem pendidikan, atau pembangunan aplikasi.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Hubungi Saya</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const categories = [
  'Semua',
  'Sistem Pendidikan',
  'Web Development',
  'AI & Automation',
  'Training & Workshop',
  'Content Creation',
];

const projects = [
  {
    title: 'Sistem DELIMa Negeri Johor',
    description: 'Pentadbiran dan pengurusan sistem DELIMa untuk semua sekolah di Johor. Dashboard analytics, laporan, dan pengurusan data.',
    category: 'Sistem Pendidikan',
    tags: ['Dashboard', 'Analytics', 'Database Management'],
    color: 'from-blue-500 to-blue-600',
    icon: '📊',
    impact: '500+ sekolah di Johor menggunakan sistem ini',
  },
  {
    title: 'Portal JPNJ',
    description: 'Portal rasmi Jabatan Pendidikan Negeri Johor dengan sistem pengurusan dokumen, pengumuman, dan integrasi aplikasi.',
    category: 'Sistem Pendidikan',
    tags: ['Portal', 'CMS', 'Document Management'],
    color: 'from-green-500 to-green-600',
    icon: '🌐',
    impact: '10,000+ pengguna aktif',
  },
  {
    title: 'AI Training Materials',
    description: 'Pembangunan bahan latihan AI untuk pendidik termasuk slides, video tutorial, dan hands-on activities untuk ChatGPT dan Canva AI.',
    category: 'AI & Automation',
    tags: ['AI', 'ChatGPT', 'Canva AI', 'Training'],
    color: 'from-purple-500 to-purple-600',
    icon: '🤖',
    impact: '1,000+ guru terlatih',
  },
  {
    title: 'Digital Learning Platform',
    description: 'Platform pembelajaran digital untuk sekolah dengan integrasi Google Workspace, Microsoft 365, dan tools pembelajaran interaktif.',
    category: 'Sistem Pendidikan',
    tags: ['EdTech', 'Google Workspace', 'Microsoft 365'],
    color: 'from-orange-500 to-orange-600',
    icon: '📚',
    impact: '50+ sekolah menggunakan platform',
  },
  {
    title: 'Sistem Pengurusan Sekolah',
    description: 'Sistem pengurusan komprehensif untuk sekolah menengah meliputi kehadiran, peperiksaan, kokurikulum, dan laporan.',
    category: 'Sistem Pendidikan',
    tags: ['School Management', 'Database', 'Reporting'],
    color: 'from-red-500 to-red-600',
    icon: '🏫',
    impact: '20+ sekolah di Kluang',
  },
  {
    title: 'Workshop Video Production',
    description: 'Bengkel pengeluaran video untuk pendidik menggunakan smartphone dan tools percuma. Termasuk shooting, editing, dan publishing.',
    category: 'Training & Workshop',
    tags: ['Video Editing', 'CapCut', 'Content Creation'],
    color: 'from-pink-500 to-pink-600',
    icon: '🎥',
    impact: '500+ guru terlatih',
  },
  {
    title: 'Canva AI for Educators',
    description: 'Workshop intensif menggunakan Canva AI untuk menghasilkan bahan pengajaran berkualiti tinggi dengan AI.',
    category: 'Training & Workshop',
    tags: ['Canva', 'AI', 'Graphic Design'],
    color: 'from-cyan-500 to-cyan-600',
    icon: '🎨',
    impact: '800+ guru menggunakan Canva AI',
  },
  {
    title: 'Google Workspace Automation',
    description: 'Automasi workflow sekolah menggunakan Google Apps Script, Google Forms, dan Google Sheets untuk efficiency.',
    category: 'AI & Automation',
    tags: ['Google Apps Script', 'Automation', 'Workflow'],
    color: 'from-yellow-500 to-yellow-600',
    icon: '⚡',
    impact: '100+ automasi workflows dibangunkan',
  },
  {
    title: 'Microsoft Teams for Schools',
    description: 'Implementasi dan training Microsoft Teams untuk pembelajaran hibrid dan pengurusan kelas digital.',
    category: 'Training & Workshop',
    tags: ['Microsoft Teams', 'Hybrid Learning', 'Collaboration'],
    color: 'from-indigo-500 to-indigo-600',
    icon: '💬',
    impact: '30+ sekolah menggunakan Teams',
  },
  {
    title: 'Educational Content Library',
    description: 'Perpustakaan digital dengan 1000+ video pembelajaran, template, dan resources untuk guru di Johor.',
    category: 'Content Creation',
    tags: ['Video', 'Templates', 'Resources'],
    color: 'from-teal-500 to-teal-600',
    icon: '📖',
    impact: '5,000+ downloads',
  },
  {
    title: 'Data Analytics Dashboard',
    description: 'Dashboard analytics real-time untuk pemantauan prestasi pelajar, kehadiran, dan trend menggunakan Power BI.',
    category: 'Sistem Pendidikan',
    tags: ['Power BI', 'Analytics', 'Data Visualization'],
    color: 'from-amber-500 to-amber-600',
    icon: '📈',
    impact: 'Digunakan oleh PPD Kluang',
  },
  {
    title: 'Website Portfolio (Ini!)',
    description: 'Portfolio website modern yang anda tengok sekarang, dibangunkan dengan Next.js 15, TypeScript, dan Tailwind CSS.',
    category: 'Web Development',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-slate-500 to-slate-600',
    icon: '🚀',
    link: 'https://ashrafnaim.my',
    impact: 'Professional web presence',
  },
];
