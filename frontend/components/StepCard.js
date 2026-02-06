'use client'

/**
 * StepCard Component
 * A reusable card component for displaying process steps
 * 
 * @param {Object} props
 * @param {string} props.step - Step number (e.g., '01', '02')
 * @param {string} props.title - Step title
 * @param {string} props.description - Step description
 * @param {string} props.icon - Emoji icon for the step
 * @param {boolean} props.showArrow - Whether to show arrow to next step
 */
export default function StepCard({ 
  step, 
  title, 
  description, 
  icon,
  showArrow = false
}) {
  return (
    <div className="relative z-10">
      <div className="bg-black border-4 border-green-700 p-6 rounded-none text-center group hover:border-green-400 transition-all duration-300 animate-float">
        <div className="text-4xl mb-3">{icon}</div>
        <div className="font-pixel text-2xl text-green-400 mb-2 pixel-text">{step}</div>
        <h3 className="font-pixel text-lg text-white mb-2 pixel-text">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      {showArrow && (
        <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-green-400 font-pixel text-2xl">
          →
        </div>
      )}
    </div>
  )
}
