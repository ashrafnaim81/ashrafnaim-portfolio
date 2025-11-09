# Ts. Ashraf bin Naim - Portfolio Website

A modern, database-driven portfolio website with full Content Management System (CMS).

🌐 **Live Site:** [https://ashrafnaim.my](https://ashrafnaim.my)

---

## ✨ Features

### Frontend Pages
- **🏠 Homepage** - Database-driven hero, stats, achievements, and skills
- **👤 About** - Dynamic profile, qualifications, expertise, and experience timeline
- **📝 Blog** - Full blog system with real-time view counts
- **💼 Portfolio** - Project showcase with categories
- **🎤 Talks & Workshops** - Event listings with details
- **📧 Contact** - Database-driven contact page with dynamic content

### Admin Panel (CMS)
- **Dashboard** - Overview and statistics
- **Home Page Editor** - Edit homepage content with dynamic forms (Add/Edit/Delete)
- **About Page Editor** - Manage profile and professional information
- **Contact Page Editor** - Edit contact info, social media, FAQs, and quick actions
- **Blog Management** - Full CRUD for blog posts
- **Portfolio Management** - Full CRUD for portfolio projects
- **Talks Management** - Full CRUD for talks and workshops
- **Contact Messages** - View, manage, and reply to messages with Gmail integration
- **Settings** - Change password and security

### Technical Features
- ✅ **Database-Driven** - PostgreSQL with Prisma ORM
- ✅ **Authentication** - NextAuth.js with secure session management
- ✅ **Dynamic Rendering** - Real-time content updates
- ✅ **Type-Safe** - Full TypeScript implementation
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SSL/HTTPS** - Secure with Let's Encrypt
- ✅ **SEO Optimized** - Server-side rendering with Next.js

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.5.6 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL 15 |
| **ORM** | Prisma 6.19.0 |
| **Authentication** | NextAuth 4.24.13 |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui (Radix UI) |
| **Icons** | Lucide React |
| **Form Handling** | Web3Forms |
| **Hosting** | AWS Lightsail (Debian 12) |
| **Process Manager** | PM2 |
| **Web Server** | Nginx |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (for production) or SQLite (for local dev)

### Local Development

```bash
# Clone repository
git clone https://github.com/ashrafnaim81/ashrafnaim-portfolio.git
cd ashrafnaim-portfolio

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed                     # Seed blog/portfolio/talks data
npx ts-node prisma/seed-home-about.ts  # Seed home/about pages
npx ts-node prisma/seed-contact.ts     # Seed contact page

# Start development server (uses SQLite)
unset DATABASE_URL && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Access

- **URL:** http://localhost:3000/admin/login
- **Email:** admin@ashrafnaim.my
- **Password:** Admin@123 (change this!)

---

## 📁 Project Structure

```
ashrafnaim-portfolio/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Auth routes
│   ├── admin/                    # Admin panel (CMS)
│   │   ├── (dashboard)/
│   │   │   ├── home/            # Home page editor
│   │   │   ├── about/           # About page editor
│   │   │   ├── contact-page/    # Contact page editor
│   │   │   ├── blog/            # Blog management
│   │   │   ├── portfolio/       # Portfolio management
│   │   │   ├── talks/           # Talks management
│   │   │   ├── contacts/        # Contact messages viewer
│   │   │   └── settings/        # Settings
│   │   └── login/               # Admin login
│   ├── api/                     # API routes
│   │   ├── home/                # Home page API
│   │   ├── about/               # About page API
│   │   ├── contact-page/        # Contact page API
│   │   ├── contacts/            # Contacts API
│   │   ├── blog/                # Blog API
│   │   ├── portfolio/           # Portfolio API
│   │   ├── talks/               # Talks API
│   │   └── auth/                # NextAuth API
│   ├── blog/                    # Public blog pages
│   ├── portfolio/               # Portfolio page
│   ├── talks/                   # Talks page
│   ├── contact/                 # Contact page
│   └── about/                   # About page
├── components/                  # React components
│   ├── ui/                      # UI components
│   └── [feature-components]
├── lib/                         # Utilities
│   ├── prisma.ts               # Prisma client
│   └── auth.ts                 # Auth config
├── prisma/                      # Database
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Blog/portfolio seed
│   └── seed-pages.ts           # Home/about seed
└── public/                      # Static assets
```

---

## 📚 Documentation

- **[PROJECT_REFERENCE.md](PROJECT_REFERENCE.md)** - Comprehensive documentation, roadmap, and technical details
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands and common tasks

---

## 🔐 Security

- Password hashing with bcrypt
- Secure session management with NextAuth
- Protected admin routes with middleware
- HTTPS/SSL with auto-renewal
- SQL injection protection (Prisma ORM)
- Environment variable protection

**⚠️ Important:** Change the default admin password immediately after deployment!

---

## 🚢 Deployment

The site is deployed on **AWS Lightsail** with:
- Nginx reverse proxy
- PM2 process management
- PostgreSQL database
- Let's Encrypt SSL
- Custom domain (ashrafnaim.my)

For deployment instructions, see [QUICK_REFERENCE.md](QUICK_REFERENCE.md#deploy-to-production)

---

## 📈 Recent Updates

**November 9, 2025:**
- ✨ Added Contact Management System with full CRUD
- ✨ Contact Page CMS - Edit social media, FAQs, contact info
- ✨ Gmail compose integration for message replies
- ✨ Dual submission system (database + Web3Forms)
- ✨ Database-driven Home & About page CMS
- ✨ Portfolio & Talks management systems complete
- 🔧 Fixed blog view count caching issues
- 🔧 Implemented admin password change feature

See [PROJECT_REFERENCE.md](PROJECT_REFERENCE.md#recent-fixes--features-latest-session) for full changelog.

---

## 🛣️ Roadmap

### ✅ Completed
- [x] Home & About page CMS
- [x] Contact Page CMS
- [x] Blog management system
- [x] Portfolio management system
- [x] Talks & Workshops management
- [x] Contact messages management
- [x] Real-time view counting
- [x] Admin authentication
- [x] Database-driven content

### 🎯 Next Steps
- [ ] Rich text editor for blog/FAQs
- [ ] Image upload system
- [ ] Categories & Tags management UI
- [ ] Comments system
- [ ] Search functionality

See full roadmap in [PROJECT_REFERENCE.md](PROJECT_REFERENCE.md#next-steps-suggested-priority)

---

## 📄 License

© 2025 Ts. Ashraf bin Naim. All rights reserved.

---

## 📧 Contact

- **Email:** ashrafnaim81@gmail.com
- **Website:** [https://ashrafnaim.my](https://ashrafnaim.my)
- **LinkedIn:** [AshrafNaim81](https://www.linkedin.com/in/AshrafNaim81/)

---

Built with ❤️ using Next.js, TypeScript, Prisma, and Tailwind CSS
