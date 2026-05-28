# Email Setup Guide

The contact form now sends emails directly to `info@novainternationalschool.et` when someone submits the form.

## Configuration

Add these variables to your `backend/.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Option 1: Using Gmail

1. Use a Gmail account (can be a dedicated one like `noreply@novainternationalschool.et`)
2. Enable 2-Factor Authentication on the Gmail account
3. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
4. Use this app password as `SMTP_PASS`

## Option 2: Using cPanel Email

If your hosting provides email, use these settings:

```env
SMTP_HOST=mail.novainternationalschool.et
SMTP_PORT=587
SMTP_USER=noreply@novainternationalschool.et
SMTP_PASS=your-email-password
```

Check your cPanel email settings for the exact SMTP host.

## Option 3: Using SendGrid (Recommended for Production)

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Create an API key
3. Use these settings:

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## Testing

After configuration, restart your backend:

```bash
cd backend
npm start
```

Submit a test contact form and check if the email arrives at `info@novainternationalschool.et`.

## Troubleshooting

- **Gmail blocking**: Make sure 2FA is enabled and you're using an App Password
- **Port blocked**: Try port 465 with `secure: true` in the transporter config
- **Emails going to spam**: Add SPF and DKIM records to your domain
- **Check logs**: The backend will log email errors to the console
