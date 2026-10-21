// Siri Shorts "Satu Prompt, Satu Video": setiap video dihasilkan oleh Claude Code
// daripada satu prompt. Prompt di bawah ialah teks tepat yang digunakan (sama seperti
// dalam deskripsi dan komen disematkan di YouTube). Cover di public/media/shorts.

export type ShortPrompt = {
  slug: string;
  youtubeId: string;
  name: string;
  kind: 'motion' | 'watak';
  theme: string;
  prompt: string;
};

export const SHORTS_PLAYLIST_ID = 'PLf73zYb4tiKQ';

export const SHORT_PROMPTS: ShortPrompt[] = [
  {
    "slug": "neon",
    "youtubeId": "dnuy0-YzQ10",
    "name": "Neon Glow",
    "kind": "motion",
    "theme": "Malam Anugerah Inovasi Guru",
    "prompt": "Bina video animasi motion menegak 9:16 (1080x1920, 30fps) selama 15 saat dalam gaya \"Neon glow\".\nGaya visual: Tulisan dan ikon garisan neon merah jambu dan cyan yang menyala dan berkelip seperti papan tanda, latar gelap, cahaya kabur.\nTema: Malam Anugerah Inovasi Guru\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat) dan penutup 2 saat dengan nama program. Satu idea utama bagi setiap babak.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  },
  {
    "slug": "kinetic",
    "youtubeId": "go_VyKTCuUY",
    "name": "Kinetic Typography",
    "kind": "motion",
    "theme": "3 tip keselamatan siber untuk guru",
    "prompt": "Bina video animasi motion menegak 9:16 (1080x1920, 30fps) selama 15 saat dalam gaya \"Kinetic type\".\nGaya visual: Tipografi kinetik: perkataan tebal besar melompat, berputar dan bertukar warna mengikut rentak visual yang konsisten. Hitam, merah dan kuning.\nTema: 3 tip keselamatan siber untuk guru\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat) dan penutup 2 saat dengan nama program. Satu idea utama bagi setiap babak.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  },
  {
    "slug": "batik",
    "youtubeId": "yP0cGPxj5xU",
    "name": "Batik",
    "kind": "motion",
    "theme": "Sambutan Bulan Kebangsaan",
    "prompt": "Bina video animasi motion menegak 9:16 (1080x1920, 30fps) selama 15 saat dalam gaya \"Batik\".\nGaya visual: Motif batik Malaysia: bunga raya, daun bersulur dan awan larat (lingkaran sulur halus yang berlapis dan bersambung). Garisan canting nipis dilukis dahulu, kemudian diwarnakan perlahan seperti pewarna meresap kain. Biru tua, merah dan hijau di atas kain krim.\nTema: Sambutan Bulan Kebangsaan\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat) dan penutup 2 saat dengan nama program. Satu idea utama bagi setiap babak.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  },
  {
    "slug": "songket",
    "youtubeId": "XnfM9I21dQs",
    "name": "Songket",
    "kind": "motion",
    "theme": "Majlis Anugerah Kecemerlangan",
    "prompt": "Bina video animasi motion menegak 9:16 (1080x1920, 30fps) selama 15 saat dalam gaya \"Songket\".\nGaya visual: Corak songket benang emas di atas kain merah marun, motif geometri ditenun baris demi baris dan berkilau.\nTema: Majlis Anugerah Kecemerlangan\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat) dan penutup 2 saat dengan nama program. Satu idea utama bagi setiap babak.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  },
  {
    "slug": "watak-cikgu",
    "youtubeId": "_nDEtTpqXlA",
    "name": "Cikgu & Murid",
    "kind": "watak",
    "theme": "3 amalan menjaga kebersihan kelas",
    "prompt": "Bina video animasi pendek menegak 9:16 (1080x1920, 30fps) selama 15 saat dengan watak animasi.\nGaya visual: Flat vector 2D, warna lembut pastel, latar bilik darjah.\nWatak: Seorang cikgu wanita bertudung dan dua murid (lelaki dan perempuan) berpakaian sekolah Malaysia, dilukis dengan kod (SVG atau canvas). Mata berkelip, mulut bergerak ketika bercakap, tangan melambai dan menunjuk.\nTema: 3 amalan menjaga kebersihan kelas\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat, watak beraksi dalam setiap babak) dan penutup 2 saat dengan nama program.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  },
  {
    "slug": "watak-robot",
    "youtubeId": "xVKsKd7b33E",
    "name": "Maskot Robot",
    "kind": "watak",
    "theme": "3 cara guna AI dengan selamat di sekolah",
    "prompt": "Bina video animasi pendek menegak 9:16 (1080x1920, 30fps) selama 15 saat dengan watak animasi.\nGaya visual: Kartun 3D lembut, latar biru gelap dengan zarah bercahaya.\nWatak: Robot comel berbadan bulat putih dan oren dengan skrin muka yang menunjukkan emosi (gembira, berfikir, terkejut). Ia terapung, mengangguk dan menunjuk ikon yang muncul di sebelahnya.\nTema: 3 cara guna AI dengan selamat di sekolah\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat, watak beraksi dalam setiap babak) dan penutup 2 saat dengan nama program.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  },
  {
    "slug": "watak-kancil",
    "youtubeId": "E3x2t9BTyQA",
    "name": "Sang Kancil",
    "kind": "watak",
    "theme": "Cerita rakyat Sang Kancil dan Buaya, dengan pengajaran: bijak menyelesaikan masalah",
    "prompt": "Bina video animasi pendek menegak 9:16 (1080x1920, 30fps) selama 15 saat dengan watak animasi.\nGaya visual: Gaya ilustrasi buku cerita kanak-kanak, warna hangat, sungai dan hutan.\nWatak: Sang Kancil yang cerdik dan beberapa ekor buaya di sungai. Kancil mengira buaya sambil melompat di atas belakang mereka untuk menyeberang. Buaya mengerdipkan mata dan membuka mulut.\nTema: Cerita rakyat Sang Kancil dan Buaya, dengan pengajaran: bijak menyelesaikan masalah\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat, watak beraksi dalam setiap babak) dan penutup 2 saat dengan nama program.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  },
  {
    "slug": "watak-haiwan",
    "youtubeId": "7YfHibg4SBc",
    "name": "Haiwan Malaysia",
    "kind": "watak",
    "theme": "Sayangi hidupan liar Malaysia: 3 fakta menarik",
    "prompt": "Bina video animasi pendek menegak 9:16 (1080x1920, 30fps) selama 15 saat dengan watak animasi.\nGaya visual: Gaya chibi comel, warna cerah, latar hutan hujan tropika.\nWatak: Seekor harimau Malaya comel dan seekor burung kenyalang. Harimau mengibas ekor dan berkelip mata, kenyalang terbang dan mendarat di dahan.\nTema: Sayangi hidupan liar Malaysia: 3 fakta menarik\nNama program untuk penutup: Program Kreatif Digital PPD Contoh 2026\nStruktur 5 bahagian: pembuka 2 saat dengan tajuk, 3 babak kandungan (setiap satu 3 hingga 4 saat, watak beraksi dalam setiap babak) dan penutup 2 saat dengan nama program.\nTeks skrin dalam Bahasa Melayu, besar dan ringkas (maksimum 6 perkataan sebaris), ejaan tepat. Peralihan lancar.\nBunyi: muzik latar ringkas dan SFX (whoosh semasa peralihan, ding atau pop semasa teks muncul) yang dijana dengan kod (Web Audio), selaras dengan babak. Tiada fail audio luar.\nCara bina: tulis animasi sebagai halaman HTML dalam folder ini yang dikawal oleh satu jam masa, dan tunjukkan pratonton dalam pelayar terbina. Kemudian hasilkan fail video.mp4 (1080x1920, 30fps, dengan muzik dan SFX) dengan merender setiap bingkai secara tepat dan menggabungkan bunyi. Jika ffmpeg tiada di komputer, gunakan versi pakej npm supaya tiada pemasangan sistem diperlukan. Gunakan Google Chrome yang sedia ada jika ada, dan pilih pakej yang ringan. Selepas siap, padam bingkai dan fail bunyi sementara, tetapi kekalkan alat render supaya video boleh dirender semula selepas pindaan.\nTunjuk storyboard kelima-lima bahagian dahulu dan tunggu saya setuju. Selepas video siap, tunjukkan 3 bingkai dan sahkan video itu ada bunyi."
  }
];
