// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['var(--font-press-start)', 'monospace'],
        'silkscreen': ['var(--font-silkscreen)', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'xp-bar': 'xp-bar 2s ease-in-out infinite',
        'grid': 'grid-move 15s linear infinite',
        'shake': 'shake 0.5s ease-in-out infinite',
        'coin-spin': 'coin-spin 2s linear infinite',
        'starfield': 'starfield 50s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      colors: {
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'neon-green': '#00ff00',
      },
    },
  },
  plugins: [],
}