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

export const metadata: Metadata = {
  title: 'Talks & Workshops - Ts. Ashraf bin Naim',
  description: 'Bengkel, ceramah, dan presentation tentang AI, EdTech, dan transformasi digital',
};

export default function TalksPage() {
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
            <p className="text-3xl font-bold text-primary">25+</p>
            <p className="text-sm text-muted-foreground">Bengkel & Ceramah</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto text-secondary mb-2" />
            <p className="text-3xl font-bold text-secondary">1,000+</p>
            <p className="text-sm text-muted-foreground">Peserta Terlatih</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <MapPin className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-3xl font-bold text-primary">50+</p>
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
        <div className="space-y-4">
          {upcomingTalks.map((talk, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{talk.day}</div>
                        <div className="text-xs">{talk.month}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge>{talk.category}</Badge>
                          <Badge variant="outline">{talk.type}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{talk.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{talk.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{talk.audience}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{talk.description}</p>

                    {talk.registrationLink && (
                      <Button asChild>
                        <Link href={talk.registrationLink} target="_blank">
                          Daftar Sekarang
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Past Talks */}
      <section className="mb-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Bengkel & Ceramah Lepas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {pastTalks.map((talk, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{talk.date}</Badge>
                  <Badge variant="outline">{talk.type}</Badge>
                </div>
                <CardTitle className="text-lg">{talk.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{talk.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{talk.participants} peserta</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{talk.summary}</p>

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
          ))}
        </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">Hubungi Saya</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="mailto:ashrafnaim81@gmail.com">Email Terus</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const upcomingTalks = [
  {
    title: 'Bengkel AI untuk Pentadbir Sekolah',
    date: '20 Mac 2025, 9:00 AM - 4:00 PM',
    day: '20',
    month: 'MAC',
    location: 'Dewan Besar PPD Kluang',
    audience: 'Pengetua & Guru Besar Daerah Kluang',
    category: 'AI dalam Pendidikan',
    type: 'Full Day Workshop',
    description: 'Bengkel komprehensif tentang penggunaan AI tools untuk pentadbiran sekolah, dari automasi workflow hingga decision making dengan data analytics.',
    registrationLink: '#',
  },
  {
    title: 'Ceramah: Transformasi Digital di Sekolah',
    date: '25 Mac 2025, 2:00 PM - 5:00 PM',
    day: '25',
    month: 'MAC',
    location: 'SMK Taman Johor Jaya',
    audience: 'Guru-guru SMK Taman Johor Jaya',
    category: 'Digital Transformation',
    type: 'Seminar',
    description: 'Perkongsian tentang perjalanan transformasi digital di sekolah - challenges, best practices, dan success stories dari implementasi sebenar.',
    registrationLink: '#',
  },
];

const pastTalks = [
  {
    title: 'Workshop Canva AI untuk Pendidik',
    date: 'Feb 2025',
    location: 'PPD Kluang',
    participants: 120,
    type: 'Workshop',
    summary: 'Hands-on workshop menggunakan Canva AI untuk create bahan pengajaran visual yang professional dalam minit.',
    slides: '#',
    recording: '#',
  },
  {
    title: 'ChatGPT dalam Bilik Darjah',
    date: 'Jan 2025',
    location: 'JPN Johor',
    participants: 200,
    type: 'Webinar',
    summary: 'Webinar online tentang practical applications ChatGPT untuk lesson planning, assessment, dan classroom management.',
    slides: '#',
    recording: '#',
  },
  {
    title: 'Google Workspace Automation',
    date: 'Dec 2024',
    location: 'PPD Johor Bahru',
    participants: 80,
    type: 'Workshop',
    summary: 'Workshop automasi menggunakan Google Apps Script untuk efficiency dalam pengurusan sekolah.',
  },
  {
    title: 'Microsoft Teams untuk Pembelajaran Hibrid',
    date: 'Nov 2024',
    location: 'SMK Taman Johor',
    participants: 50,
    type: 'Training',
    summary: 'Training lengkap setup dan penggunaan Microsoft Teams untuk effective hybrid learning.',
  },
  {
    title: 'Video Production dengan Smartphone',
    date: 'Oct 2024',
    location: 'PPD Kluang',
    participants: 60,
    type: 'Workshop',
    summary: 'Workshop hands-on shooting dan editing video pembelajaran menggunakan smartphone sahaja.',
  },
  {
    title: 'Data Analytics untuk Sekolah',
    date: 'Sep 2024',
    location: 'JPN Johor',
    participants: 40,
    type: 'Training',
    summary: 'Training menggunakan Power BI dan Excel untuk create insightful dashboards untuk school data.',
  },
];

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
