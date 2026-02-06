'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const API_BASE_URL = 'http://127.0.0.1:8000'

export default function GitHubCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('processing')
  const [error, setError] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setStatus('error')
      setError('GitHub authentication was cancelled or failed')
      setTimeout(() => router.push('/login'), 3000)
      return
    }

    if (!code) {
      setStatus('error')
      setError('No authorization code received from GitHub')
      setTimeout(() => router.push('/login'), 3000)
      return
    }

    // Send code to backend
    handleGitHubCallback(code)
  }, [searchParams, router])

  const handleGitHubCallback = async (code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/github/callback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      })

      const data = await response.json()

      if (response.ok) {
        // Store tokens
        localStorage.setItem('access_token', data.tokens.access)
        localStorage.setItem('refresh_token', data.tokens.refresh)
        localStorage.setItem('user', JSON.stringify(data.user))

        setStatus('success')
        
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        setStatus('error')
        setError(data.error || 'Failed to authenticate with GitHub')
        setTimeout(() => router.push('/login'), 3000)
      }
    } catch (error) {
      console.error('GitHub callback error:', error)
      setStatus('error')
      setError('Connection error. Please try again.')
      setTimeout(() => router.push('/login'), 3000)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-4">
      <div className="max-w-md w-full">
        {status === 'processing' && (
          <div className="border-4 border-cyan-500 bg-gradient-to-br from-cyan-900/20 to-black p-12 text-center animate-pulse">
            <div className="text-6xl mb-6 animate-spin">⚙️</div>
            <h2 className="font-pixel text-2xl text-cyan-400 mb-4 pixel-text">
              AUTHENTICATING...
            </h2>
            <p className="text-gray-300">
              Connecting with GitHub
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="border-4 border-green-500 bg-gradient-to-br from-green-900/20 to-black p-12 text-center animate-pixel-pop">
            <div className="text-6xl mb-6 animate-bounce">✅</div>
            <h2 className="font-pixel text-2xl text-green-400 mb-4 pixel-text">
              SUCCESS!
            </h2>
            <p className="text-gray-300">
              Redirecting to dashboard...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="border-4 border-red-500 bg-gradient-to-br from-red-900/20 to-black p-12 text-center animate-shake">
            <div className="text-6xl mb-6">❌</div>
            <h2 className="font-pixel text-2xl text-red-400 mb-4 pixel-text">
              ERROR
            </h2>
            <p className="text-gray-300 mb-4">
              {error}
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to login...
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
