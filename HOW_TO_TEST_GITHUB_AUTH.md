# 🔐 How to Test GitHub Authentication

## 📋 Quick Answer

To test if GitHub auth is working:

### Option 1: Visual Test (Recommended)
1. Go to http://localhost:3000/login
2. Look for the **"CONTINUE WITH GITHUB"** button
3. Click it
4. If configured: You'll be redirected to GitHub
5. If not configured: Button will try to redirect but fail

### Option 2: Configuration Check
```bash
cd Backend_VSOC-aaditya/backend
python test_github_config.py
```

This will tell you if GitHub OAuth is configured correctly.

## 🚀 Full Setup & Test (5 Minutes)

### Prerequisites
- ✅ Backend running at http://127.0.0.1:8000
- ✅ Frontend running at http://localhost:3000
- ✅ GitHub account

### Step-by-Step:

#### 1. Create GitHub OAuth App

Go to: https://github.com/settings/developers

Click: **OAuth Apps** → **New OAuth App**

Fill in:
```
Application name: VSoC Platform
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/auth/github/callback
```

Click **Register application**

Copy:
- Client ID
- Client Secret (click "Generate a new client secret")

#### 2. Configure Backend

Edit `Backend_VSOC-aaditya/backend/.env`:

```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
```

#### 3. Configure Frontend

Create `Backend_VSOC-aaditya/frontend/.env.local`:

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback
```

#### 4. Restart Servers

Servers should auto-reload, but if not:

```bash
# Stop and restart backend
cd Backend_VSOC-aaditya/backend
python manage.py runserver

# Stop and restart frontend
cd Backend_VSOC-aaditya/frontend
npm run dev
```

#### 5. Test the Flow

1. **Open:** http://localhost:3000/login
2. **Click:** "CONTINUE WITH GITHUB" button
3. **Authorize:** The app on GitHub
4. **Wait:** You'll see "AUTHENTICATING..."
5. **Success:** Redirected to dashboard
6. **Verify:** Check Supabase users table

## ✅ How to Know It's Working

### Signs GitHub Auth is Working:

1. **Login Page:**
   - ✅ GitHub button is visible
   - ✅ Button has GitHub icon
   - ✅ Says "CONTINUE WITH GITHUB"

2. **After Clicking:**
   - ✅ Redirected to github.com
   - ✅ See authorization page
   - ✅ Shows your app name

3. **After Authorizing:**
   - ✅ Redirected to callback page
   - ✅ See "AUTHENTICATING..." message
   - ✅ Then "SUCCESS!" message
   - ✅ Redirected to dashboard

4. **In Dashboard:**
   - ✅ See your GitHub username
   - ✅ See your email
   - ✅ Role shows "student"

5. **In Supabase:**
   - ✅ New user in users table
   - ✅ username = your GitHub username
   - ✅ github_username = your GitHub username

6. **In Browser DevTools:**
   - ✅ localStorage has access_token
   - ✅ localStorage has refresh_token
   - ✅ localStorage has user object

### Signs GitHub Auth is NOT Working:

❌ Button click does nothing
❌ Redirected to wrong URL
❌ "Application not found" error
❌ "Redirect URI mismatch" error
❌ Stuck on callback page
❌ "Failed to authenticate" error

## 🔍 Debugging

### Check Configuration:

```bash
cd Backend_VSOC-aaditya/backend
python test_github_config.py
```

Expected output:
```
✅ GitHub Client ID: Ov23li...
✅ GitHub Client Secret: ghp_ab...
✅ GitHub OAuth is CONFIGURED!
```

### Check Backend Logs:

Look for in terminal:
```
POST /api/auth/github/callback/ 200
```

If you see 400 or 500, there's an error.

### Check Frontend Console:

Open DevTools (F12) → Console

Look for errors like:
- "Failed to fetch"
- "Network error"
- "CORS error"

### Check Network Tab:

Open DevTools (F12) → Network

Filter: XHR

Look for:
- POST to `/api/auth/github/callback/`
- Status should be 200
- Response should have tokens

## 🧪 Test Without Browser

### Test Backend Endpoint:

```bash
# This will fail because you need a real code from GitHub
# But it will tell you if the endpoint is working

curl -X POST http://127.0.0.1:8000/api/auth/github/callback/ \
  -H "Content-Type: application/json" \
  -d '{"code": "test"}'
```

Expected response (error is normal):
```json
{
  "error": "Failed to authenticate with GitHub"
}
```

This means the endpoint is working, just needs a real code.

## 📊 Complete Flow Diagram

```
User clicks "Continue with GitHub"
        ↓
Frontend redirects to:
https://github.com/login/oauth/authorize?client_id=...
        ↓
User authorizes on GitHub
        ↓
GitHub redirects to:
http://localhost:3000/auth/github/callback?code=abc123
        ↓
Frontend sends code to backend:
POST http://127.0.0.1:8000/api/auth/github/callback/
Body: {"code": "abc123"}
        ↓
Backend exchanges code for token:
POST https://github.com/login/oauth/access_token
        ↓
Backend gets user data:
GET https://api.github.com/user
        ↓
Backend creates/finds user in Supabase
        ↓
Backend generates JWT tokens
        ↓
Backend returns:
{
  "user": {...},
  "tokens": {
    "access": "...",
    "refresh": "..."
  }
}
        ↓
Frontend stores tokens in localStorage
        ↓
Frontend redirects to dashboard
        ↓
User is logged in! ✅
```

## 📝 Files Created/Modified

### New Files:
- `frontend/components/GitHubLoginButton.js` - GitHub button component
- `frontend/app/auth/github/callback/page.js` - Callback handler
- `frontend/.env.local` - Frontend environment variables
- `backend/test_github_config.py` - Configuration checker

### Modified Files:
- `frontend/app/login/page.js` - Added GitHub button
- `backend/.env` - Added GitHub credentials

## 🎯 Quick Test Checklist

- [ ] GitHub OAuth App created
- [ ] Client ID and Secret copied
- [ ] Backend .env updated with credentials
- [ ] Frontend .env.local created with Client ID
- [ ] Both servers restarted
- [ ] Login page shows GitHub button
- [ ] Clicking button redirects to GitHub
- [ ] Can authorize the app
- [ ] Redirected back to app
- [ ] See "AUTHENTICATING..." then "SUCCESS!"
- [ ] Redirected to dashboard
- [ ] User data visible
- [ ] User created in Supabase

## 🎉 Success Indicators

If you see all of these, GitHub auth is working perfectly:

✅ GitHub button on login page
✅ Redirects to GitHub when clicked
✅ Authorization page appears
✅ Redirects back after authorization
✅ Callback page shows progress
✅ Dashboard loads with user data
✅ User in Supabase database
✅ Tokens in localStorage
✅ Can logout and login again

## 📚 Documentation

- **GITHUB_OAUTH_SETUP.md** - Detailed setup guide
- **GITHUB_OAUTH_QUICK_TEST.md** - Quick 5-minute setup
- **HOW_TO_TEST_GITHUB_AUTH.md** - This file

## 🆘 Need Help?

If GitHub auth isn't working:

1. Run `python test_github_config.py` to check configuration
2. Check backend terminal for errors
3. Check browser console for errors
4. Verify callback URL in GitHub OAuth App settings
5. Make sure both servers are running
6. Try clearing browser cache and localStorage

## 🚀 Ready to Test!

Go to http://localhost:3000/login and click the GitHub button!
