# 🔐 Environment Variables Setup Guide

## Current .env Configuration

Your `.env` file is already configured with your Supabase credentials:

```env
# Django Settings
SECRET_KEY=Qdj4qoV8B3lx2LEzA5Ataod_ZnBtPH0Mf7VdHiuIKeS5rLgLEyOufeLuXaJPZalG7vw
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Supabase Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=postgres
DB_USER=postgres.vukalhzgtpadtnkddnff
DB_PASSWORD=Niljalpj@123
DB_HOST=aws-1-ap-northeast-1.pooler.supabase.com
DB_PORT=5432

# JWT Settings
JWT_SECRET_KEY=M0UEe6wsIDHp2AHzxd3qKfM8qgKEROFgQDoqJLhoN1bJha18aw0ZmVrUN_hbsQtp5QY
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440

# GitHub OAuth (Optional - configure when needed)
GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## ✅ What's Configured

### Database Connection
- **Engine:** PostgreSQL (Supabase)
- **Host:** aws-1-ap-northeast-1.pooler.supabase.com
- **Database:** postgres
- **User:** postgres.vukalhzgtpadtnkddnff
- **Password:** Niljalpj@123
- **Port:** 5432
- **SSL:** Required (automatically configured)

### Security
- **Secret Key:** Unique Django secret key
- **Debug Mode:** Enabled (for development)
- **Allowed Hosts:** localhost, 127.0.0.1

### JWT Authentication
- **Access Token Lifetime:** 60 minutes
- **Refresh Token Lifetime:** 1440 minutes (24 hours)

### CORS
- **Allowed Origins:** Frontend URLs (localhost:3000)

## 🔒 Security Notes

### For Production:
1. **Change DEBUG to False:**
   ```env
   DEBUG=False
   ```

2. **Update ALLOWED_HOSTS:**
   ```env
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   ```

3. **Generate New SECRET_KEY:**
   ```python
   from django.core.management.utils import get_random_secret_key
   print(get_random_secret_key())
   ```

4. **Update CORS_ALLOWED_ORIGINS:**
   ```env
   CORS_ALLOWED_ORIGINS=https://yourdomain.com
   ```

5. **Use Environment Variables in Production:**
   - Don't commit `.env` to git
   - Use platform-specific env vars (Heroku, Vercel, etc.)

## 🔧 How to Update

If you need to change any settings:

1. Open `Backend_VSOC-aaditya/backend/.env`
2. Update the values
3. Restart the Django server:
   ```bash
   # Stop the current server (Ctrl+C)
   python manage.py runserver
   ```

## 📋 Checklist

- ✅ .env file created
- ✅ Supabase credentials configured
- ✅ Database connection working
- ✅ JWT settings configured
- ✅ CORS settings configured
- ✅ Frontend URL configured

## 🎯 Verification

To verify your configuration is working:

```bash
cd Backend_VSOC-aaditya/backend
python manage.py check
```

Should output: "System check identified no issues"

## 🚀 Ready to Go!

Your environment is fully configured and connected to Supabase!
