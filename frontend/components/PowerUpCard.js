'use client'

/**
 * PowerUpCard Component
 * A reusable card component for displaying power-ups/features
 * 
 * @param {Object} props
 * @param {string} props.icon - Emoji icon for the power-up
 * @param {string} props.title - Power-up title
 * @param {string} props.description - Power-up description
 * @param {string} props.color - Tailwind color name (e.g., 'yellow', 'cyan')
 * @param {number} props.animationDelay - Animation delay in seconds
 */
export default function PowerUpCard({ 
  icon, 
  title, 
  description, 
  color = 'magenta',
  animationDelay = 0
}) {
  return (
    <div
      className="p-6 border-4 border-magenta-800 bg-gradient-to-br from-gray-900 to-black rounded-none transform transition-all duration-300 hover:scale-105 hover:border-magenta-400 hover:shadow-2xl hover:shadow-magenta-500/30 group animate-float"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="text-4xl mb-4 text-center">{icon}</div>
      <h3 className={`font-pixel text-xl text-${color}-400 text-center mb-3 pixel-text`}>
        {title}
      </h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  )
}
