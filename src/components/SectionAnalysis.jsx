import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react'

const SectionAnalysis = ({ sectionAnalysis, scoreBreakdown }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'needs_improvement':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'border-green-500/30 bg-green-500/10'
      case 'needs_improvement':
        return 'border-yellow-500/30 bg-yellow-500/10'
      case 'critical':
        return 'border-red-500/30 bg-red-500/10'
      default:
        return 'border-neutral/20'
    }
  }

  const sections = [
    { key: 'contact', title: 'Contact Information', icon: '📧' },
    { key: 'summary', title: 'Professional Summary', icon: '📝' },
    { key: 'experience', title: 'Work Experience', icon: '💼' },
    { key: 'skills', title: 'Skills Section', icon: '🛠️' },
    { key: 'education', title: 'Education', icon: '🎓' },
    { key: 'formatting', title: 'Formatting & Structure', icon: '📄' },
  ]

  return (
    <div className="space-y-6">
      {/* Score Breakdown */}
      {scoreBreakdown && (
        <div className="glass rounded-2xl p-6 border border-accent/20">
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            <span>Score Breakdown</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{scoreBreakdown.keywords}</p>
              <p className="text-sm text-neutral/60">Keywords</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">{scoreBreakdown.actionVerbs}</p>
              <p className="text-sm text-neutral/60">Action Verbs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{scoreBreakdown.formatting}</p>
              <p className="text-sm text-neutral/60">Formatting</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{scoreBreakdown.softSkills}</p>
              <p className="text-sm text-neutral/60">Soft Skills</p>
            </div>
          </div>
        </div>
      )}

      {/* Section-by-Section Analysis */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold mb-4">Detailed Section Analysis</h3>
        {sections.map((section, idx) => {
          const analysis = sectionAnalysis[section.key]
          if (!analysis) return null

          return (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass rounded-xl p-6 border ${getStatusColor(analysis.status)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{section.icon}</span>
                  <div>
                    <h4 className="text-lg font-semibold">{section.title}</h4>
                    <p className="text-sm text-neutral/60">Score: {analysis.score}/100</p>
                  </div>
                </div>
                {getStatusIcon(analysis.status)}
              </div>

              {/* Issues */}
              {analysis.issues && analysis.issues.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-red-400 mb-2">Issues Found:</p>
                  <ul className="space-y-1">
                    {analysis.issues.map((issue, i) => (
                      <li key={i} className="text-sm text-neutral/80 flex items-start space-x-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-accent mb-2">Recommendations to Improve:</p>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-neutral flex items-start space-x-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success message if good */}
              {analysis.status === 'good' && analysis.issues.length === 0 && (
                <p className="text-sm text-green-400 mt-2">
                  ✓ This section looks great! No issues detected.
                </p>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SectionAnalysis

