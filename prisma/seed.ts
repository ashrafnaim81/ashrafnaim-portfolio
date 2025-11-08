import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = 'ashrafnaim81@gmail.com';
  const adminPassword = 'admin123'; // CHANGE THIS IN PRODUCTION!

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Ts. Ashraf bin Naim',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Admin user created:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   ⚠️  IMPORTANT: Change this password after first login!`);
  }

  // Create sample blog categories
  const categories = [
    { name: 'AI & Technology', slug: 'ai-technology', description: 'Articles about AI and modern technology' },
    { name: 'Education', slug: 'education', description: 'Educational content and insights' },
    { name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step guides and tutorials' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('✅ Categories created');

  // Create sample tags
  const tags = [
    { name: 'AI', slug: 'ai' },
    { name: 'ChatGPT', slug: 'chatgpt' },
    { name: 'Google Workspace', slug: 'google-workspace' },
    { name: 'Microsoft 365', slug: 'microsoft-365' },
    { name: 'EdTech', slug: 'edtech' },
    { name: 'Automation', slug: 'automation' },
    { name: 'Google Apps Script', slug: 'google-apps-script' },
    { name: 'Digital Transformation', slug: 'digital-transformation' },
    { name: 'Strategy', slug: 'strategy' },
    { name: 'Power BI', slug: 'power-bi' },
    { name: 'Analytics', slug: 'analytics' },
    { name: 'Hybrid Learning', slug: 'hybrid-learning' },
    { name: 'Best Practices', slug: 'best-practices' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Safety', slug: 'safety' },
    { name: 'Video Production', slug: 'video-production' },
    { name: 'Content Creation', slug: 'content-creation' },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  console.log('✅ Tags created');

  // Get admin user for blog posts
  const admin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!admin) {
    console.log('❌ Admin user not found, cannot create blog posts');
    return;
  }

  // Get categories and tags
  const aiCategory = await prisma.category.findUnique({
    where: { slug: 'ai-technology' },
  });

  const educationCategory = await prisma.category.findUnique({
    where: { slug: 'education' },
  });

  const tutorialCategory = await prisma.category.findUnique({
    where: { slug: 'tutorials' },
  });

  const aiTag = await prisma.tag.findUnique({ where: { slug: 'ai' } });
  const chatgptTag = await prisma.tag.findUnique({ where: { slug: 'chatgpt' } });
  const edtechTag = await prisma.tag.findUnique({ where: { slug: 'edtech' } });

  // Create featured blog post
  const featuredPost = await prisma.blogPost.upsert({
    where: { slug: 'panduan-lengkap-menggunakan-ai-dalam-bilik-darjah' },
    update: {},
    create: {
      title: 'Panduan Lengkap: Menggunakan AI dalam Bilik Darjah',
      slug: 'panduan-lengkap-menggunakan-ai-dalam-bilik-darjah',
      excerpt: 'Panduan praktikal bagaimana guru boleh mengintegrasikan AI tools seperti ChatGPT dan Canva AI dalam pengajaran harian untuk meningkatkan engagement pelajar.',
      content: `# Pengenalan

Artificial Intelligence (AI) bukan lagi teknologi masa depan - ia sudah berada di sini dan mengubah cara kita mengajar dan belajar. Sebagai pendidik, kita perlu memahami bagaimana menggunakan AI dengan bijak untuk meningkatkan pengalaman pembelajaran pelajar.

## Mengapa AI Penting dalam Pendidikan?

AI boleh membantu guru dalam pelbagai cara:
- Menjimatkan masa dalam persediaan bahan pengajaran
- Menyediakan pembelajaran yang dipersonalisasi
- Memberikan maklum balas segera kepada pelajar
- Membantu dalam pentaksiran dan analisis data

## Tools AI Yang Perlu Anda Cuba

### 1. ChatGPT untuk Guru

ChatGPT boleh membantu anda:
- Mereka bentuk rancangan pengajaran
- Mencipta soalan kuiz dan latihan
- Menghasilkan contoh dan analogi yang mudah difahami
- Menulis rubrik pentaksiran

**Contoh penggunaan:**
"Sediakan 5 soalan objektif tentang fotosintesis untuk pelajar Tingkatan 2"

### 2. Canva AI untuk Bahan Visual

Gunakan Canva AI untuk:
- Mencipta infografik yang menarik
- Menghasilkan slide presentation
- Membuat worksheet yang kreatif
- Design poster dan bulletin board

### 3. Google Workspace AI Features

Manfaatkan ciri-ciri AI dalam:
- Google Docs - untuk penulisan automatik
- Google Slides - untuk design suggestions
- Google Forms - untuk auto-grading

## Tips Penggunaan AI Yang Berkesan

1. **Jangan Bergantung 100% pada AI**
   - Gunakan AI sebagai alat bantu, bukan pengganti
   - Sentiasa semak dan edit output AI

2. **Ajar Pelajar Tentang AI**
   - Jelaskan bagaimana AI berfungsi
   - Ajar etika penggunaan AI
   - Tunjukkan limitasi AI

3. **Mulakan Dengan Kecil**
   - Cuba satu tool pada satu masa
   - Mulakan dengan task yang mudah
   - Tingkatkan penggunaan secara beransur

## Cabaran dan Cara Mengatasinya

### Cabaran: Akses Internet Terhad
**Penyelesaian:**
- Download bahan ketika ada internet
- Gunakan AI tools yang boleh berfungsi offline
- Kongsi resources dengan rakan guru

### Cabaran: Kurang Kemahiran Teknologi
**Penyelesaian:**
- Ikuti workshop dan webinar
- Join komuniti guru online
- Belajar secara peer-to-peer

### Cabaran: Kebimbangan Plagiarisme
**Penyelesaian:**
- Ajar pelajar cara menggunakan AI dengan betul
- Fokus pada proses, bukan hanya hasil akhir
- Gunakan AI untuk pembelajaran, bukan shortcut

## Kesimpulan

AI adalah alat yang berkuasa yang boleh membantu kita menjadi guru yang lebih berkesan. Kunci kejayaan adalah menggunakan AI dengan bijak - sebagai pelengkap kepada kreativiti dan kepakaran kita sebagai pendidik.

Mulakan hari ini. Cuba satu tool AI dan lihat bagaimana ia boleh membantu anda dan pelajar anda!

---

**Soalan? Komen?** Kongsi pengalaman anda menggunakan AI dalam pengajaran di bahagian komen di bawah.`,
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-03-15'),
      views: 0,
      authorId: admin.id,
      categoryId: educationCategory?.id || null,
      tags: {
        connect: [
          aiTag && { id: aiTag.id },
          chatgptTag && { id: chatgptTag.id },
          edtechTag && { id: edtechTag.id },
        ].filter((tag): tag is { id: string } => Boolean(tag)),
      },
    },
  });

  console.log('✅ Featured blog post created');

  // Create additional sample posts
  const samplePosts = [
    {
      title: '5 Cara ChatGPT Boleh Membantu Guru Setiap Hari',
      slug: '5-cara-chatgpt-boleh-membantu-guru-setiap-hari',
      excerpt: 'Discover praktikal ways untuk menggunakan ChatGPT dalam perancangan pengajaran, penilaian, dan komunikasi harian dengan pelajar.',
      content: `ChatGPT telah menjadi game-changer untuk guru di seluruh dunia. Dalam artikel ini, saya kongsikan 5 cara praktikal bagaimana anda boleh menggunakan ChatGPT untuk meningkatkan produktiviti harian anda sebagai guru.

## 1. Merancang Lesson Plans yang Komprehensif

ChatGPT boleh membantu anda create lesson plans yang lengkap dalam masa yang singkat. Berikan topik, tahap pelajar, dan durasi kelas, dan ChatGPT akan menghasilkan struktur lesson plan yang komprehensif termasuk:

- Learning objectives yang jelas
- Aktiviti warm-up yang engaging
- Aktiviti utama dengan step-by-step instructions
- Assessment methods
- Differentiation strategies untuk pelajar pelbagai tahap

**Contoh prompt:**
"Create a 60-minute lesson plan for Tingkatan 2 students about the water cycle. Include hands-on activities and assessment methods."

## 2. Mencipta Soalan Kuiz dan Worksheet

Salah satu task yang paling time-consuming adalah mencipta soalan untuk kuiz dan worksheet. ChatGPT boleh generate:

- Soalan objektif (MCQ, True/False, Fill in the blanks)
- Soalan subjektif yang merangsang critical thinking
- Soalan KBAT yang sesuai dengan tahap pelajar
- Answer keys dengan penjelasan

Anda boleh specify:
- Bloom's Taxonomy level yang anda mahu
- Format soalan yang specific
- Bilangan soalan yang diperlukan

## 3. Memberi Feedback pada Student Work

ChatGPT boleh membantu anda craft feedback yang constructive dan detailed:

- Draft feedback untuk essays
- Suggest ways to improve student work
- Identify common mistakes
- Provide encouraging but honest assessment

**Tip:** Copy paste student work dan minta ChatGPT analyze dan suggest feedback points.

## 4. Menjelaskan Konsep yang Complex

Apabila pelajar struggle dengan konsep yang susah, ChatGPT boleh help you:

- Create analogies yang mudah difahami
- Break down complex concepts into simpler parts
- Generate real-world examples
- Suggest hands-on activities untuk visualize concepts

**Example:** "Explain photosynthesis to 12-year-olds using a simple analogy they can relate to."

## 5. Automasi Administrative Tasks

ChatGPT juga boleh membantu dengan administrative work:

- Draft emails kepada parents
- Create newsletters
- Write lesson notes dan reflections
- Generate report card comments
- Create class announcements

## Best Practices untuk Menggunakan ChatGPT

1. **Always review and edit** - Jangan guna output ChatGPT verbatim. Review dan adjust mengikut context kelas anda.

2. **Be specific dalam prompts** - Semakin detailed prompt anda, semakin baik output yang anda dapat.

3. **Iterate** - Jika output tidak memuaskan, refine prompt anda atau minta ChatGPT revise.

4. **Combine dengan expertise anda** - ChatGPT adalah tool, bukan replacement. Combine dengan pengetahuan dan pengalaman anda.

## Kesimpulan

ChatGPT boleh save anda banyak masa dan energy, membolehkan anda fokus pada apa yang paling penting - mengajar dan membina hubungan dengan pelajar. Start small, experiment, dan cari ways yang paling sesuai dengan teaching style anda.

Jangan takut untuk try - AI adalah future of education, dan sebagai guru, kita perlu embrace teknologi ini untuk kebaikan pelajar kita.`,
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-03-10'),
      views: 0,
      authorId: admin.id,
      categoryId: aiCategory?.id || null,
    },
    {
      title: 'Canva AI: Game Changer untuk Bahan Pengajaran',
      slug: 'canva-ai-game-changer-untuk-bahan-pengajaran',
      excerpt: 'Bagaimana Canva AI dapat menghasilkan poster, infografik, dan bahan visual yang professional dalam minit sahaja - tanpa skill design!',
      content: `Sebagai guru, kita tahu betapa pentingnya visual aids dalam pengajaran. Tetapi tidak semua kita ada masa atau skill untuk create bahan yang cantik dan professional. Di sinilah Canva AI masuk untuk selamatkan hari!

## Kenapa Visual Matters dalam Pengajaran?

Research menunjukkan bahawa pelajar retain 65% of information apabila disertai dengan visual, berbanding hanya 10% dengan text sahaja. Visual aids:

- Meningkatkan engagement pelajar
- Memudahkan pemahaman konsep complex
- Membuat lessons lebih memorable
- Cater kepada visual learners

## Apa itu Canva AI?

Canva AI adalah suite of AI-powered tools dalam Canva yang boleh:
- Generate images berdasarkan text descriptions
- Auto-design layouts yang balanced dan cantik
- Suggest color schemes yang sesuai
- Create animations dan presentations automatically
- Remove backgrounds dengan satu click

## 5 Ways untuk Guna Canva AI dalam Classroom

### 1. Create Infographics dalam Minit

Dulu, create infographic boleh ambil sejam atau lebih. Sekarang dengan Canva AI:

1. Choose "Infographic" template
2. Masukkan topic dan key points
3. Magic Design akan generate multiple options
4. Pilih yang paling sesuai dan edit details

**Use cases:**
- Science processes (photosynthesis, water cycle)
- Historical timelines
- Math formulas dan concepts
- Grammar rules

### 2. Generate Custom Illustrations

Tidak jumpa gambar yang sesuai? Guna Canva's Text-to-Image AI:

**Contoh prompts:**
- "A friendly robot teaching kids about recycling"
- "Malaysian traditional house in cartoon style"
- "Students doing science experiment in lab"

AI akan generate gambar unique yang exactly fit your needs!

### 3. Design Worksheet yang Menarik

Worksheet tidak perlu boring! Dengan Canva AI:

- Auto-arrange questions dengan spacing yang perfect
- Add relevant illustrations automatically
- Choose dari templates yang sudah cantik
- Generate matching answer sheets

### 4. Create Engaging Presentation Slides

Magic Design untuk presentations:

1. Upload your content (bullet points, notes)
2. AI akan auto-format dalam slides
3. Add relevant images dan icons
4. Suggest animations dan transitions
5. Generate speaker notes

Save HOURS of work!

### 5. Bulletin Board dan Classroom Decorations

Create posters untuk:
- Classroom rules
- Motivational quotes
- Subject-specific information
- Birthday charts
- Schedule displays

Canva AI ensure semua nampak cohesive dan professional.

## Tips untuk Maximize Canva AI

1. **Start dengan templates** - Jangan mulakan dari zero. Modify existing templates.

2. **Use Brand Kit** - Setup school colors dan fonts untuk consistency.

3. **Leverage AI image generator** - Perfect untuk get specific illustrations.

4. **Batch create** - Buat multiple materials dalam satu session.

5. **Collaborate** - Share dengan rakan guru untuk edit together.

## Free vs Pro: Worth it ke?

Canva Free sudah sangat powerful, tetapi Canva Pro memberikan:
- Unlimited AI image generation
- Magic Resize (resize design untuk different platforms)
- Background remover
- Brand Kit unlimited
- Premium templates

Untuk guru yang selalu create materials, Canva Pro is definitely worth it. Consider untuk department share one Pro account.

## Real Teacher Examples

Saya survey 50+ teachers yang guna Canva AI:

- **"Saved 5+ hours weekly on material creation"** - Teacher Nora, Sekolah Kebangsaan
- **"My lessons became more engaging instantly"** - Sir Ahmad, Sekolah Menengah
- **"Parents impressed dengan quality of handouts"** - Miss Sarah, Tadika

## Kesimpulan

Canva AI democratize design untuk guru. Anda tidak perlu jadi graphic designer untuk create materials yang nampak professional. Dengan practice, anda boleh create stunning visuals dalam fraction of time yang dulu ambil.

Start today - sign up for free account dan experiment. Your students (and your sanity) will thank you!

**Pro tip:** Join Canva for Education program untuk get Pro features free jika anda mengajar di verified school.`,
      coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-03-05'),
      views: 0,
      authorId: admin.id,
      categoryId: tutorialCategory?.id || null,
    },
    {
      title: 'Google Classroom vs Microsoft Teams: Mana Lebih Baik?',
      slug: 'google-classroom-vs-microsoft-teams',
      excerpt: 'Perbandingan mendalam antara dua platform pembelajaran popular. Features, kelebihan, kekurangan, dan recommendation untuk sekolah anda.',
      content: `Memilih platform pembelajaran digital adalah keputusan besar untuk sekolah. Dua platform yang paling popular adalah Google Classroom dan Microsoft Teams for Education. Mari kita buat comparison yang comprehensive.

## Overview Platforms

### Google Classroom
Platform yang direka specifically untuk pendidikan, integrated dengan Google Workspace for Education.

### Microsoft Teams for Education
Platform collaboration yang powerful, sebahagian dari Microsoft 365 Education ecosystem.

## Perbandingan Feature-by-Feature

### 1. Kemudahan Penggunaan

**Google Classroom: 9/10**
- Interface yang sangat simple dan intuitive
- Learning curve yang minimal
- Pelajar dan guru boleh adapt dalam masa singkat
- Mobile app yang excellent

**Microsoft Teams: 7/10**
- Lebih complex kerana banyak features
- Perlu lebih masa untuk master
- Boleh jadi overwhelming untuk new users
- Tetapi more powerful apabila sudah biasa

**Winner:** Google Classroom untuk ease of use

### 2. Assignment Management

**Google Classroom:**
- Simple assignment creation
- Easy grading interface
- Integration dengan Google Docs/Sheets/Slides
- Rubric support
- Plagiarism detection (Originality Reports)

**Microsoft Teams:**
- Rich assignment features
- Integration dengan Office apps
- Insights dan analytics yang detailed
- Class Notebook integration
- Reading Progress untuk track literacy

**Winner:** Tie - depends on your ecosystem

### 3. Communication Tools

**Google Classroom:**
- Stream untuk announcements
- Private comments pada assignments
- Email notifications
- Integration dengan Google Meet

**Microsoft Teams:**
- Chat channels yang versatile
- Video calls built-in
- Breakout rooms
- Recording capabilities
- Together Mode untuk engaging classes

**Winner:** Microsoft Teams - more comprehensive

### 4. Collaboration Features

**Google Classroom:**
- Real-time collaboration dalam Google Docs
- Shared Drive integration
- Simple group work setup

**Microsoft Teams:**
- Channels untuk different topics/groups
- OneNote Class Notebook
- SharePoint integration
- More sophisticated collaboration tools

**Winner:** Microsoft Teams untuk advanced collaboration

### 5. Integration dan Ecosystem

**Google Classroom:**
- Seamless dengan Google Workspace
- Extensive third-party app integration
- Works well dengan Chromebooks
- Good mobile experience

**Microsoft Teams:**
- Deep integration dengan Office 365
- Works best dengan Windows ecosystem
- Power Platform integration
- Azure services

**Winner:** Depends on your existing infrastructure

### 6. Pricing

**Google Classroom:**
- Free dengan Google Workspace for Education Fundamentals
- Plus features dengan Education Standard/Plus

**Microsoft Teams:**
- Free dengan Microsoft 365 A1
- Premium features dengan A3/A5

**Winner:** Both have excellent free tiers

## Kelebihan dan Kekurangan

### Google Classroom

✅ **Kelebihan:**
- Extremely user-friendly
- Quick setup dan deployment
- Excellent untuk basic LMS needs
- Strong mobile apps
- Great untuk schools dengan Chromebooks

❌ **Kekurangan:**
- Limited communication tools
- Kurang sophisticated untuk complex needs
- Fewer built-in collaboration features
- Limited analytics

### Microsoft Teams

✅ **Kelebihan:**
- Comprehensive collaboration platform
- Powerful communication tools
- Rich analytics dan insights
- Excellent untuk hybrid/remote learning
- Professional development tool

❌ **Kekurangan:**
- Steeper learning curve
- Boleh overwhelming
- Perlu better hardware
- More complex administration

## Recommendations

### Pilih Google Classroom jika:
- Sekolah already using Google Workspace
- Students muda (primary school)
- Focus pada simplicity dan ease of use
- Limited IT support
- Chromebook deployment
- Need quick adoption

### Pilih Microsoft Teams jika:
- School using Microsoft 365
- Secondary atau higher education
- Need advanced collaboration
- Hybrid/remote learning adalah priority
- Strong IT support available
- Want all-in-one platform

## Boleh Guna Both?

Ya! Some schools use both:
- Google Classroom untuk assignment management
- Microsoft Teams untuk communication dan collaboration

This hybrid approach leverage strengths of both platforms.

## Migration Considerations

Jika nak switch platforms:

1. **Plan thoroughly** - Don't rush
2. **Train teachers** - Comprehensive PD
3. **Pilot first** - Test dengan few classes
4. **Gradual rollout** - Phase by phase
5. **Support continuously** - Provide ongoing help

## Kesimpulan

**For most schools**, especially yang baru mula atau ada basic needs, **Google Classroom adalah pilihan terbaik** kerana simplicity dan ease of adoption.

**For schools** yang need comprehensive digital workplace, strong collaboration tools, dan already invested dalam Microsoft ecosystem, **Microsoft Teams adalah superior choice**.

Ultimately, best platform adalah yang teachers akan actually use dan pelajar boleh access easily. Consider your context, resources, dan needs carefully before deciding.

**My recommendation:** Start dengan platform yang align dengan ecosystem anda (Google or Microsoft), provide excellent training, dan focus on pedagogical integration rather than just technical deployment.`,
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-03-01'),
      views: 0,
      authorId: admin.id,
      categoryId: educationCategory?.id || null,
    },
    {
      title: 'Automasi Workflow Sekolah dengan Apps Script',
      slug: 'automasi-workflow-sekolah-dengan-apps-script',
      excerpt: 'Tutorial lengkap bagaimana menggunakan Google Apps Script untuk automate repetitive tasks dan tingkatkan efisiensi pentadbiran sekolah.',
      content: `Sebagai pendidik, kita habiskan terlalu banyak masa untuk administrative tasks yang repetitive. Google Apps Script boleh automate banyak daripada tasks ini, membebaskan masa untuk fokus pada pengajaran.

## Apa itu Google Apps Script?

Google Apps Script adalah JavaScript-based scripting platform yang membolehkan anda automate tasks merentasi Google Workspace apps - Sheets, Docs, Forms, Gmail, Calendar, dan lain-lain.

**Best part?** Ia percuma dan tidak memerlukan coding experience yang mendalam. Jika anda boleh guna spreadsheet, anda boleh belajar Apps Script!

## 5 Automation Yang Perlu Cuba Sekarang

### 1. Auto-Email Report kepada Parents

Hantar progress reports automatically melalui email:

**Use case:** Setiap hujung minggu, auto-email attendance summary kepada parents.

**Benefits:**
- Save 3-4 jam seminggu
- Consistent communication
- Reduce manual errors
- Parents appreciate proactive updates

**How it works:**
1. Data dalam Google Sheets (student name, parent email, attendance)
2. Script runs setiap Friday 4pm
3. Auto-generate personalized email untuk setiap parent
4. Send dengan attachments jika perlu

### 2. Automatic Class Roster Updates

Sync student data across multiple sheets automatically:

**Problem:** Student data scattered across berbagai spreadsheets - attendance, grades, behavior logs. Manual update everywhere bila ada changes.

**Solution:** Apps Script auto-update semua sheets bila anda edit master roster.

**Real impact:** Teacher Farah saved 2 hours per week managing 5 different trackers for 120 students.

### 3. Google Form to Document Generator

Auto-create certificates, letters, atau forms berdasarkan responses:

**Example applications:**
- Student achievement certificates
- Parent permission letters
- Intervention referral forms
- Meeting agendas
- Student reports

**How powerful is this?**
- Teacher submit form data sekali
- Script auto-populate template document
- Generate PDF
- Email kepada relevant parties
- Save copy dalam organized Drive folders

**One teacher generated 150 parent-teacher conference letters dalam 2 minutes!**

### 4. Automated Attendance Tracking

Create smart attendance system:

**Features:**
- Daily attendance form
- Auto-calculate attendance percentage
- Flag students dengan low attendance
- Weekly summary reports
- Auto-email kepada counselors jika threshold exceeded

**Advanced:** Integrate dengan Google Calendar untuk auto-mark present untuk excused absences.

### 5. Smart Assignment Tracker

Auto-track missing assignments dan remind students:

**Workflow:**
1. Teachers log assignments dalam shared Sheet
2. Script checks submission status daily
3. Auto-email reminders kepada students dengan missing work
4. CC parents if assignment overdue >3 days
5. Generate weekly reports untuk counselors

**Result:** One school reduced missing assignments by 40% dalam satu semester!

## Getting Started: Your First Script

### Step 1: Open Script Editor

1. Buka Google Sheets
2. Extensions > Apps Script
3. You'll see code editor

### Step 2: Simple Example - Auto-Timestamp

Copy this beginner-friendly script:

\`\`\`javascript
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;

  // If edit dalam column B, tambah timestamp dalam column C
  if (range.getColumn() == 2) {
    var timestampCell = sheet.getRange(range.getRow(), 3);
    timestampCell.setValue(new Date());
  }
}
\`\`\`

**What this does:** Automatically add timestamp setiap kali cell di column B di-edit.

### Step 3: Test It

1. Save script (Ctrl+S)
2. Close editor
3. Edit any cell dalam column B
4. Watch column C auto-populate dengan timestamp!

## More Advanced Examples

### Auto-Email Weekly Summary

\`\`\`javascript
function sendWeeklySummary() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  var data = sheet.getDataRange().getValues();

  // Process data
  var summary = "Weekly Summary:\\n\\n";
  // ... build your summary

  // Send email
  MailApp.sendEmail({
    to: "principal@school.edu",
    subject: "Weekly Report",
    body: summary
  });
}
\`\`\`

**Setup trigger:** Run this every Friday automatically.

### Form Response Processor

\`\`\`javascript
function onFormSubmit(e) {
  var responses = e.values;
  var studentName = responses[1];
  var parentEmail = responses[2];

  // Create document dari template
  var template = DriveApp.getFileById("TEMPLATE_ID");
  var copy = template.makeCopy(studentName + " - Form");
  var doc = DocumentApp.openById(copy.getId());
  var body = doc.getBody();

  // Replace placeholders
  body.replaceText("{{NAME}}", studentName);
  // ... more replacements

  // Email the document
  MailApp.sendEmail({
    to: parentEmail,
    subject: "Your Form Response",
    body: "Please see attached.",
    attachments: [copy.getAs(MimeType.PDF)]
  });
}
\`\`\`

## Best Practices

### 1. Test with Sample Data First
Jangan test dengan real student data initially. Create dummy sheet untuk testing.

### 2. Set Up Email Quotas
Google limits daily emails. For personal account: 100/day. For Workspace: 1500/day.

### 3. Error Handling
Always include try-catch blocks:

\`\`\`javascript
function safeFunction() {
  try {
    // Your code
  } catch (error) {
    Logger.log("Error: " + error.toString());
    // Send email kepada admin about error
  }
}
\`\`\`

### 4. Use Triggers Wisely
- Time-based triggers: For scheduled tasks
- OnEdit triggers: For real-time responses
- OnFormSubmit: For form processing

### 5. Document Your Code
Tulis comments untuk future reference:

\`\`\`javascript
// This function sends attendance report every Friday
// Updated: 2025-03-01 by Teacher Ahmad
function sendAttendanceReport() {
  // Code here
}
\`\`\`

## Common Challenges & Solutions

### Challenge 1: "Permission Denied" Errors
**Solution:** Ensure script has proper authorizations. Run manually first untuk authorize.

### Challenge 2: Script Runs Too Slowly
**Solution:**
- Batch operations instead of row-by-row
- Use getValues() instead of getValue() dalam loops
- Cache data dalam variables

### Challenge 3: Quota Exceeded
**Solution:**
- Spread tasks across different times
- Use batch processing
- Consider Workspace upgrade if needed

## Real School Success Stories

### Sekolah Kebangsaan Taman Megah
**Before:** 10 hours weekly on attendance tracking dan parent communication.
**After:** 2 hours weekly dengan Apps Script automation.
**ROI:** 8 hours saved = more time for lesson planning!

### SMK Bukit Indah
**Automation:** Auto-generate 500+ student report cards dari data.
**Time saved:** 40 hours per semester.
**Bonus:** Zero typos atau missing data!

## Learning Resources

### Free Resources:
1. **Google Apps Script Documentation** - Official guides
2. **YouTube Tutorials** - Search "Apps Script for teachers"
3. **Teacher communities** - Share scripts dengan colleagues

### Courses:
1. **Udemy** - "Google Apps Script for Beginners"
2. **Coursera** - "Automate Tasks with Google Apps Script"

### Communities:
- Google Apps Script Community Forum
- Teacher tech groups di Facebook
- Reddit r/GoogleAppsScript

## Start Your Automation Journey

### Week 1: Learn Basics
- Complete one simple tutorial
- Understand variables, functions
- Test dengan simple spreadsheet

### Week 2: First Real Automation
- Identify satu repetitive task
- Build simple script untuk automate
- Test thoroughly

### Week 3: Refine & Expand
- Add error handling
- Set up triggers
- Document your code

### Week 4: Share & Scale
- Share dengan colleagues
- Train others
- Identify next automation opportunity

## Security & Privacy Considerations

### Protect Student Data
- Never log sensitive information
- Use proper permissions
- Regular audits of scripts
- Follow PDPA guidelines

### Access Control
- Limit who can edit scripts
- Use service accounts untuk shared scripts
- Regular password updates

## Kesimpulan

Google Apps Script adalah game-changer untuk school administration. Dengan investment of time untuk learn basics, anda boleh save ratusan jam annually dan significantly reduce errors dalam administrative tasks.

**Remember:** Start small, test thoroughly, dan scale gradually. Automation should make your life easier, not complicated!

**Next steps:**
1. Identify satu repetitive task hari ini
2. Search untuk relevant Apps Script tutorial
3. Build your first automation minggu ini
4. Share success dengan colleagues

Transform your administrative workflow hari ini. Your future self akan thank you!

---

**Need help?** Drop your questions dalam comments atau email. Share artikel ini dengan colleagues yang need automation dalam their lives!`,
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-02-25'),
      views: 0,
      authorId: admin.id,
      categoryId: tutorialCategory?.id || null,
    },
    {
      title: 'Digital Transformation: Dari Mana Nak Mula?',
      slug: 'digital-transformation-dari-mana-nak-mula',
      excerpt: 'Panduan praktikal untuk sekolah yang ingin memulakan perjalanan transformasi digital. Step-by-step approach yang realistic dan achievable.',
      content: `Digital transformation bukan sekadar beli teknologi baru. Ia tentang mengubah culture, processes, dan mindset. Ramai sekolah overwhelmed - tidak tahu dari mana nak mula.

Mari kita break down the journey into manageable steps.

## Apa Sebenarnya Digital Transformation?

Digital transformation dalam pendidikan bermaksud:
- Mengintegrasikan teknologi dalam semua aspek pengajaran dan pembelajaran
- Mengubah cara guru teach dan students learn
- Streamline administrative processes
- Data-driven decision making
- Preparing students untuk digital world

**Bukan sekadar:**
- Beli iPad untuk semua orang
- Install smartboard dalam kelas
- Guna Google Classroom

Teknologi adalah tool. Transformation adalah journey.

## Mengapa Sekarang?

### 1. Student Expectations Have Changed
Generation Alpha expect digital integration. Mereka grew up dengan technology.

### 2. Future of Work is Digital
Skills yang students perlukan untuk future workplace increasingly digital.

### 3. Efficiency & Sustainability
Digital processes save time, money, dan resources.

### 4. Data-Driven Insights
Technology membolehkan better tracking of student progress dan informed decisions.

### 5. Post-Pandemic Reality
COVID-19 showed us pentingnya digital readiness.

## The 5-Stage Transformation Roadmap

### Stage 1: Assessment & Vision (Bulan 1-2)

#### Assess Current State

**Infrastructure Audit:**
- Internet connectivity - Speed? Reliable?
- Devices - Student:device ratio?
- Software - What apps already in use?
- IT support - Capacity dan capabilities?

**Stakeholder Readiness:**
- Teacher tech skills - Survey current levels
- Admin buy-in - Support dari leadership?
- Parent expectations - What's their comfort level?
- Student access - Device ownership at home?

**Quick Assessment Tool:**
Create simple Google Form untuk gauge:
- Current tool usage
- Comfort levels (1-10 scale)
- Pain points
- Wish list

#### Define Your Vision

**Key questions:**
- Where do we want to be dalam 3 years?
- What does success look like?
- What are our priorities?

**Example Vision Statement:**
"By 2027, our school akan menjadi digitally empowered learning community where every student has equitable access to technology, teachers confidently integrate digital tools pedagog ically, dan data informs our continuous improvement."

### Stage 2: Quick Wins & Foundation (Bulan 3-6)

Start dengan projects yang deliver immediate value - build momentum!

#### Quick Win 1: Centralized Communication
**Before:** Announcements scattered - WhatsApp, email, paper notes
**Action:** Implement ONE platform untuk school-wide communication
**Tools:** Google Classroom, Microsoft Teams, atau school app
**Timeline:** 1 bulan
**Impact:** Immediate clarity dan reduced confusion

#### Quick Win 2: Digital Attendance
**Before:** Paper registers, manual data entry
**Action:** Simple Google Form atau app untuk attendance
**Timeline:** 2 minggu
**Impact:** Real-time data, auto-calculations, less paperwork

#### Quick Win 3: Assignment Submission Portal
**Before:** Physical submissions, lost assignments
**Action:** Google Classroom untuk digital submissions
**Timeline:** 1 bulan
**Impact:** Trackable submissions, reduced lost work

**Why Quick Wins Matter:**
- Build confidence
- Demonstrate value
- Create advocates
- Generate momentum

### Stage 3: Teacher Capacity Building (Bulan 4-12)

Technology hanya as good as people using it. Investment dalam teacher professional development adalah critical.

#### Training Framework

**Level 1: Digital Basics (All Teachers)**
- Email best practices
- Cloud storage (Drive/OneDrive)
- Basic productivity apps
- Online safety

**Level 2: Pedagogical Integration (Most Teachers)**
- Digital lesson planning
- Interactive presentations
- Assessment tools
- Collaboration platforms

**Level 3: Advanced Innovation (Champion Teachers)**
- Creating digital content
- Flipped classroom
- Gamification
- Data analytics

#### Training Delivery Methods

**1. Micro-Learning Sessions**
- 15-20 minit weekly
- Focus pada satu tool/skill
- Hands-on practice

**2. Peer Learning**
- Teacher champions mentor colleagues
- Observation opportunities
- Collaborative planning

**3. Self-Paced Learning**
- Curated video tutorials
- Online courses
- Practice assignments

**4. Just-in-Time Support**
- Drop-in help sessions
- Tech buddies
- Quick reference guides

#### Measuring Progress

Track teacher progress dengan:
- Skills self-assessment quarterly
- Observation of classroom practice
- Digital tool adoption rates
- Teacher confidence surveys

### Stage 4: Student Digital Literacy (Bulan 6-18)

Students need explicit teaching about using technology effectively dan responsibly.

#### Digital Citizenship Curriculum

**Primary School:**
- Online safety basics
- Appropriate online behavior
- Protecting personal information
- Recognizing reliable information

**Secondary School:**
- Digital footprint management
- Critical media literacy
- Cyberbullying prevention
- Creative content creation

#### Technical Skills Development

Integrate technology skills across subjects:
- Research skills
- Presentation creation
- Data analysis
- Collaborative tools
- Digital creation (video, graphics, etc.)

### Stage 5: Sustained Innovation (Bulan 12+)

Digital transformation bukan "one and done" - it's ongoing.

#### Build Innovation Culture

**Innovation Time:**
- Monthly "Tech Try-Day" - experiment dengan new tools
- Teacher innovation grants - small budget untuk try new ideas
- Student voice - let students suggest tools/approaches

**Continuous Improvement:**
- Regular feedback loops
- Data review sessions
- Iterate based on what works

**Sharing Best Practices:**
- Monthly showcases
- Internal blog/newsletter
- Collaboration time

## Critical Success Factors

### 1. Leadership Buy-In

Principals dan admin must:
- Model technology use
- Allocate resources
- Celebrate successes
- Protect innovation time

### 2. Realistic Timeline

**Don't rush!** Transformation takes 3-5 years. Plan accordingly.

### 3. Budget Wisely

**Typical Budget Allocation:**
- 40% - Infrastructure (devices, connectivity)
- 30% - Professional development
- 20% - Software/licenses
- 10% - Ongoing support

### 4. Equitable Access

Ensure ALL students benefit:
- Device lending programs
- Subsidized internet access
- Before/after school tech access
- Offline alternatives

### 5. Measure Impact

Track:
- Student engagement levels
- Learning outcomes
- Teacher satisfaction
- Efficiency gains
- Cost savings

## Common Pitfalls to Avoid

### ❌ Technology for Technology's Sake
Buy tools yang solve real problems, bukan just because "everyone's using it."

### ❌ Insufficient Training
Equipment without training = expensive paperweights.

### ❌ Ignoring Infrastructure
Slow internet dan insufficient devices sabotage best intentions.

### ❌ One-Size-Fits-All Approach
Different subjects, grades, teachers need different solutions.

### ❌ Forgetting Sustainability
Pilot projects die without plan untuk scale dan sustain.

## Your 90-Day Action Plan

### Days 1-30: Foundation
- [ ] Form transformation committee
- [ ] Conduct stakeholder surveys
- [ ] Audit current state
- [ ] Draft vision statement
- [ ] Identify quick wins

### Days 31-60: Planning
- [ ] Develop 3-year roadmap
- [ ] Secure leadership approval
- [ ] Budget allocation
- [ ] Select initial tools
- [ ] Plan teacher training

### Days 61-90: Launch
- [ ] Implement first quick win
- [ ] Begin teacher training
- [ ] Communication campaign
- [ ] Pilot programs
- [ ] Gather initial feedback

## Resources untuk Getting Started

### Free Planning Tools:
- **ISTE Standards** - Framework untuk digital learning
- **Digital Readiness Assessment** - Online tools untuk audit
- **Google for Education Resources** - Free training materials

### Communities:
- ISTE community forums
- National/state EdTech associations
- Local teacher networks

## Success Story: SK Taman Megah

**Starting Point (2023):**
- 30% teacher tech confidence
- Paper-based everything
- Limited devices

**Year 1 Actions:**
- Deployed Google Workspace
- Monthly 30-min training sessions
- Chromebook cart sharing system
- Digital attendance pilot

**Results after 18 months:**
- 85% teacher confidence with basic tools
- 70% reduction dalam paper usage
- 90% of assignments submitted digitally
- Teacher collaboration increased significantly

**Key Success Factor:** "We started small, celebrated every win, dan gave teachers time to adapt." - Pengetua

## Kesimpulan

Digital transformation is a marathon, bukan sprint. Success requires:
- Clear vision
- Patient implementation
- Continuous support
- Celebration of progress
- Willingness to adjust

**Start today:**
1. Assess where you are
2. Define where you want to go
3. Take first small step

Transformation doesn't require perfection. It requires starting.

**Your move:** Apa satu langkah you boleh take minggu ini untuk begin your school's digital transformation journey?`,
      coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-02-20'),
      views: 0,
      authorId: admin.id,
      categoryId: educationCategory?.id || null,
    },
    {
      title: 'Power BI untuk Pendidik: Visualize Data dengan Mudah',
      slug: 'power-bi-untuk-pendidik',
      excerpt: 'Belajar menggunakan Microsoft Power BI untuk transform school data menjadi visual dashboards yang powerful untuk inform decision-making.',
      content: `Data everywhere dalam sekolah kita - attendance, grades, behavior, demographics. Tetapi data dalam spreadsheet susah untuk make sense of. Power BI transform numbers into insights yang actionable.

## Kenapa Power BI untuk Pendidik?

### Traditional Approach:
- Data dalam multiple Excel files
- Manual calculations
- Static reports
- Susah untuk spot trends
- Time-consuming updates

### Power BI Approach:
- Centralized data visualization
- Interactive dashboards
- Real-time updates
- Pattern recognition easy
- Shareable insights

**Best part:** Power BI Desktop adalah **FREE** untuk individual use!

## Apa Yang Boleh Anda Buat?

### 1. Student Achievement Dashboard

**Visualize:**
- Class average trends over time
- Subject performance comparisons
- Individual student progress
- Grade distribution
- Achievement gaps

**Use cases:**
- Parent-teacher conferences
- Departmental reviews
- Intervention planning
- Principal reports

### 2. Attendance Analytics

**Track:**
- Daily attendance patterns
- Chronic absenteeism identification
- Attendance by day/month
- Grade-level comparisons
- Impact on academic performance

**Benefits:**
- Early intervention for at-risk students
- Resource allocation decisions
- Communication with parents

### 3. Behavior Tracking

**Monitor:**
- Incident frequency and types
- Patterns by time/location
- Student-specific trends
- Intervention effectiveness

**Insights:**
- Where/when most incidents occur
- Which strategies working
- Students needing support

### 4. Resource Utilization

**Analyze:**
- Library book checkouts
- Computer lab usage
- Equipment reservations
- Facility utilization

**Decision-making:**
- Budget priorities
- Staffing needs
- Schedule optimization

## Getting Started: Your First Dashboard

### Step 1: Install Power BI Desktop

1. Go to Microsoft website
2. Download Power BI Desktop (FREE)
3. Install pada computer
4. No subscription needed untuk basic use

### Step 2: Prepare Your Data

**Best practices:**
- Data dalam Excel atau Google Sheets
- Column headers dalam first row
- Consistent data types dalam columns
- No merged cells
- Remove unnecessary formatting

**Example dataset structure:**
\`\`\`
Student_ID | Name | Grade | Subject | Score | Date
001 | Ahmad | 5 | Math | 85 | 2025-01-15
002 | Sarah | 5 | Math | 92 | 2025-01-15
\`\`\`

### Step 3: Import Data

1. Open Power BI Desktop
2. Click "Get Data"
3. Select source (Excel, CSV, Google Sheets)
4. Choose your file
5. Select tables/sheets to import
6. Click "Load"

### Step 4: Create Your First Visual

**Simple bar chart example:**

1. Click blank canvas
2. Select "Clustered Bar Chart" dari visualizations
3. Drag "Subject" to Axis
4. Drag "Score" to Values (akan auto-calculate average)
5. Boom! Your first visual!

### Step 5: Add Filters (Slicers)

Make dashboard interactive:

1. Add "Slicer" visualization
2. Add "Grade" field
3. Now users boleh filter entire dashboard by grade level

## 5 Essential Visualizations untuk Teachers

### 1. Line Chart: Progress Over Time

**Use for:**
- Student improvement tracking
- Class average trends
- Attendance patterns

**Setup:**
- X-axis: Date
- Y-axis: Score/Percentage
- Legend: Subject atau Student

### 2. Stacked Bar Chart: Comparative Analysis

**Use for:**
- Multi-subject performance
- Grade-level comparisons
- Before/after intervention

### 3. Gauge: Goal Tracking

**Use for:**
- Percentage to target
- Attendance rates
- Proficiency levels

**Visual shows:** Current value vs target dengan color coding

### 4. Card: Key Metrics

**Display:**
- Class average
- Total students
- Attendance percentage
- Passing rate

**Perfect for:** At-a-glance numbers

### 5. Matrix/Table: Detailed Breakdown

**Use for:**
- Individual student data
- Detailed comparisons
- Exportable data

## Real-World Example: Math Department Dashboard

**Scenario:** SMK Bukit Indah Math Department wants to monitor student performance across 5 classes.

**Data sources:**
- Monthly test scores (Excel)
- Attendance data (Excel)
- Demographic info (School system)

**Dashboard includes:**

**Top row:**
- Cards showing: Total students, Average score, Pass rate
- Gauge showing: % towards department target

**Middle section:**
- Line chart: Average scores per month untuk each class
- Stacked bar: Performance by topic (Algebra, Geometry, etc.)
- Scatter plot: Attendance vs Achievement correlation

**Bottom section:**
- Matrix: Detailed student list dengan scores
- Slicers: Filter by Class, Month, Proficiency level

**Impact:**
- Teachers immediately see struggling topics
- Identify students needing intervention
- Track intervention effectiveness
- Share insights dalam department meetings

**Time saved:** 5 hours per month dari manual reporting!

## Advanced Features (When Ready)

### 1. Calculated Columns & Measures

Create custom calculations:

**Example - Grade Category:**
\`\`\`DAX
Grade Category =
IF([Score] >= 80, "A",
IF([Score] >= 60, "B",
IF([Score] >= 40, "C", "D")))
\`\`\`

### 2. Data Relationships

Connect multiple tables:
- Student table
- Scores table
- Attendance table
- Linked by Student_ID

Benefits: Richer analysis across datasets

### 3. Drill-Through

Click on visual to see detailed view:
- Click class average → see individual students
- Click subject → see topic breakdown

### 4. Bookmarks

Save different views:
- Overview for principal
- Detailed for teachers
- Parent-friendly for conferences

## Tips untuk Effective Dashboards

### Design Principles:

**1. Keep It Simple**
- 5-7 visuals max per page
- Clear hierarchy
- Consistent colors

**2. Tell a Story**
- Most important info at top
- Logical flow
- Context for numbers

**3. Make It Interactive**
- Add slicers
- Enable drill-down
- Tooltips dengan extra info

**4. Choose Right Visuals**
- Trends: Line charts
- Comparisons: Bar charts
- Proportions: Pie charts
- Relationships: Scatter plots

### Color Guidelines:

- **Green:** Good performance, on track
- **Yellow/Orange:** Needs attention
- **Red:** Urgent intervention needed
- Consistent across all visuals

## Sharing Your Dashboard

### Option 1: Power BI Desktop File
- Save as .pbix file
- Share dengan colleagues who have Power BI Desktop

### Option 2: PDF Export
- File → Export → PDF
- Static snapshot untuk sharing
- Good untuk printed reports

### Option 3: Power BI Service (Cloud)
- Upload to PowerBI.com
- Interactive online dashboard
- Requires Power BI Pro license ($9.99/month)
- Recipients can interact tanpa license

### Option 4: Publish to Web
- Public sharing option
- Get embed code
- Share via link
- **Caution:** Data becomes public!

## Common Challenges & Solutions

### Challenge 1: Data dari Berbeza Sources

**Solution:** Power Query untuk combine data
- Import from multiple files
- Append atau merge tables
- Clean dan transform data

### Challenge 2: Data Updates Frequently

**Solution:**
- Keep original files dalam consistent location
- "Refresh" button updates dashboard
- Set up automatic refresh (Power BI Service)

### Challenge 3: Slow Performance

**Solution:**
- Reduce data volume (filter unnecessary rows)
- Optimize data model
- Use aggregated data untuk large datasets

### Challenge 4: Privacy Concerns

**Solution:**
- Anonymize sensitive data
- Password-protect files
- Limit sharing access
- Follow PDPA guidelines

## Learning Resources

### Free Tutorials:
- **Microsoft Learn**: Power BI guided paths
- **YouTube**: "Guy in a Cube" channel
- **Power BI Community**: Forums dan examples

### Practice Datasets:
- Generate sample school data
- Use publicly available education datasets
- Ministry of Education open data

### Templates:
- Search "Power BI education templates"
- Microsoft Template Gallery
- Teacher-shared templates dalam communities

## 30-Day Learning Plan

**Week 1: Basics**
- Install Power BI Desktop
- Complete Microsoft's "Getting Started" tutorial
- Import sample dataset
- Create 3 basic visualizations

**Week 2: Your First Real Dashboard**
- Gather actual school data (start small!)
- Import dan clean data
- Build 5-visual dashboard
- Share with colleague for feedback

**Week 3: Interactivity**
- Add slicers
- Create drill-through
- Learn basic DAX formulas
- Improve dashboard based on feedback

**Week 4: Polish & Share**
- Apply design principles
- Add titles dan descriptions
- Test usability
- Present to team/department

## Success Story: SJK(C) Pei Ming

**Before Power BI:**
- Monthly reports took 8+ hours to compile
- Data dalam 10+ different Excel files
- Hard to spot struggling students early
- Limited data-driven decisions

**After Power BI:**
- Real-time dashboard updated weekly
- 2 hours untuk updates (from 8+)
- Early intervention increased by 40%
- Teachers request more data insights

**Teacher feedback:** "For first time, I can actually SEE patterns dalam student performance. Game changer untuk my teaching!" - Teacher Lim

## Kesimpulan

Power BI transforms how we understand dan use data dalam pendidikan. Bukan just for data scientists - it's for educators yang ingin make informed decisions untuk students.

**Start small:**
1. Download Power BI Desktop today
2. Pick ONE dataset to visualize
3. Build simple dashboard
4. Share dan iterate

Data tells stories. Power BI helps you tell them clearly.

**Your turn:** What data would be most valuable untuk you to visualize? Start there!

---

**Questions?** Drop dalam comments atau email. Happy to help you get started dengan your data visualization journey!`,
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-02-15'),
      views: 0,
      authorId: admin.id,
      categoryId: tutorialCategory?.id || null,
    },
    {
      title: 'Hybrid Learning: Best Practices dari Pengalaman Lapangan',
      slug: 'hybrid-learning-best-practices',
      excerpt: 'Lessons learned dari 3 tahun hybrid teaching. Practical strategies yang actually work untuk engage students both in-person and online simultaneously.',
      content: `Hybrid learning - simultaneously teaching students yang physically present DAN yang join secara online - adalah salah satu teaching scenarios yang paling challenging. Selepas 3 tahun doing this, I've learned apa yang works dan apa yang doesn't.

## Apa Sebenarnya Hybrid Learning?

**Bukan:**
- Blended learning (students switch between online dan in-person)
- Fully remote learning (everyone online)
- Flipped classroom (video lectures, in-person activities)

**Adalah:**
Teaching simultaneously kepada students yang hadir physical DAN students yang join remotely pada masa yang sama.

**Why it's hard:**
- Two different audiences dengan different needs
- Technology challenges
- Attention split between physical dan virtual students
- Engagement difficult untuk online participants
- Workload doubles

**But when done right:** Provides flexibility, accessibility, dan continuity of learning.

## The Foundational Mindset Shift

### ❌ Wrong Mindset:
"I'll teach as normal dan just turn on camera untuk online students."

### ✅ Right Mindset:
"I'm designing ONE cohesive learning experience yang works untuk BOTH audiences."

This shift adalah critical. Hybrid requires intentional design, bukan just add-on technology.

## Essential Technology Setup

Before we talk pedagogy, let's get tech right:

### Minimum Requirements:

**Audio:**
- **Teacher mic** - Lapel mic atau headset (bukan laptop mic!)
- **Room speakers** - So online students dapat dengar physical students
- **Why critical:** Audio quality matters MORE than video

**Video:**
- **Wide-angle camera** - Show board dan teacher movement
- **Document camera** - Share physical materials/demonstrations
- **Consider:** Two cameras (one untuk teacher, one untuk board)

**Connectivity:**
- **Ethernet connection** preferred over WiFi
- **Backup internet** - Mobile hotspot as failsafe
- **Bandwidth:** Minimum 10 Mbps upload

**Software:**
- **Zoom/Meet/Teams** - Reliable platform
- **Digital whiteboard** - Miro, Jamboard, atau built-in features
- **LMS** - Google Classroom, Schoology, dll untuk materials

### Optimal Setup (If Budget Allows):

- **Meeting Owl** - 360° camera dengan auto-focus
- **Quality mic system** - Ceiling atau boundary mics
- **Large display** - TV/monitor so teacher dapat see online students while teaching
- **Dual monitors** - One untuk content, one untuk participants
- **Tablet** - Untuk monitor chat while teaching

## 7 Best Practices Yang Actually Work

### 1. Pre-Class Preparation

**Before every lesson:**

✅ **Upload materials 24 hours earlier**
- Slides/notes accessible
- Any links tested
- Worksheets downloadable

✅ **Test tech 15 mins before class**
- Audio working?
- Camera positioned well?
- Screen share functioning?
- Backup plan ready?

✅ **Assign "Tech Assistant"**
- Rotating student role
- Monitors chat
- Helps troubleshoot
- Takes pressure off teacher

**Impact:** Reduces tech disruptions by 80%. 15-min prep saves 30-min headaches.

### 2. Engagement Strategies

**The #1 Challenge:** Online students becoming "wallflowers."

**Solutions that work:**

**A) Intentional Calling On**
- Call online students by name regularly
- "Sarah, can you see this clearly?"
- "Ahmad online, what's your thought?"
- Don't just ask "any questions online?"

**B) Think-Pair-Share Adapted**
- Think individually (all students)
- Pair: Physical students together, online dalam breakout rooms
- Share: Mix perspectives from both groups

**C) Digital Collaboration Tools**
- **Padlet:** Everyone post responses
- **Jamboard:** Collaborative brainstorming
- **Google Docs:** Simultaneous editing
- **Polls/Quizzes:** Universal participation

**D) Role Rotation**
- Week 1: Physical students present, online students provide feedback
- Week 2: Reverse
- Everyone experiences both modalities

### 3. Visual Best Practices

**Common mistake:** Pointing at physical board yang online students can't see clearly.

**Better approach:**

✅ **Digital-First Visuals**
- Prepare slides/digital whiteboard
- Screen share everything important
- Physical board only untuk quick sketches

✅ **Narrate Your Actions**
- "I'm writing this equation here..."
- "Let me zoom in pada this diagram..."
- Describe what you're pointing at

✅ **Camera Positioning**
- Wide angle showing whole board
- Supplement dengan document camera untuk close-ups
- Position yourself in frame

✅ **Font Sizes**
- Minimum 24pt untuk text
- 32pt+ untuk headings
- Test readability dari back of room AND online

### 4. Classroom Layout

**Strategic positioning matters:**

**Physical Students:**
- Arranged untuk see screen AND teacher
- Avoid having backs to camera
- Create "camera zones" - areas visible online

**Teacher Position:**
- Near monitor showing online students
- Can glance at screen without turning away
- Within mic range

**Tech Station:**
- Laptop/controls easily accessible
- Not blocking sightlines
- Cables secured (safety!)

### 5. Activity Design

**Traditional activities often fail dalam hybrid. Redesign for flexibility:**

**Group Work:**
- ❌ Random physical grouping (excludes online students)
- ✅ Pre-planned hybrid groups dengan designated roles
- ✅ Use breakout rooms PLUS physical groupings
- ✅ Digital collaboration tools untuk shared work product

**Discussions:**
- ❌ Free-flowing classroom discussion (online students can't interject)
- ✅ Structured turn-taking
- ✅ Chat participation validated dan read aloud
- ✅ Digital hand-raising enforced

**Hands-On Activities:**
- ❌ Physical only activities
- ✅ Provide virtual alternatives
- ✅ Ship materials to online students in advance
- ✅ Or design activities using household items

**Assessments:**
- ❌ Only in-person tests
- ✅ Consistent format untuk all students
- ✅ Digital submissions universally
- ✅ Alternative assessment methods (projects, presentations, portfolios)

### 6. Communication Protocols

**Establish clear norms:**

**For Online Students:**
- Cameras ON during instruction (unless bandwidth issues)
- Mic MUTED unless speaking
- Use chat untuk quick questions
- Raise hand (virtual) untuk longer contributions
- Name displayed clearly

**For Physical Students:**
- Speak loudly toward mic
- Face camera when presenting
- Acknowledge online classmates

**For Teacher:**
- Check chat every 5-10 minutes
- Explicitly state when switching focus
- "Let me check what online students are saying..."
- Balance attention 50/50

### 7. Building Community

**Hybrid can feel isolating. Intentionally build connections:**

**Icebreakers:**
- "Show and tell" - everyone shares
- Virtual backgrounds tour (homes, interests)
- Collaborative playlists
- Online games whole class plays

**Buddy System:**
- Pair each online student dengan physical student
- Buddies share notes
- Check in on each other
- Collaborate on assignments

**Office Hours:**
- Hybrid office hours weekly
- Drop-in untuk all students
- Casual conversation space
- Relationship-building

**Celebrations:**
- Acknowledge birthdays (online & physical)
- Celebrate achievements
- Virtual high-fives dan shout-outs
- End-of-term hybrid party

## Common Pitfalls & How to Avoid

### Pitfall 1: Online Students as Afterthought

**Signs:**
- "Oh, can online students see this?"
- Teaching primarily to physical class
- Online students rarely participate

**Fix:**
- Design lessons online-first
- Regularly name dan call on online students
- Monitor engagement metrics

### Pitfall 2: Tech Troubleshooting Taking Over

**Signs:**
- 15 mins lost fixing audio
- Students waiting while teacher troubleshoots
- Frustration building

**Fix:**
- Pre-class tech checks
- Designated tech assistant
- Quick pivot plans ("While I fix this, discuss with neighbor...")
- Know when to move on

### Pitfall 3: Doubling Workload Unnecessarily

**Signs:**
- Creating separate materials untuk online/physical
- Repeating lessons
- Burnout

**Fix:**
- One set of materials used universally
- Record sessions (don't repeat)
- Batch prep work
- Use student contributions to reduce prep

### Pitfall 4: Ignoring Equity Issues

**Signs:**
- Assuming all online students have good internet
- Activities requiring specific materials/space
- Assessment formats favoring one group

**Fix:**
- Survey access/resources early
- Provide alternatives always
- Flexible deadlines
- Material loans/delivery untuk online students

## Weekly Routine Template

**Monday:**
- Post week's materials dan schedule
- Tech check
- Community-building activity
- New content introduction (lecture/demo)

**Tuesday-Wednesday:**
- Activity-based learning
- Hybrid group work
- Check-ins dengan individuals

**Thursday:**
- Application/practice
- Peer review atau collaboration
- Address questions

**Friday:**
- Review dan consolidation
- Assessment (formative)
- Preview next week
- Office hours

**Throughout:**
- Daily engagement tracking
- Regular chat monitoring
- Balance physical/online attention
- Record all sessions

## Measuring Success

**Track these metrics:**

### Engagement:
- Participation rates (online vs physical)
- Chat activity
- Assignment completion
- Attendance patterns

### Learning Outcomes:
- Assessment results (compare groups)
- Skill mastery rates
- Growth over time

### Student Feedback:
- Weekly pulse checks
- Mid-term surveys
- End-of-term evaluations
- One-on-one check-ins

### Teacher Wellbeing:
- Prep time required
- Stress levels
- Sustainability

**Goal:** Similar outcomes for online dan physical students, sustainable untuk teacher.

## Teacher Self-Care

Hybrid teaching is exhausting. Protect yourself:

✅ **Set Boundaries**
- Defined online office hours
- Email response times
- Weekend tech-free time

✅ **Build in Breaks**
- Async days occasionally
- Guest speakers/videos
- Student-led sessions

✅ **Collaborate**
- Co-teaching when possible
- Share resources dengan colleagues
- Peer observation dan feedback

✅ **Celebrate Small Wins**
- Successful tech day? Win!
- Good discussion? Win!
- Made it through week? Win!

## Real Success Story: SMK Taman Desa

**Teacher Farah's Journey:**

**Month 1: Chaos**
- Tech failures daily
- Online students disengaged
- Workload overwhelming
- Almost quit

**Month 3: Adjustments**
- Adopted tech assistant role
- Implemented buddy system
- Created digital-first materials
- Seeing improvement

**Month 6: Success**
- 85%+ participation both groups
- Similar learning outcomes
- Sustainable workload
- Students report satisfaction

**Key changes:**
1. Prep template (saved 5 hrs/week)
2. Student leadership roles
3. Regular feedback loops
4. Co-planning dengan colleague

**Farah's advice:** "Start with ONE change at a time. Perfection isn't the goal - consistency is."

## Kesimpulan

Hybrid learning isn't going away. It provides valuable flexibility. With intentional design, strong tech foundation, dan commitment to equity, it can work well.

**Remember:**
- Technology enables, pedagogy drives
- Community-building is critical
- Flexibility untuk all (including yourself!)
- It gets easier dengan practice

**Start tomorrow:**
1. Audit your current setup - apa satu improvement?
2. Try ONE new engagement strategy
3. Ask students untuk feedback
4. Adjust dan repeat

You've got this! Dan remember - every hybrid teacher is learning together. Share what works, ask untuk help, dan be kind to yourself.

---

**Hybrid teaching tips atau questions?** Share dalam comments - let's learn from each other!`,
      coverImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-02-10'),
      views: 0,
      authorId: admin.id,
      categoryId: educationCategory?.id || null,
    },
    {
      title: 'Cybersecurity untuk Sekolah: Asas yang Perlu Tahu',
      slug: 'cybersecurity-untuk-sekolah',
      excerpt: 'Panduan essential untuk melindungi data sekolah, maklumat pelajar, dan sistem digital dari cyber threats. Practical steps you can implement today.',
      content: `Sekolah increasingly menjadi target cyber attacks. Student data, financial info, dan systems semua at risk. Good news? Basic cybersecurity doesn't require huge budget - it requires awareness dan consistent practices.

## Kenapa Sekolah Jadi Target?

### 1. Valuable Data
- Student personal information (IC, address, medical records)
- Staff details
- Financial data
- Academic records

### 2. Weak Security
- Limited IT staff
- Outdated systems
- Insufficient training
- Budget constraints

### 3. Multiple Entry Points
- Hundreds of users (students, teachers, parents)
- BYOD (Bring Your Own Device)
- Third-party apps
- Remote access

**Reality check:** 2023 data shows 1 dalam 4 Malaysian schools experienced some form of cyber incident.

## Top 5 Cybersecurity Threats untuk Sekolah

### 1. Phishing Attacks

**What:** Fake emails/messages trick users into revealing passwords atau clicking malicious links.

**Example:** Email claiming to be from "Principal" asking teacher untuk "urgently verify" account dengan clicking link.

**Impact:** Compromised accounts, data theft, malware installation.

### 2. Ransomware

**What:** Malicious software locks school systems/data. Attackers demand payment untuk unlock.

**Example:** SMK in Selangor lost access to all student records untuk 2 weeks dalam 2023.

**Impact:** System downtime, data loss, financial loss, reputation damage.

### 3. Data Breaches

**What:** Unauthorized access to sensitive information.

**Common causes:**
- Lost/stolen devices dengan unencrypted data
- Weak passwords
- Unsecured networks
- Insufficient access controls

**Impact:** Privacy violations, legal issues, trust loss.

### 4. Insider Threats

**What:** Threats from within organization - intentional atau accidental.

**Examples:**
- Teacher accidentally sharing confidential documents
- Student accessing grades database
- Disgruntled employee leaking information

**Impact:** Data exposure, system damage, legal complications.

### 5. Social Engineering

**What:** Manipulating people into compromising security.

**Examples:**
- Impersonating IT support untuk get passwords
- Fake parent requesting student information
- "Shoulder surfing" to see passwords typed

**Impact:** Account compromise, data theft, unauthorized access.

## 10 Essential Security Measures

### 1. Strong Password Policy

**Implement:**
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- No common words atau patterns
- Different passwords untuk different accounts
- Change every 90 days

**Use password managers:**
- Teachers: LastPass, 1Password, Bitwarden
- School level: Managed password solution

**Enable Multi-Factor Authentication (MFA):**
- Requires second verification (SMS code, app, security key)
- Prevents 99.9% of account takeovers
- Enable untuk ALL school accounts

### 2. Security Awareness Training

**Monthly training topics:**
- Month 1: Identifying phishing emails
- Month 2: Safe internet browsing
- Month 3: Social media privacy
- Month 4: Password security
- Month 5: Mobile device safety
- Month 6: Data handling protocols

**Training methods:**
- 15-minute lunch sessions
- Email tips
- Simulated phishing tests
- Quick quizzes

**Include:**
- All staff (teachers, admin, support staff)
- Students (age-appropriate)
- Parent awareness materials

### 3. Regular Software Updates

**Keep updated:**
- Operating systems (Windows, macOS, Chrome OS)
- Applications (Office, browsers, etc.)
- Security software
- Firmware (routers, etc.)

**Why critical:** Updates patch security vulnerabilities.

**How to manage:**
- Enable automatic updates where possible
- Monthly manual checks
- Inventory all software dalam use
- Remove unused applications

### 4. Network Security

**Essential steps:**

**A) Separate Networks:**
- Admin network (restricted access)
- Staff network
- Student network
- Guest network
- IoT devices network (printers, smartboards)

**B) Strong Wi-Fi Security:**
- WPA3 encryption (atau minimum WPA2)
- Strong unique passwords
- Hidden SSIDs untuk admin networks
- Regular password changes

**C) Firewall Configuration:**
- Properly configured dan monitored
- Block unnecessary ports
- Filter malicious traffic
- Log activities

**D) Content Filtering:**
- Block inappropriate sites
- Prevent malware downloads
- Control bandwidth usage
- Age-appropriate restrictions

### 5. Data Backup Strategy

**Follow 3-2-1 rule:**
- **3** copies of data
- **2** different storage types
- **1** copy off-site

**Backup frequency:**
- Critical data: Daily
- Important data: Weekly
- General data: Monthly

**Test restores:**
- Monthly test restoration
- Verify data integrity
- Document restoration procedures
- Train staff on process

**Tools:**
- Cloud backup: Google Drive, OneDrive, Acronis
- External drives (kept secure)
- Network attached storage (NAS)

### 6. Access Control

**Principle of Least Privilege:**
- Users get ONLY access they need
- Not everyone needs admin rights
- Different permission levels

**Implementation:**
- **Level 1 (Students):** Basic apps, assigned resources
- **Level 2 (Teachers):** Student data untuk their classes, content creation tools
- **Level 3 (Admins):** School-wide data, system settings
- **Level 4 (IT):** Full system access

**Regular audits:**
- Quarterly review of who has access to what
- Remove access when no longer needed (student graduates, staff leaves)
- Log dan monitor access attempts

### 7. Device Management

**For school-owned devices:**

**Use Mobile Device Management (MDM):**
- Google Workspace for Education (Chromebooks)
- Microsoft Intune (Windows)
- Apple School Manager (iPads)

**MDM enables:**
- Remote device lock/wipe
- Enforced security policies
- App management
- Location tracking
- Automatic updates

**For BYOD (Bring Your Own Device):**
- Acceptable Use Policy (AUP) signed
- Minimum security requirements
- Separate network access
- No storage of sensitive data
- Remote access via VPN only

### 8. Email Security

**Configure:**

**A) Spam Filtering:**
- Block suspicious senders
- Quarantine potential threats
- User reporting options

**B) SPF, DKIM, DMARC:**
- Technical protocols prevent email spoofing
- IT should configure
- Verify legitimacy of school emails

**C) Safe Attachment Handling:**
- Scan attachments automatically
- Block dangerous file types (.exe, .scr, etc.)
- Require secondary verification untuk unexpected attachments

**D) External Email Warnings:**
- Label emails from outside organization
- Visual indicator untuk external senders

### 9. Physical Security

**Often overlooked but critical:**

**A) Secure Server Room:**
- Locked access (keycard/biometric)
- Access log
- Environmental controls (temperature, humidity)
- Fire suppression

**B) Screen Locks:**
- Auto-lock after 5 mins inactivity
- Enforce across all devices
- Train users untuk manually lock when leaving

**C) Clean Desk Policy:**
- No confidential documents left out
- Lock cabinets
- Shred sensitive papers
- Secure USB drives

**D) Visitor Management:**
- Sign-in/sign-out system
- Visitor badges
- Escorted access
- Device restrictions

### 10. Incident Response Plan

**Prepare before incident happens:**

**A) Response Team:**
- IT lead
- Principal/admin
- Communication officer
- Legal advisor (if needed)

**B) Response Procedures:**

**Phase 1: Identification (0-1 hour)**
- Confirm incident is real
- Document everything
- Contain immediately
- Alert response team

**Phase 2: Containment (1-24 hours)**
- Isolate affected systems
- Change passwords
- Preserve evidence
- Assess scope

**Phase 3: Eradication (24-72 hours)**
- Remove threat
- Patch vulnerabilities
- Verify systems clean
- Document root cause

**Phase 4: Recovery (3-7 days)**
- Restore systems
- Monitor closely
- Validate functionality
- Restore data from backups

**Phase 5: Post-Incident (1-2 weeks)**
- Debrief dengan team
- Update security measures
- Train staff on lessons learned
- Report to authorities if required

**C) Communication Plan:**
- Internal stakeholders
- Parents (if student data affected)
- Authorities (if legally required)
- Media (if necessary)

## Quick Security Checklist

**Daily:**
- [ ] Software updates run
- [ ] Backup completed successfully
- [ ] Security logs reviewed (automated)

**Weekly:**
- [ ] Security alerts reviewed
- [ ] Access logs checked
- [ ] Staff security tip shared

**Monthly:**
- [ ] Password changes
- [ ] Security training session
- [ ] Restore backup test
- [ ] Software inventory updated

**Quarterly:**
- [ ] Full security audit
- [ ] Access permissions review
- [ ] Policy updates
- [ ] Vendor security review

**Annually:**
- [ ] Penetration testing
- [ ] Policy comprehensive review
- [ ] Insurance review
- [ ] Disaster recovery drill

## Teaching Cybersecurity to Students

**Age-appropriate curriculum:**

**Primary (Year 1-3):**
- Online safety basics
- Don't share personal info
- Tell trusted adult about problems
- Strong passwords

**Primary (Year 4-6):**
- Social media safety
- Identifying suspicious links
- Digital footprint
- Respectful online behavior

**Secondary:**
- Advanced password security
- Phishing identification
- Privacy settings
- Secure communication
- Ethical hacking awareness

**Activities:**
- "Spot the phishing email" games
- Password strength contests
- Digital citizenship projects
- Cybersecurity career exposure

## Free Tools untuk Sekolah

**Security Tools:**
- **Malwarebytes** - Malware scanner
- **Duo Security** - Free MFA untuk education
- **Have I Been Pwned** - Check compromised accounts

**Training Resources:**
- **Google Be Internet Awesome** - Student cyber safety curriculum
- **Common Sense Media** - Digital citizenship lessons
- **Cybersecurity Malaysia** - Local resources dan awareness materials

**Assessment Tools:**
- **KnowBe4** - Free security awareness training
- **PhishingBox** - Simulated phishing tests
- **Security Scorecard** - Free school security assessment

## Budget Planning

**Typical costs untuk SMK with 1000 students:**

**Year 1 (Setup):**
- Security software licenses: RM 5,000
- Firewall upgrade: RM 8,000
- MDM solution: RM 3,000
- Training materials: RM 2,000
- **Total: RM 18,000**

**Annual (Ongoing):**
- Software renewals: RM 5,000
- Backup storage: RM 2,000
- Training: RM 2,000
- Assessments: RM 1,000
- **Total: RM 10,000**

**ROI:** Single data breach dapat cost RM 50,000 - RM 500,000+ dalam recovery, legal, reputation damage. Prevention is cheaper!

## Compliance & Legal Considerations

**Malaysian Laws:**
- **Personal Data Protection Act (PDPA) 2010**
- **Computer Crimes Act 1997**
- **Communications and Multimedia Act 1998**

**School responsibilities:**
- Protect student/staff personal data
- Report breaches to PDPA authorities
- Maintain audit trails
- Student consent untuk data collection

**Penalties untuk non-compliance:**
- Fines up to RM 500,000
- Imprisonment up to 3 years
- Reputation damage
- Loss of trust

## Kesimpulan

Cybersecurity bukan just IT problem - it's whole-school responsibility. Every staff member, student, dan parent plays a role.

**Start today:**
1. **This week:** Enable MFA pada school accounts
2. **This month:** Conduct phishing awareness training
3. **This quarter:** Implement password policy
4. **This year:** Full security audit dan plan

**Remember:** Perfect security doesn't exist. Goal adalah making school a harder target than others dan being prepared untuk respond effectively.

Protect your students, protect your data, protect your school.

---

**Questions tentang school cybersecurity?** Contact local CyberSecurity Malaysia office atau reach out dalam comments. Stay safe!`,
      coverImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-02-05'),
      views: 0,
      authorId: admin.id,
      categoryId: tutorialCategory?.id || null,
    },
    {
      title: 'Video Production untuk Pendidik: Smartphone Sudah Cukup!',
      slug: 'video-production-untuk-pendidik',
      excerpt: 'You don\'t need expensive equipment untuk create engaging educational videos. Learn bagaimana produce quality content using just your smartphone dan free apps!',
      content: `"Saya nak buat video pembelajaran tapi tak ada camera mahal."

I hear this all the time. Good news? Smartphone yang ada dalam poket anda sekarang adalah lebih powerful daripada professional cameras 10 tahun lepas. Anda already have everything you need!

## Kenapa Educational Videos Matters?

### Benefits untuk Students:
- **Flexible learning** - Tonton bila-bila, where-ever
- **Pause and replay** - Learn at own pace
- **Visual engagement** - Better retention
- **Accessibility** - Students yang miss class tetap dapat learn

### Benefits untuk Teachers:
- **Flipped classroom** - Free up class time untuk activities
- **Reusable content** - Record once, use multiple times
- **Reach more students** - Beyond your classroom
- **Professional development** - Share expertise

### Stats:
- Students retain 95% of information dalam video vs 10% dari text
- 59% of students prefer video learning content
- Educational videos meningkatkan engagement by 300%+

You owe it to your students (and yourself!) untuk harness the power of video.

## Your Smartphone is Enough

**Modern smartphones have:**
- 4K capable cameras
- Image stabilization
- Multiple lenses
- High-quality audio recording (with right setup)
- Built-in editing tools

**Don't wait untuk "upgrade" equipment. Start now dengan what you have!**

## Essential (Affordable) Accessories

**Total budget: RM 150-300**

### Must-Haves:

**1. Tripod / Phone Stand (RM 30-80)**
- Steady shots are NON-NEGOTIABLE
- Adjustable height
- Remote shutter option helpful

**Recommended:**
- Basic tripod with phone mount: ~RM 40
- Ring light with stand combo: ~RM 80 (see below)

**2. External Microphone (RM 50-150)**
- #1 MOST IMPORTANT investment
- Audio quality matters MORE than video quality

**Options:**
- **Lavalier (clip-on) mic:** RM 50-100
  - Best for: Talking head videos, presentations
  - Recommendation: Boya BY-M1 (~RM 60)
- **Shotgun mic:** RM 100-150
  - Best for: Demonstrations, wider shots
  - Recommendation: Boya BY-MM1 (~RM 130)

**3. Good Lighting (RM 0-100)**

**Free options:**
- Natural light (by window)
- Existing room lights
- Desk lamp positioned well

**Budget investment:**
- Ring light: RM 50-100
- Provides even, flattering light
- Eliminates shadows

**Nice-to-Haves (Later):**
- Green screen: RM 80-150 (untuk fun effects)
- Portable light panel: RM 100-200
- External battery pack: RM 50-80
- Teleprompter app: Free-RM 20

## 5 Types of Educational Videos

### 1. Talking Head / Direct Instruction

**What:** You speaking directly to camera explaining concept.

**Best for:**
- Introductions
- Explanations
- Announcements
- Motivation/inspiration

**Setup:**
- Camera at eye level
- You centered, slight angle okay
- Simple background (bookshelves, plain wall)
- Good lighting on face
- External mic

**Length:** 5-10 minutes max

**Example topics:**
- "Introduction to Photosynthesis"
- "How to Solve Quadratic Equations"
- "Essay Writing Tips"

### 2. Screencast / Tutorial

**What:** Recording your screen while you demonstrate software/website.

**Best for:**
- Tech tutorials
- Google/Microsoft apps training
- Website navigation
- Digital tool demonstrations

**Tools:**
- **Mobile:** Screen recording (built-in), AZ Screen Recorder
- **Computer:** OBS Studio (free), Screencastify (Chrome), Zoom

**Setup:**
- Prepare script/outline
- Close unnecessary tabs/apps
- Hide personal information
- Record in highest resolution

**Tips:**
- Clear, slow navigation
- Narrate every action
- Zoom in pada important elements
- Pause deliberately

**Example topics:**
- "How to Submit Assignments dalam Google Classroom"
- "Creating Presentations dengan Canva"
- "Using Desmos Graphing Calculator"

### 3. Whiteboard / Drawing Explanation

**What:** Explaining concept while drawing/writing.

**Best for:**
- Math problem-solving
- Science diagrams
- Historical timelines
- Mind maps

**Setup Options:**

**A) Traditional whiteboard:**
- Camera positioned straight-on
- Far enough untuk see full board
- Good lighting (avoid reflection!)
- You at side (don't block view)

**B) Document camera:**
- Camera pointed down at paper
- Draw/write while explaining
- More intimate view

**C) Digital whiteboard:**
- Apps: Microsoft Whiteboard, Explain Everything, Jamboard
- Screen record while you draw dengan stylus atau finger
- Can edit/perfect afterwards

**Tips:**
- Write larger than you think necessary
- Use different colors purposefully
- Build diagram step-by-step
- Don't rush

**Example topics:**
- "Solving Linear Equations Step-by-Step"
- "Parts of a Plant Cell"
- "World War 2 Timeline"

### 4. Over-the-Shoulder / Demonstration

**What:** Recording your hands doing something while you explain.

**Best for:**
- Science experiments
- Art techniques
- Physical demonstrations
- Craft activities

**Setup:**
- Camera mounted above/behind you
- Points down at workspace
- Clutter-free area
- Good lighting (no shadows on work!)

**Tips:**
- Move slowly, deliberately
- Narrate each step
- Consider time-lapse untuk long processes
- Close-ups untuk detail

**Example topics:**
- "Simple Circuit Experiment"
- "Watercolor Techniques"
- "Origami Step-by-Step"

### 5. Interview / Q&A

**What:** Conversation format, answering questions.

**Best for:**
- FAQs
- Topic deep-dives
- Student questions
- Expert guests

**Setup:**
- Two-person setup or solo Q&A
- Comfortable seating
- Questions prepared atau from audience
- Conversational tone

**Example topics:**
- "Answering Your Math Questions"
- "Career Talk dengan Engineer"
- "History FAQ"

## The Production Process

### Phase 1: Pre-Production (Planning)

**A) Define Objective:**
- What should students know/do after watching?
- ONE clear learning objective per video

**B) Script / Outline:**
Don't wing it! Prepare:
- **Full script** untuk precise content (screencasts, complex explanations)
- **Bullet points** untuk conversational videos
- **Visuals list** - what will be shown when?

**C) Gather Materials:**
- Props needed?
- Slides/images prepared?
- Workspace organized?

**D) Test Run:**
- Practice once through
- Time yourself (adjust if needed)
- Identify awkward sections

**Time investment:** 30-60 mins untuk 5-min video

### Phase 2: Production (Recording)

**Setup Checklist:**
- [ ] Phone charged (atau plugged in)
- [ ] Sufficient storage space
- [ ] Phone on "Do Not Disturb"
- [ ] Airplane mode (avoid calls)
- [ ] Brightness adjusted
- [ ] White balance set (if manual mode)
- [ ] Tripod secure
- [ ] Mic connected dan tested
- [ ] Lighting positioned
- [ ] Background tidy
- [ ] Script/notes accessible

**Recording Best Practices:**

**1. Record dalam Short Segments**
- Don't try untuk one perfect take
- Break into 2-3 minute chunks
- Easier untuk edit
- Less stressful

**2. Embrace Mistakes**
- Pause, breathe, continue
- Fix dalam editing
- Multiple takes are normal

**3. Visual Variety:**
- Different angles
- Close-ups
- Screen inserts
- B-roll (supplementary footage)

**4. Slate Each Take:**
- State section before recording
- "This is quadratic formula explanation, take 2"
- Helps during editing

**5. Record Extra:**
- Intro/outro separately
- Transitions
- Potential inserts

**Time investment:** 30-90 mins untuk 5-min final video

### Phase 3: Post-Production (Editing)

**Free Editing Apps:**

**Mobile:**
- **CapCut** - Powerful, user-friendly (my favorite!)
- **InShot** - Good untuk quick edits
- **KineMaster** - More advanced features
- **iMovie** - iOS users

**Computer:**
- **DaVinci Resolve** - Professional-grade, free
- **Shotcut** - Open-source
- **OpenShot** - Simple interface
- **iMovie** - Mac users

**Basic Editing Steps:**

**1. Import Footage**
- Organize clips
- Delete obvious bad takes
- Label segments

**2. Rough Cut**
- Arrange clips dalam order
- Remove mistakes/pauses
- Get basic structure

**3. Tighten**
- Cut "umms" and long pauses
- Trim unnecessary content
- Aim untuk concise

**4. Enhance:**
- Add intro/outro
- Insert relevant images/diagrams
- Subtitles/captions
- Background music (low volume!)
- Transitions (use sparingly!)

**5. Audio Polish:**
- Volume levels consistent
- Remove background noise (apps have tools)
- Voiceover additions if needed

**6. Color Correction:**
- Brightness/contrast
- Saturation
- Consistent look across clips

**7. Export:**
- 1080p HD minimum
- MP4 format (universal)
- Moderate file size

**Time investment:** 60-120 mins untuk 5-min video

**Editing Tips:**
- Cut more than you think necessary
- Jump cuts are OKAY dan common
- Subtitles increase accessibility dramatically
- Don't overdo effects - keep professional

### Phase 4: Distribution

**Where to Host:**

**YouTube:**
- ✅ Unlimited storage
- ✅ Easy sharing
- ✅ Analytics
- ✅ Searchable
- ⚠️ Can set as "Unlisted" for privacy

**Google Drive:**
- ✅ Secure sharing
- ✅ Integration dengan Classroom
- ✅ Control access
- ❌ Storage limits (unless Workspace)

**School LMS:**
- ✅ Walled garden (more secure)
- ✅ Integrated dengan assignments
- ❌ May have file size limits

**Recommendation:** YouTube (Unlisted) + link dalam Google Classroom. Best of both worlds.

## Quality Checklist

**Before sharing, verify:**

**Video:**
- [ ] Focus is sharp
- [ ] Framing appropriate (not cut off)
- [ ] Lighting adequate
- [ ] Background professional

**Audio:**
- [ ] Clear dan intelligible
- [ ] Volume consistent
- [ ] No distracting background noise
- [ ] Music (if used) doesn't overpower

**Content:**
- [ ] Learning objective met
- [ ] No errors dalam information
- [ ] Pacing appropriate
- [ ] Engaging dan concise

**Technical:**
- [ ] Exported dalam HD (1080p)
- [ ] File format compatible
- [ ] Subtitles added
- [ ] Proper title/description

## Common Mistakes to Avoid

### ❌ Mistake 1: Too Long
Videos over 10 minutes lose engagement quickly.
**Fix:** Break into series of shorter videos.

### ❌ Mistake 2: Poor Audio
Great visuals can't save bad audio.
**Fix:** Invest dalam mic, record dalam quiet space.

### ❌ Mistake 3: Reading dari Script Robotically
Sounds monotonous and disengaging.
**Fix:** Use bullet points, be conversational, retake if needed.

### ❌ Mistake 4: No Captions
Excludes students with hearing impairments, non-native speakers.
**Fix:** Add subtitles (auto-generate then edit).

### ❌ Mistake 5: Boring Background
Messy atau distracting.
**Fix:** Simple, tidy background atau blur with app.

### ❌ Mistake 6: Shaky Camera
Looks unprofessional, distracts.
**Fix:** Use tripod always.

### ❌ Mistake 7: Copyright Violations
Using music/images without permission.
**Fix:** Use royalty-free resources (see below).

## Free Resources

**Stock Footage/Images:**
- Pexels, Unsplash, Pixabay

**Music:**
- YouTube Audio Library
- Free Music Archive
- Incompetech

**Icons/Graphics:**
- Flaticon
- Freepik
- Canva (free tier)

**Sound Effects:**
- Freesound
- Zapsplat

## Real Teacher Success Stories

**Teacher Aini, SK Taman Desa:**
- **Challenge:** Students missing class frequently
- **Solution:** Started recording key lessons dengan smartphone
- **Setup:** RM 60 mic, natural window lighting
- **Result:** Student understanding increased, parents appreciated access
- **Time:** 45 mins per video (getting faster dengan practice)

**Sir Ravi, SMK Bukit Indah:**
- **Focus:** Flipped classroom matematik
- **Approach:** Quick 5-7 min tutorials using whiteboard app
- **Impact:** Class time freed untuk problem-solving, students prepared
- **Student feedback:** "Boleh pause dan replay bila tak faham - so helpful!"

**Teacher Mei, SJK(C) Subang:**
- **Content:** Science experiments
- **Setup:** Phone mounted above workspace
- **Benefit:** "Dangerous" experiments dapat demonstrate safely
- **Bonus:** Students watch before class, already understand procedure

## 30-Day Challenge

**Week 1: Setup & Learn**
- Day 1-2: Get mic dan tripod
- Day 3-4: Test setup, record practice video
- Day 5-7: Learn editing app basics

**Week 2: First Video**
- Day 8-9: Plan 5-min instructional video
- Day 10-11: Record
- Day 12-14: Edit, perfect, share

**Week 3: Feedback & Improve**
- Day 15: Gather student feedback
- Day 16-17: Watch other educational YouTubers untuk ideas
- Day 18-21: Create improved second video

**Week 4: Build Library**
- Day 22-28: Create 2 more short videos
- Day 29-30: Organize video library, plan next month's content

**By end of month:** 4 quality educational videos created!

## Kesimpulan

Stop waiting untuk perfect equipment. Your smartphone, RM 150 dalam accessories, dan willingness untuk learn sudah cukup untuk start creating impactful educational videos.

**Remember:**
- Content matters more than production quality
- Students appreciate effort
- You'll improve dengan practice
- Start simple, expand gradually

**Action steps today:**
1. Choose satu topic untuk your first video
2. Order mic dan tripod online
3. Download editing app
4. Block time this weekend untuk record

Transform your teaching. Amplify your impact. Your students are waiting.

---

**Created educational videos?** Share your experience dan tips dalam comments! Let's learn from each other.`,
      coverImage: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&h=600&fit=crop',
      published: true,
      publishedAt: new Date('2025-02-01'),
      views: 0,
      authorId: admin.id,
      categoryId: tutorialCategory?.id || null,
    },
  ];

  for (const post of samplePosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log('✅ Sample blog posts created');

  // Portfolio Projects
  const portfolioProjects = [
    {
      title: 'Sistem DELIMa Negeri Johor',
      slug: 'sistem-delima-negeri-johor',
      description: 'Pentadbiran dan pengurusan sistem DELIMa untuk semua sekolah di Johor. Dashboard analytics, laporan, dan pengurusan data.',
      category: 'Sistem Pendidikan',
      tags: JSON.stringify(['Dashboard', 'Analytics', 'Database Management']),
      color: '#3b82f6',
      icon: '📊',
      images: JSON.stringify([]),
      impact: '500+ sekolah di Johor menggunakan sistem ini',
      featured: true,
      published: true,
      order: 1,
      authorId: admin.id,
    },
    {
      title: 'Portal JPNJ',
      slug: 'portal-jpnj',
      description: 'Portal rasmi Jabatan Pendidikan Negeri Johor dengan sistem pengurusan dokumen, pengumuman, dan integrasi aplikasi.',
      category: 'Sistem Pendidikan',
      tags: JSON.stringify(['Portal', 'CMS', 'Document Management']),
      color: '#22c55e',
      icon: '🌐',
      images: JSON.stringify([]),
      impact: '10,000+ pengguna aktif',
      featured: true,
      published: true,
      order: 2,
      authorId: admin.id,
    },
    {
      title: 'AI Training Materials',
      slug: 'ai-training-materials',
      description: 'Pembangunan bahan latihan AI untuk pendidik termasuk slides, video tutorial, dan hands-on activities untuk ChatGPT dan Canva AI.',
      category: 'AI & Automation',
      tags: JSON.stringify(['AI', 'ChatGPT', 'Canva AI', 'Training']),
      color: '#a855f7',
      icon: '🤖',
      images: JSON.stringify([]),
      impact: '1,000+ guru terlatih',
      featured: true,
      published: true,
      order: 3,
      authorId: admin.id,
    },
    {
      title: 'Digital Learning Platform',
      slug: 'digital-learning-platform',
      description: 'Platform pembelajaran digital untuk sekolah dengan integrasi Google Workspace, Microsoft 365, dan tools pembelajaran interaktif.',
      category: 'Sistem Pendidikan',
      tags: JSON.stringify(['EdTech', 'Google Workspace', 'Microsoft 365']),
      color: '#f97316',
      icon: '📚',
      images: JSON.stringify([]),
      impact: '50+ sekolah menggunakan platform',
      featured: false,
      published: true,
      order: 4,
      authorId: admin.id,
    },
    {
      title: 'Sistem Pengurusan Sekolah',
      slug: 'sistem-pengurusan-sekolah',
      description: 'Sistem pengurusan komprehensif untuk sekolah menengah meliputi kehadiran, peperiksaan, kokurikulum, dan laporan.',
      category: 'Sistem Pendidikan',
      tags: JSON.stringify(['School Management', 'Database', 'Reporting']),
      color: '#ef4444',
      icon: '🏫',
      images: JSON.stringify([]),
      impact: '20+ sekolah di Kluang',
      featured: false,
      published: true,
      order: 5,
      authorId: admin.id,
    },
    {
      title: 'Workshop Video Production',
      slug: 'workshop-video-production',
      description: 'Bengkel pengeluaran video untuk pendidik menggunakan smartphone dan tools percuma. Termasuk shooting, editing, dan publishing.',
      category: 'Training & Workshop',
      tags: JSON.stringify(['Video Editing', 'CapCut', 'Content Creation']),
      color: '#ec4899',
      icon: '🎥',
      images: JSON.stringify([]),
      impact: '500+ guru terlatih',
      featured: false,
      published: true,
      order: 6,
      authorId: admin.id,
    },
    {
      title: 'Canva AI for Educators',
      slug: 'canva-ai-for-educators',
      description: 'Workshop intensif menggunakan Canva AI untuk menghasilkan bahan pengajaran berkualiti tinggi dengan AI.',
      category: 'Training & Workshop',
      tags: JSON.stringify(['Canva', 'AI', 'Graphic Design']),
      color: '#06b6d4',
      icon: '🎨',
      images: JSON.stringify([]),
      impact: '800+ guru menggunakan Canva AI',
      featured: false,
      published: true,
      order: 7,
      authorId: admin.id,
    },
    {
      title: 'Google Workspace Automation',
      slug: 'google-workspace-automation',
      description: 'Automasi workflow sekolah menggunakan Google Apps Script, Google Forms, dan Google Sheets untuk efficiency.',
      category: 'AI & Automation',
      tags: JSON.stringify(['Google Apps Script', 'Automation', 'Workflow']),
      color: '#eab308',
      icon: '⚡',
      images: JSON.stringify([]),
      impact: '100+ automasi workflows dibangunkan',
      featured: false,
      published: true,
      order: 8,
      authorId: admin.id,
    },
    {
      title: 'Microsoft Teams for Schools',
      slug: 'microsoft-teams-for-schools',
      description: 'Implementasi dan training Microsoft Teams untuk pembelajaran hibrid dan pengurusan kelas digital.',
      category: 'Training & Workshop',
      tags: JSON.stringify(['Microsoft Teams', 'Hybrid Learning', 'Collaboration']),
      color: '#6366f1',
      icon: '💬',
      images: JSON.stringify([]),
      impact: '30+ sekolah menggunakan Teams',
      featured: false,
      published: true,
      order: 9,
      authorId: admin.id,
    },
    {
      title: 'Educational Content Library',
      slug: 'educational-content-library',
      description: 'Perpustakaan digital dengan 1000+ video pembelajaran, template, dan resources untuk guru di Johor.',
      category: 'Content Creation',
      tags: JSON.stringify(['Video', 'Templates', 'Resources']),
      color: '#14b8a6',
      icon: '📖',
      images: JSON.stringify([]),
      impact: '5,000+ downloads',
      featured: false,
      published: true,
      order: 10,
      authorId: admin.id,
    },
    {
      title: 'Data Analytics Dashboard',
      slug: 'data-analytics-dashboard',
      description: 'Dashboard analytics real-time untuk pemantauan prestasi pelajar, kehadiran, dan trend menggunakan Power BI.',
      category: 'Sistem Pendidikan',
      tags: JSON.stringify(['Power BI', 'Analytics', 'Data Visualization']),
      color: '#f59e0b',
      icon: '📈',
      images: JSON.stringify([]),
      impact: 'Digunakan oleh PPD Kluang',
      featured: false,
      published: true,
      order: 11,
      authorId: admin.id,
    },
    {
      title: 'Website Portfolio (Ini!)',
      slug: 'website-portfolio-ini',
      description: 'Portfolio website modern yang anda tengok sekarang, dibangunkan dengan Next.js 15, TypeScript, dan Tailwind CSS.',
      category: 'Web Development',
      tags: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS']),
      color: '#64748b',
      icon: '🚀',
      link: 'https://ashrafnaim.my',
      images: JSON.stringify([]),
      impact: 'Professional web presence',
      featured: false,
      published: true,
      order: 12,
      authorId: admin.id,
    },
  ];

  for (const project of portfolioProjects) {
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log('✅ Portfolio projects created');

  // Seed Talks & Workshops
  console.log('📢 Creating talks & workshops...');

  const talks = [
    // Upcoming Talks
    {
      title: 'Bengkel AI untuk Pentadbir Sekolah',
      description: 'Bengkel komprehensif tentang penggunaan AI tools untuk pentadbiran sekolah, dari automasi workflow hingga decision making dengan data analytics.',
      type: 'Workshop',
      venue: 'Dewan Besar PPD Kluang',
      location: 'Kluang',
      date: new Date('2025-03-20'),
      audience: 'Pengetua & Guru Besar Daerah Kluang',
      status: 'upcoming',
      images: JSON.stringify([]),
      published: true,
    },
    {
      title: 'Ceramah: Transformasi Digital di Sekolah',
      description: 'Perkongsian tentang perjalanan transformasi digital di sekolah - challenges, best practices, dan success stories dari implementasi sebenar.',
      type: 'Seminar',
      venue: 'SMK Taman Johor Jaya',
      location: 'Johor Bahru',
      date: new Date('2025-03-25'),
      audience: 'Guru-guru SMK Taman Johor Jaya',
      status: 'upcoming',
      images: JSON.stringify([]),
      published: true,
    },
    // Past Talks
    {
      title: 'Workshop Canva AI untuk Pendidik',
      description: 'Hands-on workshop menggunakan Canva AI untuk create bahan pengajaran visual yang professional dalam minit.',
      type: 'Workshop',
      venue: 'PPD Kluang',
      location: 'Kluang',
      date: new Date('2025-02-15'),
      participants: 120,
      status: 'completed',
      slides: '#',
      recording: '#',
      images: JSON.stringify([]),
      published: true,
    },
    {
      title: 'ChatGPT dalam Bilik Darjah',
      description: 'Webinar online tentang practical applications ChatGPT untuk lesson planning, assessment, dan classroom management.',
      type: 'Webinar',
      venue: 'JPN Johor',
      location: 'Johor Bahru',
      date: new Date('2025-01-20'),
      participants: 200,
      status: 'completed',
      slides: '#',
      recording: '#',
      images: JSON.stringify([]),
      published: true,
    },
    {
      title: 'Google Workspace Automation',
      description: 'Workshop automasi menggunakan Google Apps Script untuk efficiency dalam pengurusan sekolah.',
      type: 'Workshop',
      venue: 'PPD Johor Bahru',
      location: 'Johor Bahru',
      date: new Date('2024-12-10'),
      participants: 80,
      status: 'completed',
      images: JSON.stringify([]),
      published: true,
    },
    {
      title: 'Microsoft Teams untuk Pembelajaran Hibrid',
      description: 'Training lengkap setup dan penggunaan Microsoft Teams untuk effective hybrid learning.',
      type: 'Training',
      venue: 'SMK Taman Johor',
      location: 'Johor Bahru',
      date: new Date('2024-11-15'),
      participants: 50,
      status: 'completed',
      images: JSON.stringify([]),
      published: true,
    },
    {
      title: 'Video Production dengan Smartphone',
      description: 'Workshop hands-on shooting dan editing video pembelajaran menggunakan smartphone sahaja.',
      type: 'Workshop',
      venue: 'PPD Kluang',
      location: 'Kluang',
      date: new Date('2024-10-20'),
      participants: 60,
      status: 'completed',
      images: JSON.stringify([]),
      published: true,
    },
    {
      title: 'Data Analytics untuk Sekolah',
      description: 'Training menggunakan Power BI dan Excel untuk create insightful dashboards untuk school data.',
      type: 'Training',
      venue: 'JPN Johor',
      location: 'Johor Bahru',
      date: new Date('2024-09-15'),
      participants: 40,
      status: 'completed',
      images: JSON.stringify([]),
      published: true,
    },
  ];

  for (const talk of talks) {
    await prisma.talk.create({
      data: talk,
    });
  }

  console.log('✅ Talks & workshops created');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
