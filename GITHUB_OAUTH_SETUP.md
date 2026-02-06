# 🔐 GitHub OAuth Setup & Testing Guide

## 📋 Overview

GitHub OAuth allows users to sign in using their GitHub account. This guide will help you set it up and test it.

## 🚀 Step 1: Create a GitHub OAuth App

### 1.1 Go to GitHub Settings
1. Log in to GitHub
2. Click your profile picture (top right)
3. Go to **Settings**
4. Scroll down to **Developer settings** (left sidebar)
5. Click **OAuth Apps**
6. Click **New OAuth App**

### 1.2 Fill in the Application Details

```
Application name: VSoC Platform (or any name you want)
Homepage URL: http://localhost:3000
Application description: VSoC - Virtual Summer of Code Platform
Authorization callback URL: http://localhost:3000/auth/github/callback
```

### 1.3 Register the Application
- Click **Register application**
- You'll see your **Client ID** immediately
- Click **Generate a new client secret**
- Copy both the **Client ID** and **Client Secret**

⚠️ **IMPORTANT:** Save the Client Secret immediately - you won't be able to see it again!

## 🔧 Step 2: Configure Backend

### 2.1 Update .env File

Open `Backend_VSOC-aaditya/backend/.env` and update:

```env
GITHUB_CLIENT_ID=your_actual_client_id_here
GITHUB_CLIENT_SECRET=your_actual_client_secret_here
```

Replace `your_actual_client_id_here` and `your_actual_client_secret_here` with the values from GitHub.

### 2.2 Restart Backend Server

The backend should automatically reload, but if not:

```bash
# Stop the current server (Ctrl+C in the terminal)
cd Backend_VSOC-aaditya/backend
python manage.py runserver
```

## 🎨 Step 3: Configure Frontend

### 3.1 Create .env.local File

Create a new file: `Backend_VSOC-aaditya/frontend/.env.local`

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_actual_client_id_here
NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback
```

Replace `your_actual_client_id_here` with your GitHub Client ID.

### 3.2 Restart Frontend Server

```bash
# Stop the current server (Ctrl+C in the terminal)
cd Backend_VSOC-aaditya/frontend
npm run dev
```

## ✅ Step 4: Test GitHub OAuth

### 4.1 Test the Flow

1. **Open Login Page:**
   ```
   http://localhost:3000/login
   ```

2. **Click "CONTINUE WITH GITHUB" button**

3. **You'll be redirected to GitHub:**
   - GitHub will ask you to authorize the app
   - Click **Authorize [your-app-name]**

4. **You'll be redirected back to your app:**
   - URL will be: `http://localhost:3000/auth/github/callback?code=...`
   - You'll see "AUTHENTICATING..." message
   - Then "SUCCESS!" message
   - Finally redirected to dashboard

5. **Check Dashboard:**
   - You should see your GitHub username
   - You're now logged in!

### 4.2 Verify in Supabase

1. Go to your Supabase dashboard
2. Click **Table Editor**
3. Open **users** table
4. You should see a new user with:
   - username = your GitHub username
   - github_username = your GitHub username
   - role = student
   - email = your GitHub email (or generated)

### 4.3 Verify in Backend

Check the backend terminal - you should see:
```
POST /api/auth/github/callback/ 200
```

## 🧪 Testing Checklist

- [ ] GitHub OAuth App created
- [ ] Client ID and Secret copied
- [ ] Backend .env updated
- [ ] Frontend .env.local created
- [ ] Both servers restarted
- [ ] Login page shows GitHub button
- [ ] Clicking button redirects to GitHub
- [ ] GitHub authorization page appears
- [ ] After authorization, redirected back to app
- [ ] Callback page shows "AUTHENTICATING..."
- [ ] Then shows "SUCCESS!"
- [ ] Redirected to dashboard
- [ ] User data visible in dashboard
- [ ] User created in Supabase

## 🔍 Troubleshooting

### Issue: "Application not found" on GitHub
**Solution:** Make sure you're using the correct Client ID in frontend .env.local

### Issue: "Redirect URI mismatch"
**Solution:** 
1. Check GitHub OAuth App settings
2. Callback URL must be exactly: `http://localhost:3000/auth/github/callback`
3. No trailing slash!

### Issue: "Failed to authenticate with GitHub"
**Solution:**
1. Check backend .env has correct Client ID and Secret
2. Restart backend server
3. Check backend terminal for errors

### Issue: "Connection error"
**Solution:**
1. Make sure backend is running on http://127.0.0.1:8000
2. Check CORS settings in backend
3. Check browser console for errors

### Issue: User created but no student profile
**Solution:** This is normal! The backend automatically creates a basic student profile with:
- College: "Not Specified"
- Year: "1st Year"
- Branch: "Not Specified"

User can update these later in their profile.

## 📊 How It Works

### Flow Diagram:

```
1. User clicks "Continue with GitHub"
        ↓
2. Redirected to GitHub OAuth page
   URL: https://github.com/login/oauth/authorize?client_id=...
        ↓
3. User authorizes the app
        ↓
4. GitHub redirects back with code
   URL: http://localhost:3000/auth/github/callback?code=abc123
        ↓
5. Frontend sends code to backend
   POST /api/auth/github/callback/
        ↓
6. Backend exchanges code for access token
   POST https://github.com/login/oauth/access_token
        ↓
7. Backend fetches user data from GitHub
   GET https://api.github.com/user
        ↓
8. Backend creates or finds user in database
        ↓
9. Backend generates JWT tokens
        ↓
10. Frontend stores tokens
        ↓
11. User redirected to dashboard
```

## 🔐 Security Notes

### For Development:
- ✅ Using localhost is fine
- ✅ Client Secret in .env is acceptable

### For Production:
- ⚠️ Never commit .env files to git
- ⚠️ Use environment variables on your hosting platform
- ⚠️ Update callback URL to your production domain
- ⚠️ Create a separate GitHub OAuth App for production

## 📝 API Endpoint Details

### POST /api/auth/github/callback/

**Request:**
```json
{
  "code": "github_authorization_code"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "githubuser",
    "email": "user@example.com",
    "role": "student"
  },
  "tokens": {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Failed to authenticate with GitHub"
}
```

## 🎯 Quick Test Command

To quickly test if your GitHub OAuth is configured:

```bash
# Check backend .env
cd Backend_VSOC-aaditya/backend
cat .env | grep GITHUB

# Check frontend .env.local
cd Backend_VSOC-aaditya/frontend
cat .env.local | grep GITHUB
```

## ✨ What Gets Created

When a user logs in with GitHub for the first time:

1. **User Record:**
   - username: GitHub username
   - email: GitHub email (or generated)
   - github_username: GitHub username
   - role: student
   - password: random (user can't use it)

2. **Student Profile:**
   - college: "Not Specified"
   - year: "1st Year"
   - branch: "Not Specified"
   - bio: empty

3. **JWT Tokens:**
   - Access token (1 hour)
   - Refresh token (24 hours)

## 🎮 Ready to Test!

1. Make sure both servers are running
2. Go to http://localhost:3000/login
3. Click "CONTINUE WITH GITHUB"
4. Authorize the app on GitHub
5. You'll be logged in! 🎉

## 📚 Additional Resources

- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
- [Django Social Auth](https://python-social-auth.readthedocs.io/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
