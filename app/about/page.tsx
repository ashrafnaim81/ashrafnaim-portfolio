import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Award,
  GraduationCap,
  Briefcase,
  MapPin,
  Mail,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { GlassCard } from '@/components/futuristic/glass-card';
import { PageHero } from '@/components/futuristic/page-hero';
import { SectionHeading } from '@/components/futuristic/section-heading';

export const metadata: Metadata = {
  title: 'About - Ts. Ashraf bin Naim',
  description: 'Profil lengkap Ts. Ashraf bin Naim - Teknologis Profesional dalam bidang Pendidikan & Teknologi Maklumat',
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getAboutPageData() {
  const aboutPage = await prisma.aboutPage.findFirst({
    where: { published: true },
  });

  if (!aboutPage) {
    return null;
  }

  return {
    ...aboutPage,
    qualifications: aboutPage.qualifications ? JSON.parse(aboutPage.qualifications) : [],
    expertiseAreas: aboutPage.expertiseAreas ? JSON.parse(aboutPage.expertiseAreas) : [],
    experiences: aboutPage.experiences ? JSON.parse(aboutPage.experiences) : [],
    achievements: aboutPage.achievements ? JSON.parse(aboutPage.achievements) : [],
  };
}

// Icon mapping
const iconMap: Record<string, any> = {
  Award: Award,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
};

export default async function AboutPage() {
  const data = await getAboutPageData();

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">About page content is not available.</p>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        eyebrow="Profil"
        title={data.profileTitle}
        description={data.profileSubtitle}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <GlassCard className="mb-12">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden ring-1 ring-primary/25 glow-ring">
                  {data.profileImage && (
                    <Image
                      src={data.profileImage}
                      alt={data.profileTitle}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{data.profileTitle}</h2>
                  <Badge className="mb-4">Teknologis Profesional MBOT</Badge>

                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{data.profileJobTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{data.profileLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Link href="/contact" className="text-primary hover:underline">
                        Hubungi melalui Contact Form
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{data.profileYearsExperience}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Ringkasan Profesional</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {data.profileSummary}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>

        {/* Professional Qualifications */}
        <section className="mb-12">
          <SectionHeading eyebrow="Kelayakan" title="Kelayakan Profesional" align="left" className="mb-6" />
          <div className="grid md:grid-cols-2 gap-6">
            {data.qualifications.map((qual: any, index: number) => {
              const Icon = iconMap[qual.icon] || Award;
              return (
                <GlassCard key={index}>
                  <CardHeader>
                    <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-xl ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg">{qual.title}</h3>
                    <p className="text-sm text-muted-foreground">{qual.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {qual.description}
                    </p>
                  </CardContent>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="mb-12">
          <SectionHeading eyebrow="Kepakaran" title="Bidang Kepakaran" align="left" className="mb-6" />
          <div className="grid md:grid-cols-3 gap-4">
            {data.expertiseAreas.map((area: any, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border/70 bg-card/70 backdrop-blur-md hover-lift">
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
          <SectionHeading eyebrow="Pengalaman" title="Pengalaman Profesional" align="left" className="mb-6" />
          <div className="space-y-6">
            {data.experiences.map((exp: any, index: number) => (
              <GlassCard key={index}>
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
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <SectionHeading eyebrow="Pencapaian" title="Pencapaian & Sumbangan" align="left" className="mb-6" />
          <GlassCard>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {data.achievements.map((achievement: any, index: number) => {
                  const Icon = index % 2 === 0 ? Award : Briefcase;
                  return (
                    <div key={index}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                        {achievement.title}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {achievement.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </GlassCard>
        </section>
      </div>
      </div>
    </div>
  );
}
