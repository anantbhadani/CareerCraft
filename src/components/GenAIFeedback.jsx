import { motion } from 'framer-motion'
import { Sparkles, CheckCircle, XCircle, Lightbulb, TrendingUp } from 'lucide-react'

const GenAIFeedback = ({ genAI }) => {
  if (!genAI || !genAI.aiFeedback) {
    return null
  }

  const { overallSummary, strengths, weaknesses, improvementTips, optimizedPhrases, recommendations } = genAI

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      {overallSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 border border-accent/20"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-secondary" />
            <span>AI-Powered Analysis Summary</span>
          </h3>
          <p className="text-neutral/80 leading-relaxed">{overallSummary}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        {strengths && strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-6 border border-green-500/20"
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>Key Strengths</span>
            </h4>
            <ul className="space-y-2">
              {strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-neutral">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Weaknesses */}
        {weaknesses && weaknesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-6 border border-red-500/20"
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-red-400">
              <XCircle className="w-5 h-5" />
              <span>Areas for Improvement</span>
            </h4>
            <ul className="space-y-2">
              {weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-neutral">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Improvement Tips */}
      {improvementTips && improvementTips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 border border-accent/20"
        >
          <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            <span>AI Improvement Tips</span>
          </h4>
          <div className="space-y-4">
            {improvementTips.map((tip, idx) => (
              <div key={idx} className="bg-base/50 rounded-lg p-4 border border-neutral/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-accent">{tip.category || 'General'}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      tip.priority === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : tip.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {tip.priority || 'medium'}
                  </span>
                </div>
                <p className="text-neutral/80">{tip.tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Optimized Phrases */}
      {optimizedPhrases && optimizedPhrases.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 border border-secondary/20"
        >
          <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-secondary">
            <TrendingUp className="w-5 h-5" />
            <span>AI-Optimized Phrases</span>
          </h4>
          <div className="space-y-4">
            {optimizedPhrases.map((phrase, idx) => (
              <div key={idx} className="bg-base/50 rounded-lg p-4 border border-neutral/20">
                <div className="mb-2">
                  <p className="text-sm text-neutral/60 mb-1">Current:</p>
                  <p className="text-neutral/80 line-through">{phrase.original}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1 font-semibold">Optimized:</p>
                  <p className="text-neutral">{phrase.optimized}</p>
                </div>
                {phrase.reason && (
                  <p className="text-xs text-neutral/60 mt-2 italic">💡 {phrase.reason}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 border border-accent/20"
        >
          <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span>AI Recommendations</span>
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-neutral">
                <span className="text-accent mt-1">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default GenAIFeedback

