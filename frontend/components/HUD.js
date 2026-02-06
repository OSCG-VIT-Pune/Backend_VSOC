'use client'

/**
 * HUD Component
 * Heads-Up Display component showing player stats and controls
 * 
 * @param {Object} props
 * @param {string} props.playerName - Player name/ID
 * @param {number} props.xp - Current XP value
 * @param {number} props.maxXp - Maximum XP value (default: 1000)
 * @param {number} props.score - Current score
 * @param {boolean} props.soundOn - Sound state
 * @param {Function} props.onSoundToggle - Sound toggle handler
 */
export default function HUD({ 
  playerName = 'PLAYER_01', 
  xp = 0, 
  maxXp = 1000,
  score = 0, 
  soundOn = true, 
  onSoundToggle 
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b-4 border-cyan-500 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="font-pixel text-sm text-green-400 pixel-text">
            {playerName}
          </div>
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-cyan-300">XP</span>
              <span className="text-yellow-300">
                {xp.toString().padStart(4, '0')}/{maxXp}
              </span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
              <div 
                className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full animate-xp-bar"
                style={{ width: `${(xp / maxXp) * 100}%` }}
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
            onClick={onSoundToggle}
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
  )
}
