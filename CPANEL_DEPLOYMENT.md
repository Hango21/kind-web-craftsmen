# cPanel Manual Deployment Guide

This guide walks you through deploying your NOVA International School website to cPanel hosting.

## Prerequisites

- cPanel hosting account with:
  - Node.js support
  - PostgreSQL database
  - File Manager or FTP access
  - SSH access (optional but recommended)

## Part 1: Build the Frontend

### Step 1: Build the React App Locally

```bash
npm run build
```

This creates a `dist` folder with your production-ready website.

### Step 2: Upload Frontend Files

**Option A: Using cPanel File Manager**
1. Log into cPanel
2. Open **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. Delete any existing files (backup first!)
5. Click **Upload** and upload all files from the `dist` folder
6. Alternatively, compress `dist` folder to `dist.zip`, upload it, then extract

**Option B: Using FTP**
1. Connect via FTP (FileZilla, WinSCP, etc.)
2. Navigate to `public_html`
3. Upload all contents of the `dist` folder

### Step 3: Configure .htaccess for React Router

Create/edit `.htaccess` in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## Part 2: Setup PostgreSQL Database

### Step 1: Create Database

1. In cPanel, go to **PostgreSQL Databases**
2. Create a new database: `cpanelusername_nova`
3. Create a database user: `cpanelusername_novauser`
4. Set a strong password
5. Add user to database with ALL PRIVILEGES

### Step 2: Run Database Schema

1. In cPanel, go to **phpPgAdmin** (or PostgreSQL manager)
2. Select your database
3. Go to **SQL** tab
4. Copy and paste the contents of `backend/schema.sql`
5. Click **Execute**

## Part 3: Deploy Backend API

### Step 1: Create Subdomain for API

1. In cPanel, go to **Subdomains**
2. Create subdomain: `api.novainternationalschool.et`
3. Set document root to: `/home/yourusername/api`

### Step 2: Upload Backend Files

**Using File Manager:**
1. Navigate to `/home/yourusername/api`
2. Upload these files from your `backend` folder:
   - `index.js`
   - `db.js`
   - `package.json`
   - `package-lock.json`

### Step 3: Create .env File

In `/home/yourusername/api`, create `.env`:

```env
DB_USER=cpanelusername_novauser
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_NAME=cpanelusername_nova
DB_PORT=5432
PORT=5000

# SMTP Email Configuration
SMTP_HOST=mail.novainternationalschool.et
SMTP_PORT=587
SMTP_USER=noreply@novainternationalschool.et
SMTP_PASS=your_email_password
```

### Step 4: Install Node.js Dependencies

**Option A: Using SSH (Recommended)**
```bash
ssh yourusername@novainternationalschool.et
cd api
npm install
```

**Option B: Using cPanel Terminal**
1. Open **Terminal** in cPanel
2. Run:
```bash
cd api
npm install
```

### Step 5: Setup Node.js Application

1. In cPanel, go to **Setup Node.js App**
2. Click **Create Application**
3. Configure:
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: `api`
   - **Application URL**: `api.novainternationalschool.et`
   - **Application startup file**: `index.js`
4. Click **Create**

### Step 6: Start the Application

1. In the Node.js App interface, click **Start App**
2. Note the port number assigned (e.g., 5000)
3. Update your `.env` PORT if needed

### Step 7: Configure Reverse Proxy

Create `.htaccess` in `/home/yourusername/api`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]
```

## Part 4: Create Upload Directory

```bash
mkdir -p ~/uploads/applications
chmod 755 ~/uploads/applications
```

## Part 5: Setup Email

### Option 1: Using cPanel Email

1. In cPanel, go to **Email Accounts**
2. Create: `noreply@novainternationalschool.et`
3. Use these credentials in your `.env` file

### Option 2: Using Gmail

See `backend/EMAIL_SETUP.md` for Gmail configuration.

## Part 6: Update Frontend API URL

Before building, ensure your frontend points to the correct API:

In your local project, create `.env`:

```env
VITE_API_URL=https://api.novainternationalschool.et
```

Then rebuild:
```bash
npm run build
```

And re-upload the `dist` folder.

## Part 7: Testing

### Test Frontend
Visit: `https://novainternationalschool.et`

### Test Backend API
Visit: `https://api.novainternationalschool.et/api/health`

Should return: `{"status":"Backend is running!"}`

### Test Contact Form
1. Go to the contact page
2. Fill out and submit the form
3. Check if email arrives at `info@novainternationalschool.et`
4. Check database to confirm data was saved

### Test Registration Form
1. Go to the registration page
2. Fill out the form and upload documents
3. Check if files are saved in `~/uploads/applications`
4. Check database for the application record

## Troubleshooting

### Frontend Issues

**Problem**: Blank page or 404 errors
- **Solution**: Check `.htaccess` is configured correctly
- Verify all files uploaded from `dist` folder

**Problem**: API calls failing
- **Solution**: Check CORS settings in backend
- Verify `VITE_API_URL` is correct

### Backend Issues

**Problem**: Node.js app won't start
- **Solution**: Check error logs in cPanel Node.js App interface
- Verify `package.json` and dependencies installed
- Check `.env` file exists and has correct values

**Problem**: Database connection errors
- **Solution**: Verify PostgreSQL credentials in `.env`
- Check database user has proper permissions
- Confirm database exists

**Problem**: File uploads failing
- **Solution**: Check upload directory exists and has correct permissions
- Verify multer configuration in `index.js`

**Problem**: Emails not sending
- **Solution**: Check SMTP credentials in `.env`
- Test email account can send manually
- Check backend logs for email errors

## Maintenance

### Updating the Website

1. Make changes locally
2. Run `npm run build`
3. Upload new `dist` folder contents to `public_html`

### Updating the Backend

1. Upload modified files to `/home/yourusername/api`
2. In cPanel Node.js App, click **Restart**

### Database Backups

1. In cPanel, go to **phpPgAdmin**
2. Select database
3. Click **Export**
4. Download SQL file

### Viewing Logs

- **Backend logs**: Check cPanel Node.js App interface
- **Error logs**: cPanel → Metrics → Errors

## Security Checklist

- [ ] Change default database passwords
- [ ] Use strong SMTP passwords
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set proper file permissions (644 for files, 755 for directories)
- [ ] Keep Node.js and dependencies updated
- [ ] Regularly backup database
- [ ] Monitor error logs

## Support

If you encounter issues:
1. Check cPanel error logs
2. Check Node.js application logs
3. Verify all environment variables are set
4. Contact your hosting provider for server-specific issues
