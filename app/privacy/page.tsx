import { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/futuristic/page-hero';

export const metadata: Metadata = {
  title: 'Dasar Privasi - Ts. Ashraf bin Naim',
  description:
    'Dasar privasi laman ashrafnaim.my: maklumat yang dikumpul, penggunaan kuki, Google Analytics dan Google AdSense, serta hak anda di bawah Akta Perlindungan Data Peribadi 2010.',
};

const KEMASKINI = '24 Ogos 2026';

function Seksyen({
  tajuk,
  children,
}: {
  tajuk: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-foreground">{tajuk}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Dasar Privasi"
        title="Dasar Privasi"
        description="Bagaimana laman ini mengumpul, menggunakan dan melindungi maklumat anda"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground mb-10">
            Kemas kini terakhir: {KEMASKINI}
          </p>

          <Seksyen tajuk="1. Pengenalan">
            <p>
              Laman web <strong>ashrafnaim.my</strong> dikendalikan secara
              persendirian oleh Ts. Ashraf bin Naim. Laman ini memaparkan
              portfolio profesional, artikel blog, serta rekod ceramah dan
              bengkel dalam bidang pendidikan dan teknologi.
            </p>
            <p>
              Dasar ini menerangkan maklumat yang dikumpul apabila anda melayari
              laman ini, tujuan penggunaannya, dan pilihan yang ada pada anda.
              Dengan menggunakan laman ini, anda bersetuju dengan amalan yang
              diterangkan di bawah.
            </p>
          </Seksyen>

          <Seksyen tajuk="2. Maklumat yang dikumpul">
            <p>
              <strong>Maklumat yang anda berikan sendiri.</strong> Apabila anda
              menghantar borang hubungan, maklumat berikut disimpan dalam
              pangkalan data laman ini: nama, alamat e-mel, nombor telefon
              (jika diisi), nama organisasi (jika diisi), subjek dan kandungan
              mesej anda. Maklumat ini digunakan semata-mata untuk membalas
              pertanyaan anda.
            </p>
            <p>
              <strong>Maklumat yang dikumpul secara automatik.</strong> Seperti
              kebanyakan laman web, pelayan merekodkan alamat IP, jenis pelayar,
              halaman yang dilawati dan masa lawatan dalam log pelayan. Data ini
              digunakan untuk keselamatan dan penyelenggaraan teknikal.
            </p>
            <p>
              Laman ini <strong>tidak</strong> mengumpul maklumat sensitif
              seperti nombor kad pengenalan, maklumat perbankan atau data
              kesihatan, dan tidak menjual maklumat peribadi anda kepada mana-mana
              pihak.
            </p>
          </Seksyen>

          <Seksyen tajuk="3. Kuki dan teknologi penjejakan">
            <p>
              Kuki ialah fail teks kecil yang disimpan dalam pelayar anda. Laman
              ini menggunakan kuki untuk mengingati keutamaan tema (cerah atau
              gelap), untuk memahami cara laman digunakan, dan untuk memaparkan
              iklan.
            </p>
            <p>
              Anda boleh menyekat atau memadam kuki melalui tetapan pelayar anda
              pada bila-bila masa. Sila ambil maklum bahawa menyekat kuki
              tertentu boleh menjejaskan sebahagian fungsi laman.
            </p>
          </Seksyen>

          <Seksyen tajuk="4. Google Analytics">
            <p>
              Laman ini menggunakan Google Analytics 4, perkhidmatan analitik
              yang disediakan oleh Google LLC, untuk memahami jumlah pelawat dan
              halaman yang paling kerap dibaca. Perkhidmatan ini menggunakan
              kuki dan mengumpul data seperti halaman yang dilawati, tempoh
              lawatan, jenis peranti dan lokasi anggaran pada peringkat negara
              atau bandar.
            </p>
            <p>
              Data ini dikumpul dalam bentuk agregat dan tidak digunakan untuk
              mengenal pasti anda secara peribadi. Anda boleh menghalang Google
              Analytics daripada mengumpul data dengan memasang{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </Seksyen>

          <Seksyen tajuk="5. Google AdSense dan pengiklanan pihak ketiga">
            <p>
              Laman ini memaparkan iklan melalui Google AdSense. Perkara berikut
              perlu anda ketahui:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Google, sebagai vendor pihak ketiga, menggunakan kuki untuk
                memaparkan iklan pada laman ini.
              </li>
              <li>
                Penggunaan kuki pengiklanan oleh Google membolehkan Google dan
                rakan kongsinya memaparkan iklan kepada anda berdasarkan lawatan
                anda ke laman ini dan laman lain di internet.
              </li>
              <li>
                Anda boleh menarik diri daripada pengiklanan yang diperibadikan
                melalui{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  Tetapan Iklan Google
                </a>
                .
              </li>
              <li>
                Untuk menarik diri daripada vendor pihak ketiga yang lain, sila
                lawati{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  www.aboutads.info/choices
                </a>
                .
              </li>
            </ul>
          </Seksyen>

          <Seksyen tajuk="6. Perkhidmatan pihak ketiga yang lain">
            <p>
              Imej pada laman ini dihoskan melalui Cloudinary. Laman ini juga
              mengandungi pautan ke laman luar seperti Facebook, YouTube dan
              LinkedIn. Dasar privasi ini tidak meliputi laman pihak ketiga
              tersebut, dan anda digalakkan membaca dasar privasi mereka sendiri.
            </p>
          </Seksyen>

          <Seksyen tajuk="7. Penyimpanan dan keselamatan data">
            <p>
              Maklumat borang hubungan disimpan dalam pangkalan data pada pelayan
              peribadi dan hanya boleh diakses oleh pemilik laman melalui panel
              pentadbir yang dilindungi kata laluan. Semua trafik ke laman ini
              disulitkan menggunakan HTTPS.
            </p>
            <p>
              Maklumat borang hubungan disimpan selama ia diperlukan untuk
              tujuan komunikasi, dan boleh dipadamkan atas permintaan anda.
            </p>
          </Seksyen>

          <Seksyen tajuk="8. Hak anda">
            <p>
              Di bawah Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia,
              anda berhak untuk meminta akses kepada maklumat peribadi anda yang
              disimpan, meminta pembetulan maklumat yang tidak tepat, dan meminta
              supaya maklumat anda dipadamkan.
            </p>
            <p>
              Untuk membuat sebarang permintaan tersebut, sila hubungi saya
              melalui{' '}
              <Link
                href="/contact"
                className="text-primary underline underline-offset-4"
              >
                halaman hubungan
              </Link>
              .
            </p>
          </Seksyen>

          <Seksyen tajuk="9. Privasi kanak-kanak">
            <p>
              Laman ini ditujukan kepada pendidik dan orang dewasa profesional.
              Ia tidak dirancang untuk mengumpul maklumat daripada kanak-kanak di
              bawah umur 13 tahun secara sengaja. Sekiranya anda percaya maklumat
              sedemikian telah dikumpul, sila hubungi saya supaya ia boleh
              dipadamkan.
            </p>
          </Seksyen>

          <Seksyen tajuk="10. Perubahan pada dasar ini">
            <p>
              Dasar ini boleh dikemas kini dari semasa ke semasa bagi
              mencerminkan perubahan pada laman atau keperluan undang-undang.
              Tarikh kemas kini terakhir sentiasa dipaparkan di bahagian atas
              halaman ini.
            </p>
          </Seksyen>

          <Seksyen tajuk="11. Hubungi">
            <p>
              Sebarang pertanyaan berkaitan dasar privasi ini boleh dikemukakan
              melalui{' '}
              <Link
                href="/contact"
                className="text-primary underline underline-offset-4"
              >
                halaman hubungan
              </Link>{' '}
              laman ini.
            </p>
          </Seksyen>
        </div>
      </div>
    </div>
  );
}
