'use client'

/**
 * LevelCard Component
 * A reusable card component for displaying game levels
 * 
 * @param {Object} props
 * @param {number} props.id - Level ID
 * @param {string} props.title - Level title
 * @param {string} props.icon - Emoji icon for the level
 * @param {string} props.color - Tailwind color name (e.g., 'cyan', 'magenta')
 * @param {boolean} props.isBoss - Whether this is a boss level
 * @param {boolean} props.isSelected - Whether this level is currently selected
 * @param {boolean} props.shake - Whether to apply shake animation
 * @param {Function} props.onClick - Click handler
 */
export default function LevelCard({ 
  id, 
  title, 
  icon, 
  color = 'cyan', 
  isBoss = false, 
  isSelected = false,
  shake = false,
  onClick 
}) {
  return (
    <div
      onClick={onClick}
      className={`p-6 border-4 ${
        isBoss 
          ? 'border-red-500 bg-gradient-to-br from-red-900/30 to-black' 
          : 'border-cyan-700 bg-gradient-to-br from-gray-900 to-black'
      } rounded-none transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isBoss ? 'hover:shadow-red-500/20' : 'hover:shadow-cyan-500/20'
      } cursor-pointer group ${
        isSelected ? 'scale-105 shadow-2xl' : ''
      } ${
        isBoss && shake ? 'animate-shake' : ''
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`text-3xl ${isSelected ? 'animate-float' : ''}`}>
          {icon}
        </div>
        <div>
          <div className={`font-pixel text-2xl ${
            isBoss ? 'text-red-400' : `text-${color}-400`
          } pixel-text`}>
            {String(id).padStart(2, '0')}
          </div>
          <h3 className={`font-pixel text-xl ${
            isBoss ? 'text-red-400' : 'text-cyan-400'
          } pixel-text`}>
            {title}
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
  )
}
