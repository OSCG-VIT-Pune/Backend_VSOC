'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ArcadeInput from '@/components/ArcadeInput'
import GitHubLoginButton from '@/components/GitHubLoginButton'

const API_BASE_URL = 'http://127.0.0.1:8000'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // For now, we'll use a simple token endpoint
      // You may need to create a login view in Django
      const response = await fetch(`${API_BASE_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        
        // Fetch user details
        const userResponse = await fetch(`${API_BASE_URL}/api/auth/me/`, {
          headers: {
            'Authorization': `Bearer ${data.access}`
          }
        })

        if (userResponse.ok) {
          const userData = await userResponse.json()
          localStorage.setItem('user', JSON.stringify(userData))
        }

        router.push('/dashboard')
      } else {
        setError('INVALID CREDENTIALS. PLEASE TRY AGAIN.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('CONNECTION ERROR. PLEASE TRY AGAIN.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-float">🎮</div>
          <h1 className="font-pixel text-4xl text-cyan-400 mb-2 pixel-text animate-pulse-glow">
            VSoC LOGIN
          </h1>
          <p className="text-gray-400">Enter your credentials to continue</p>
        </div>

        {/* Login Form */}
        <div className="border-4 border-cyan-800 bg-gradient-to-br from-gray-900 to-black p-8">
          <form onSubmit={handleSubmit}>
            <ArcadeInput
              label="USERNAME"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />

            <ArcadeInput
              label="PASSWORD"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-800 font-pixel text-lg border-4 border-cyan-400 hover:border-cyan-300 hover:from-cyan-500 hover:to-cyan-700 transition-all duration-300 mb-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? '⏳ LOGGING IN...' : '🎮 LOGIN'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400 font-pixel">OR</span>
            </div>
          </div>

          {/* GitHub Login - Outside form */}
          <GitHubLoginButton />

          {error && (
            <div className="mt-4 p-3 border-2 border-red-500 bg-red-900/20">
              <div className="font-pixel text-sm text-red-400 text-center">
                ⚠ {error}
              </div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => router.push('/')}
            className="block w-full font-pixel text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            ← BACK TO HOME
          </button>
          <div className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/student-signup')}
              className="text-magenta-400 hover:text-magenta-300 font-pixel"
            >
              SIGN UP
            </button>
          </div>
          
          {/* Direct GitHub OAuth Link - Temporary Test */}
          <div className="mt-4 p-4 border-2 border-yellow-500 bg-yellow-900/20">
            <p className="text-yellow-400 font-pixel text-xs mb-2">TEST GITHUB AUTH:</p>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=Ov23li60nspgTOwLRIOU&redirect_uri=http://localhost:3000/auth/github/callback&scope=user:email read:user`}
              className="text-cyan-400 hover:text-cyan-300 underline text-sm"
            >
              Click here to test GitHub OAuth
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
