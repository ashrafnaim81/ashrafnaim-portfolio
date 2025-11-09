import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Contact Page...');

  // Delete existing contact page data
  await prisma.contactPage.deleteMany({});

  // Create contact page with current hardcoded data
  const contactPage = await prisma.contactPage.create({
    data: {
      pageTitle: 'Hubungi Saya',
      pageDescription:
        'Berminat untuk kerjasama, bengkel, atau sekadar berbincang tentang AI & EdTech? Saya sedia untuk membantu.',

      // Contact Information
      locationTitle: 'Pejabat Pendidikan Daerah Kluang',
      locationAddress: 'Johor, Malaysia',
      operatingHours: 'Isnin - Jumaat\n8:00 AM - 5:00 PM',

      // Social Media Links (JSON)
      socialMedia: JSON.stringify([
        {
          platform: 'Facebook',
          name: '@ashraf.naim.9',
          url: 'https://www.facebook.com/ashraf.naim.9/',
          icon: 'Facebook',
          color: 'text-blue-600',
        },
        {
          platform: 'YouTube',
          name: '@AshrafNaim',
          url: 'https://www.youtube.com/c/AshrafNaim',
          icon: 'Youtube',
          color: 'text-red-600',
        },
        {
          platform: 'LinkedIn',
          name: '@AshrafNaim81',
          url: 'https://www.linkedin.com/in/AshrafNaim81/',
          icon: 'Linkedin',
          color: 'text-blue-700',
        },
      ]),

      // Quick Actions (JSON)
      quickActions: JSON.stringify([
        {
          title: 'Jemput untuk Bengkel',
          link: '/talks',
          icon: 'Calendar',
        },
        {
          title: 'Kerjasama Projek',
          link: '/portfolio',
          icon: 'MessageSquare',
        },
      ]),

      // Response Time
      responseTime: '24-48h',
      responseTimeDesc: 'Purata masa respons untuk semua pertanyaan',

      // FAQs (JSON)
      faqs: JSON.stringify([
        {
          question: 'Berapa kos untuk bengkel?',
          answer:
            'Kos bergantung pada jenis bengkel, durasi, dan lokasi. Hubungi saya untuk quotation yang lebih tepat. Untuk sekolah kerajaan, ada kemudahan khas.',
        },
        {
          question: 'Bolehkah mengadakan bengkel online?',
          answer:
            'Ya, saya menyediakan bengkel secara online melalui Google Meet atau Microsoft Teams. Format sama effective seperti face-to-face.',
        },
        {
          question: 'Apa topik bengkel yang popular?',
          answer:
            'Topik paling popular adalah AI dalam Pendidikan (ChatGPT, Canva AI), Google Workspace automation, dan Microsoft Teams untuk pembelajaran.',
        },
        {
          question: 'Berapa lama advance notice diperlukan?',
          answer:
            'Idealnya 2-3 minggu advance notice untuk booking bengkel. Walaubagaimanapun, untuk slot urgent, boleh berbincang.',
        },
      ]),

      published: true,
    },
  });

  console.log('✅ Contact page seeded successfully!');
  console.log(`   - Page Title: ${contactPage.pageTitle}`);
  console.log(`   - Social Media: ${JSON.parse(contactPage.socialMedia).length} platforms`);
  console.log(`   - Quick Actions: ${JSON.parse(contactPage.quickActions).length} items`);
  console.log(`   - FAQs: ${JSON.parse(contactPage.faqs).length} questions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
