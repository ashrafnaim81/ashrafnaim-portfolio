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
import { Spotlight } from '@/components/futuristic/spotlight';
import { Particles } from '@/components/futuristic/particles';
import { DecodeText } from '@/components/futuristic/decode-text';
import { TiltCard } from '@/components/futuristic/tilt-card';
import { Marquee } from '@/components/futuristic/marquee';
import { HeroAiVisual } from '@/components/futuristic/hero-ai-visual';
import { VibeCodingDemo } from '@/components/futuristic/vibe-coding-demo';

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
        <Particles density={55} />
        <Spotlight />
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
                {/* Jawatan boleh berbilang baris: setiap baris dalam medan admin
                    (Textarea) dipaparkan sebagai baris sendiri. */}
                <div className="space-y-1">
                  {String(data.heroJobTitle)
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? 'text-xl font-semibold text-shimmer'
                            : 'text-base font-medium text-shimmer md:text-lg'
                        }
                      >
                        <DecodeText text={line} />
                      </p>
                    ))}
                </div>
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

            <div className="relative">
              {/* Di luar <Reveal> dengan sengaja: lihat ulasan dalam HeroAiVisual */}
              {/* Teras rangkaian diletak di bucu kanan atas potret: jika di tengah,
                  denyut emas terlindung sepenuhnya di belakang gambar. */}
              <HeroAiVisual className="absolute left-[90%] top-[12%] aspect-square w-[125%] max-w-none -translate-x-1/2 -translate-y-1/2" />
              <Reveal className="relative aspect-[3/4] max-w-md mx-auto">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-primary/30 via-glow/20 to-secondary/30 blur-3xl" />
              <TiltCard className="relative h-full w-full rounded-2xl bg-gradient-to-br from-primary via-glow to-secondary p-[2px] glow-ring">
                <div className="h-full w-full overflow-hidden rounded-[calc(var(--radius)+4px)] bg-card">
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
              </TiltCard>

              {/* Cip kepakaran terapung */}
              <div className="float-chip absolute -left-10 top-10 hidden rounded-full border border-border/70 bg-background/80 px-4 py-2 font-mono text-xs font-medium text-primary shadow-lg backdrop-blur-md lg:block">
                🤖 AI dalam Pendidikan
              </div>
              <div
                className="float-chip absolute -right-12 top-1/3 hidden rounded-full border border-border/70 bg-background/80 px-4 py-2 font-mono text-xs font-medium text-secondary shadow-lg backdrop-blur-md lg:block"
                style={{ animationDelay: '-1.6s' }}
              >
                ⚡ EdTech
              </div>
              <div
                className="float-chip absolute -left-6 bottom-12 hidden rounded-full border border-border/70 bg-background/80 px-4 py-2 font-mono text-xs font-medium text-foreground shadow-lg backdrop-blur-md lg:block"
                style={{ animationDelay: '-3.2s' }}
              >
                ☁️ M365 · Google
              </div>
            </Reveal>
            </div>
          </div>
        </div>

        <ScrollIndicator className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex" />
      </section>

      {/* Stats Section — jalur kaca terapung */}
      <section className="relative py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-beam rounded-3xl border border-border/70 bg-card/70 shadow-sm backdrop-blur-md dark:bg-card/60">
            <div className="hud-corners px-6 py-10">
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
        </div>
      </section>

      {/* Marquee kemahiran */}
      {data.skills.length > 0 && (
        <div className="mt-10">
          <Marquee items={data.skills.map((s: any) => s.name)} />
        </div>
      )}

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pencapaian"
            title="Pencapaian Terkini"
            description="Sumbangan dan pengiktirafan terkini dalam bidang pendidikan dan teknologi"
          />

          <Stagger trigger="scroll" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Vibe Coding Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Vibe Coding"
            title="Daripada Idea kepada Aplikasi"
            description="Membina aplikasi dengan arahan bahasa biasa, dibantu AI. Pendekatan yang saya gunakan untuk membangunkan sistem, dan yang saya kongsikan dalam bengkel."
          />
          <Reveal className="mx-auto max-w-5xl">
            <VibeCodingDemo />
          </Reveal>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="outline">
              <Link href="/portfolio">
                Lihat Projek
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/talks">Bengkel Vibe Coding</Link>
            </Button>
          </div>
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
      <section className="animated-gradient relative overflow-hidden py-20 bg-gradient-to-br from-primary via-secondary to-primary text-primary-foreground">
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
