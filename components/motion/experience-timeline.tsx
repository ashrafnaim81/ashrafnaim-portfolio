'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/futuristic/glass-card';
import { fadeUp, fadeUpReduced, VIEWPORT } from './tokens';

export type ExperienceItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
};

/**
 * Garis masa pengalaman. Garis menegak "dilukis" mengikut kemajuan skrol
 * (scaleY dipautkan kepada useScroll), dan setiap entri muncul apabila
 * memasuki paparan. Entri pertama dianggap jawatan semasa dan diberi
 * titik berdenyut.
 */
export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  return (
    <div ref={ref} className="relative pl-10 md:pl-14">
      {/* Landasan garis (kelabu) dan garis kemajuan (aksen) */}
      <div aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-border md:left-[23px]" />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scaleY }}
        className="absolute bottom-3 left-[15px] top-3 w-px origin-top bg-gradient-to-b from-secondary via-glow to-secondary md:left-[23px]"
      />

      <div className="space-y-6">
        {items.map((exp, index) => {
          const semasa = index === 0;
          const Icon = /pelajar|doktor|sarjana/i.test(exp.title) ? GraduationCap : Briefcase;
          return (
            <motion.div
              key={index}
              className="relative"
              variants={reduce ? fadeUpReduced : fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {/* Titik pada garis */}
              <span
                aria-hidden
                className="absolute -left-10 top-7 flex h-[31px] w-[31px] items-center justify-center md:-left-14 md:h-[47px] md:w-[47px]"
              >
                {semasa && (
                  <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-secondary/50 motion-reduce:animate-none" />
                )}
                <span
                  className={`relative inline-flex h-3 w-3 rounded-full border-2 border-background ${
                    semasa ? 'bg-secondary' : 'bg-muted-foreground/50'
                  }`}
                />
              </span>

              <GlassCard>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="hidden flex-shrink-0 sm:block">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          semasa ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.organization}</p>
                        </div>
                        <Badge variant={semasa ? 'default' : 'secondary'}>{exp.period}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
