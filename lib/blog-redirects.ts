// Ubah hala artikel berganda yang telah digabungkan (slug lama -> slug simpan).
// Ubah hala hanya berlaku apabila artikel lama TIDAK lagi diterbitkan
// (published = false), jadi senarai ini selamat dideploy sebelum kandungan
// setiap kumpulan selesai digabung.

const MERGED: Record<string, string> = {
  // 1. 10 aplikasi AI selain ChatGPT
  '10-aplikasi-ai-menarik-selain-chatgpt-20260505': '10-aplikasi-ai-menarik-selain-chatgpt',
  // 2. AI jimat masa guru
  '5-cara-ai-boleh-jimatkan-masa-guru': '5-cara-pintar-ai-ringankan-beban-kerja-guru-setiap-hari',
  'automasi-tugas-guru-dengan-ai': '5-cara-pintar-ai-ringankan-beban-kerja-guru-setiap-hari',
  // 3. ChatGPT untuk guru
  '5-cara-chatgpt-boleh-membantu-guru-setiap-hari': 'chatgpt-untuk-guru-malaysia-review-lengkap-tips-guna',
  // 4. AI pendidikan khas
  'ai-bantu-guru-pendidikan-khas-cipta-pembelajaran-inklusif-tanpa-batas':
    'ai-dalam-pendidikan-khas-peribadikan-pembelajaran-murid-keperluan-istimewa',
  'ai-untuk-pendidikan-khas': 'ai-dalam-pendidikan-khas-peribadikan-pembelajaran-murid-keperluan-istimewa',
  // 5. Analisis data murid
  'ai-untuk-analisis-data-murid': 'analisis-prestasi-murid-dengan-ai-kenal-pasti-dan-bantu-lebih-awal',
  // 6. Etika AI
  'ai-dan-etika-dalam-pendidikan': 'etika-ai-dalam-bilik-darjah-plagiarisme-privasi-dan-tanggungjawab-guru',
  // 7. Keselamatan digital murid
  'keselamatan-digital-untuk-guru-dan-murid': 'lindungi-privasi-murid-panduan-keselamatan-digital-untuk-warga-sekolah',
  // 8. Website portfolio guru
  'cara-buat-website-portfolio-guru': 'bina-website-portfolio-guru-profesional-langkah-demi-langkah-2026',
  // 9. Canva AI
  'canva-ai-game-changer-untuk-bahan-pengajaran': 'canva-ai-cipta-poster-infografik-pp-tanpa-kemahiran-grafik',
  // 10. Curipod
  'review-curipod-jimat-masa-sediakan-rph-dengan-ai':
    'curipod-cipta-slaid-interaktif-berkuiz-dan-polling-mudah-untuk-guru',
  // 11. Gamma
  'review-gamma-ai-untuk-guru-malaysia-cipta-slide-pintar':
    'gamma-ai-cipta-pembentangan-profesional-berkualiti-tinggi-dalam-beberapa-minit',
  // 12. Microsoft Copilot
  'review-microsoft-copilot-untuk-guru-malaysia-berbaloi-ke':
    'microsoft-copilot-untuk-guru-kuasai-word-powerpoint-dan-excel-lebih-pantas',
  // 13. Perplexity
  'review-perplexity-ai-alat-cari-maklumat-pantas-untuk-guru':
    'perplexity-ai-untuk-guru-sejarah-fakta-sahih-tanpa-halusinasi-ai',
  // 14. MagicSchool
  'magicschool-ai-automasi-rph-soalan-untuk-guru-malaysia': 'magicschool-ai-60-alat-eksklusif-permudah-tugas-harian-guru',
  'ulasan-magicschool-ai-jimat-masa-guru-malaysia': 'magicschool-ai-60-alat-eksklusif-permudah-tugas-harian-guru',
  // 15. Napkin AI
  'napkin-ai-untuk-guru-jadikan-nota-teks-kepada-infografik':
    'napkin-ai-tukar-teks-biasa-menjadi-infografik-automatik-untuk-pdp',
  // 16. Google Gemini
  'google-gemini-untuk-guru-malaysia-ulasan-lengkap-2024':
    'kuasai-google-gemini-analisis-markah-ringkasan-dan-idea-aktiviti-kelas',
  // 17. Menulis prompt
  'prompt-engineering-untuk-guru': 'seni-tulis-prompt-ai-rahsia-guru-jimat-masa-tingkat-kualiti-pdp',
  // 19. Panduan AI di kelas
  'panduan-lengkap-menggunakan-ai-dalam-bilik-darjah': 'panduan-memilih-tool-ai-untuk-pengajaran',
};

export function getMergedTarget(slug: string): string | null {
  return MERGED[slug] ?? null;
}

export const MERGED_SLUGS = Object.keys(MERGED);
