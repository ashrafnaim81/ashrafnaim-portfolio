import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Award,
  GraduationCap,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                Teknologis Profesional MBOT
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Ts. Ashraf bin Naim
              </h1>

              <p className="text-xl text-muted-foreground">
                Penolong Pegawai PPD Unit Menengah & Tingkatan 6, Sektor Pengurusan Sekolah di{' '}
                <span className="text-primary font-semibold">
                  Pejabat Pendidikan Daerah Kluang
                </span>
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Berpengalaman dalam AI, EdTech, dan transformasi digital dalam pendidikan.
                Pendidik dan pegawai yang bersemangat untuk memajukan pendidikan melalui teknologi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Hubungi Saya
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Lihat Profil Lengkap</Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
                <Image
                  src="/images/profile/profile.png"
                  alt="Ts. Ashraf bin Naim"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">19+</p>
              <p className="text-sm text-muted-foreground mt-2">Tahun Pengalaman</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">25+</p>
              <p className="text-sm text-muted-foreground mt-2">Bengkel & Ceramah</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground mt-2">Pensijilan</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">5+</p>
              <p className="text-sm text-muted-foreground mt-2">Sistem Dibangunkan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pencapaian Terkini</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sumbangan dan pengiktirafan terkini dalam bidang pendidikan dan teknologi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold">Teknologis Profesional</h3>
                <p className="text-sm text-muted-foreground">2025</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pengiktirafan profesional dalam bidang Komputer & Teknologi Maklumat oleh MBOT
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-secondary mb-2" />
                <h3 className="font-semibold">Penceramah AI</h3>
                <p className="text-sm text-muted-foreground">2024-2025</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Penceramah untuk kursus AI dalam pendidikan kepada pegawai dan guru di Johor
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold">Pentadbir Sistem</h3>
                <p className="text-sm text-muted-foreground">2022-2025</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pentadbir DELIMa, Portal JPNJ, dan sistem pendidikan negeri Johor
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bidang Kepakaran</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kemahiran dan teknologi yang saya kuasai
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <Badge variant="secondary" className="w-fit">{skill.level}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mari Berkolaborasi</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Berminat untuk kerjasama, bengkel, atau perkongsian ilmu?
            Jangan teragak-agak untuk menghubungi saya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">
                Hubungi Saya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/portfolio">Lihat Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const skills = [
  {
    name: 'Microsoft 365',
    level: 'Advanced',
    description: 'Power Platform, Teams, SharePoint',
  },
  {
    name: 'Google Workspace',
    level: 'Expert',
    description: 'Certified Educator Level 1 & 2',
  },
  {
    name: 'Apple Ecosystem',
    level: 'Advanced',
    description: 'Apple Teacher, macOS, iOS',
  },
  {
    name: 'AI dalam Pendidikan',
    level: 'Expert',
    description: 'AI tools, Canva AI, ChatGPT',
  },
  {
    name: 'Video Editing',
    level: 'Advanced',
    description: 'Multimedia production',
  },
  {
    name: 'Rekaan Grafik',
    level: 'Advanced',
    description: 'Canva, Adobe Creative Suite',
  },
];
