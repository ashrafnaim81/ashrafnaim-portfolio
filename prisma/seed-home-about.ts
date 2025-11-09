import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding Home and About pages...');

  // Seed Home Page
  const homePageData = {
    heroTitle: 'Ts. Ashraf bin Naim',
    heroJobTitle: 'Penolong Pegawai PPD Unit Menengah & Tingkatan 6, Sektor Pengurusan Sekolah di Pejabat Pendidikan Daerah Kluang',
    heroDescription: 'Berpengalaman dalam AI, EdTech, dan transformasi digital dalam pendidikan. Pendidik dan pegawai yang bersemangat untuk memajukan pendidikan melalui teknologi.',
    heroImage: '/images/profile/profile.png',
    stats: JSON.stringify([
      { value: '19+', label: 'Tahun Pengalaman' },
      { value: '25+', label: 'Bengkel & Ceramah' },
      { value: '10+', label: 'Pensijilan' },
      { value: '5+', label: 'Sistem Dibangunkan' },
    ]),
    achievements: JSON.stringify([
      {
        icon: 'Award',
        title: 'Teknologis Profesional',
        period: '2025',
        description: 'Pengiktirafan profesional dalam bidang Komputer & Teknologi Maklumat oleh MBOT',
      },
      {
        icon: 'GraduationCap',
        title: 'Penceramah AI',
        period: '2024-2025',
        description: 'Penceramah untuk kursus AI dalam pendidikan kepada pegawai dan guru di Johor',
      },
      {
        icon: 'Briefcase',
        title: 'Pentadbir Sistem',
        period: '2022-2025',
        description: 'Pentadbir DELIMa, Portal JPNJ, dan sistem pendidikan negeri Johor',
      },
    ]),
    skills: JSON.stringify([
      {
        name: 'Microsoft 365',
        level: 'Advanced',
        description: 'Power Platform, Teams, SharePoint',
      },
      {
        name: 'Google Workspace',
        level: 'Expert',
        description: 'Certified Educator Level 1 & 2',
      },
      {
        name: 'Apple Ecosystem',
        level: 'Advanced',
        description: 'Apple Teacher, macOS, iOS',
      },
      {
        name: 'AI dalam Pendidikan',
        level: 'Expert',
        description: 'AI tools, Canva AI, ChatGPT',
      },
      {
        name: 'Video Editing',
        level: 'Advanced',
        description: 'Multimedia production',
      },
      {
        name: 'Rekaan Grafik',
        level: 'Advanced',
        description: 'Canva, Adobe Creative Suite',
      },
    ]),
    ctaTitle: 'Mari Berkolaborasi',
    ctaDescription: 'Berminat untuk kerjasama, bengkel, atau perkongsian ilmu? Jangan teragak-agak untuk menghubungi saya.',
    published: true,
  };

  // Check if home page already exists
  const existingHomePage = await prisma.homePage.findFirst();
  if (existingHomePage) {
    console.log('Home page already exists. Skipping...');
  } else {
    const homePage = await prisma.homePage.create({
      data: homePageData,
    });
    console.log(`Created home page with id: ${homePage.id}`);
  }

  // Seed About Page
  const aboutPageData = {
    profileTitle: 'Tentang Saya',
    profileSubtitle: 'Teknologis Profesional dalam bidang Pendidikan & Teknologi Maklumat',
    profileJobTitle: 'Penolong Pegawai PPD Unit Menengah & Tingkatan 6',
    profileLocation: 'Pejabat Pendidikan Daerah Kluang, Johor',
    profileYearsExperience: '19+ Tahun Pengalaman dalam Pendidikan',
    profileSummary: 'Seorang pendidik berpengalaman dan teknologis profesional yang bersemangat dalam memajukan pendidikan melalui teknologi. Berpengalaman luas dalam AI, EdTech, dan transformasi digital dalam pendidikan dengan lebih 19 tahun pengalaman dalam sektor pendidikan.',
    profileImage: '/images/profile/profile.png',
    qualifications: JSON.stringify([
      {
        icon: 'Award',
        title: 'Teknologis Profesional',
        subtitle: 'MBOT (2025)',
        description: 'Pengiktirafan profesional dalam bidang Komputer & Teknologi Maklumat oleh Malaysian Board of Technologists',
      },
      {
        icon: 'GraduationCap',
        title: 'Google Certified Educator',
        subtitle: 'Level 1 & Level 2',
        description: 'Certified dalam Google Workspace for Education dan Google tools untuk pembelajaran digital',
      },
      {
        icon: 'Award',
        title: 'Apple Teacher',
        subtitle: 'Apple Inc.',
        description: 'Certified dalam penggunaan teknologi Apple untuk pendidikan (iPad, Mac, dan pembelajaran digital)',
      },
      {
        icon: 'Briefcase',
        title: 'Microsoft Specialist',
        subtitle: 'Microsoft 365',
        description: 'Pakar dalam Microsoft 365, Power Platform, Teams, dan SharePoint untuk transformasi digital',
      },
    ]),
    expertiseAreas: JSON.stringify([
      {
        title: 'AI dalam Pendidikan',
        description: 'ChatGPT, Canva AI, AI tools untuk pembelajaran',
      },
      {
        title: 'Microsoft 365',
        description: 'Power Platform, Teams, SharePoint',
      },
      {
        title: 'Google Workspace',
        description: 'Google Classroom, Drive, Apps Script',
      },
      {
        title: 'Apple Ecosystem',
        description: 'iPad, Mac, Apple Teacher certification',
      },
      {
        title: 'EdTech Solutions',
        description: 'Digital learning platforms & tools',
      },
      {
        title: 'Transformasi Digital',
        description: 'Change management & digital adoption',
      },
      {
        title: 'Video Production',
        description: 'Multimedia content creation',
      },
      {
        title: 'Graphic Design',
        description: 'Canva, Adobe Creative Suite',
      },
      {
        title: 'Sistem Pengurusan',
        description: 'Database, web applications',
      },
    ]),
    experiences: JSON.stringify([
      {
        title: 'Penolong Pegawai PPD Unit Menengah & Tingkatan 6',
        organization: 'Pejabat Pendidikan Daerah Kluang',
        period: '2022 - Kini',
        description: 'Pengurusan sekolah menengah dan tingkatan 6, pentadbiran sistem pendidikan, dan transformasi digital di peringkat daerah.',
      },
      {
        title: 'Penceramah & Fasilitator',
        organization: 'Kursus AI dalam Pendidikan',
        period: '2024 - 2025',
        description: 'Penceramah untuk kursus AI dalam pendidikan kepada pegawai dan guru di seluruh negeri Johor.',
      },
      {
        title: 'Pentadbir Sistem',
        organization: 'DELIMa & Portal JPNJ',
        period: '2022 - Kini',
        description: 'Pengurusan dan pentadbiran sistem DELIMa dan Portal JPNJ untuk negeri Johor.',
      },
      {
        title: 'Pendidik',
        organization: 'Kementerian Pendidikan Malaysia',
        period: '2006 - Kini',
        description: '19+ tahun pengalaman dalam pendidikan, mengajar dan membimbing pelajar serta guru.',
      },
    ]),
    achievements: JSON.stringify([
      {
        title: 'Bengkel & Ceramah',
        items: [
          'Penceramah AI dalam Pendidikan (25+ sesi)',
          'Fasilitator Google Workspace untuk Pendidik',
          'Trainer Microsoft 365 untuk Sekolah',
          'Workshop Canva AI untuk Guru',
        ],
      },
      {
        title: 'Sistem & Projek',
        items: [
          'Pentadbir DELIMa Negeri Johor',
          'Pentadbir Portal JPNJ',
          'Pembangunan Sistem Pengurusan Sekolah',
          'Implementasi Digital Learning Platform',
        ],
      },
    ]),
    published: true,
  };

  // Check if about page already exists
  const existingAboutPage = await prisma.aboutPage.findFirst();
  if (existingAboutPage) {
    console.log('About page already exists. Skipping...');
  } else {
    const aboutPage = await prisma.aboutPage.create({
      data: aboutPageData,
    });
    console.log(`Created about page with id: ${aboutPage.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
