import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding HomePage and AboutPage...');

  // Seed HomePage
  const homePage = await prisma.homePage.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heroTitle: 'Ts. Ashraf bin Naim',
      heroJobTitle: 'Penolong Pegawai PPD Unit Menengah & Tingkatan 6, Sektor Pengurusan Sekolah di Pejabat Pendidikan Daerah Kluang',
      heroDescription: 'Berpengalaman dalam AI, EdTech, dan transformasi digital dalam pendidikan. Pendidik dan pegawai yang bersemangat untuk memajukan pendidikan melalui teknologi.',
      heroImage: '/images/profile/profile.png',
      stats: JSON.stringify([
        { value: '19+', label: 'Tahun Pengalaman' },
        { value: '25+', label: 'Bengkel & Ceramah' },
        { value: '10+', label: 'Pensijilan' },
        { value: '5+', label: 'Sistem Dibangunkan' }
      ]),
      achievements: JSON.stringify([
        {
          icon: 'Award',
          title: 'Teknologis Profesional',
          period: '2025',
          description: 'Pengiktirafan profesional dalam bidang Komputer & Teknologi Maklumat oleh MBOT'
        },
        {
          icon: 'GraduationCap',
          title: 'Penceramah AI',
          period: '2024-2025',
          description: 'Penceramah untuk kursus AI dalam pendidikan kepada pegawai dan guru di Johor'
        },
        {
          icon: 'Briefcase',
          title: 'Pentadbir Sistem',
          period: '2022-2025',
          description: 'Pentadbir DELIMa, Portal JPNJ, dan sistem pendidikan negeri Johor'
        }
      ]),
      skills: JSON.stringify([
        {
          name: 'Microsoft 365',
          level: 'Advanced',
          description: 'Power Platform, Teams, SharePoint'
        },
        {
          name: 'Google Workspace',
          level: 'Expert',
          description: 'Certified Educator Level 1 & 2'
        },
        {
          name: 'Apple Ecosystem',
          level: 'Advanced',
          description: 'Apple Teacher, macOS, iOS'
        },
        {
          name: 'AI dalam Pendidikan',
          level: 'Expert',
          description: 'AI tools, Canva AI, ChatGPT'
        },
        {
          name: 'Video Editing',
          level: 'Advanced',
          description: 'Multimedia production, Final Cut Pro'
        },
        {
          name: 'Rekaan Grafik',
          level: 'Advanced',
          description: 'Canva for Education'
        }
      ]),
      ctaTitle: 'Mari Berkolaborasi',
      ctaDescription: 'Berminat untuk kerjasama, bengkel, atau perkongsian ilmu? Jangan teragak-agak untuk menghubungi saya.',
      published: true
    }
  });

  console.log('HomePage seeded:', homePage.id);

  // Seed AboutPage
  const aboutPage = await prisma.aboutPage.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      profileTitle: 'Ts. Ashraf bin Naim',
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
          description: 'Pengiktirafan profesional dalam bidang Komputer & Teknologi Maklumat oleh Malaysian Board of Technologists'
        },
        {
          icon: 'GraduationCap',
          title: 'Google Certified Educator',
          subtitle: 'Level 1 & Level 2',
          description: 'Certified dalam Google Workspace for Education dan Google tools untuk pembelajaran digital'
        },
        {
          icon: 'Award',
          title: 'Apple Teacher',
          subtitle: 'Apple Inc.',
          description: 'Certified dalam penggunaan teknologi Apple untuk pendidikan (iPad, Mac, dan pembelajaran digital)'
        },
        {
          icon: 'Award',
          title: 'Microsoft Educator',
          subtitle: 'Microsoft 365',
          description: 'Microsoft 365, Power Platform dan Teams untuk transformasi digital'
        }
      ]),
      expertiseAreas: JSON.stringify([
        {
          title: 'AI dalam Pendidikan',
          description: 'ChatGPT, Canva AI, AI tools untuk pembelajaran'
        },
        {
          title: 'Microsoft 365',
          description: 'Power Platform, Teams, SharePoint'
        },
        {
          title: 'Google Workspace',
          description: 'Google Ecosystem, Drive, Apps Script'
        },
        {
          title: 'Apple Ecosystem',
          description: 'iPad, Mac, Apple Teacher certification'
        },
        {
          title: 'EdTech Solutions',
          description: 'Digital learning platforms & tools'
        },
        {
          title: 'Transformasi Digital',
          description: 'Change management & digital adoption'
        },
        {
          title: 'Video Production',
          description: 'Multimedia content creation'
        },
        {
          title: 'Graphic Design',
          description: 'Advance Canva'
        },
        {
          title: 'Sistem Pengurusan',
          description: 'Database, web applications'
        }
      ]),
      experiences: JSON.stringify([
        {
          title: 'Penolong Pegawai PPD Unit Menengah & Tingkatan 6',
          organization: 'Sektor Pengurusan Sekolah, Pejabat Pendidikan Daerah Kluang',
          period: '2025 - Kini',
          description: 'Pengurusan sekolah menengah dan tingkatan 6, pentadbiran sistem pendidikan, dan transformasi digital di peringkat daerah.'
        },
        {
          title: 'Penolong Pengarah',
          organization: 'Sektor Sumber & Teknologi Pendidikan, JPN Johor',
          period: '2023 - 2025',
          description: 'Pengurusan dan pentadbiran Pendidikan Digital serta admin DELIMa untuk negeri Johor.'
        },
        {
          title: 'Penolong PPD Sumber & Teknologi Pendidikan',
          organization: 'Sektor Pembelajaran, Pejabat Pendidikan Daerah Kluang',
          period: '2021 - 2023',
          description: 'Pengurusan dan pentadbiran Pendidikan Digital serta admin DELIMa untuk Daerah Kluang.'
        },
        {
          title: 'Pendidik',
          organization: 'Kementerian Pendidikan Malaysia',
          period: '2006 - Kini',
          description: '19+ tahun pengalaman dalam pendidikan, mengajar dan membimbing pelajar serta guru.'
        }
      ]),
      achievements: JSON.stringify([
        {
          title: 'Bengkel & Ceramah',
          items: [
            'Penceramah AI dalam Pendidikan (25+ sesi)',
            'Google Workspace untuk Pendidik',
            'Workshop Canva AI untuk Guru'
          ]
        },
        {
          title: 'Sistem & Projek',
          items: [
            'Pentadbir DELIMa Negeri Johor',
            'Pentadbir Portal JPNJ',
            'Pembangunan Sistem Pengurusan Sekolah',
            'Implementasi Digital Learning Platform'
          ]
        }
      ]),
      published: true
    }
  });

  console.log('AboutPage seeded:', aboutPage.id);
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
