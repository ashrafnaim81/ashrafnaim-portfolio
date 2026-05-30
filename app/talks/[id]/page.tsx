import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Video,
  FileText,
  ExternalLink,
  ImageIcon,
} from 'lucide-react';
import TalkGallery from './talk-gallery';

export const dynamic = 'force-dynamic';

interface TalkDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getTalk(id: string) {
  const talk = await prisma.talk.findUnique({
    where: { id, published: true },
  });

  if (!talk) return null;

  return {
    ...talk,
    images: talk.images ? JSON.parse(talk.images) : [],
  };
}

export async function generateMetadata({ params }: TalkDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const talk = await getTalk(id);

  if (!talk) return { title: 'Talk Not Found' };

  return {
    title: `${talk.title} - Ts. Ashraf bin Naim`,
    description: talk.description,
  };
}

const typeLabels: Record<string, string> = {
  workshop: 'Bengkel',
  ceramah: 'Ceramah',
  webinar: 'Webinar',
  training: 'Latihan',
  seminar: 'Seminar',
  conference: 'Persidangan',
};

const statusLabels: Record<string, string> = {
  upcoming: 'Akan Datang',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};

export default async function TalkDetailPage({ params }: TalkDetailPageProps) {
  const { id } = await params;
  const talk = await getTalk(id);

  if (!talk) notFound();

  const talkDate = new Date(talk.date);
  const dateString = talkDate.toLocaleDateString('ms-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const endDateString = talk.endDate
    ? new Date(talk.endDate).toLocaleDateString('ms-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Button variant="ghost" asChild>
          <Link href="/talks">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Senarai
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Hero Image */}
        {talk.images.length > 0 && (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-muted mb-8">
            <Image
              src={talk.images[0]}
              alt={talk.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Title & Badges */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge>{typeLabels[talk.type] || talk.type}</Badge>
            <Badge
              variant={talk.status === 'completed' ? 'secondary' : talk.status === 'cancelled' ? 'destructive' : 'default'}
            >
              {statusLabels[talk.status] || talk.status}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{talk.title}</h1>
        </div>

        {/* Info Grid */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Tarikh</p>
                  <p className="font-medium">{dateString}</p>
                  {endDateString && (
                    <p className="text-sm text-muted-foreground">hingga {endDateString}</p>
                  )}
                </div>
              </div>

              {talk.venue && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tempat</p>
                    <p className="font-medium">{talk.venue}</p>
                    {talk.location && (
                      <p className="text-sm text-muted-foreground">{talk.location}</p>
                    )}
                  </div>
                </div>
              )}

              {talk.audience && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sasaran</p>
                    <p className="font-medium">{talk.audience}</p>
                  </div>
                </div>
              )}

              {talk.participants && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bilangan Peserta</p>
                    <p className="font-medium">{talk.participants} orang</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Penerangan</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {talk.description}
          </p>
        </div>

        {/* Resources */}
        {(talk.slides || talk.recording) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Sumber & Bahan</h2>
            <div className="flex flex-wrap gap-3">
              {talk.slides && (
                <Button variant="outline" asChild>
                  <Link href={talk.slides} target="_blank">
                    <FileText className="h-4 w-4 mr-2" />
                    Slides Pembentangan
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Link>
                </Button>
              )}
              {talk.recording && (
                <Button variant="outline" asChild>
                  <Link href={talk.recording} target="_blank">
                    <Video className="h-4 w-4 mr-2" />
                    Rakaman Video
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Image Gallery */}
        {talk.images.length > 1 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Galeri Gambar ({talk.images.length} gambar)
            </h2>
            <TalkGallery images={talk.images} title={talk.title} />
          </div>
        )}

        {/* Single image also gets gallery treatment */}
        {talk.images.length === 1 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Gambar
            </h2>
            <TalkGallery images={talk.images} title={talk.title} />
          </div>
        )}
      </div>
    </div>
  );
}
