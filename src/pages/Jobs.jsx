import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, DollarSign, ExternalLink, TrendingUp, Sparkles } from 'lucide-react'
import { getJobRecommendations } from '../utils/api'
import toast from 'react-hot-toast'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState('')
  const [resumeText, setResumeText] = useState('')

  useEffect(() => {
    // Load resume text from localStorage if available
    const savedResume = localStorage.getItem('lastResumeText')
    if (savedResume) {
      setResumeText(savedResume)
      // Don't auto-load - let user click "Find Jobs" button
      // This reduces unnecessary API calls
      // loadRecommendations(savedResume)
    } else {
      // If no resume in localStorage, show message to analyze first
      toast.info('Please analyze a resume in Dashboard first')
    }
  }, [])

  const loadRecommendations = async (resume = resumeText) => {
    if (!resume.trim()) {
      toast.error('Please analyze a resume first or paste your resume text')
      return
    }

    setLoading(true)
    try {
      const result = await getJobRecommendations(resume, location)
      setJobs(result.jobs || [])
      if (result.jobs?.length === 0) {
        toast.info('No matching jobs found. Try adjusting your skills or location.')
      }
    } catch (error) {
      toast.error('Failed to load job recommendations')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    loadRecommendations()
  }

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-blue-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getMatchBgColor = (score) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30'
    if (score >= 60) return 'bg-blue-500/20 border-blue-500/30'
    if (score >= 40) return 'bg-yellow-500/20 border-yellow-500/30'
    return 'bg-red-500/20 border-red-500/30'
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            Job Recommendations
          </h1>
          <p className="text-neutral/80 text-lg">
            Discover jobs that match your skills and experience
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 border border-accent/20 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-neutral/80 mb-2">
                Resume Text (or analyze a resume first)
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-32 bg-base/50 border border-neutral/20 rounded-xl p-4 text-neutral focus:outline-none focus:border-accent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral/80 mb-2">
                Location (optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco, CA or Remote"
                className="w-full bg-base/50 border border-neutral/20 rounded-xl p-4 text-neutral focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !resumeText.trim()}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-accent to-secondary rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Searching Jobs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Find Jobs</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Jobs Grid */}
        {jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`glass rounded-2xl p-6 border ${getMatchBgColor(job.matchScore)} hover:scale-105 transition-transform duration-200`}
              >
                {/* Match Score Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-lg ${getMatchBgColor(job.matchScore)} border`}>
                    <span className={`text-sm font-semibold ${getMatchColor(job.matchScore)}`}>
                      {job.matchScore}% Match
                    </span>
                  </div>
                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-secondary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Job Title */}
                <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <span>{job.title}</span>
                </h3>

                {/* Company */}
                <p className="text-neutral/80 mb-3">{job.company}</p>

                {/* Location */}
                <div className="flex items-center space-x-2 text-neutral/60 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>

                {/* Salary */}
                {job.salary && (
                  <div className="flex items-center space-x-2 text-neutral/60 mb-4">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                )}

                {/* Matched Skills */}
                {job.matchedSkills && job.matchedSkills.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-green-400 mb-2 font-semibold">Matched Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.matchedSkills.slice(0, 5).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded border border-green-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {job.missingSkills && job.missingSkills.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-red-400 mb-2 font-semibold">Missing Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded border border-red-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {job.description && (
                  <p className="text-sm text-neutral/70 line-clamp-3 mb-4">
                    {job.description}
                  </p>
                )}

                {/* View Job Button */}
                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg transition-colors text-sm font-medium"
                  >
                    View Job
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && resumeText && (
          <div className="text-center py-12 glass rounded-2xl">
            <TrendingUp className="w-16 h-16 text-neutral/30 mx-auto mb-4" />
            <p className="text-neutral/60">No job recommendations found.</p>
            <p className="text-sm text-neutral/40 mt-2">
              Try adjusting your location filter or check back later.
            </p>
          </div>
        )}

        {/* No Resume State */}
        {!loading && !resumeText && (
          <div className="text-center py-12 glass rounded-2xl">
            <Sparkles className="w-16 h-16 text-neutral/30 mx-auto mb-4" />
            <p className="text-neutral/60">No resume data available.</p>
            <p className="text-sm text-neutral/40 mt-2">
              Please go to Dashboard and analyze a resume first to get personalized job recommendations.
            </p>
            <a
              href="/dashboard"
              className="inline-block mt-4 px-6 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs

