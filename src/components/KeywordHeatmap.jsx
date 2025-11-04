import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

const KeywordHeatmap = ({ matchedKeywords = [], missingKeywords = [] }) => {
  const getIntensity = (index, total) => {
    // Create gradient effect based on position
    return Math.floor((index / total) * 100) + 20
  }

  return (
    <div className="glass rounded-2xl p-8 border border-accent/20">
      <h2 className="text-2xl font-semibold mb-6">Keyword Analysis</h2>

      {/* Matched Keywords */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span>Matched Keywords ({matchedKeywords.length})</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {matchedKeywords.map((keyword, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: `rgba(16, 185, 129, ${getIntensity(idx, matchedKeywords.length) / 100})`,
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              {keyword}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      {missingKeywords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-red-400">
            <XCircle className="w-5 h-5" />
            <span>Missing Keywords ({missingKeywords.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: `rgba(239, 68, 68, ${getIntensity(idx, missingKeywords.length) / 100})`,
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                }}
              >
                {keyword}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default KeywordHeatmap

