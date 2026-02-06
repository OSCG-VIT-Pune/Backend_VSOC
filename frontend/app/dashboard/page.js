'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('access_token')

    if (!userData || !token) {
      router.push('/')
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-pixel text-2xl text-cyan-400 animate-pulse">
          LOADING...
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b-4 border-cyan-500 bg-gray-900/95 backdrop-blur-sm px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{user.role === 'student' ? '🎓' : '👨‍🏫'}</div>
            <div>
              <div className="font-pixel text-2xl text-cyan-400 pixel-text">
                VSoC DASHBOARD
              </div>
              <div className="text-sm text-gray-400">
                Welcome back, {user.username}!
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 font-pixel text-sm border-2 border-red-400 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Card */}
        <div className="border-4 border-cyan-500 bg-gradient-to-br from-cyan-900/20 to-black p-8 mb-8">
          <h1 className="font-pixel text-4xl text-cyan-400 mb-4 pixel-text animate-pulse-glow">
            🎮 GAME START!
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Your VSoC journey begins now. Get ready to contribute to amazing open source projects!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-green-500 bg-green-900/20 p-4">
              <div className="text-3xl mb-2">👤</div>
              <div className="font-pixel text-sm text-green-400">USERNAME</div>
              <div className="text-white">{user.username}</div>
            </div>
            
            <div className="border-2 border-blue-500 bg-blue-900/20 p-4">
              <div className="text-3xl mb-2">📧</div>
              <div className="font-pixel text-sm text-blue-400">EMAIL</div>
              <div className="text-white text-sm">{user.email}</div>
            </div>
            
            <div className="border-2 border-purple-500 bg-purple-900/20 p-4">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-pixel text-sm text-purple-400">ROLE</div>
              <div className="text-white uppercase">{user.role}</div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="border-4 border-yellow-500 bg-gradient-to-br from-yellow-900/20 to-black p-8 text-center">
          <div className="text-6xl mb-4 animate-bounce">🚧</div>
          <h2 className="font-pixel text-3xl text-yellow-400 mb-4 pixel-text">
            UNDER CONSTRUCTION
          </h2>
          <p className="text-gray-300 text-lg">
            More features coming soon! Stay tuned for projects, leaderboards, and more.
          </p>
        </div>
      </div>
    </main>
  )
}
