# Portfolio Website - Project Reference & Roadmap

**Last Updated:** 9 November 2025
**Domain:** https://ashrafnaim.my
**Server:** AWS Lightsail (Debian 12)
**Tech Stack:** Next.js 15.5.6, PostgreSQL 15, Prisma 6.19.0, NextAuth 4.24.13

---

## 📋 Current Project Status

### ✅ Completed Features

#### Frontend Pages
- **Homepage** (`/`) - ✨ **Database-driven!** Hero section, stats, achievements, skills (editable via admin)
- **About** (`/about`) - ✨ **Database-driven!** Full profile, qualifications, expertise, experiences (editable via admin)
- **Contact** (`/contact`) - ✨ **Database-driven!** Contact info, social media, FAQs (editable via admin) + Dual submission form
- **Blog** (`/blog`) - Blog listing dengan dynamic data (real-time view counts)
- **Blog Post** (`/blog/[slug]`) - Individual blog articles dengan auto view increment
- **Portfolio** (`/portfolio`) - Project showcase
- **Talks** (`/talks`) - Talks & workshops listing

#### Admin Panel
- **Dashboard** (`/admin`) - Overview statistics
- **Home Page Editor** (`/admin/home`) - ✨ **Database-driven CMS!**
  - Dynamic forms for stats (Add/Edit/Delete)
  - Achievements management with icons
  - Skills management with proficiency levels
  - Hero section customization
  - CTA section editing
- **About Page Editor** (`/admin/about`) - ✨ **Database-driven CMS!**
  - Profile information management
  - Professional qualifications (Add/Edit/Delete)
  - Expertise areas management
  - Experience timeline (Add/Edit/Delete)
  - Achievements & contributions
- **Contact Page Editor** (`/admin/contact-page`) - ✨ **NEW!**
  - Edit page header (title, description)
  - Manage contact info (location, address, hours)
  - Social media management (Add/Edit/Delete)
  - Quick actions management (Add/Edit/Delete)
  - FAQ management (Add/Edit/Delete)
- **Blog Management** (`/admin/blog`) - List all blog posts
  - Create new post (`/admin/blog/new`)
  - Edit existing post (`/admin/blog/[id]`)
- **Portfolio Management** (`/admin/portfolio`) - ✅ **COMPLETE**
  - Full CRUD for portfolio projects
  - Technology tags, featured toggle, ordering
- **Talks Management** (`/admin/talks`) - ✅ **COMPLETE**
  - Full CRUD for talks and workshops
  - Event details, slides, recordings
- **Contact Messages** (`/admin/contacts`) - ✨ **NEW!**
  - View all contact form submissions
  - Filter by read/replied status
  - Mark as read/replied
  - Gmail compose integration
  - Delete messages
- **Settings** (`/admin/settings`)
  - View profile info
  - Change password functionality
  - Security tips

#### Authentication
- NextAuth implementation dengan credentials provider
- Session management
- Protected admin routes
- Default admin: admin@ashrafnaim.my / Admin@123

#### Infrastructure
- ✅ SSL/HTTPS dengan Let's Encrypt (auto-renewal configured)
- ✅ Nginx reverse proxy
- ✅ PM2 process management
- ✅ PostgreSQL production database
- ✅ Custom domain (ashrafnaim.my) configured

---

## 🔧 Recent Fixes & Features (Latest Session)

### 1. Contact Management System ✨ **NEW!**
**Problem:** Contact form submissions only went to Web3Forms; no way to view/manage messages in admin
**Solution:** Complete Contact Management System with dual submission and database storage

**Features Implemented:**
- **Contact Messages Management** (`/admin/contacts`)
  - View all contact form submissions in admin panel
  - Filter by status (All, Unread, Read, Replied)
  - Mark messages as read/unread
  - Mark as replied
  - Delete unwanted messages
  - Statistics dashboard (Total, Unread, Replied counts)
  - Gmail compose integration for quick replies

- **Dual Submission System**
  - Form submissions save to database AND Web3Forms
  - Ensures backup via email notification
  - No data loss

- **Gmail Integration**
  - Reply button opens Gmail compose with pre-filled data
  - Auto-fills recipient email, subject, and quoted original message
  - Professional reply workflow

**Files Created/Modified:**
- `app/api/contacts/route.ts` - API for listing and creating contacts
- `app/api/contacts/[id]/route.ts` - API for individual contact operations
- `app/admin/(dashboard)/contacts/page.tsx` - Admin interface for message management
- `components/contact-form.tsx` - Updated with dual submission
- `prisma/schema.prisma` - Added Contact model
- `app/admin/(dashboard)/layout.tsx` - Added Contacts navigation

**Impact:** Never lose contact inquiries! Full admin control over contact message management with professional reply workflow.

---

### 2. Contact Page CMS ✨ **NEW!**
**Problem:** Contact page content (social media, FAQs, contact info) was hardcoded
**Solution:** Database-driven Contact Page with full CMS functionality

**Features Implemented:**
- **Contact Page Editor** (`/admin/contact-page`)
  - Edit page header (title, description)
  - Manage contact information (location, address, operating hours)
  - Dynamic Social Media management (Add/Edit/Delete platforms)
  - Dynamic Quick Actions (Add/Edit/Delete)
  - Edit response time information
  - Dynamic FAQ management (Add/Edit/Delete)

- **Database-Driven Frontend**
  - Contact page now fetches all content from database
  - Dynamic rendering for real-time updates
  - No code changes needed for content updates

**Files Created/Modified:**
- `app/api/contact-page/route.ts` - API for Contact Page CRUD
- `app/admin/(dashboard)/contact-page/page.tsx` - Admin editor with dynamic forms
- `app/contact/page.tsx` - Updated to fetch from database
- `prisma/schema.prisma` - Added ContactPage model
- `prisma/seed-contact.ts` - Seed script for initial data
- `app/admin/(dashboard)/layout.tsx` - Added Contact Page navigation

**Impact:** Complete control over all contact page sections through admin panel!

---

### 3. Home & About Pages - Database-Driven CMS ✨ **MAJOR UPDATE**
**Problem:** Homepage and About page content was hardcoded in components
**Solution:** Complete database integration with user-friendly admin editors

**Features Implemented:**
- **New Database Models:** `HomePage` and `AboutPage` with JSON fields for structured content
- **Dynamic Admin Forms:** Add/Edit/Delete interface for all sections (stats, achievements, skills, qualifications, experiences, etc.)
- **API Routes:** `/api/home` and `/api/about` for CRUD operations
- **Frontend Dynamic Rendering:** Both pages now fetch from database with `export const dynamic = 'force-dynamic'`
- **Seed Script:** `prisma/seed-pages.ts` to populate initial data from profile

**Files Created/Modified:**
- `app/admin/(dashboard)/home/page.tsx` - Home page editor with dynamic forms
- `app/admin/(dashboard)/about/page.tsx` - About page editor with dynamic forms
- `app/api/home/route.ts` - Home page API endpoints
- `app/api/about/route.ts` - About page API endpoints
- `app/page.tsx` - Updated to fetch from database
- `app/about/page.tsx` - Updated to fetch from database
- `prisma/schema.prisma` - Added HomePage and AboutPage models
- `prisma/seed-pages.ts` - Seeding script with profile data
- `components/ui/textarea.tsx` - New component for forms

**Impact:** Complete control over homepage and about page content through admin panel, no code changes needed for updates!

### 4. Job Title Emphasis Enhancement
**Change:** Added gradient color emphasis to job title on homepage
```typescript
className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
```

### 5. Blog View Count Caching Issue - FIXED
**Problem:** Blog listing page showing old/dummy view counts
**Solution:** Added dynamic rendering to `/app/blog/page.tsx`:
```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

### 6. Admin Password Change - IMPLEMENTED
**New Features:**
- Complete Settings page with password change form
- Validation (min 8 chars, must differ from current)
- Secure bcrypt password hashing
- Malay language interface
- API endpoint: `/api/admin/change-password`

### 7. Button Contrast Fix
**Change:** Secondary button text color from dark to white in `/app/globals.css`:
```css
--secondary-foreground: 210 40% 98%; /* Was: 222.2 47.4% 11.2% */
```

### 8. Blog Post Views Reset
All blog posts reset to 0 views (from dummy data), now showing real view counts.

---

## 🚀 Recommended Features & Roadmap

### 🎯 PRIORITY 1: Complete Admin CRUD Interface ✅ **COMPLETED!**

**Status:** All core CRUD interfaces are now complete!

#### 1. Portfolio Management (`/admin/portfolio`) ✅ **COMPLETE**
**Implemented features:**
- ✅ Full CRUD (Create, Read, Update, Delete)
- ✅ Technology tags management
- ✅ Live demo & GitHub links
- ✅ Featured project toggle
- ✅ Published/draft status
- ✅ Ordering system

**URL:** https://ashrafnaim.my/admin/portfolio

---

#### 2. Talks & Workshops Management (`/admin/talks`) ✅ **COMPLETE**
**Implemented features:**
- ✅ Full CRUD for talks and workshops
- ✅ Event details editing
- ✅ Date management
- ✅ Location/venue fields
- ✅ Participants tracking
- ✅ Slides and recording links
- ✅ Event status (upcoming/completed)

**URL:** https://ashrafnaim.my/admin/talks

---

#### 3. Contact Messages Management (`/admin/contacts`) ✅ **COMPLETE**
**Implemented features:**
- ✅ View all contact form submissions
- ✅ Read/Unread status management
- ✅ Mark as replied
- ✅ Delete messages
- ✅ Filter by status (All, Unread, Read, Replied)
- ✅ Gmail compose integration for quick replies
- ✅ Dual submission (database + Web3Forms)
- ✅ Statistics dashboard (Total, Unread, Replied)

**URL:** https://ashrafnaim.my/admin/contacts

---

#### 4. Contact Page CMS (`/admin/contact-page`) ✅ **NEW!**
**Implemented features:**
- ✅ Edit page header (title, description)
- ✅ Edit contact information (location, address, hours)
- ✅ Manage social media links (Add/Edit/Delete)
- ✅ Manage quick actions (Add/Edit/Delete)
- ✅ Edit response time info
- ✅ Manage FAQs (Add/Edit/Delete)
- ✅ Database-driven frontend

**URL:** https://ashrafnaim.my/admin/contact-page

---

### 🎯 PRIORITY 2: Content Management Enhancements

#### 1. Rich Text Editor for Blog
**Current:** Blog content adalah plain text dalam `<textarea>`
**Recommendation:** Implement rich text editor

**Options:**
- **Tiptap** (recommended - modern, extensible)
- **Quill** (simple, lightweight)
- **Lexical** (by Meta, powerful)

**Features:**
- Text formatting (bold, italic, headings)
- Code blocks dengan syntax highlighting
- Images upload & embed
- Links
- Lists (ordered/unordered)
- Blockquotes
- Tables

**Estimated effort:** 6-8 hours

---

#### 2. Image Upload System
**Current:** Images are external URLs (Unsplash)
**Recommendation:** Add image upload capability

**Implementation options:**

**Option A: Cloud Storage (Recommended)**
- **Cloudinary** - Free tier 25GB, auto optimization
- **AWS S3** - Already using AWS, good integration
- **Vercel Blob** - If hosting on Vercel

**Option B: Local Storage**
- Store in `/public/uploads/` folder
- Need to handle backups
- May hit storage limits on Lightsail

**Features needed:**
- Upload form component
- Image preview
- Auto resize/optimize
- Alt text field (for SEO)
- Image library/picker

**Estimated effort:** 5-7 hours (with Cloudinary)

---

#### 3. Categories & Tags Management
**Current:** Categories & tags exist but no admin UI to manage them

**Features needed:**
- View all categories/tags
- Create new ones
- Edit names/slugs
- Delete unused ones
- Assign colors/icons (optional)
- Usage statistics (how many posts per category)

**Estimated effort:** 2-3 hours

---

### 🎯 PRIORITY 3: Homepage & About Page Customization ✅ **COMPLETED!**

**Status:** ✅ Fully implemented with database-driven CMS!

#### ✅ Completed Features:
- ✅ Edit hero section text (title, job title, description, image)
- ✅ Manage stats section (Add/Edit/Delete)
- ✅ Manage achievements (Add/Edit/Delete with icons)
- ✅ Manage skills (Add/Edit/Delete with proficiency levels)
- ✅ Edit CTA section
- ✅ About page profile section editable
- ✅ Professional qualifications management
- ✅ Expertise areas management
- ✅ Experience timeline (Add/Edit/Delete)
- ✅ Achievements & contributions management

**Implementation:**
- ✅ New tables: `HomePage` and `AboutPage` dalam Prisma schema
- ✅ Admin pages: `/admin/home` and `/admin/about`
- ✅ JSON fields untuk store structured content
- ✅ Dynamic forms dengan Add/Edit/Delete functionality
- ✅ API routes untuk CRUD operations

**Next Steps (Optional Enhancements):**
- [ ] Manage featured projects (select which to show on homepage)
- [ ] Manage featured blog posts selection
- [ ] Edit testimonials/quotes section
- [ ] Manage social media links

---

### 🎯 PRIORITY 4: Blog Enhancements

#### 1. Comments System
**Options:**
- **Giscus** (recommended - free, uses GitHub Discussions)
- **Disqus** (popular but ads in free tier)
- **Custom** (build your own with database)

**Estimated effort:** 3-4 hours (with Giscus)

---

#### 2. Social Sharing
**Features:**
- Share buttons (Facebook, Twitter, LinkedIn, WhatsApp)
- Copy link button
- Open Graph meta tags (for preview when shared)
- Twitter Card meta tags

**Estimated effort:** 2 hours

---

#### 3. Search Functionality
**Current:** Search box exists but not functional

**Implementation:**
- Client-side search (simple, fast for small blog)
- Full-text search in PostgreSQL
- Or use Algolia (powerful but overkill for portfolio)

**Estimated effort:** 3-4 hours

---

#### 4. Blog Analytics
**Features:**
- Views tracking (✅ Already done!)
- Reading time calculation (✅ Already in UI)
- Popular posts widget
- Related posts suggestions
- Time-based stats (daily/weekly/monthly views)

**Estimated effort:** 3-4 hours

---

### 🎯 PRIORITY 5: User Experience Improvements

#### 1. Loading States
Add skeleton loaders/spinners for:
- Blog listing while loading
- Portfolio grid
- Admin dashboard stats
- Form submissions

**Estimated effort:** 2-3 hours

---

#### 2. Error Handling
Improve error pages:
- Custom 404 page dengan suggestions
- 500 error page
- Form validation errors more user-friendly
- Toast notifications for success/error messages

**Estimated effort:** 2-3 hours

---

#### 3. Dark Mode Toggle
**Current:** Dark mode exists in CSS but no toggle
**Add:**
- Theme switcher button
- Remember preference (localStorage)
- Smooth transition animation

**Estimated effort:** 2 hours

---

#### 4. Mobile Optimization
- Test and improve mobile responsiveness
- Touch-friendly admin interface
- Mobile navigation improvements
- Optimize images for mobile

**Estimated effort:** 3-4 hours

---

### 🎯 PRIORITY 6: SEO & Performance

#### 1. SEO Improvements
**Add:**
- Sitemap.xml generation
- Robots.txt optimization
- Structured data (JSON-LD) for articles
- Open Graph images
- Meta descriptions for all pages
- Canonical URLs

**Estimated effort:** 3-4 hours

---

#### 2. Performance Optimization
- Image lazy loading (already in Next.js)
- Font optimization
- Code splitting review
- Bundle size analysis
- Database query optimization
- Add caching where appropriate

**Estimated effort:** 4-5 hours

---

## 📊 Database Schema Overview

### Current Tables (Prisma Schema)

```
User (admin accounts)
├── id, name, email, password
└── Relations: BlogPost (author), Contact, Talk, PortfolioProject

HomePage ✅ FULL CRUD
├── id, heroTitle, heroJobTitle, heroDescription, heroImage
├── stats (JSON), achievements (JSON), skills (JSON)
├── ctaTitle, ctaDescription
├── published, createdAt, updatedAt
└── Editable via /admin/home with dynamic forms

AboutPage ✅ FULL CRUD
├── id, profileTitle, profileSubtitle, profileJobTitle
├── profileLocation, profileYearsExperience, profileSummary, profileImage
├── qualifications (JSON), expertiseAreas (JSON)
├── experiences (JSON), achievements (JSON)
├── published, createdAt, updatedAt
└── Editable via /admin/about with dynamic forms

BlogPost ✅ FULL CRUD
├── id, title, slug, excerpt, content
├── coverImage, published, views
├── publishedAt, createdAt, updatedAt
├── authorId, categoryId
└── Relations: Category, Tags[], Author (User)

Category ⚠️ NO ADMIN UI
├── id, name, slug, description
└── Relations: BlogPost[]

Tag ⚠️ NO ADMIN UI
├── id, name, slug
└── Relations: BlogPost[]

PortfolioProject ✅ FULL CRUD
├── id, title, slug, description
├── image, technologies, liveUrl, githubUrl
├── featured, published, order
├── createdAt, updatedAt, authorId
└── Relations: Author (User)
└── Editable via /admin/portfolio

Talk ✅ FULL CRUD
├── id, title, description, date, location
├── participants, slidesUrl, recordingUrl
├── featured, createdAt, updatedAt, authorId
└── Relations: Author (User)
└── Editable via /admin/talks

Contact ✅ FULL CRUD
├── id, name, email, phone, organization
├── subject, message
├── read (boolean), replied (boolean)
├── createdAt
└── Editable via /admin/contacts with Gmail integration

ContactPage ✅ FULL CRUD
├── id, pageTitle, pageDescription
├── locationTitle, locationAddress, operatingHours
├── socialMedia (JSON), quickActions (JSON)
├── responseTime, responseTimeDesc
├── faqs (JSON), published
├── createdAt, updatedAt
└── Editable via /admin/contact-page with dynamic forms
```

---

## 🛠️ Technical Setup Reference

### Local Development
```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Seed database with all data
npx prisma db seed                     # Blog, portfolio, talks data
npx ts-node prisma/seed-home-about.ts  # Home & About pages
npx ts-node prisma/seed-contact.ts     # Contact page

# Run development server
npm run dev
# Or if need to avoid production DB:
unset DATABASE_URL && npm run dev
```

### Build & Deploy
```bash
# Build locally (to avoid server RAM issues)
unset DATABASE_URL && npm run build

# Transfer to server
scp -i "path/to/key.pem" -r .next app components bitnami@47.129.100.227:~/ashrafnaim-portfolio/

# Restart on server
ssh -i "path/to/key.pem" bitnami@47.129.100.227 "pm2 restart portfolio"
```

### Database Management
```bash
# Access production DB (from server)
ssh -i "key.pem" bitnami@47.129.100.227
psql -U ashrafnaim -d ashrafnaim_portfolio

# Run Prisma Studio (local with production DB)
# Make sure DATABASE_URL is set
npx prisma studio
```

### Environment Variables

**Production (.env on server):**
```env
DATABASE_URL="postgresql://ashrafnaim:portfolio2025secure@localhost:5432/ashrafnaim_portfolio"
NEXTAUTH_URL="https://ashrafnaim.my"
NEXTAUTH_SECRET="Fp/w6uvBDAX45WkcIzbtk8hyBzizr7EE4QiXTMkeDOE="
WEB3FORMS_ACCESS_KEY="YOUR_KEY_HERE"
NODE_ENV="production"
```

**Local (.env.local):**
```env
DATABASE_URL="file:./dev.db"  # SQLite for local dev
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-local-secret"
WEB3FORMS_ACCESS_KEY="your-key"
```

---

## 📁 Important File Locations

### Configuration Files
- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Blog, portfolio, talks seeding script
- `prisma/seed-home-about.ts` - Home & About pages seeding script
- `prisma/seed-contact.ts` - Contact page seeding script
- `tailwind.config.ts` - Tailwind configuration
- `next.config.ts` - Next.js configuration
- `.env` (server) - Production environment variables
- `.env.local` (local) - Local development variables

### Key Components
- `components/ui/*` - Reusable UI components (Button, Card, Badge, etc.)
- `lib/prisma.ts` - Prisma client instance
- `lib/auth.ts` - NextAuth configuration

### Admin Panel
- `app/admin/(dashboard)/layout.tsx` - Admin layout with navigation
- `app/admin/(dashboard)/page.tsx` - Dashboard overview
- `app/admin/(dashboard)/home/page.tsx` - Home page editor
- `app/admin/(dashboard)/about/page.tsx` - About page editor
- `app/admin/(dashboard)/contact-page/page.tsx` - Contact page editor
- `app/admin/(dashboard)/blog/*` - Blog management
- `app/admin/(dashboard)/portfolio/page.tsx` - Portfolio management
- `app/admin/(dashboard)/talks/page.tsx` - Talks management
- `app/admin/(dashboard)/contacts/page.tsx` - Contact messages management
- `app/admin/(dashboard)/settings/page.tsx` - Settings & password change
- `app/api/admin/*` - Admin API routes
- `app/api/home/route.ts` - Home page API
- `app/api/about/route.ts` - About page API
- `app/api/contact-page/route.ts` - Contact page API
- `app/api/contacts/*` - Contact messages API
- `app/api/portfolio/*` - Portfolio API
- `app/api/talks/*` - Talks API

### Frontend Pages
- `app/page.tsx` - Homepage (database-driven)
- `app/about/page.tsx` - About page (database-driven)
- `app/contact/page.tsx` - Contact page (database-driven)
- `app/blog/page.tsx` - Blog listing
- `app/blog/[slug]/page.tsx` - Individual blog post
- `app/portfolio/page.tsx` - Portfolio showcase
- `app/talks/page.tsx` - Talks listing

---

## 🔐 Security Checklist

### ✅ Implemented
- [x] HTTPS/SSL with auto-renewal
- [x] Password hashing (bcrypt)
- [x] NextAuth session management
- [x] Environment variables for secrets
- [x] SQL injection protection (Prisma ORM)
- [x] Protected API routes (session checks)

### ⏳ Recommended Additions
- [ ] Rate limiting on API routes
- [ ] CSRF protection
- [ ] Content Security Policy headers
- [ ] Input sanitization for rich text
- [ ] File upload validation (when implemented)
- [ ] Brute force protection on login
- [ ] Two-factor authentication (2FA) - optional

---

## 🎨 Design System

### Colors (from globals.css)
- **Primary:** Blue (#3b82f6 range) - Main actions, links
- **Secondary:** Purple (#a855f7 range) - Accents, highlights
- **Muted:** Gray tones - Backgrounds, disabled states
- **Destructive:** Red - Errors, delete actions

### Typography
- Font: System fonts (default Next.js)
- Headings: Bold, various sizes
- Body: Regular weight, readable size

### Components (shadcn/ui based)
- Button - Primary, Secondary, Outline, Ghost variants
- Card - Container for content blocks
- Badge - Tags, categories, status indicators
- Input - Text fields
- Label - Form labels
- Alert - Success/error messages

---

## 📝 Admin Credentials

**Default Admin Account:**
- Email: `admin@ashrafnaim.my`
- Password: `Admin@123`

**⚠️ IMPORTANT:** Change password immediately after first login using the Settings page!

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. **No image upload** - Using external URLs only
2. **Basic text editor** - No rich formatting in blog posts
3. **No search** - Search box is placeholder only
4. **No comments** - Blog posts don't have comment system
5. **Manual category/tag management** - Need to use Prisma Studio or database directly

### Minor Issues
- [ ] "Load More" button on blog page is not functional
- [ ] Newsletter signup form is placeholder (no backend)
- [ ] Category filter badges on blog page not functional

---

## 📚 Useful Commands

### Prisma
```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Run database migrations
npx prisma migrate dev --name migration_name

# Seed database
npx prisma db seed
```

### PM2 (on server)
```bash
# Check status
pm2 status

# View logs
pm2 logs portfolio

# Restart app
pm2 restart portfolio

# Stop app
pm2 stop portfolio

# Monitor
pm2 monit
```

### Nginx (on server)
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

### SSL Certificate
```bash
# Renew manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check expiry
sudo certbot certificates
```

---

## 🎓 Learning Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

### For Admin CRUD Implementation
- [Next.js Forms](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
- [React Hook Form](https://react-hook-form.com) - Form validation
- [Zod](https://zod.dev) - Schema validation
- [TanStack Table](https://tanstack.com/table) - For data tables in admin

---

## 💡 Quick Win Features (Easy to implement)

### 1-2 Hours Each:
1. **Dark mode toggle** - Theme switcher button
2. **Copy to clipboard** - For sharing blog posts
3. **Scroll to top button** - For long pages
4. **Reading progress bar** - For blog posts
5. **Breadcrumbs** - For navigation context
6. **Footer enhancement** - Add more links, info
7. **404 page customization** - Better error page
8. **Favicon & PWA icons** - Branding
9. **Meta tags** - Improve SEO
10. **Admin statistics cards** - Visual dashboard improvements

---

## 🚀 Next Steps (Suggested Priority)

### ✅ Phase 0 (COMPLETED) - Content Management System
1. ✅ **Homepage Management** - Database-driven with admin editor
2. ✅ **About Page Management** - Complete profile editing
3. ✅ **Blog Management** - Full CRUD with view tracking

### ✅ Phase 1 (COMPLETED) - Core CRUD
1. ✅ **Portfolio Management** - Full CRUD with technology tags and ordering
2. ✅ **Talks Management** - Complete admin panel with event details
3. ✅ **Contact Messages Management** - View, filter, and reply to inquiries
4. ✅ **Contact Page CMS** - Edit all contact page sections dynamically

### Phase 2 (Current Priority) - Content Quality
1. **Rich Text Editor** - Better blog writing experience
2. **Image Upload** - Professional content
3. **Categories/Tags UI** - Better organization

### Phase 3 (Future) - Engagement
4. **Comments System** - User interaction
5. **Search Functionality** - Content discovery
6. **Social Sharing** - Wider reach
7. **Analytics Dashboard** - Track performance

### Phase 4 (Polish) - Professional Touch
8. **SEO Optimization** - Better ranking
9. **Performance Tuning** - Faster load times
10. **Mobile Optimization** - Better UX
11. **Dark Mode** - Modern feature

---

## 📞 Support & Maintenance

### Regular Tasks
- **Weekly:** Check server resources, review logs
- **Monthly:** Update dependencies, backup database
- **Quarterly:** Security audit, performance review
- **Yearly:** SSL certificate renewal (automatic), review tech stack

### Backup Strategy
1. Database: Use `pg_dump` weekly
2. Files: Backup `/home/bitnami/ashrafnaim-portfolio`
3. Configuration: Backup nginx, PM2 configs
4. Store backups on different server/cloud

### Monitoring
- Server uptime: Use UptimeRobot or Pingdom (free tier)
- Error tracking: Consider Sentry (free tier)
- Analytics: Google Analytics or Plausible

---

## 🎯 Feature Request Template

When adding new feature, consider:

```markdown
## Feature: [Name]

**Page:** [Which page/section]
**Priority:** [High/Medium/Low]
**User Story:** As a [user], I want to [action] so that [benefit]

**Requirements:**
- [ ] Requirement 1
- [ ] Requirement 2

**Technical Notes:**
- Database changes needed?
- New components needed?
- API routes needed?

**Estimated Time:** [hours]
```

---

## 📄 License & Credits

**Project:** Personal Portfolio Website
**Owner:** Ts. Ashraf bin Naim
**Framework:** Next.js
**UI Components:** shadcn/ui (inspired)
**Hosting:** AWS Lightsail
**Contact Form:** Web3Forms

---

**End of Reference Document**

*Last updated: November 9, 2025*
*Major Update: Complete Contact Management System with Contact Page CMS and Contact Messages Management!*
*All core CRUD interfaces are now complete: Home, About, Contact, Blog, Portfolio, Talks!*
*For questions or updates, refer to this document before starting new development.*
