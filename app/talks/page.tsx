import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  Users,
  Video,
  FileText,
  ExternalLink,
  Presentation,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Talks & Workshops - Ts. Ashraf bin Naim',
  description: 'Bengkel, ceramah, dan presentation tentang AI, EdTech, dan transformasi digital',
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getTalks() {
  const talks = await prisma.talk.findMany({
    where: {
      published: true,
    },
    orderBy: [
      { date: 'desc' },
    ],
  });

  // Parse JSON fields
  return talks.map((talk) => ({
    ...talk,
    images: talk.images ? JSON.parse(talk.images) : [],
  }));
}

export default async function TalksPage() {
  const allTalks = await getTalks();
  const now = new Date();

  // Separate upcoming and past talks
  const upcomingTalks = allTalks.filter((talk) => new Date(talk.date) >= now);
  const pastTalks = allTalks.filter((talk) => new Date(talk.date) < now);

  // Calculate stats
  const totalTalks = allTalks.length;
  const totalParticipants = pastTalks.reduce((sum, talk) => sum + (talk.participants || 0), 0);
  const uniqueLocations = new Set(pastTalks.map((t) => t.location).filter(Boolean)).size;
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Talks & Workshops</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Perkongsian ilmu melalui bengkel, ceramah, dan presentation untuk pendidik
          di seluruh Malaysia
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <Presentation className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold text-primary">{totalTalks > 0 ? `${totalTalks}+` : '0'}</p>
            <p className="text-sm text-muted-foreground">Bengkel & Ceramah</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto text-secondary mb-2" />
            <p className="text-3xl font-bold text-secondary">{totalParticipants > 0 ? `${totalParticipants.toLocaleString()}+` : '0'}</p>
            <p className="text-sm text-muted-foreground">Peserta Terlatih</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <MapPin className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold text-primary">{uniqueLocations > 0 ? `${uniqueLocations}+` : '0'}</p>
            <p className="text-sm text-muted-foreground">Sekolah Dilawati</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Video className="h-8 w-8 mx-auto text-secondary mb-2" />
            <p className="text-3xl font-bold text-secondary">4.9/5</p>
            <p className="text-sm text-muted-foreground">Rating Peserta</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Talks */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Bengkel & Ceramah Akan Datang</h2>
        {upcomingTalks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Tiada bengkel atau ceramah akan datang buat masa ini. Sila semak kembali kemudian.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {upcomingTalks.map((talk) => {
              const talkDate = new Date(talk.date);
              const day = talkDate.getDate();
              const month = talkDate.toLocaleDateString('ms-MY', { month: 'short' }).toUpperCase();
              const dateString = talkDate.toLocaleDateString('ms-MY', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <Card key={talk.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Talk Image */}
                  {talk.images.length > 0 && (
                    <div className="relative w-full h-48 bg-muted">
                      <Image
                        src={talk.images[0]}
                        alt={talk.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{day}</div>
                            <div className="text-xs">{month}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge>{talk.type}</Badge>
                              <Badge variant="outline">{talk.status}</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{dateString}</span>
                          </div>
                          {talk.venue && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{talk.venue}, {talk.location}</span>
                            </div>
                          )}
                          {talk.audience && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{talk.audience}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-muted-foreground mb-4">{talk.description}</p>

                        <div className="flex gap-2">
                          {talk.slides && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={talk.slides} target="_blank">
                                <FileText className="h-4 w-4 mr-1" />
                                Slides
                              </Link>
                            </Button>
                          )}
                          {talk.recording && (
                            <Button size="sm" asChild>
                              <Link href={talk.recording} target="_blank">
                                Daftar Sekarang
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Past Talks */}
      <section className="mb-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Bengkel & Ceramah Lepas</h2>
        {pastTalks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Tiada rekod bengkel atau ceramah lepas buat masa ini.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {pastTalks.map((talk) => {
              const talkDate = new Date(talk.date);
              const dateString = talkDate.toLocaleDateString('ms-MY', {
                year: 'numeric',
                month: 'short',
              });

              return (
                <Card key={talk.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Talk Image */}
                  {talk.images.length > 0 && (
                    <div className="relative w-full h-48 bg-muted">
                      <Image
                        src={talk.images[0]}
                        alt={talk.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">{talk.type}</Badge>
                      </div>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{dateString}</Badge>
                      {talk.images.length === 0 && <Badge variant="outline">{talk.type}</Badge>}
                    </div>
                    <CardTitle className="text-lg">{talk.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      {talk.venue && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{talk.venue}, {talk.location}</span>
                        </div>
                      )}
                      {talk.participants && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{talk.participants} peserta</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{talk.description}</p>

                    <div className="flex gap-2">
                      {talk.slides && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={talk.slides} target="_blank">
                            <FileText className="h-4 w-4 mr-1" />
                            Slides
                          </Link>
                        </Button>
                      )}
                      {talk.recording && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={talk.recording} target="_blank">
                            <Video className="h-4 w-4 mr-1" />
                            Recording
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Topics */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Topik Bengkel & Ceramah</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {topics.map((topic, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`text-4xl ${topic.color}`}>{topic.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-2xl mx-auto">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Jemput Saya untuk Bengkel</h2>
            <p className="mb-6 opacity-90">
              Berminat untuk menganjurkan bengkel atau ceramah di sekolah/organisasi anda?
              Saya sedia untuk berkongsi ilmu dan pengalaman.
            </p>
            <div className="flex justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">Hubungi Saya</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const topics = [
  {
    icon: '🤖',
    title: 'AI dalam Pendidikan',
    description: 'ChatGPT, Canva AI, dan AI tools untuk pembelajaran dan pentadbiran',
    color: 'text-blue-500',
  },
  {
    icon: '☁️',
    title: 'Google Workspace',
    description: 'Google Classroom, Apps Script automation, dan digital collaboration',
    color: 'text-green-500',
  },
  {
    icon: '💼',
    title: 'Microsoft 365',
    description: 'Teams, Power Platform, SharePoint untuk transformasi digital sekolah',
    color: 'text-orange-500',
  },
  {
    icon: '🎥',
    title: 'Video Production',
    description: 'Shooting dan editing video pembelajaran dengan smartphone',
    color: 'text-red-500',
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    description: 'Power BI, Excel, dan data visualization untuk decision making',
    color: 'text-purple-500',
  },
  {
    icon: '🎨',
    title: 'Graphic Design',
    description: 'Canva dan design thinking untuk bahan pengajaran visual',
    color: 'text-pink-500',
  },
];
