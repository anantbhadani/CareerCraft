import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ATSScoreMeter = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const roundedScore = Math.round(score)
    const duration = 2000
    const steps = 60
    const increment = roundedScore / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= roundedScore) {
        setDisplayScore(roundedScore)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [score])

  const roundedScore = Math.round(score)
  
  const getColor = () => {
    if (roundedScore >= 80) return '#10b981' // green
    if (roundedScore >= 60) return '#38BDF8' // sky blue
    if (roundedScore >= 40) return '#f59e0b' // amber
    return '#ef4444' // red
  }

  const circumference = 2 * Math.PI * 90
  const offset = circumference - (displayScore / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-64 h-64">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            stroke="rgba(226, 232, 240, 0.1)"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="128"
            cy="128"
            r="90"
            stroke={getColor()}
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="text-6xl font-bold"
              style={{ color: getColor() }}
            >
              {displayScore}%
            </motion.div>
            <p className="text-neutral/60 mt-2 text-sm">ATS Score</p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-neutral/80">
          {roundedScore >= 80
            ? 'Excellent! Your resume is highly ATS-friendly.'
            : roundedScore >= 60
            ? 'Good job! Minor improvements can boost your score.'
            : roundedScore >= 40
            ? 'There\'s room for improvement. Focus on keywords and formatting.'
            : 'Your resume needs significant optimization for ATS systems.'}
        </p>
      </div>
    </div>
  )
}

export default ATSScoreMeter

