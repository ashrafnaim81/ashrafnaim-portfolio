import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Award,
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'About - Ts. Ashraf bin Naim',
  description: 'Profil lengkap Ts. Ashraf bin Naim - Teknologis Profesional dalam bidang Pendidikan & Teknologi Maklumat',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Saya</h1>
          <p className="text-xl text-muted-foreground">
            Teknologis Profesional dalam bidang Pendidikan & Teknologi Maklumat
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src="/images/profile/profile.png"
                    alt="Ts. Ashraf bin Naim"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Ts. Ashraf bin Naim</h2>
                  <Badge className="mb-4">Teknologis Profesional MBOT</Badge>

                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Penolong Pegawai PPD Unit Menengah & Tingkatan 6</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Pejabat Pendidikan Daerah Kluang, Johor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Link href="/contact" className="text-primary hover:underline">
                        Hubungi melalui Contact Form
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>19+ Tahun Pengalaman dalam Pendidikan</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Ringkasan Profesional</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Seorang pendidik berpengalaman dan teknologis profesional yang bersemangat
                    dalam memajukan pendidikan melalui teknologi. Berpengalaman luas dalam
                    AI, EdTech, dan transformasi digital dalam pendidikan dengan lebih 19 tahun
                    pengalaman dalam sektor pendidikan.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Qualifications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Kelayakan Profesional</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold text-lg">Teknologis Profesional</h3>
                <p className="text-sm text-muted-foreground">MBOT (2025)</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pengiktirafan profesional dalam bidang Komputer & Teknologi Maklumat
                  oleh Malaysian Board of Technologists
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-secondary mb-2" />
                <h3 className="font-semibold text-lg">Google Certified Educator</h3>
                <p className="text-sm text-muted-foreground">Level 1 & Level 2</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Certified dalam Google Workspace for Education dan Google tools
                  untuk pembelajaran digital
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-semibold text-lg">Apple Teacher</h3>
                <p className="text-sm text-muted-foreground">Apple Inc.</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Certified dalam penggunaan teknologi Apple untuk pendidikan
                  (iPad, Mac, dan pembelajaran digital)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-secondary mb-2" />
                <h3 className="font-semibold text-lg">Microsoft Specialist</h3>
                <p className="text-sm text-muted-foreground">Microsoft 365</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pakar dalam Microsoft 365, Power Platform, Teams, dan
                  SharePoint untuk transformasi digital
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Bidang Kepakaran</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">{area.title}</h4>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Pengalaman Profesional</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.organization}</p>
                        </div>
                        <Badge variant="secondary">{exp.period}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Pencapaian & Sumbangan</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Bengkel & Ceramah
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Penceramah AI dalam Pendidikan (25+ sesi)</li>
                    <li>• Fasilitator Google Workspace untuk Pendidik</li>
                    <li>• Trainer Microsoft 365 untuk Sekolah</li>
                    <li>• Workshop Canva AI untuk Guru</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-secondary" />
                    Sistem & Projek
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Pentadbir DELIMa Negeri Johor</li>
                    <li>• Pentadbir Portal JPNJ</li>
                    <li>• Pembangunan Sistem Pengurusan Sekolah</li>
                    <li>• Implementasi Digital Learning Platform</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

const expertiseAreas = [
  {
    title: 'AI dalam Pendidikan',
    description: 'ChatGPT, Canva AI, AI tools untuk pembelajaran',
  },
  {
    title: 'Microsoft 365',
    description: 'Power Platform, Teams, SharePoint',
  },
  {
    title: 'Google Workspace',
    description: 'Google Classroom, Drive, Apps Script',
  },
  {
    title: 'Apple Ecosystem',
    description: 'iPad, Mac, Apple Teacher certification',
  },
  {
    title: 'EdTech Solutions',
    description: 'Digital learning platforms & tools',
  },
  {
    title: 'Transformasi Digital',
    description: 'Change management & digital adoption',
  },
  {
    title: 'Video Production',
    description: 'Multimedia content creation',
  },
  {
    title: 'Graphic Design',
    description: 'Canva, Adobe Creative Suite',
  },
  {
    title: 'Sistem Pengurusan',
    description: 'Database, web applications',
  },
];

const experiences = [
  {
    title: 'Penolong Pegawai PPD Unit Menengah & Tingkatan 6',
    organization: 'Pejabat Pendidikan Daerah Kluang',
    period: '2022 - Kini',
    description: 'Pengurusan sekolah menengah dan tingkatan 6, pentadbiran sistem pendidikan, dan transformasi digital di peringkat daerah.',
  },
  {
    title: 'Penceramah & Fasilitator',
    organization: 'Kursus AI dalam Pendidikan',
    period: '2024 - 2025',
    description: 'Penceramah untuk kursus AI dalam pendidikan kepada pegawai dan guru di seluruh negeri Johor.',
  },
  {
    title: 'Pentadbir Sistem',
    organization: 'DELIMa & Portal JPNJ',
    period: '2022 - Kini',
    description: 'Pengurusan dan pentadbiran sistem DELIMa dan Portal JPNJ untuk negeri Johor.',
  },
  {
    title: 'Pendidik',
    organization: 'Kementerian Pendidikan Malaysia',
    period: '2006 - Kini',
    description: '19+ tahun pengalaman dalam pendidikan, mengajar dan membimbing pelajar serta guru.',
  },
];
