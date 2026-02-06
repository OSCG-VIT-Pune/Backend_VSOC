'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ArcadeInput from './ArcadeInput'

const API_BASE_URL = 'http://127.0.0.1:8000'

export default function SignupForm({ userType = 'student' }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    college: '',
    year: '',
    branch: '',
    github_username: '',
    linkedin_url: '',
    expertise: '',
    projects_maintained: '',
    experience: '',
    organization: '',
    bio: ''
  })

  const [errors, setErrors] = useState({})
  const [progress, setProgress] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const isMentor = userType === 'mentor'

  // Calculate form progress
  const calculateProgress = () => {
    const requiredFields = isMentor 
      ? ['username', 'first_name', 'email', 'password', 'confirmPassword', 'phone', 'expertise', 'experience', 'github_username']
      : ['username', 'first_name', 'email', 'password', 'confirmPassword', 'phone', 'college', 'year', 'branch', 'github_username']
    
    const filledFields = requiredFields.filter(field => formData[field]?.trim())
    return Math.round((filledFields.length / requiredFields.length) * 100)
  }

  // Update progress when form data changes
  useState(() => {
    setProgress(calculateProgress())
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Update progress
    setTimeout(() => setProgress(calculateProgress()), 0)
  }

  const validateForm = () => {
    const newErrors = {}

    // Common validations
    if (!formData.username.trim()) newErrors.username = 'USERNAME REQUIRED'
    if (!formData.first_name.trim()) newErrors.first_name = 'FIRST NAME REQUIRED'
    if (!formData.email.trim()) newErrors.email = 'EMAIL REQUIRED'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'INVALID EMAIL'
    if (!formData.password.trim()) newErrors.password = 'PASSWORD REQUIRED'
    else if (formData.password.length < 8) newErrors.password = 'PASSWORD TOO SHORT (MIN 8 CHARS)'
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'CONFIRM PASSWORD'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'PASSWORDS DO NOT MATCH'
    if (!formData.phone.trim()) newErrors.phone = 'PHONE REQUIRED'
    if (!formData.github_username.trim()) newErrors.github_username = 'GITHUB REQUIRED'

    // Mentor-specific validations
    if (isMentor) {
      if (!formData.expertise.trim()) newErrors.expertise = 'EXPERTISE REQUIRED'
      if (!formData.experience.trim()) newErrors.experience = 'EXPERIENCE REQUIRED'
    } else {
      // Student-specific validations
      if (!formData.college.trim()) newErrors.college = 'COLLEGE REQUIRED'
      if (!formData.year.trim()) newErrors.year = 'YEAR REQUIRED'
      if (!formData.branch.trim()) newErrors.branch = 'BRANCH REQUIRED'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Prepare data for API
      const apiData = {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        github_username: formData.github_username,
        linkedin_url: formData.linkedin_url,
        bio: formData.bio
      }

      // Add role-specific fields
      if (isMentor) {
        apiData.expertise = formData.expertise
        apiData.projects_maintained = formData.projects_maintained
        apiData.organization = formData.organization
        apiData.experience = formData.experience
      } else {
        apiData.college = formData.college
        apiData.year = formData.year
        apiData.branch = formData.branch
      }

      // Make API call
      const endpoint = isMentor 
        ? `${API_BASE_URL}/api/auth/register/mentor/`
        : `${API_BASE_URL}/api/auth/register/student/`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      })

      const data = await response.json()

      if (response.ok) {
        // Store tokens in localStorage
        localStorage.setItem('access_token', data.tokens.access)
        localStorage.setItem('refresh_token', data.tokens.refresh)
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role
        }))

        setSubmitted(true)
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        // Handle validation errors from backend
        if (data.username) {
          setErrors(prev => ({ ...prev, username: data.username[0].toUpperCase() }))
        }
        if (data.email) {
          setErrors(prev => ({ ...prev, email: data.email[0].toUpperCase() }))
        }
        if (data.github_username) {
          setErrors(prev => ({ ...prev, github_username: data.github_username[0].toUpperCase() }))
        }
        
        // Set general error message
        setApiError(data.detail || 'REGISTRATION FAILED. PLEASE CHECK YOUR INPUTS.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setApiError('CONNECTION ERROR. PLEASE TRY AGAIN.')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-pixel-pop">
        <div className="border-8 border-green-500 bg-gradient-to-br from-green-900/40 to-black p-12 rounded-none">
          <div className="text-8xl mb-6 animate-float">🎮</div>
          <h2 className="font-pixel text-3xl text-green-400 mb-6 pixel-text animate-pulse-glow">
            REGISTRATION COMPLETE!
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Welcome to VSoC, {formData.first_name}! Your {userType} profile has been created.
          </p>
          <div className="font-pixel text-sm text-yellow-400 animate-pulse">
            LOADING DASHBOARD... PLEASE WAIT
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-cyan-300 font-pixel">REGISTRATION PROGRESS</span>
          <span className="text-yellow-300 font-pixel">{progress}%</span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Form Title */}
      <div className="mb-8 text-center">
        <h2 className="font-pixel text-2xl md:text-3xl text-cyan-400 mb-2 pixel-text">
          {isMentor ? '👨‍🏫 MENTOR' : '🎓 STUDENT'} REGISTRATION
        </h2>
        <p className="text-gray-400">Fill in your details to join VSoC</p>
      </div>

      {/* Form Fields */}
      <div className="border-4 border-cyan-800 bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 rounded-none mb-6">
        {/* Common Fields */}
        <ArcadeInput
          label="USERNAME"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a unique username"
          required
          maxLength={150}
          error={errors.username}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ArcadeInput
            label="FIRST NAME"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="John"
            required
            maxLength={50}
            error={errors.first_name}
          />

          <ArcadeInput
            label="LAST NAME"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Doe"
            maxLength={50}
            error={errors.last_name}
          />
        </div>

        <ArcadeInput
          label="EMAIL ADDRESS"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          error={errors.email}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ArcadeInput
            label="PASSWORD"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 8 characters"
            required
            error={errors.password}
          />

          <ArcadeInput
            label="CONFIRM PASSWORD"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
            error={errors.confirmPassword}
          />
        </div>

        <ArcadeInput
          label="PHONE NUMBER"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 XXXXXXXXXX"
          required
          maxLength={15}
          error={errors.phone}
        />

        {/* Student-specific fields */}
        {!isMentor && (
          <>
            <ArcadeInput
              label="COLLEGE/UNIVERSITY"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Vishwakarma Institute of Technology"
              required
              error={errors.college}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ArcadeInput
                label="YEAR"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2nd Year"
                required
                error={errors.year}
              />

              <ArcadeInput
                label="BRANCH"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Computer Engineering"
                required
                error={errors.branch}
              />
            </div>
          </>
        )}

        {/* Mentor-specific fields */}
        {isMentor && (
          <>
            <ArcadeInput
              label="EXPERTISE/DOMAINS"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="Web Dev, AI/ML, Cloud Computing"
              required
              error={errors.expertise}
            />

            <ArcadeInput
              label="EXPERIENCE"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="5 years, 10+ years, etc."
              required
              error={errors.experience}
            />

            <ArcadeInput
              label="ORGANIZATION (OPTIONAL)"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Your company/organization"
            />

            <ArcadeInput
              label="PROJECTS MAINTAINED (OPTIONAL)"
              name="projects_maintained"
              value={formData.projects_maintained}
              onChange={handleChange}
              placeholder="List your open source projects"
            />
          </>
        )}

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ArcadeInput
            label="GITHUB USERNAME"
            name="github_username"
            value={formData.github_username}
            onChange={handleChange}
            placeholder="yourusername"
            required
            error={errors.github_username}
          />

          <ArcadeInput
            label="LINKEDIN (OPTIONAL)"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text">
            BIO (OPTIONAL)
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder={isMentor ? "Tell us about your experience..." : "Tell us about yourself..."}
            maxLength={200}
            rows={4}
            className="w-full px-4 py-3 bg-gray-900 border-4 border-cyan-700 rounded-none text-white font-sans focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/50 transition-all duration-300"
          />
          <div className="mt-1 text-right font-pixel text-xs text-gray-500">
            {formData.bio.length}/200
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-10 py-5 bg-gradient-to-r from-green-600 to-green-800 font-pixel text-lg rounded-none border-4 border-green-400 arcade-btn hover:border-green-300 hover:from-green-500 hover:to-green-700 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? '⏳ PROCESSING...' : '🎮 START GAME → REGISTER NOW'}
      </button>

      {/* API Error */}
      {apiError && (
        <div className="mt-6 p-4 border-4 border-red-500 bg-red-900/20 rounded-none animate-shake">
          <div className="font-pixel text-sm text-red-400 text-center">
            ⚠ {apiError}
          </div>
        </div>
      )}

      {/* Validation Error Summary */}
      {!apiError && Object.keys(errors).length > 0 && (
        <div className="mt-6 p-4 border-4 border-red-500 bg-red-900/20 rounded-none animate-shake">
          <div className="font-pixel text-sm text-red-400 text-center">
            ⚠ PLEASE FIX {Object.keys(errors).length} ERROR(S) ABOVE
          </div>
        </div>
      )}
    </form>
  )
}
