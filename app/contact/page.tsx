import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  MapPin,
  Calendar,
  Facebook,
  Youtube,
  Linkedin,
  MessageSquare,
  Phone,
  Link as LinkIcon,
} from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Contact - Ts. Ashraf bin Naim',
  description: 'Hubungi Ts. Ashraf bin Naim untuk kerjasama, bengkel, atau perkongsian ilmu',
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons: any = {
    Facebook,
    Youtube,
    Linkedin,
    Calendar,
    MessageSquare,
    Mail,
    Phone,
    Link: LinkIcon,
  };
  return icons[iconName] || LinkIcon;
};

export default async function ContactPage() {
  // Fetch contact page data from database
  const contactPage = await prisma.contactPage.findFirst({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  // Parse JSON fields
  const socialMedia = contactPage ? JSON.parse(contactPage.socialMedia) : [];
  const quickActions = contactPage ? JSON.parse(contactPage.quickActions) : [];
  const faqs = contactPage ? JSON.parse(contactPage.faqs) : [];

  // Fallback data if no contact page found
  const pageData = contactPage || {
    pageTitle: 'Hubungi Saya',
    pageDescription: 'Berminat untuk kerjasama, bengkel, atau sekadar berbincang tentang AI & EdTech? Saya sedia untuk membantu.',
    locationTitle: 'Pejabat Pendidikan Daerah Kluang',
    locationAddress: 'Johor, Malaysia',
    operatingHours: 'Isnin - Jumaat\n8:00 AM - 5:00 PM',
    responseTime: '24-48h',
    responseTimeDesc: 'Purata masa respons untuk semua pertanyaan',
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageData.pageTitle}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {pageData.pageDescription}
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
                  <p className="text-sm text-muted-foreground">
                    Sila gunakan borang di sebelah untuk hubungi saya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Lokasi</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {pageData.locationTitle}
                    {'\n'}
                    {pageData.locationAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Waktu Operasi</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {pageData.operatingHours}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {socialMedia.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialMedia.map((social: any, index: number) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <Icon className={`h-5 w-5 ${social.color}`} />
                      <div className="flex-1">
                        <p className="font-medium">{social.platform}</p>
                        <p className="text-xs text-muted-foreground">{social.name}</p>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          {quickActions.length > 0 && (
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Tindakan Pantas</h3>
                <div className="space-y-2">
                  {quickActions.map((action: any, index: number) => {
                    const Icon = getIcon(action.icon);
                    return (
                      <Button
                        key={index}
                        asChild
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Link href={action.link}>
                          <Icon className="mr-2 h-4 w-4" />
                          {action.title}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Response Time */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{pageData.responseTime}</div>
                <p className="text-sm opacity-90">
                  {pageData.responseTimeDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Soalan Lazim</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq: any, index: number) => (
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
      )}
    </div>
  );
}
