# Strapi CMS Deployment Guide for cPanel

This guide covers deploying the Strapi CMS admin panel to manage your NOVA International School website content.

## What is the CMS?

The CMS (Content Management System) is a Strapi application that allows you to:
- Manage news articles and blog posts
- Update events calendar
- Manage staff profiles
- Upload and organize media files
- Control website content without coding

## Prerequisites

- cPanel hosting with Node.js support (Node 20.x or higher)
- PostgreSQL database (separate from main app database)
- Subdomain for CMS (e.g., `cms.novainternationalschool.et`)

## Part 1: Database Setup

### Step 1: Create CMS Database

1. In cPanel, go to **PostgreSQL Databases**
2. Create database: `cpanelusername_strapi`
3. Create user: `cpanelusername_strapiuser`
4. Set a strong password
5. Add user to database with ALL PRIVILEGES

**Note**: This should be a SEPARATE database from your main application.

## Part 2: Generate Security Keys

Before deployment, you need to generate secure keys. Run these commands locally:

```bash
# Generate random keys (run each command separately)
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Save these keys - you'll need them for the `.env` file.

## Part 3: Deploy CMS Files

### Step 1: Create Subdomain

1. In cPanel, go to **Subdomains**
2. Create: `cms.novainternationalschool.et`
3. Document root: `/home/yourusername/cms`

### Step 2: Upload CMS Files

Upload these files/folders from your local `cms` folder to `/home/yourusername/cms`:

**Required files:**
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `server.js` (if exists)

**Required folders:**
- `config/` (entire folder)
- `src/` (entire folder)
- `database/` (entire folder)
- `public/` (entire folder)

**Using File Manager:**
1. Compress the `cms` folder locally to `cms.zip`
2. Upload `cms.zip` to `/home/yourusername/`
3. Extract it
4. Rename extracted folder to `cms` if needed

**Using FTP:**
1. Connect to your server
2. Navigate to `/home/yourusername/cms`
3. Upload all files and folders

### Step 3: Create .env File

In `/home/yourusername/cms`, create `.env`:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Database (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cpanelusername_strapi
DATABASE_USERNAME=cpanelusername_strapiuser
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false

# Security Keys (use the keys you generated earlier)
APP_KEYS=key1,key2
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key

# Admin URL (optional - for security)
# ADMIN_PATH=/admin

# Public URL
URL=https://cms.novainternationalschool.et
```

**Important**: Replace all placeholder values with your actual credentials and generated keys.

## Part 4: Install Dependencies and Build

### Using SSH or cPanel Terminal:

```bash
cd cms
npm install
NODE_ENV=production npm run build
```

This will:
1. Install all dependencies
2. Build the Strapi admin panel
3. Prepare for production

## Part 5: Setup Node.js Application

1. In cPanel, go to **Setup Node.js App**
2. Click **Create Application**
3. Configure:
   - **Node.js version**: 20.x or higher
   - **Application mode**: Production
   - **Application root**: `cms`
   - **Application URL**: `cms.novainternationalschool.et`
   - **Application startup file**: `server.js` (or leave default)
   - **Environment variables**: Add from your `.env` file
4. Click **Create**

### Step 6: Start the Application

1. Click **Start App**
2. Note the assigned port (should be 1337 or as configured)

## Part 6: Configure Reverse Proxy

Create `.htaccess` in `/home/yourusername/cms`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://localhost:1337/$1 [P,L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

## Part 7: First Time Setup

### Step 1: Access Admin Panel

Visit: `https://cms.novainternationalschool.et/admin`

### Step 2: Create Admin Account

On first visit, you'll be prompted to create an admin account:
- **First name**: Your name
- **Last name**: Your last name
- **Email**: admin@novainternationalschool.et
- **Password**: Strong password (save it securely!)

### Step 3: Configure Content Types

Create content types for your website:

1. **News/Blog Posts**
   - Title (Text)
   - Content (Rich Text)
   - Featured Image (Media)
   - Published Date (Date)
   - Author (Text)
   - Category (Enumeration: News, Events, Announcements)

2. **Events**
   - Title (Text)
   - Description (Rich Text)
   - Event Date (DateTime)
   - Location (Text)
   - Image (Media)

3. **Staff Members**
   - Name (Text)
   - Position (Text)
   - Bio (Rich Text)
   - Photo (Media)
   - Email (Email)

4. **Gallery**
   - Title (Text)
   - Description (Text)
   - Images (Media - Multiple)
   - Category (Text)

## Part 8: Connect CMS to Frontend

### Step 1: Enable API Access

1. In Strapi admin, go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Public**
3. Enable permissions for your content types (find, findOne)
4. Save

### Step 2: Generate API Token

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name: "Frontend Access"
4. Token type: Read-only
5. Save and copy the token

### Step 3: Update Frontend to Use CMS

In your main project, create a CMS service file:

```typescript
// src/lib/cms.ts
const CMS_URL = 'https://cms.novainternationalschool.et/api';
const CMS_TOKEN = 'your-api-token';

export async function fetchNews() {
  const res = await fetch(`${CMS_URL}/news?populate=*`, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  });
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${CMS_URL}/events?populate=*`, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  });
  return res.json();
}
```

## Part 9: File Upload Configuration

### Step 1: Create Upload Directory

```bash
mkdir -p ~/cms/public/uploads
chmod 755 ~/cms/public/uploads
```

### Step 2: Configure Upload Provider (Optional)

For better performance, consider using Cloudinary or AWS S3 for media storage.

## Security Best Practices

### 1. Change Admin Path

In `.env`, add:
```env
ADMIN_PATH=/secret-admin-path
```

Then access admin at: `https://cms.novainternationalschool.et/secret-admin-path`

### 2. Enable Rate Limiting

In `config/middlewares.ts`, configure rate limiting for API endpoints.

### 3. Regular Backups

Backup your CMS database regularly:
```bash
pg_dump -U cpanelusername_strapiuser cpanelusername_strapi > strapi_backup.sql
```

### 4. Update Regularly

Keep Strapi updated:
```bash
npm run upgrade
```

## Troubleshooting

### CMS Won't Start

**Check logs:**
```bash
cd cms
npm run start
```

**Common issues:**
- Missing environment variables
- Database connection failed
- Port already in use
- Node.js version too old

### Database Connection Error

- Verify PostgreSQL credentials in `.env`
- Check database exists and user has permissions
- Test connection: `psql -U username -d database -h localhost`

### Admin Panel Not Loading

- Check if Node.js app is running in cPanel
- Verify `.htaccess` reverse proxy configuration
- Check browser console for errors
- Clear browser cache

### File Upload Failing

- Check upload directory exists and has write permissions
- Verify file size limits in Strapi config
- Check server disk space

### API Not Accessible from Frontend

- Verify API tokens are correct
- Check CORS settings in `config/middlewares.ts`
- Ensure content type permissions are enabled for Public role

## Maintenance

### Daily Tasks
- Monitor error logs
- Check disk space for uploads

### Weekly Tasks
- Review and moderate user-submitted content
- Check for Strapi updates

### Monthly Tasks
- Database backup
- Review and update API tokens
- Security audit

## CMS Access Information

**Admin Panel**: `https://cms.novainternationalschool.et/admin`
**API Base URL**: `https://cms.novainternationalschool.et/api`
**Documentation**: `https://docs.strapi.io`

## Support Resources

- Strapi Documentation: https://docs.strapi.io
- Strapi Community: https://forum.strapi.io
- GitHub Issues: https://github.com/strapi/strapi/issues

---

**Estimated Deployment Time**: 2-3 hours

**Note**: The CMS is optional. Your website works without it, but the CMS makes content management much easier for non-technical staff.
