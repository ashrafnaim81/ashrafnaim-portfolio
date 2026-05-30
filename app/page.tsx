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
import { prisma } from '@/lib/prisma';
import { Reveal } from '@/components/motion/reveal';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { CountUp } from '@/components/motion/count-up';
import { ScrollIndicator } from '@/components/motion/scroll-indicator';

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
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl">
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
            </Reveal>
          </div>
        </div>

        <ScrollIndicator className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger trigger="scroll" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat: any, index: number) => (
              <StaggerItem key={index} className="text-center">
                <p className={`text-4xl font-bold ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                  <CountUp value={String(stat.value)} />
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
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

          <Stagger trigger="scroll" className="grid md:grid-cols-3 gap-6">
            {data.achievements.map((achievement: any, index: number) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full hover-lift">
                    <CardHeader>
                      <Icon className={`h-10 w-10 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'} mb-2`} />
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.period}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
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

          <Stagger trigger="scroll" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.map((skill: any, index: number) => (
              <StaggerItem key={index}>
                <Card className="h-full hover-lift">
                  <CardHeader>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <Badge variant="secondary" className="w-fit">{skill.level}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
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
