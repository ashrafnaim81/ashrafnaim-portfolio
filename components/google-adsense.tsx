'use client';

import { usePathname } from 'next/navigation';

/**
 * Pemuat Google AdSense (Auto Ads).
 *
 * ID penerbit ini memang bersifat awam (ia sama dengan yang tersiar dalam
 * /ads.txt), jadi ia ditulis terus di sini supaya tiada pembolehubah
 * persekitaran tambahan yang perlu diselaras semasa deploy ke VPS.
 */
const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  'ca-pub-3612581682895457';

/**
 * Laluan yang TIDAK boleh memaparkan iklan.
 *
 * Panel admin dikecualikan kerana dua sebab: paparan dan klik oleh pemilik
 * laman sendiri dikira "invalid traffic" oleh Google dan boleh menyebabkan
 * akaun disekat, dan halaman admin tidak pernah dilihat oleh orang awam
 * jadi iklan di situ tiada nilai.
 */
const EXCLUDED_PREFIXES = ['/admin', '/test'];

export function GoogleAdsense() {
  const pathname = usePathname();

  // Jangan muatkan semasa pembangunan tempatan supaya statistik AdSense kekal bersih.
  if (process.env.NODE_ENV !== 'production') return null;

  if (EXCLUDED_PREFIXES.some((prefix) => pathname?.startsWith(prefix))) {
    return null;
  }

  // Sengaja menggunakan elemen <script> biasa, bukan next/script.
  //
  // next/script menambah atribut data-nscript pada tag, dan skrip AdSense
  // mengadu "AdSense head tag doesn't support data-nscript attribute" dalam
  // konsol. Google menyemak tag kepala ini semasa proses semakan laman, jadi
  // tag yang diubah suai berisiko menjejaskan kelulusan.
  //
  // React 19 mengangkat <script async src> ke dalam <head> dengan sendirinya
  // dan menyahduplikasi mengikut src, jadi ia dimuatkan sekali sahaja.
  return (
    <script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
    />
  );
}
