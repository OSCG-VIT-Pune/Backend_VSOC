'use client'

/**
 * CoinAnimation Component
 * A reusable coin animation overlay
 * 
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the animation
 * @param {string} props.icon - Icon to animate (default: '🪙')
 */
export default function CoinAnimation({ 
  show = false, 
  icon = '🪙' 
}) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="text-6xl animate-coin-spin">{icon}</div>
    </div>
  )
}
