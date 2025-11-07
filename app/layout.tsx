import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ts. Ashraf bin Naim - Teknologis Profesional',
  description: 'Teknologis Profesional dalam bidang Pendidikan & Teknologi Maklumat. Berpengalaman dalam AI, EdTech, Microsoft 365, Google Workspace, dan transformasi digital dalam pendidikan.',
  authors: [{ name: 'Ts. Ashraf bin Naim' }],
  keywords: [
    'Teknologis Profesional',
    'AI dalam Pendidikan',
    'EdTech',
    'Microsoft 365',
    'Google Workspace',
    'Digital Learning',
    'Educational Technology',
    'Ashraf Naim',
  ],
  creator: 'Ts. Ashraf bin Naim',
  robots: 'index, follow',
  openGraph: {
    title: 'Ts. Ashraf bin Naim - Teknologis Profesional',
    description: 'Teknologis Profesional dalam bidang Pendidikan & Teknologi Maklumat',
    url: 'https://ashrafnaim.my/',
    siteName: 'Ts. Ashraf bin Naim Portfolio',
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ts. Ashraf bin Naim - Teknologis Profesional',
    description: 'Teknologis Profesional dalam bidang Pendidikan & Teknologi Maklumat',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
