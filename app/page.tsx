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
import { CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { CountUp } from '@/components/motion/count-up';
import { ScrollIndicator } from '@/components/motion/scroll-indicator';
import { AuroraBackground } from '@/components/futuristic/aurora-background';
import { GridPattern } from '@/components/futuristic/grid-pattern';
import { GlassCard } from '@/components/futuristic/glass-card';
import { SectionHeading } from '@/components/futuristic/section-heading';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getHomePageData() {
  const homePage = await prisma.homePage.findFirst({
    where: { published: true },
  });

  if (!homePage) {
    return null;
  }

  return {
    ...homePage,
    stats: homePage.stats ? JSON.parse(homePage.stats) : [],
    achievements: homePage.achievements ? JSON.parse(homePage.achievements) : [],
    skills: homePage.skills ? JSON.parse(homePage.skills) : [],
  };
}

// Icon mapping for achievements
const iconMap: Record<string, any> = {
  Award: Award,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
};

export default async function HomePage() {
  const data = await getHomePageData();

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Home page content is not available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section — ditarik ke atas supaya aurora berada di belakang nav kaca */}
      <section className="relative -mt-[4.25rem] overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
        <AuroraBackground />
        <GridPattern />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Stagger trigger="load" className="space-y-6">
              <StaggerItem expressive>
                <Badge className="w-fit">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Teknologis Profesional MBOT
                </Badge>
              </StaggerItem>

              <StaggerItem expressive>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {data.heroTitle}
                </h1>
              </StaggerItem>

              <StaggerItem expressive>
                <p className="text-xl font-semibold text-shimmer">
                  {data.heroJobTitle}
                </p>
              </StaggerItem>

              <StaggerItem expressive>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.heroDescription}
                </p>
              </StaggerItem>

              <StaggerItem expressive>
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
              </StaggerItem>
            </Stagger>

            <Reveal className="relative aspect-[3/4] max-w-md mx-auto">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-primary/30 via-glow/20 to-secondary/30 blur-3xl" />
              <div className="relative rounded-2xl bg-gradient-to-br from-primary via-glow to-secondary p-[2px] glow-ring">
                <div className="overflow-hidden rounded-[calc(var(--radius)+4px)] bg-card">
                  {data.heroImage && (
                    <Image
                      src={data.heroImage}
                      alt={data.heroTitle}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                      priority
                    />
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <ScrollIndicator className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex" />
      </section>

      {/* Stats Section — jalur kaca terapung */}
      <section className="relative py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/70 bg-card/70 px-6 py-10 shadow-sm backdrop-blur-md dark:bg-card/60">
            <Stagger trigger="scroll" className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats.map((stat: any, index: number) => (
                <StaggerItem key={index} className="text-center">
                  <p className={`font-display text-4xl font-bold ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                    <CountUp value={String(stat.value)} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pencapaian"
            title="Pencapaian Terkini"
            description="Sumbangan dan pengiktirafan terkini dalam bidang pendidikan dan teknologi"
          />

          <Stagger trigger="scroll" className="grid md:grid-cols-3 gap-6">
            {data.achievements.map((achievement: any, index: number) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <StaggerItem key={index}>
                  <GlassCard className="h-full">
                    <CardHeader>
                      <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-xl ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.period}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kepakaran"
            title="Bidang Kepakaran"
            description="Kemahiran dan teknologi yang saya kuasai"
          />

          <Stagger trigger="scroll" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.map((skill: any, index: number) => (
              <StaggerItem key={index}>
                <GlassCard className="h-full">
                  <CardHeader>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <Badge variant="secondary" className="w-fit">{skill.level}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA Section — gradient mesh */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <Reveal className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.ctaTitle}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {data.ctaDescription}
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
        </Reveal>
      </section>
    </div>
  );
}
