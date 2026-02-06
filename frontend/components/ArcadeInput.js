'use client'

import { useState } from 'react'

export default function ArcadeInput({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  required = false,
  maxLength,
  error,
  success
}) {
  const [focused, setFocused] = useState(false)

  const borderColor = error 
    ? 'border-red-500' 
    : success 
    ? 'border-green-500' 
    : focused 
    ? 'border-cyan-400' 
    : 'border-cyan-700'

  const glowColor = error 
    ? 'shadow-red-500/50' 
    : success 
    ? 'shadow-green-500/50' 
    : 'shadow-cyan-500/50'

  return (
    <div className="mb-6">
      {/* Label */}
      <label 
        htmlFor={name} 
        className="block font-pixel text-sm text-cyan-400 mb-2 pixel-text"
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className={`
            w-full px-4 py-3 
            bg-gray-900 
            border-4 ${borderColor}
            rounded-none
            text-white font-sans
            focus:outline-none
            transition-all duration-300
            ${focused ? `shadow-lg ${glowColor}` : ''}
            ${error ? 'animate-shake' : ''}
            ${success ? 'animate-pulse-glow' : ''}
          `}
        />

        {/* Character Counter */}
        {maxLength && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 font-pixel text-xs text-gray-500">
            {value?.length || 0}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 font-pixel text-xs text-red-400 animate-slide-down">
          ⚠ {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-2 font-pixel text-xs text-green-400 animate-slide-down">
          ✓ {success}
        </div>
      )}
    </div>
  )
}
