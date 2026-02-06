'use client'

/**
 * ArcadeButton Component
 * A reusable arcade-style button with gradient backgrounds
 * 
 * @param {Object} props
 * @param {string} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.variant - Button variant: 'primary', 'secondary', 'danger'
 * @param {string} props.size - Button size: 'sm', 'md', 'lg'
 * @param {string} props.className - Additional CSS classes
 */
export default function ArcadeButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = ''
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-600 to-cyan-800 border-cyan-400 hover:border-cyan-300 hover:from-cyan-500 hover:to-cyan-700',
    secondary: 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600 hover:border-gray-500 hover:from-gray-700 hover:to-gray-800',
    danger: 'bg-gradient-to-r from-red-700 to-red-900 border-red-500 hover:border-red-400 hover:from-red-600 hover:to-red-800'
  }

  const sizes = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  }

  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} ${variants[variant]} font-pixel rounded-none border-4 arcade-btn ${className}`}
    >
      {children}
    </button>
  )
}
