'use client'

import { useRouter } from 'next/navigation'
import SignupForm from '@/components/SignupForm'

export default function StudentSignup() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* HUD */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b-4 border-magenta-500 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push('/')}
              className="font-pixel text-sm text-magenta-400 hover:text-magenta-300 transition-colors pixel-text"
            >
              ← BACK TO HOME
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-float">🎓</div>
            <div className="text-right">
              <div className="text-xs text-gray-400">PLAYER TYPE</div>
              <div className="font-pixel text-xl text-magenta-400 pixel-text">
                STUDENT
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        <div className="w-full max-w-4xl">
          {/* Page Title */}
          <div className="text-center mb-12 animate-slide-down">
            <h1 className="font-pixel text-4xl md:text-6xl mb-4 animate-pulse-glow">
              <span className="text-magenta-400 pixel-text">STUDENT</span>
              <span className="text-white pixel-text"> SIGNUP</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Join VSoC and kickstart your open source journey with real-world projects
            </p>
          </div>

          {/* Signup Form */}
          <div className="animate-pixel-pop" style={{ animationDelay: '0.2s' }}>
            <SignupForm userType="student" />
          </div>

          {/* Info Box */}
          <div className="mt-8 p-6 border-4 border-magenta-800 bg-gradient-to-br from-gray-900 to-black rounded-none animate-slide-up">
            <h3 className="font-pixel text-lg text-magenta-400 mb-4 pixel-text">
              STUDENT BENEFITS
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Work on real open source projects with mentorship</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Build your portfolio and gain practical experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Earn certificates and leaderboard recognition</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Connect with a community of passionate developers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <span>Boost your career with hands-on open source contributions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-gray-800 bg-gradient-to-b from-black to-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-pixel text-sm text-gray-500">
            VSoC ARCADE EDITION • STUDENT REGISTRATION
          </div>
        </div>
      </footer>
    </main>
  )
}
