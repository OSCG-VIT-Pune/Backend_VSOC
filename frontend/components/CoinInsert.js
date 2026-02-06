'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CoinInsert() {
  const [coinInserted, setCoinInserted] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [animatingCoin, setAnimatingCoin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !coinInserted) {
        insertCoin()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [coinInserted])

  const insertCoin = () => {
    setAnimatingCoin(true)
    
    // Play coin drop animation
    setTimeout(() => {
      setCoinInserted(true)
      setAnimatingCoin(false)
      
      // Show buttons after coin lands
      setTimeout(() => {
        setShowButtons(true)
      }, 300)
    }, 1200)
  }

  const handleMentorSignup = () => {
    router.push('/mentor-signup')
  }

  const handleStudentSignup = () => {
    router.push('/student-signup')
  }

  return (
    <div className="my-16 relative">
      {/* Coin Animation */}
      {animatingCoin && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-8xl animate-coin-drop">🪙</div>
        </div>
      )}

      {/* Press Enter Prompt */}
      {!coinInserted && (
        <div className="text-center">
          <div className="font-pixel text-xl md:text-2xl text-yellow-400 animate-blink mb-4 pixel-text">
            PRESS ENTER TO INSERT COIN
          </div>
          <button
            onClick={insertCoin}
            className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-800 font-pixel text-base rounded-none border-4 border-yellow-400 arcade-btn hover:border-yellow-300 hover:from-yellow-500 hover:to-yellow-700 animate-arcade-pulse"
          >
            🪙 INSERT COIN
          </button>
        </div>
      )}

      {/* Signup Buttons */}
      {coinInserted && (
        <div className={`text-center ${showButtons ? 'animate-slide-down' : 'opacity-0'}`}>
          <div className="font-pixel text-2xl md:text-3xl text-cyan-400 mb-8 pixel-text animate-pulse-glow">
            SELECT PLAYER TYPE
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Mentor Button */}
            <button
              onClick={handleMentorSignup}
              className="group relative px-10 py-6 bg-gradient-to-r from-cyan-600 to-cyan-800 font-pixel text-lg rounded-none border-4 border-cyan-400 arcade-btn hover:border-cyan-300 hover:from-cyan-500 hover:to-cyan-700 transition-all duration-300 animate-pixel-pop"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl">👨‍🏫</div>
                <div className="text-cyan-300">MENTOR</div>
                <div className="text-xs text-gray-300 font-sans">Guide & Maintain Projects</div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 border-4 border-cyan-300 rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-arcade-pulse"></div>
            </button>

            {/* Student Button */}
            <button
              onClick={handleStudentSignup}
              className="group relative px-10 py-6 bg-gradient-to-r from-magenta-600 to-magenta-800 font-pixel text-lg rounded-none border-4 border-magenta-400 arcade-btn hover:border-magenta-300 hover:from-magenta-500 hover:to-magenta-700 transition-all duration-300 animate-pixel-pop"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl">🎓</div>
                <div className="text-magenta-300">STUDENT</div>
                <div className="text-xs text-gray-300 font-sans">Learn & Contribute</div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 border-4 border-magenta-300 rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-arcade-pulse"></div>
            </button>
          </div>

          {/* Hint Text */}
          <div className="mt-8 font-pixel text-sm text-gray-500">
            CHOOSE YOUR PATH TO START THE GAME
          </div>
        </div>
      )}
    </div>
  )
}
