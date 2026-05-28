# NOVA International School - Deployment Guide

Welcome! This guide will help you deploy the complete NOVA International School website to cPanel.

## 📚 Documentation Overview

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **PRE_DEPLOYMENT_CHECKLIST.md** | Final checks before deployment | START HERE - Before uploading anything |
| **CPANEL_DEPLOYMENT.md** | Main website + Backend API deployment | Primary deployment guide |
| **CMS_DEPLOYMENT.md** | Strapi CMS deployment | Optional - For content management |
| **DEPLOYMENT_CHECKLIST.md** | Quick deployment checklist | During deployment to track progress |
| **ARCHITECTURE.md** | System architecture overview | Understanding the system |
| **backend/EMAIL_SETUP.md** | Email configuration options | Setting up contact form emails |

## 🚀 Quick Start (3 Steps)

### Step 1: Pre-Deployment (30 minutes)
1. Open `PRE_DEPLOYMENT_CHECKLIST.md`
2. Complete all checkboxes
3. Build production files: `npm run build`

### Step 2: Main Deployment (1-2 hours)
1. Open `CPANEL_DEPLOYMENT.md`
2. Follow step-by-step instructions
3. Use `DEPLOYMENT_CHECKLIST.md` to track progress

### Step 3: CMS Deployment (1-2 hours) - Optional
1. Open `CMS_DEPLOYMENT.md`
2. Follow step-by-step instructions
3. Configure content types

## 📦 What You're Deploying

```
NOVA International School Website
├── Frontend (React)          → novainternationalschool.et
├── Backend API (Node.js)     → api.novainternationalschool.et
└── CMS (Strapi) [Optional]   → cms.novainternationalschool.et
```

## ⚡ Deployment Order

**Must Deploy:**
1. ✅ Frontend (React website)
2. ✅ Backend API (Forms, emails, database)

**Optional but Recommended:**
3. 🎨 CMS (Content management)

## 🛠️ What You Need

### From cPanel:
- [ ] cPanel login credentials
- [ ] PostgreSQL database access
- [ ] Node.js support (v20+)
- [ ] File Manager or FTP access
- [ ] SSL certificate (Let's Encrypt)

### From Your Computer:
- [ ] This project folder
- [ ] Node.js installed
- [ ] Terminal/Command Prompt
- [ ] FTP client (optional)

## 📋 Deployment Checklist Summary

### Before Deployment:
- [ ] Complete `PRE_DEPLOYMENT_CHECKLIST.md`
- [ ] Build frontend: `npm run build`
- [ ] Prepare `.env` files
- [ ] Generate security keys (for CMS)

### During Deployment:
- [ ] Upload frontend to `public_html`
- [ ] Create databases
- [ ] Upload backend files
- [ ] Configure Node.js apps
- [ ] Setup email

### After Deployment:
- [ ] Test all pages
- [ ] Test contact form
- [ ] Test registration form
- [ ] Verify emails sending
- [ ] Check mobile responsive

## 🆘 Troubleshooting

### Common Issues:

**Frontend shows blank page:**
- Check `.htaccess` file exists
- Verify all files uploaded from `dist` folder
- Check browser console for errors

**API not responding:**
- Verify Node.js app is running in cPanel
- Check `.env` file has correct values
- Test API health endpoint

**Database connection failed:**
- Verify database credentials in `.env`
- Check database user has permissions
- Confirm database exists

**Emails not sending:**
- Check SMTP credentials in `.env`
- Verify email account exists
- See `backend/EMAIL_SETUP.md`

**CMS won't start:**
- Check Node.js version (needs 20+)
- Verify all security keys in `.env`
- Check database connection

## 📞 Support Resources

### Documentation:
- React: https://react.dev
- TanStack Router: https://tanstack.com/router
- Strapi: https://docs.strapi.io
- Node.js: https://nodejs.org/docs

### Hosting:
- Contact your cPanel hosting provider
- Check cPanel documentation
- Use cPanel support ticket system

## 🔒 Security Reminders

- [ ] Use strong passwords for databases
- [ ] Keep `.env` files secure (never commit to git)
- [ ] Enable HTTPS/SSL
- [ ] Regular backups
- [ ] Update dependencies regularly

## 📊 Deployment Timeline

| Task | Time Estimate |
|------|---------------|
| Pre-deployment checks | 30 minutes |
| Frontend deployment | 30 minutes |
| Database setup | 15 minutes |
| Backend deployment | 45 minutes |
| Email configuration | 15 minutes |
| Testing | 30 minutes |
| **Total (without CMS)** | **2-3 hours** |
| CMS deployment (optional) | 1-2 hours |
| **Grand Total** | **3-5 hours** |

## ✨ After Successful Deployment

Your website will be live at:
- **Main Site**: https://novainternationalschool.et
- **API**: https://api.novainternationalschool.et
- **CMS Admin**: https://cms.novainternationalschool.et/admin

### Next Steps:
1. Share website with stakeholders
2. Setup Google Analytics (optional)
3. Submit to search engines
4. Setup monitoring/uptime alerts
5. Create content in CMS
6. Train staff on CMS usage

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Website loads on all devices
- ✅ All pages accessible
- ✅ Contact form sends emails
- ✅ Registration form accepts applications
- ✅ Files upload successfully
- ✅ HTTPS working
- ✅ No console errors

## 📝 Notes

- Keep local project as backup
- Document any custom changes
- Save all passwords securely
- Schedule regular backups
- Plan for updates and maintenance

---

## 🚀 Ready to Deploy?

1. **Start Here**: Open `PRE_DEPLOYMENT_CHECKLIST.md`
2. **Then**: Follow `CPANEL_DEPLOYMENT.md`
3. **Optional**: Follow `CMS_DEPLOYMENT.md`

**Good luck! You've got this! 💪**

---

*Last Updated: 2026*
*NOVA International School - Excellence. Character. Global Vision.*
