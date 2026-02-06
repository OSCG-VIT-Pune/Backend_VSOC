'use client'

/**
 * SectionTitle Component
 * A reusable section title with arcade styling
 * 
 * @param {Object} props
 * @param {string} props.children - Title text
 * @param {string} props.color - Tailwind color name (e.g., 'cyan', 'magenta', 'green')
 * @param {boolean} props.withBorder - Whether to show bottom border
 * @param {string} props.className - Additional CSS classes
 */
export default function SectionTitle({ 
  children, 
  color = 'cyan',
  withBorder = false,
  className = ''
}) {
  return (
    <h2 className={`font-pixel text-3xl md:text-4xl text-center mb-12 text-${color}-400 pixel-text ${withBorder ? `border-b-4 border-${color}-800 pb-4` : ''} ${className}`}>
      {children}
    </h2>
  )
}
