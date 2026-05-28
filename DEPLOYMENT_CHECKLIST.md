# Quick Deployment Checklist

Use this checklist to ensure you don't miss any steps when deploying to cPanel.

## Pre-Deployment

- [ ] Test website locally (`npm run dev`)
- [ ] Test backend locally (`cd backend && npm start`)
- [ ] All forms working (contact, registration)
- [ ] Database schema ready (`backend/schema.sql`)
- [ ] Environment variables documented

## Frontend Deployment

- [ ] Create `.env` with production API URL
  ```env
  VITE_API_URL=https://api.novainternationalschool.et
  ```
- [ ] Build production bundle: `npm run build`
- [ ] Upload `dist` folder contents to `public_html`
- [ ] Create/update `.htaccess` for React Router
- [ ] Test website loads: `https://novainternationalschool.et`
- [ ] Test all pages and navigation

## Database Setup

- [ ] Create PostgreSQL database in cPanel
- [ ] Create database user with strong password
- [ ] Grant ALL PRIVILEGES to user
- [ ] Run `schema.sql` via phpPgAdmin
- [ ] Verify tables created successfully

## Backend Deployment

- [ ] Create subdomain: `api.novainternationalschool.et`
- [ ] Upload backend files to `/home/username/api/`
  - [ ] `index.js`
  - [ ] `db.js`
  - [ ] `package.json`
  - [ ] `package-lock.json`
- [ ] Create `.env` file with database and SMTP credentials
- [ ] Install dependencies: `npm install`
- [ ] Setup Node.js app in cPanel
- [ ] Start the application
- [ ] Test API health: `https://api.novainternationalschool.et/api/health`

## CMS Deployment (Optional but Recommended)

- [ ] Create separate PostgreSQL database for Strapi
- [ ] Generate security keys (5 random keys)
- [ ] Create subdomain: `cms.novainternationalschool.et`
- [ ] Upload CMS files to `/home/username/cms/`
- [ ] Create `.env` file with database and security keys
- [ ] Install dependencies: `npm install`
- [ ] Build CMS: `NODE_ENV=production npm run build`
- [ ] Setup Node.js app in cPanel (port 1337)
- [ ] Start the application
- [ ] Access admin: `https://cms.novainternationalschool.et/admin`
- [ ] Create admin account
- [ ] Configure content types (News, Events, Staff, Gallery)
- [ ] Enable API permissions for Public role
- [ ] Generate API token for frontend access

See `CMS_DEPLOYMENT.md` for detailed CMS setup instructions.

## File Upload Setup

- [ ] Create upload directory: `mkdir -p ~/uploads/applications`
- [ ] Set permissions: `chmod 755 ~/uploads/applications`
- [ ] Test file upload via registration form

## Email Configuration

- [ ] Create email account: `noreply@novainternationalschool.et`
- [ ] Add SMTP credentials to backend `.env`
- [ ] Test contact form sends email
- [ ] Check email arrives at `info@novainternationalschool.et`

## SSL/HTTPS

- [ ] Install SSL certificate (Let's Encrypt via cPanel)
- [ ] Force HTTPS redirect in `.htaccess`
- [ ] Update API URL to use `https://`

## Final Testing

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact form submits and sends email
- [ ] Registration form submits with file uploads
- [ ] Check database for submitted data
- [ ] Test on mobile devices
- [ ] Test in different browsers

## Post-Deployment

- [ ] Monitor error logs for 24 hours
- [ ] Setup database backup schedule
- [ ] Document admin access credentials
- [ ] Create maintenance plan
- [ ] Setup monitoring/uptime alerts

## Rollback Plan

If something goes wrong:
1. Keep backup of previous `public_html` contents
2. Keep backup of database before running migrations
3. Document Node.js app configuration
4. Have hosting support contact ready

---

**Estimated Time**: 1-2 hours for first deployment

**Need Help?** See `CPANEL_DEPLOYMENT.md` for detailed instructions.
