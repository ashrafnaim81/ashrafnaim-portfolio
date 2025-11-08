# Quick Reference - Portfolio Website

**Domain:** https://ashrafnaim.my
**Server IP:** 47.129.100.227
**Admin:** https://ashrafnaim.my/admin/login

---

## 🔑 Quick Access

### Admin Login
- **URL:** https://ashrafnaim.my/admin/login
- **Email:** admin@ashrafnaim.my
- **Password:** Admin@123 (CHANGE THIS!)

### SSH Access
```bash
ssh -i "/Users/ashrafnaim/Downloads/LightsailDefaultKey-ap-southeast-1.pem" bitnami@47.129.100.227
```

---

## ⚡ Common Commands

### Local Development
```bash
# Start dev server (avoid production DB)
unset DATABASE_URL && npm run dev

# Build for production
unset DATABASE_URL && npm run build

# Database operations
npx prisma studio                    # Open database GUI
npx prisma db push                   # Update database schema
npx prisma db seed                   # Seed blog/portfolio/talks data
npx ts-node prisma/seed-pages.ts     # Seed Home & About pages
npx prisma generate                  # Regenerate Prisma Client
```

### Deploy to Production
```bash
# 1. Build locally
unset DATABASE_URL && npm run build

# 2. Transfer files
scp -i "/Users/ashrafnaim/Downloads/LightsailDefaultKey-ap-southeast-1.pem" -r .next app components bitnami@47.129.100.227:~/ashrafnaim-portfolio/

# 3. Restart server
ssh -i "/Users/ashrafnaim/Downloads/LightsailDefaultKey-ap-southeast-1.pem" bitnami@47.129.100.227 "pm2 restart portfolio"
```

### One-liner Deploy (All in one)
```bash
unset DATABASE_URL && npm run build && scp -i "/Users/ashrafnaim/Downloads/LightsailDefaultKey-ap-southeast-1.pem" -r .next app components bitnami@47.129.100.227:~/ashrafnaim-portfolio/ && ssh -i "/Users/ashrafnaim/Downloads/LightsailDefaultKey-ap-southeast-1.pem" bitnami@47.129.100.227 "pm2 restart portfolio"
```

---

## 🗄️ Database Quick Access

### Production Database (on server)
```bash
# Access PostgreSQL
ssh -i "key.pem" bitnami@47.129.100.227
psql -U ashrafnaim -d ashrafnaim_portfolio

# Common queries
SELECT * FROM "User";
SELECT title, views, published FROM "BlogPost";
SELECT COUNT(*) FROM "Contact";
```

### Backup Database
```bash
# On server
pg_dump -U ashrafnaim ashrafnaim_portfolio > backup_$(date +%Y%m%d).sql

# Restore if needed
psql -U ashrafnaim ashrafnaim_portfolio < backup_20250108.sql
```

---

## 🔧 Server Management

### PM2 Commands (on server)
```bash
pm2 status              # Check app status
pm2 logs portfolio      # View logs
pm2 restart portfolio   # Restart app
pm2 stop portfolio      # Stop app
pm2 start portfolio     # Start app
pm2 monit              # Monitor resources
```

### Nginx Commands (on server)
```bash
sudo nginx -t                    # Test config
sudo systemctl reload nginx      # Reload config
sudo systemctl restart nginx     # Restart nginx
sudo systemctl status nginx      # Check status
```

### SSL Certificate
```bash
# Check expiry
sudo certbot certificates

# Renew manually
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 📊 Admin Panel Quick Guide

### Home Page Management ✨ **NEW!**
1. Go to `/admin/home`
2. **Edit Stats:** Add/Edit/Delete stats with value and label
3. **Edit Achievements:** Add/Edit/Delete achievements with icons
4. **Edit Skills:** Add/Edit/Delete skills with proficiency levels
5. **Edit Hero/CTA:** Update hero section and call-to-action text
6. Click "Simpan Perubahan" to save

### About Page Management ✨ **NEW!**
1. Go to `/admin/about`
2. **Edit Profile:** Update profile information
3. **Edit Qualifications:** Add/Edit/Delete professional qualifications
4. **Edit Expertise:** Add/Edit/Delete expertise areas
5. **Edit Experiences:** Add/Edit/Delete experience timeline
6. **Edit Achievements:** Update achievements & contributions
7. Click "Simpan Perubahan" to save

### Blog Management
1. **Create:** `/admin/blog` → "Create New Post" button
2. **Edit:** Click post title in list
3. **Delete:** Edit page → Delete button
4. **Publish:** Toggle "Published" checkbox

### Change Password
1. Go to `/admin/settings`
2. Fill in current password
3. Enter new password (min 8 chars)
4. Confirm new password
5. Click "Tukar Password"

---

## 🐛 Troubleshooting

### Site not loading?
```bash
# Check if app is running
ssh -i "key.pem" bitnami@47.129.100.227 "pm2 status"

# Check logs for errors
ssh -i "key.pem" bitnami@47.129.100.227 "pm2 logs portfolio --lines 50"

# Restart if needed
ssh -i "key.pem" bitnami@47.129.100.227 "pm2 restart portfolio"
```

### Database connection error?
```bash
# Check PostgreSQL status
ssh -i "key.pem" bitnami@47.129.100.227 "sudo systemctl status postgresql"

# Restart PostgreSQL if needed
ssh -i "key.pem" bitnami@47.129.100.227 "sudo systemctl restart postgresql"
```

### Build fails locally?
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Make sure no DATABASE_URL
unset DATABASE_URL
npm run build
```

### Can't login to admin?
```bash
# Reset admin password via database
ssh -i "key.pem" bitnami@47.129.100.227
psql -U ashrafnaim ashrafnaim_portfolio

# Generate new password hash (use Node.js)
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('NewPassword123', 10));"

# Update in database
UPDATE "User" SET password = 'hash_from_above' WHERE email = 'admin@ashrafnaim.my';
```

---

## 📁 Important File Paths

### On Server
```
~/ashrafnaim-portfolio/          # Project root
~/ashrafnaim-portfolio/.env      # Environment variables
~/ashrafnaim-portfolio/.next/    # Built files
/etc/nginx/sites-available/portfolio  # Nginx config
/etc/letsencrypt/live/ashrafnaim.my/  # SSL certificates
```

### Locally
```
/Users/ashrafnaim/Documents/ashrafnaim-portfolio/
/Users/ashrafnaim/Downloads/LightsailDefaultKey-ap-southeast-1.pem
```

---

## 🔐 Environment Variables

### Production (.env on server)
```env
DATABASE_URL="postgresql://ashrafnaim:portfolio2025secure@localhost:5432/ashrafnaim_portfolio"
NEXTAUTH_URL="https://ashrafnaim.my"
NEXTAUTH_SECRET="Fp/w6uvBDAX45WkcIzbtk8hyBzizr7EE4QiXTMkeDOE="
WEB3FORMS_ACCESS_KEY="your_key_here"
NODE_ENV="production"
```

### Local (.env.local)
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="local-secret-key"
WEB3FORMS_ACCESS_KEY="your_key_here"
```

---

## 📞 Important URLs

### Frontend
- **Website:** https://ashrafnaim.my
- **About:** https://ashrafnaim.my/about
- **Blog:** https://ashrafnaim.my/blog
- **Contact:** https://ashrafnaim.my/contact
- **Portfolio:** https://ashrafnaim.my/portfolio
- **Talks:** https://ashrafnaim.my/talks

### Admin Panel
- **Dashboard:** https://ashrafnaim.my/admin
- **Home Editor:** https://ashrafnaim.my/admin/home ✨ **NEW!**
- **About Editor:** https://ashrafnaim.my/admin/about ✨ **NEW!**
- **Blog Posts:** https://ashrafnaim.my/admin/blog
- **Settings:** https://ashrafnaim.my/admin/settings

---

## ⚠️ Before Making Changes

1. **Test locally first** with `unset DATABASE_URL && npm run dev`
2. **Build to check for errors** with `unset DATABASE_URL && npm run build`
3. **Backup database** if making schema changes
4. **Keep SSH session open** when deploying (in case rollback needed)
5. **Check logs after deploy** with `pm2 logs portfolio`

---

## 🚀 Priority Todo List

### ✅ Recently Completed
- [x] Home page database-driven CMS with admin editor
- [x] About page database-driven CMS with admin editor
- [x] Dynamic forms with Add/Edit/Delete functionality
- [x] Blog view count real-time tracking
- [x] Admin password change feature

### Immediate (This Week)
- [ ] Change admin password from default
- [ ] Test new Home & About page editors
- [ ] Update content via admin panel

### Short Term (This Month)
- [ ] Add Portfolio CRUD in admin panel
- [ ] Add Talks CRUD in admin panel
- [ ] Add Contact messages viewer
- [ ] Implement image upload

### Medium Term (Next Month)
- [ ] Rich text editor for blog
- [ ] Categories & tags management UI
- [ ] Search functionality
- [ ] Dark mode toggle

### Long Term (Future)
- [ ] Comments system
- [ ] Social sharing
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Performance tuning

---

## 💡 Quick Tips

1. **Always `unset DATABASE_URL`** before building locally to use SQLite
2. **PM2 auto-restarts** the app if it crashes
3. **SSL auto-renews** via certbot timer (no manual action needed)
4. **Nginx logs** at `/var/log/nginx/` if need to debug
5. **Use Prisma Studio** for quick database edits (safer than raw SQL)
6. **View counts update** on each blog post visit automatically
7. **Blog listing** now shows real-time view counts (dynamic rendering)
8. **Home & About pages** now editable via admin panel - no code changes needed! ✨
9. **Job title on homepage** has gradient color emphasis for better visibility
10. **Dynamic forms** make it easy to add/edit/delete stats, skills, achievements, etc.

---

## 📱 Quick Contact

If something breaks:
1. Check PM2 logs: `pm2 logs portfolio`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Restart app: `pm2 restart portfolio`
4. Last resort: Restart server via Lightsail console

---

**Reference these files:**
- `PROJECT_REFERENCE.md` - Full documentation & roadmap
- `QUICK_REFERENCE.md` - This file (quick commands)
- `README.md` - Project overview
- `prisma/schema.prisma` - Database structure

---

*Last updated: November 9, 2025*
