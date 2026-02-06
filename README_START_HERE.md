# 🎮 VSoC Platform - START HERE!

## ✅ EVERYTHING IS READY!

Both servers are running and connected to Supabase!

## 🚀 Quick Start (30 seconds)

### 1. Open the App
```
http://localhost:3000
```

### 2. Test Student Signup
```
http://localhost:3000/student-signup
```

Fill in the form and click "START GAME → REGISTER NOW"

### 3. Check Supabase
Go to your Supabase dashboard → Table Editor → users table
You'll see your new user! 🎉

## 📊 What's Running

- **Frontend:** http://localhost:3000 (Next.js)
- **Backend:** http://127.0.0.1:8000 (Django)
- **Database:** Supabase PostgreSQL (Connected ✅)

## 🗄️ Database Tables in Supabase

All these tables are created and ready:
1. users
2. students
3. mentors
4. projects
5. contributions
6. pull_requests
7. evaluations
8. global_stats
9. announcements

## 🔌 API Endpoints

- `POST /api/auth/register/student/` - Student signup
- `POST /api/auth/register/mentor/` - Mentor signup
- `POST /api/token/` - Login
- `GET /api/auth/me/` - Current user

## 📚 Documentation

- **FINAL_SETUP_COMPLETE.md** - Complete guide
- **SUPABASE_SETUP_COMPLETE.md** - Supabase details
- **ENV_SETUP_GUIDE.md** - Environment variables
- **TESTING_GUIDE.md** - Testing instructions

## 🎯 Test Flow

1. Go to http://localhost:3000/student-signup
2. Fill the form
3. Submit
4. Redirected to dashboard
5. Check Supabase → users table → Your data is there! ✅

## 🔧 If Servers Stop

### Restart Backend:
```bash
cd Backend_VSOC-aaditya/backend
python manage.py runserver
```

### Restart Frontend:
```bash
cd Backend_VSOC-aaditya/frontend
npm run dev
```

## 🎉 You're All Set!

Everything is integrated and working:
- ✅ Frontend → Backend → Supabase
- ✅ Authentication working
- ✅ Data persisting
- ✅ Ready to use!

**Start testing now!** 🚀
