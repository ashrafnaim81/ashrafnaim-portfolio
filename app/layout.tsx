import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SessionProvider from '@/components/providers/session-provider';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { ScrollProgress } from '@/components/futuristic/scroll-progress';
import { GoogleAdsense } from '@/components/google-adsense';
import { GoogleAnalytics } from '@/components/google-analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
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
  other: {
    // Pengesahan pemilikan laman untuk Google AdSense. Ini melengkapkan
    // fail /ads.txt dan mempercepat semakan apabila Auto Ads diaktifkan.
    'google-adsense-account': 'ca-pub-3612581682895457',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" suppressHydrationWarning>
      <head>
        {/* Guna semula warna aksen pilihan pengguna SEBELUM cat pertama supaya
            tiada kelipan emas -> warna pilihan. Rujuk components/accent-switcher.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var a=localStorage.getItem('accent');if(a==='emerald'||a==='royal')document.documentElement.dataset.accent=a}catch(e){}",
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <GoogleAdsense />
        <GoogleAnalytics />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <ScrollProgress />
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
