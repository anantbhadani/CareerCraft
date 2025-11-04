import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const RewriteSuggestions = ({ suggestions = [] }) => {
  return (
    <div className="glass rounded-2xl p-8 border border-accent/20">
      <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
        <Sparkles className="w-6 h-6 text-secondary" />
        <span>Suggested Rewrites</span>
      </h2>

      <div className="space-y-6">
        {suggestions.map((suggestion, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-base/50 rounded-xl p-6 border border-neutral/20"
          >
            <div className="mb-3">
              <p className="text-sm text-neutral/60 mb-2">Current:</p>
              <p className="text-neutral/80 line-through">{suggestion.current}</p>
            </div>
            <div>
              <p className="text-sm text-accent mb-2 font-semibold">Suggested:</p>
              <p className="text-neutral">{suggestion.suggested}</p>
            </div>
            {suggestion.reason && (
              <p className="text-sm text-neutral/60 mt-2 italic">💡 {suggestion.reason}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default RewriteSuggestions

