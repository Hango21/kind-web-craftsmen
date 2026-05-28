# NOVA International School - System Architecture

## Overview

The NOVA International School website consists of three main components:

```
┌─────────────────────────────────────────────────────────────┐
│                    NOVA School Website                       │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
         ┌──────▼──────┐ ┌───▼────┐ ┌─────▼─────┐
         │  Frontend   │ │  API   │ │    CMS    │
         │   (React)   │ │(Node.js)│ │ (Strapi)  │
         └──────┬──────┘ └───┬────┘ └─────┬─────┘
                │            │             │
                │      ┌─────▼─────────────▼─────┐
                │      │   PostgreSQL Database   │
                │      │  ┌──────────┬──────────┐│
                │      │  │Main DB   │Strapi DB││
                │      │  └──────────┴──────────┘│
                │      └─────────────────────────┘
                │
         ┌──────▼──────┐
         │   Visitors  │
         └─────────────┘
```

## 1. Frontend (React + TanStack Router)

**URL**: `https://novainternationalschool.et`
**Technology**: React 19, TanStack Router, Tailwind CSS v4
**Deployment**: Static files in cPanel `public_html`

### Features:
- Public-facing website
- School information pages
- Contact form
- Student registration form
- News and events display
- Gallery
- Responsive design

### Key Files:
- `src/routes/` - All page routes
- `src/components/` - Reusable components
- `src/lib/` - Utility functions and API clients
- `dist/` - Production build output

## 2. Backend API (Node.js + Express)

**URL**: `https://api.novainternationalschool.et`
**Technology**: Node.js, Express, PostgreSQL, Nodemailer
**Deployment**: Node.js app on cPanel subdomain

### Features:
- Contact form submission with email notifications
- Student application processing with file uploads
- Newsletter subscription management
- Database operations

### Endpoints:
- `POST /api/contact` - Contact form submission
- `POST /api/applications` - Student registration with file uploads
- `POST /api/newsletter` - Newsletter subscription
- `GET /api/health` - Health check

### Key Files:
- `backend/index.js` - Main server file
- `backend/db.js` - Database connection
- `backend/schema.sql` - Database schema
- `backend/.env` - Environment configuration

### Database Tables:
- `contacts` - Contact form submissions
- `applications` - Student applications
- `newsletters` - Email subscriptions

## 3. CMS (Strapi)

**URL**: `https://cms.novainternationalschool.et`
**Admin Panel**: `https://cms.novainternationalschool.et/admin`
**Technology**: Strapi 5, PostgreSQL
**Deployment**: Node.js app on cPanel subdomain

### Features:
- Content management for news, events, staff
- Media library for images and documents
- User management
- API for frontend content delivery
- Role-based access control

### Content Types:
- News/Blog Posts
- Events Calendar
- Staff Profiles
- Gallery Images
- Documents Repository

### Key Files:
- `cms/config/` - Configuration files
- `cms/src/api/` - Custom API endpoints
- `cms/public/uploads/` - Uploaded media files

## Data Flow

### Contact Form Submission:
```
User fills form → Frontend validates → POST to API → 
API saves to DB → API sends email → Response to user
```

### Student Registration:
```
User fills form → Uploads documents → POST to API with files →
API saves to DB → Files stored in ~/uploads → Response to user
```

### Content Display (with CMS):
```
Admin creates content in CMS → Content saved to Strapi DB →
Frontend fetches via CMS API → Content displayed to visitors
```

## Deployment Structure

```
/home/yourusername/
├── public_html/              # Frontend (React build)
│   ├── index.html
│   ├── assets/
│   └── .htaccess
│
├── api/                      # Backend API
│   ├── index.js
│   ├── db.js
│   ├── package.json
│   ├── .env
│   └── node_modules/
│
├── cms/                      # Strapi CMS
│   ├── config/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env
│   └── node_modules/
│
└── uploads/                  # File uploads
    └── applications/         # Student application documents
```

## Domains & Subdomains

| Domain/Subdomain | Purpose | Technology |
|------------------|---------|------------|
| `novainternationalschool.et` | Main website | React (Static) |
| `api.novainternationalschool.et` | Backend API | Node.js/Express |
| `cms.novainternationalschool.et` | Content Management | Strapi |

## Database Structure

### Main Database (`cpanelusername_nova`)
- Used by Backend API
- Tables: contacts, applications, newsletters

### CMS Database (`cpanelusername_strapi`)
- Used by Strapi CMS
- Tables: Auto-generated by Strapi for content types

## Security Considerations

1. **HTTPS**: All domains use SSL certificates
2. **Environment Variables**: Sensitive data in `.env` files
3. **Database**: Separate users with limited permissions
4. **File Uploads**: Validated file types and size limits
5. **CORS**: Configured to allow only trusted origins
6. **Rate Limiting**: Prevents API abuse
7. **Input Validation**: All user inputs validated

## Scalability

### Current Setup (Shared Hosting):
- Suitable for: 1,000-10,000 visitors/month
- Database: PostgreSQL on same server
- File Storage: Local filesystem

### Future Scaling Options:
1. **CDN**: CloudFlare for static assets
2. **Cloud Storage**: AWS S3 or Cloudinary for uploads
3. **Database**: Separate database server
4. **Caching**: Redis for API responses
5. **Load Balancing**: Multiple API instances

## Monitoring & Maintenance

### What to Monitor:
- Server uptime
- API response times
- Database size
- Disk space (uploads folder)
- Error logs
- Email delivery

### Regular Tasks:
- **Daily**: Check error logs
- **Weekly**: Database backup
- **Monthly**: Security updates, dependency updates
- **Quarterly**: Performance audit

## Backup Strategy

### What to Backup:
1. **Database**: Both main and CMS databases
2. **Uploads**: Student application files
3. **CMS Media**: Uploaded images and documents
4. **Configuration**: `.env` files (store securely)

### Backup Schedule:
- **Daily**: Automated database backups
- **Weekly**: Full system backup
- **Before Updates**: Manual backup

## Development Workflow

```
Local Development → Git Commit → Build Production → 
Upload to cPanel → Test → Deploy
```

### Local Development:
```bash
# Frontend
npm run dev

# Backend
cd backend && npm start

# CMS
cd cms && npm run develop
```

### Production Build:
```bash
# Frontend
npm run build

# Backend
# No build needed - runs directly

# CMS
cd cms && NODE_ENV=production npm run build
```

## Support & Documentation

- **Frontend**: React, TanStack Router docs
- **Backend**: Node.js, Express docs
- **CMS**: Strapi documentation
- **Deployment**: cPanel documentation

## Version Information

- **Node.js**: 20.x or higher
- **React**: 19.2.0
- **Strapi**: 5.46.1
- **PostgreSQL**: 12.x or higher

---

**Last Updated**: 2026
**Maintained By**: NOVA International School IT Team
