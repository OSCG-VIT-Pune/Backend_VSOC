# 🚀 GitHub OAuth - Quick Test Guide

## ⚡ 5-Minute Setup

### Step 1: Create GitHub OAuth App (2 minutes)

1. Go to: https://github.com/settings/developers
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   ```
   Application name: VSoC Platform
   Homepage URL: http://localhost:3000
   Callback URL: http://localhost:3000/auth/github/callback
   ```
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret**
7. Copy the **Client Secret**

### Step 2: Configure Backend (1 minute)

Edit `Backend_VSOC-aaditya/backend/.env`:

```env
GITHUB_CLIENT_ID=paste_your_client_id_here
GITHUB_CLIENT_SECRET=paste_your_client_secret_here
```

### Step 3: Configure Frontend (1 minute)

Create `Backend_VSOC-aaditya/frontend/.env.local`:

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=paste_your_client_id_here
NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback
```

### Step 4: Restart Servers (30 seconds)

Both servers should auto-reload, but if not:

```bash
# Backend (if needed)
cd Backend_VSOC-aaditya/backend
python manage.py runserver

# Frontend (if needed)
cd Backend_VSOC-aaditya/frontend
npm run dev
```

### Step 5: Test! (30 seconds)

1. Go to: http://localhost:3000/login
2. Click **"CONTINUE WITH GITHUB"**
3. Authorize the app on GitHub
4. You'll be redirected back and logged in! 🎉

## ✅ Verify Configuration

Run this command to check if GitHub OAuth is configured:

```bash
cd Backend_VSOC-aaditya/backend
python test_github_config.py
```

You should see:
```
✅ GitHub Client ID: Ov23li...
✅ GitHub Client Secret: ghp_ab...
✅ GitHub OAuth is CONFIGURED!
```

## 🧪 Test the Flow

### Expected Flow:

1. **Login Page** → Click GitHub button
2. **GitHub** → Authorize app
3. **Callback Page** → "AUTHENTICATING..."
4. **Success** → "SUCCESS!"
5. **Dashboard** → You're logged in!

### What Gets Created:

- ✅ User account with your GitHub username
- ✅ Student profile (default values)
- ✅ JWT tokens stored
- ✅ Entry in Supabase users table

## 🔍 Check if It Worked

### In Browser:
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. You should see:
   - `access_token`
   - `refresh_token`
   - `user`

### In Supabase:
1. Go to Supabase Dashboard
2. Table Editor → users
3. You should see your GitHub user

### In Backend Terminal:
You should see:
```
POST /api/auth/github/callback/ 200
```

## ❌ Common Issues

### "Application not found"
- Check Client ID in frontend .env.local

### "Redirect URI mismatch"
- Callback URL must be: `http://localhost:3000/auth/github/callback`
- No trailing slash!

### "Failed to authenticate"
- Check Client ID and Secret in backend .env
- Restart backend server

## 📚 Full Documentation

For detailed setup and troubleshooting, see:
- `GITHUB_OAUTH_SETUP.md` - Complete guide
- `GITHUB_OAUTH_QUICK_TEST.md` - This file

## 🎯 Quick Commands

```bash
# Check backend config
cd Backend_VSOC-aaditya/backend
python test_github_config.py

# Check if servers are running
# Backend should be at: http://127.0.0.1:8000
# Frontend should be at: http://localhost:3000

# Test the endpoint directly (after getting a code from GitHub)
curl -X POST http://127.0.0.1:8000/api/auth/github/callback/ \
  -H "Content-Type: application/json" \
  -d '{"code": "test_code"}'
```

## ✨ That's It!

GitHub OAuth should now be working. Test it by going to the login page and clicking the GitHub button!
