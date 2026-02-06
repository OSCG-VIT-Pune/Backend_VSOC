// app/layout.js
import { Inter, Press_Start_2P, Silkscreen } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})
const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-silkscreen'
})

export const metadata = {
  title: 'VSoC | Vishwakarma Summer of Code',
  description: 'Join the ultimate open source coding challenge and showcase your skills!',
}

const starPositions = [
  { left: '10%', top: '15%', delay: '0.2s', duration: '25s', opacity: 0.4 },
  { left: '25%', top: '40%', delay: '1.5s', duration: '30s', opacity: 0.6 },
  { left: '40%', top: '10%', delay: '0.8s', duration: '35s', opacity: 0.5 },
  { left: '55%', top: '65%', delay: '2.1s', duration: '28s', opacity: 0.7 },
  { left: '70%', top: '25%', delay: '0.5s', duration: '32s', opacity: 0.4 },
  { left: '85%', top: '50%', delay: '1.8s', duration: '27s', opacity: 0.6 },
  { left: '15%', top: '75%', delay: '0.3s', duration: '40s', opacity: 0.5 },
  { left: '30%', top: '30%', delay: '1.2s', duration: '22s', opacity: 0.8 },
  { left: '45%', top: '55%', delay: '2.4s', duration: '38s', opacity: 0.4 },
  { left: '60%', top: '20%', delay: '0.7s', duration: '26s', opacity: 0.6 },
]

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${silkscreen.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen animate-crt-on`}>
        {/* Starfield Background - FIXED: Use animation property directly */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {starPositions.map((star, i) => (
            <div
              key={i}
              className="absolute size-[2px] bg-white rounded-full"
              style={{
                left: star.left,
                top: star.top,
                animation: `starfield ${star.duration} linear infinite ${star.delay}`,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        {/* Grid Background */}
        <div 
          className="fixed inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            animation: 'grid-move 20s linear infinite',
          }}
        />

        {/* CRT Scanlines */}
        <div className="fixed inset-0 z-10 pointer-events-none crt-effect">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)`,
            backgroundSize: '100% 4px',
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" 
            style={{ animation: 'scanline 8s linear infinite' }}
          ></div>
        </div>

        {/* Vignette Effect */}
        <div className="fixed inset-0 z-5 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.95) 100%)'
        }}></div>

        {/* Corner Decorations */}
        <div className="fixed top-4 left-4 z-30 size-8 border-4 border-gray-600 rounded-full"></div>
        <div className="fixed top-4 right-4 z-30 size-8 border-4 border-gray-600 rounded-full"></div>
        <div className="fixed bottom-4 left-4 z-30 size-8 border-4 border-gray-600 rounded-full"></div>
        <div className="fixed bottom-4 right-4 z-30 size-8 border-4 border-gray-600 rounded-full"></div>

        {/* Cabinet Border */}
        <div className="fixed inset-8 z-20 border-8 border-gray-800 pointer-events-none rounded-lg">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-t-lg"></div>
        </div>

        {children}

        {/* Audio Visualizer - FIXED: Use inline animation property */}
        <div className="fixed bottom-8 left-8 z-50 flex items-end gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-500 to-magenta-500"
              style={{
                height: '15px',
                animation: `pulse-glow 0.8s ease-in-out infinite ${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>

      </body>
    </html>
  )
}