'use client'

/**
 * SocialButton Component
 * A reusable button for social media links
 * 
 * @param {Object} props
 * @param {string} props.icon - Emoji or icon to display
 * @param {string} props.href - Link URL (optional)
 * @param {Function} props.onClick - Click handler (optional)
 * @param {string} props.ariaLabel - Accessibility label
 */
export default function SocialButton({ 
  icon, 
  href, 
  onClick,
  ariaLabel 
}) {
  const className = "w-14 h-14 border-2 border-gray-700 flex items-center justify-center text-2xl bg-gray-900/50 hover:bg-cyan-900/30 hover:border-cyan-500 transition-all duration-300"
  
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {icon}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  )
}
