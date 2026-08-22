'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * Google Analytics 4.
 *
 * Letakkan Measurement ID (format G-XXXXXXXXXX) dalam .env sebagai
 * NEXT_PUBLIC_GA_ID. Jika pembolehubah itu tiada, komponen ini tidak
 * memuatkan apa-apa, jadi laman tetap berfungsi seperti biasa.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Laluan yang tidak dijejak: panel admin milik sendiri dan halaman ujian. */
const EXCLUDED_PREFIXES = ['/admin', '/test'];

function isExcluded(pathname: string | null) {
  return EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix));
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  // Hantar peristiwa page_view setiap kali laluan berubah.
  //
  // Ini perlu dilakukan secara manual kerana App Router menggunakan navigasi
  // pihak klien: selepas muatan pertama, tiada muat semula penuh berlaku
  // jadi GA tidak akan mengesan perpindahan halaman dengan sendirinya.
  useEffect(() => {
    if (!GA_ID || !pathname || isExcluded(pathname)) return;

    // Tolak terus ke dataLayer supaya panggilan tetap berbaris walaupun
    // skrip gtag jauh belum selesai dimuatkan.
    const w = window as typeof window & { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_ID) return null;
  if (process.env.NODE_ENV !== 'production') return null;
  if (isExcluded(pathname)) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // send_page_view dimatikan kerana page_view dihantar secara manual
          // oleh useEffect di atas, supaya navigasi App Router turut direkod.
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
