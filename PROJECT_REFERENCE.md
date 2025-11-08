# Portfolio Website - Project Reference & Roadmap

**Last Updated:** 8 November 2025
**Domain:** https://ashrafnaim.my
**Server:** AWS Lightsail (Debian 12)
**Tech Stack:** Next.js 15.5.6, PostgreSQL 15, Prisma 6.19.0, NextAuth 4.24.13

---

## 📋 Current Project Status

### ✅ Completed Features

#### Frontend Pages
- **Homepage** (`/`) - Hero section, About preview, Featured work
- **About** (`/about`) - Full profile dan background
- **Blog** (`/blog`) - Blog listing dengan dynamic data (real-time view counts)
- **Blog Post** (`/blog/[slug]`) - Individual blog articles dengan auto view increment
- **Portfolio** (`/portfolio`) - Project showcase
- **Talks** (`/talks`) - Talks & workshops listing
- **Contact** (`/contact`) - Contact form dengan Web3Forms integration

#### Admin Panel
- **Dashboard** (`/admin`) - Overview statistics
- **Blog Management** (`/admin/blog`) - List all blog posts
  - Create new post (`/admin/blog/new`)
  - Edit existing post (`/admin/blog/[id]`)
- **Settings** (`/admin/settings`) - ✨ **BARU!**
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

## 🔧 Recent Fixes (Latest Session)

### 1. Blog View Count Caching Issue - FIXED
**Problem:** Blog listing page showing old/dummy view counts
**Solution:** Added dynamic rendering to `/app/blog/page.tsx`:
```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

### 2. Admin Password Change - IMPLEMENTED
**New Features:**
- Complete Settings page with password change form
- Validation (min 8 chars, must differ from current)
- Secure bcrypt password hashing
- Malay language interface
- API endpoint: `/api/admin/change-password`

### 3. Button Contrast Fix
**Change:** Secondary button text color from dark to white in `/app/globals.css`:
```css
--secondary-foreground: 210 40% 98%; /* Was: 222.2 47.4% 11.2% */
```

### 4. Blog Post Views Reset
All blog posts reset to 0 views (from dummy data), now showing real view counts (1-3).

---

## 🚀 Recommended Features & Roadmap

### 🎯 PRIORITY 1: Complete Admin CRUD Interface

Saat ini, hanya **Blog** sahaja ada full CRUD interface. Perlu tambah untuk:

#### 1. Portfolio Management (`/admin/portfolio`)
**Features needed:**
- ✏️ Create new portfolio project
- 📝 Edit existing projects
- 🗑️ Delete projects
- 📸 Image upload functionality
- 🏷️ Technology tags management
- 🔗 Live demo & GitHub links
- ⭐ Featured project toggle

**Database:** Table `PortfolioProject` sudah wujud di Prisma schema

**Estimated effort:** 4-6 hours

---

#### 2. Talks & Workshops Management (`/admin/talks`)
**Features needed:**
- ✏️ Create new talk/workshop
- 📝 Edit event details
- 🗑️ Delete events
- 📅 Date picker for event dates
- 📍 Location/venue field
- 👥 Audience size tracking
- 📎 Presentation slides upload/link
- 📊 Event status (upcoming/completed/cancelled)

**Database:** Table `Talk` sudah wujud di Prisma schema

**Estimated effort:** 3-4 hours

---

#### 3. Contact Messages Management (`/admin/contacts`)
**Features needed:**
- 📧 View all contact form submissions
- 📖 Read/Unread status
- 🏷️ Categorize messages (inquiry/feedback/collaboration)
- ⭐ Priority/important flag
- ✅ Mark as resolved
- 🗑️ Delete spam/old messages
- 📊 Filter by date/status
- 📩 Quick reply option (optional - might need email service)

**Database:** Table `Contact` sudah wujud di Prisma schema

**Current issue:** Messages submitted via Web3Forms - need to save to database also

**Estimated effort:** 4-5 hours

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

### 🎯 PRIORITY 3: Homepage Customization

**Current:** Homepage content is hardcoded in components
**Recommendation:** Make it editable from admin panel

#### Features needed:
- Edit hero section text
- Edit about section preview
- Manage featured projects (select which to show)
- Manage featured blog posts
- Edit testimonials/quotes (if add later)
- Manage social media links

**Implementation:**
- New table: `SiteSettings` untuk store homepage content
- Admin page: `/admin/site-settings`
- JSON field untuk store structured content

**Estimated effort:** 4-5 hours

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

PortfolioProject ❌ NO CRUD YET
├── id, title, slug, description
├── image, technologies, liveUrl, githubUrl
├── featured, createdAt, updatedAt, authorId
└── Relations: Author (User)

Talk ❌ NO CRUD YET
├── id, title, description, date, location
├── audience, slidesUrl, featured
├── createdAt, updatedAt, authorId
└── Relations: Author (User)

Contact ⚠️ READ-ONLY (no UI)
├── id, name, email, subject, message
├── status (new/read/resolved), priority
├── createdAt, updatedAt, userId
└── Relations: User
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
npx prisma db seed

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
- `prisma/seed.ts` - Database seeding script
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
- `app/admin/(dashboard)/blog/*` - Blog management
- `app/admin/(dashboard)/settings/page.tsx` - Settings & password change
- `app/api/admin/*` - Admin API routes

### Frontend Pages
- `app/page.tsx` - Homepage
- `app/blog/page.tsx` - Blog listing
- `app/blog/[slug]/page.tsx` - Individual blog post
- `app/contact/page.tsx` - Contact form
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
6. **Contact form** - Messages go to Web3Forms, not saved in database

### Minor Issues
- [ ] "Load More" button on blog page is not functional
- [ ] Newsletter signup form is placeholder (no backend)
- [ ] Category filter badges on blog page not functional
- [ ] Missing admin pages: Portfolio, Talks, Contacts management

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

### Phase 1 (This Month) - Core CRUD
1. **Portfolio Management** - Most important for showcase
2. **Talks Management** - Complete the admin panel
3. **Contact Messages View** - Don't lose inquiries!

### Phase 2 (Next Month) - Content Quality
4. **Rich Text Editor** - Better blog writing experience
5. **Image Upload** - Professional content
6. **Categories/Tags UI** - Better organization

### Phase 3 (Future) - Engagement
7. **Comments System** - User interaction
8. **Search Functionality** - Content discovery
9. **Social Sharing** - Wider reach
10. **Analytics Dashboard** - Track performance

### Phase 4 (Polish) - Professional Touch
11. **SEO Optimization** - Better ranking
12. **Performance Tuning** - Faster load times
13. **Mobile Optimization** - Better UX
14. **Dark Mode** - Modern feature

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

*Last updated: November 8, 2025*
*For questions or updates, refer to this document before starting new development.*
