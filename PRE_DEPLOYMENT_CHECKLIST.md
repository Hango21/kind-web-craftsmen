# Pre-Deployment Final Checklist

Complete these steps BEFORE uploading to cPanel to ensure smooth deployment.

## ✅ Local Testing Complete

- [ ] Website runs locally without errors (`npm run dev`)
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Registration form works with file uploads
- [ ] Backend API runs (`cd backend && npm start`)
- [ ] Database schema tested (`backend/schema.sql`)
- [ ] No console errors in browser
- [ ] Mobile responsive design verified

## ✅ Environment Configuration

- [ ] Create production `.env` for frontend:
  ```env
  VITE_API_URL=https://api.novainternationalschool.et
  ```

- [ ] Prepare backend `.env` (don't commit to git):
  ```env
  DB_USER=cpanelusername_novauser
  DB_PASSWORD=your_db_password
  DB_HOST=localhost
  DB_NAME=cpanelusername_nova
  DB_PORT=5432
  PORT=5000
  SMTP_HOST=mail.novainternationalschool.et
  SMTP_PORT=587
  SMTP_USER=noreply@novainternationalschool.et
  SMTP_PASS=your_email_password
  ```

- [ ] Prepare CMS `.env` (if deploying CMS):
  ```env
  HOST=0.0.0.0
  PORT=1337
  DATABASE_CLIENT=postgres
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_NAME=cpanelusername_strapi
  DATABASE_USERNAME=cpanelusername_strapiuser
  DATABASE_PASSWORD=your_db_password
  APP_KEYS=generated_key1,generated_key2
  API_TOKEN_SALT=generated_salt
  ADMIN_JWT_SECRET=generated_secret
  TRANSFER_TOKEN_SALT=generated_salt
  JWT_SECRET=generated_secret
  ENCRYPTION_KEY=generated_key
  URL=https://cms.novainternationalschool.et
  ```

## ✅ Build Production Files

- [ ] Build frontend:
  ```bash
  npm run build
  ```
- [ ] Verify `dist` folder created
- [ ] Check `dist` folder size (should be reasonable, < 50MB)

## ✅ Files to Upload

### Frontend (to `public_html`):
- [ ] All contents of `dist/` folder
- [ ] `.htaccess` file for React Router

### Backend (to `/home/username/api/`):
- [ ] `index.js`
- [ ] `db.js`
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `.env` (create on server)
- [ ] `schema.sql` (for reference)

### CMS (to `/home/username/cms/`):
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `tsconfig.json`
- [ ] `server.js`
- [ ] `config/` folder
- [ ] `src/` folder
- [ ] `database/` folder
- [ ] `public/` folder
- [ ] `.env` (create on server)

## ✅ cPanel Preparation

- [ ] cPanel login credentials ready
- [ ] Domain pointed to hosting (DNS configured)
- [ ] SSL certificate ready (or will use Let's Encrypt)
- [ ] FTP/File Manager access confirmed
- [ ] SSH access confirmed (if available)

## ✅ Database Preparation

- [ ] PostgreSQL available in cPanel
- [ ] Database names decided:
  - Main: `cpanelusername_nova`
  - CMS: `cpanelusername_strapi`
- [ ] Strong passwords generated for database users
- [ ] `schema.sql` file ready to run

## ✅ Email Setup

- [ ] Email account created: `info@novainternationalschool.et`
- [ ] Email account created: `noreply@novainternationalschool.et`
- [ ] SMTP credentials documented
- [ ] Test email sent from email account

## ✅ Security Keys Generated

For CMS, generate 5 random keys:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
- [ ] Keys generated and saved securely

## ✅ Documentation Ready

- [ ] `CPANEL_DEPLOYMENT.md` reviewed
- [ ] `CMS_DEPLOYMENT.md` reviewed (if deploying CMS)
- [ ] `DEPLOYMENT_CHECKLIST.md` printed or open
- [ ] `EMAIL_SETUP.md` reviewed

## ✅ Backup Plan

- [ ] Local project backed up
- [ ] Git repository up to date
- [ ] `.env` files backed up securely (NOT in git)
- [ ] Database schema saved

## ✅ Post-Deployment Testing Plan

Prepare to test these after deployment:
- [ ] Homepage loads
- [ ] All navigation works
- [ ] Contact form submits
- [ ] Email received at info@novainternationalschool.et
- [ ] Registration form submits
- [ ] Files upload successfully
- [ ] Database records created
- [ ] CMS admin panel accessible (if deployed)
- [ ] Mobile responsive
- [ ] HTTPS working

## ✅ Support Contacts

- [ ] Hosting provider support contact saved
- [ ] Domain registrar contact saved
- [ ] Email provider contact saved (if different)

## 🚀 Ready to Deploy?

If all boxes are checked, you're ready to start deployment!

**Estimated Time**: 2-4 hours for complete deployment

**Start with**: `CPANEL_DEPLOYMENT.md` → Follow step by step

**Need help?**: Refer to troubleshooting sections in deployment guides

---

## Quick Command Reference

### Build Frontend:
```bash
npm run build
```

### Test Backend Locally:
```bash
cd backend
npm start
```

### Test CMS Locally:
```bash
cd cms
npm run develop
```

### Generate Security Keys:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

### Compress for Upload:
```bash
# Windows
Compress-Archive -Path dist\* -DestinationPath dist.zip

# Linux/Mac
zip -r dist.zip dist/
```

---

**Good luck with your deployment! 🎉**
