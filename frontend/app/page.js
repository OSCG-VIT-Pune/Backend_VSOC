'use client'

import { useState, useEffect, useRef } from 'react'
import CoinInsert from '@/components/CoinInsert'

export default function Home() {
  const [soundOn, setSoundOn] = useState(false) // Start with sound off
  const [score, setScore] = useState(25800)
  const [xp, setXp] = useState(650)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [bossShake, setBossShake] = useState(false)
  const [showCoin, setShowCoin] = useState(false)
  const audioRef = useRef(null)

  const startGame = () => {
    setGameStarted(true)
    setScore(prev => prev + 100)
    setTimeout(() => {
      document.getElementById('level-select')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }, 300)
  }

  // Handle background music
  useEffect(() => {
    if (audioRef.current) {
      if (soundOn) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [soundOn])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !gameStarted) {
        startGame()
      }
      if (e.key === 'm' || e.key === 'M') {
        setSoundOn(!soundOn)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, soundOn])

  useEffect(() => {
    const interval = setInterval(() => {
      setXp(prev => {
        const newXp = prev + 1
        if (newXp >= 1000) {
          setScore(prevScore => prevScore + 1000)
          return 0
        }
        return newXp
      })
    }, 3000)

    const coinInterval = setInterval(() => {
      setShowCoin(true)
      setTimeout(() => setShowCoin(false), 1500)
    }, 8000)

    return () => {
      clearInterval(interval)
      clearInterval(coinInterval)
    }
  }, [])

  const selectLevel = (levelId) => {
    setSelectedLevel(levelId)
    setScore(prev => prev + 500)
    if (levelId === 6) {
      setBossShake(true)
      setTimeout(() => setBossShake(false), 500)
    }
  }

  const levels = [
    { id: 1, title: 'About VSoC', icon: '📖', color: 'cyan' },
    { id: 2, title: 'Open Source Domains', icon: '🌐', color: 'magenta' },
    { id: 3, title: 'Mentors & Maintainers', icon: '👨‍🏫', color: 'green' },
    { id: 4, title: 'Projects', icon: '📁', color: 'yellow' },
    { id: 5, title: 'Community', icon: '👥', color: 'blue' },
    { id: 6, title: 'Apply for VSoC', icon: '👾', color: 'red', isBoss: true }
  ]

  const powerUps = [
    { icon: '⚡', title: 'Real Experience', desc: 'Work on real open source projects', color: 'yellow' },
    { icon: '🎯', title: 'Mentorship', desc: 'Guidance from experienced maintainers', color: 'cyan' },
    { icon: '👥', title: 'Community', desc: 'Join passionate developers', color: 'magenta' },
    { icon: '🏆', title: 'Recognition', desc: 'Certificates & leaderboard ranking', color: 'green' },
    { icon: '💼', title: 'Career Boost', desc: 'Enhance your developer profile', color: 'blue' },
    { icon: '🚀', title: 'Accelerated Learning', desc: 'Fast-track your skills growth', color: 'red' }
  ]

  const steps = [
    { step: '01', title: 'Register', desc: 'Create your player profile', icon: '📝' },
    { step: '02', title: 'Choose Domain', desc: 'Select your open source track', icon: '🎯' },
    { step: '03', title: 'Contribute', desc: 'Work on project issues', icon: '💻' },
    { step: '04', title: 'Gain XP', desc: 'Earn points for contributions', icon: '⭐' },
    { step: '05', title: 'Final Boss', desc: 'Complete final evaluation', icon: '👑' }
  ]

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="/audio/background-music.mp3"
      />
      
      {/* HUD */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b-4 border-cyan-500 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="font-pixel text-sm text-green-400 pixel-text">
              PLAYER_01
            </div>
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-cyan-300">XP</span>
                <span className="text-yellow-300">{xp.toString().padStart(4, '0')}/1000</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full animate-xp-bar"
                  style={{ width: `${(xp / 1000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-xs text-gray-400">SCORE</div>
              <div className="font-pixel text-2xl text-yellow-400 pixel-text">
                {score.toString().padStart(6, '0')}
              </div>
            </div>
            
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="p-3 bg-gray-800 border-2 border-cyan-500 rounded-lg arcade-btn hover:border-cyan-400"
              aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
            >
              {soundOn ? (
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Coin Animation */}
      {showCoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-6xl animate-coin-spin">🪙</div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="font-pixel text-6xl md:text-8xl lg:text-9xl mb-6 animate-pulse-glow">
            <span className="text-cyan-400 pixel-text">V</span>
            <span className="text-magenta-400 pixel-text">S</span>
            <span className="text-green-400 pixel-text">o</span>
            <span className="text-yellow-400 pixel-text">C</span>
          </h1>
          
          <h2 className="font-silkscreen text-xl md:text-2xl mb-8 text-gray-300">
            Vishwakarma Summer of Code
            <br />
            <span className="text-lg text-gray-400">by OSCG · Vishwakarma Institute of Technology, Pune</span>
          </h2>

          {/* Coin Insert Component */}
          <CoinInsert />

          <div className="mt-20 font-pixel text-2xl text-gray-500">
            INSERT COIN → START OPEN SOURCE
          </div>
        </div>
      </section>

      {/* Level Select */}
      <section id="level-select" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-pixel text-3xl md:text-4xl text-center mb-12 text-cyan-400 pixel-text border-b-4 border-cyan-800 pb-4">
          LEVEL SELECT
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() => selectLevel(level.id)}
              className={`p-6 border-4 ${level.isBoss ? 'border-red-500 bg-gradient-to-br from-red-900/30 to-black' : 'border-cyan-700 bg-gradient-to-br from-gray-900 to-black'} rounded-none transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${level.isBoss ? 'hover:shadow-red-500/20' : 'hover:shadow-cyan-500/20'} cursor-pointer group ${selectedLevel === level.id ? 'scale-105 shadow-2xl' : ''} ${level.isBoss && bossShake ? 'animate-shake' : ''}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-3xl ${selectedLevel === level.id ? 'animate-float' : ''}`}>
                  {level.icon}
                </div>
                <div>
                  <div className={`font-pixel text-2xl ${level.isBoss ? 'text-red-400' : `text-${level.color}-400`} pixel-text`}>
                    {String(level.id).padStart(2, '0')}
                  </div>
                  <h3 className={`font-pixel text-xl ${level.isBoss ? 'text-red-400' : 'text-cyan-400'} pixel-text`}>
                    {level.title}
                  </h3>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  ✅ UNLOCKED
                </span>
                <span className="font-pixel text-sm text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  LEVEL START →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Power-Ups */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-pixel text-3xl md:text-4xl text-center mb-12 text-magenta-400 pixel-text">
          COLLECT POWER-UPS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {powerUps.map((powerup, idx) => (
            <div
              key={idx}
              className="p-6 border-4 border-magenta-800 bg-gradient-to-br from-gray-900 to-black rounded-none transform transition-all duration-300 hover:scale-105 hover:border-magenta-400 hover:shadow-2xl hover:shadow-magenta-500/30 group animate-float"
              style={{ animationDelay: `${idx * 0.5}s` }}
            >
              <div className="text-4xl mb-4 text-center">{powerup.icon}</div>
              <h3 className={`font-pixel text-xl text-${powerup.color}-400 text-center mb-3 pixel-text`}>
                {powerup.title}
              </h3>
              <p className="text-gray-300 text-center">{powerup.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="font-pixel text-3xl md:text-4xl text-center mb-16 text-green-400 pixel-text">
          HOW THE GAME WORKS
        </h2>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-magenta-500 to-green-500 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10">
                <div className="bg-black border-4 border-green-700 p-6 rounded-none text-center group hover:border-green-400 transition-all duration-300 animate-float">
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <div className="font-pixel text-2xl text-green-400 mb-2 pixel-text">{step.step}</div>
                  <h3 className="font-pixel text-lg text-white mb-2 pixel-text">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-green-400 font-pixel text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boss Fight */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className={`border-8 border-red-600 bg-gradient-to-br from-red-900/40 to-black p-8 md:p-12 rounded-none transform transition-all duration-500 hover:scale-105 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30 ${bossShake ? 'animate-shake' : ''}`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl animate-float">👾</div>
            <div className="flex-1">
              <h2 className="font-pixel text-3xl md:text-4xl text-red-400 mb-6 pixel-text">
                READY TO TAKE ON THE OPEN SOURCE BOSS?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join VSoC and prove your skills in the ultimate coding challenge. 
                Battle bugs, conquer features, and level up your career.
              </p>
              <button 
                className="px-10 py-5 bg-gradient-to-r from-red-700 to-red-900 font-pixel text-lg rounded-none border-4 border-red-500 arcade-btn hover:border-red-400 hover:from-red-600 hover:to-red-800"
                onClick={() => setBossShake(true)}
              >
                ⚔️ FIGHT BOSS → APPLY NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-8 border-gray-800 bg-gradient-to-b from-black to-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="font-pixel text-3xl text-center text-cyan-400 mb-8 pixel-text">
            GAME CREDITS
          </div>
          
          <div className="text-center space-y-6 text-gray-400 mb-12">
            <div className="text-2xl font-silkscreen">
              VISHWAKARMA SUMMER OF CODE
            </div>
            <div className="text-xl text-cyan-300">
              OSCG – Open Source Community Group
            </div>
            <div className="text-lg">
              Vishwakarma Institute of Technology, Pune
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-12">
            {['🐦', '💬', '📷', '💼', '🎮'].map((icon, idx) => (
              <button
                key={idx}
                className="w-14 h-14 border-2 border-gray-700 flex items-center justify-center text-2xl bg-gray-900/50 hover:bg-cyan-900/30 hover:border-cyan-500 transition-all duration-300"
              >
                {icon}
              </button>
            ))}
          </div>

          <div className="text-center text-gray-500 text-sm font-pixel border-t border-gray-800 pt-8">
            © 2026 VSoC • VISHWAKARMA INSTITUTE OF TECHNOLOGY, PUNE
          </div>
        </div>
      </footer>
    </main>
  )
}