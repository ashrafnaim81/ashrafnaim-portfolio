import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Calendar,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact - Ts. Ashraf bin Naim',
  description: 'Hubungi Ts. Ashraf bin Naim untuk kerjasama, bengkel, atau perkongsian ilmu',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Saya</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Berminat untuk kerjasama, bengkel, atau sekadar berbincang tentang
          AI & EdTech? Saya sedia untuk membantu.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Info & Social */}
        <div className="space-y-6">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Maklumat Hubungan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:ashrafnaim81@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    ashrafnaim81@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Lokasi</p>
                  <p className="text-sm text-muted-foreground">
                    Pejabat Pendidikan Daerah Kluang
                    <br />
                    Johor, Malaysia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Waktu Operasi</p>
                  <p className="text-sm text-muted-foreground">
                    Isnin - Jumaat
                    <br />
                    8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Media Sosial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="https://www.facebook.com/ashraf.naim.9/"
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Facebook</p>
                  <p className="text-xs text-muted-foreground">@ashraf.naim.9</p>
                </div>
              </Link>

              <Link
                href="https://www.youtube.com/c/AshrafNaim"
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <Youtube className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="font-medium">YouTube</p>
                  <p className="text-xs text-muted-foreground">@AshrafNaim</p>
                </div>
              </Link>

              <Link
                href="https://www.linkedin.com/in/AshrafNaim81/"
                target="_blank"
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
                <div className="flex-1">
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">@AshrafNaim81</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-muted">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Tindakan Pantas</h3>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/talks">
                    <Calendar className="mr-2 h-4 w-4" />
                    Jemput untuk Bengkel
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/portfolio">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Kerjasama Projek
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24-48h</div>
                <p className="text-sm opacity-90">
                  Purata masa respons untuk semua pertanyaan
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Soalan Lazim</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: 'Berapa kos untuk bengkel?',
    answer: 'Kos bergantung pada jenis bengkel, durasi, dan lokasi. Hubungi saya untuk quotation yang lebih tepat. Untuk sekolah kerajaan, ada kemudahan khas.',
  },
  {
    question: 'Bolehkah mengadakan bengkel online?',
    answer: 'Ya, saya menyediakan bengkel secara online melalui Google Meet atau Microsoft Teams. Format sama effective seperti face-to-face.',
  },
  {
    question: 'Apa topik bengkel yang popular?',
    answer: 'Topik paling popular adalah AI dalam Pendidikan (ChatGPT, Canva AI), Google Workspace automation, dan Microsoft Teams untuk pembelajaran.',
  },
  {
    question: 'Berapa lama advance notice diperlukan?',
    answer: 'Idealnya 2-3 minggu advance notice untuk booking bengkel. Walaubagaimanapun, untuk slot urgent, boleh berbincang.',
  },
];
