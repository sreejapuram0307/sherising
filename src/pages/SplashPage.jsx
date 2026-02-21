import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientBackground from '../components/GradientBackground'

const SplashPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <GradientBackground>
      <div className="min-h-screen flex items-center justify-center animate-fade-in">
        <div className="text-center px-6">
          {/* Large circular illustration placeholder */}
          <div className="w-48 h-48 mx-auto mb-12 rounded-full bg-gradient-to-br from-orange-300 via-pink-300 to-purple-400 shadow-[0_0_80px_rgba(236,72,153,0.5)] flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <span className="text-6xl">✨</span>
            </div>
          </div>

          {/* Elegant heading with gradient */}
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            SheRise
          </h1>

          {/* Tagline */}
          <p className="text-xl text-gray-700 font-medium tracking-wide">
            From Voice to Business
          </p>

          <p className="text-sm text-gray-600 mt-6 italic">
            Empowering women entrepreneurs, one dream at a time
          </p>
        </div>
      </div>
    </GradientBackground>
  )
}

export default SplashPage
