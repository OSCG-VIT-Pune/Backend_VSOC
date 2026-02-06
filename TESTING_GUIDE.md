# VSoC Signup Integration Testing Guide

## ✅ What's Been Integrated

The frontend and backend are now fully integrated with the following features:

### Backend (Django)
- ✅ Student signup endpoint: `POST /api/auth/register/student/`
- ✅ Mentor signup endpoint: `POST /api/auth/register/mentor/`
- ✅ JWT token authentication
- ✅ Login endpoint: `POST /api/token/`
- ✅ Current user endpoint: `GET /api/auth/me/`
- ✅ CORS configured for frontend

### Frontend (Next.js)
- ✅ Student signup form with validation
- ✅ Mentor signup form with validation
- ✅ API integration with error handling
- ✅ JWT token storage in localStorage
- ✅ Dashboard page (protected route)
- ✅ Login page
- ✅ Automatic redirect after signup

## 🚀 How to Test

### 1. Verify Servers Are Running

**Backend:** http://127.0.0.1:8000
**Frontend:** http://localhost:3000

Both servers should already be running in the background.

### 2. Test Student Signup

1. Navigate to: http://localhost:3000/student-signup
2. Fill in the form with:
   - Username: `teststudent`
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Password: `testpass123`
   - Confirm Password: `testpass123`
   - Phone: `+91 9876543210`
   - College: `Vishwakarma Institute of Technology`
   - Year: `2nd Year`
   - Branch: `Computer Engineering`
   - GitHub Username: `johndoe`
   - LinkedIn: (optional)
   - Bio: (optional)

3. Click "START GAME → REGISTER NOW"
4. You should see a success message and be redirected to the dashboard

### 3. Test Mentor Signup

1. Navigate to: http://localhost:3000/mentor-signup
2. Fill in the form with:
   - Username: `testmentor`
   - First Name: `Jane`
   - Last Name: `Smith`
   - Email: `jane@example.com`
   - Password: `testpass123`
   - Confirm Password: `testpass123`
   - Phone: `+91 9876543211`
   - Expertise: `Web Development, AI/ML`
   - Experience: `5 years`
   - Organization: (optional)
   - Projects Maintained: (optional)
   - GitHub Username: `janesmith`
   - LinkedIn: (optional)
   - Bio: (optional)

3. Click "START GAME → REGISTER NOW"
4. You should see a success message and be redirected to the dashboard

### 4. Test Login

1. Navigate to: http://localhost:3000/login
2. Enter credentials from previous signup
3. Click "LOGIN"
4. You should be redirected to the dashboard

### 5. Test Dashboard

1. After successful signup/login, you should see:
   - Your username, email, and role
   - A logout button
   - Welcome message

2. Click "LOGOUT" to clear session and return to home

## 🔍 API Endpoints Reference

### Student Registration
```bash
POST http://127.0.0.1:8000/api/auth/register/student/
Content-Type: application/json

{
  "username": "teststudent",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "testpass123",
  "phone": "+91 9876543210",
  "github_username": "johndoe",
  "linkedin_url": "",
  "college": "VIT",
  "year": "2nd Year",
  "branch": "Computer Engineering",
  "bio": ""
}
```

### Mentor Registration
```bash
POST http://127.0.0.1:8000/api/auth/register/mentor/
Content-Type: application/json

{
  "username": "testmentor",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "password": "testpass123",
  "phone": "+91 9876543211",
  "github_username": "janesmith",
  "linkedin_url": "",
  "expertise": "Web Development",
  "experience": "5 years",
  "organization": "",
  "projects_maintained": "",
  "bio": ""
}
```

### Login
```bash
POST http://127.0.0.1:8000/api/token/
Content-Type: application/json

{
  "username": "teststudent",
  "password": "testpass123"
}
```

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution:** Make sure Django backend is running and CORS settings are correct in `settings.py`

### Issue: "Connection Error"
**Solution:** Verify both servers are running on correct ports

### Issue: "Invalid Credentials"
**Solution:** Make sure you're using the correct username (not email) for login

### Issue: Form validation errors
**Solution:** Check that all required fields are filled and passwords match

## 📝 What's Stored

After successful signup/login, the following is stored in browser localStorage:
- `access_token`: JWT access token (expires in 1 hour)
- `refresh_token`: JWT refresh token (expires in 1 day)
- `user`: User object with id, username, email, role

## 🎮 Next Steps

The basic authentication flow is complete! You can now:
1. Add more features to the dashboard
2. Create project listing pages
3. Add profile editing functionality
4. Implement the GitHub OAuth flow
5. Add password reset functionality
