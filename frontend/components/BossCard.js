'use client'

/**
 * BossCard Component
 * A reusable card component for boss/CTA sections
 * 
 * @param {Object} props
 * @param {string} props.icon - Emoji icon for the boss
 * @param {string} props.title - Boss card title
 * @param {string} props.description - Boss card description
 * @param {string} props.buttonText - CTA button text
 * @param {Function} props.onButtonClick - Button click handler
 * @param {boolean} props.shake - Whether to apply shake animation
 */
export default function BossCard({ 
  icon = '👾', 
  title, 
  description, 
  buttonText,
  onButtonClick,
  shake = false
}) {
  return (
    <div className={`border-8 border-red-600 bg-gradient-to-br from-red-900/40 to-black p-8 md:p-12 rounded-none transform transition-all duration-500 hover:scale-105 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30 ${shake ? 'animate-shake' : ''}`}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="text-8xl animate-float">{icon}</div>
        <div className="flex-1">
          <h2 className="font-pixel text-3xl md:text-4xl text-red-400 mb-6 pixel-text">
            {title}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            {description}
          </p>
          <button 
            className="px-10 py-5 bg-gradient-to-r from-red-700 to-red-900 font-pixel text-lg rounded-none border-4 border-red-500 arcade-btn hover:border-red-400 hover:from-red-600 hover:to-red-800"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
