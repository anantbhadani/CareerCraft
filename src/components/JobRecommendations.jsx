import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, DollarSign, ExternalLink, TrendingUp, Sparkles, X } from 'lucide-react'
import { getJobRecommendations } from '../utils/api'
import toast from 'react-hot-toast'

const JobRecommendations = ({ resumeText, analysisResult }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [resumeContent, setResumeContent] = useState(resumeText)

  useEffect(() => {
    // Get resume text from various sources
    let content = resumeText
    
    // If no text but we have analysis result, try to extract from it
    if (!content && analysisResult) {
      // We can't get full resume text from analysis, but we can use skills
      content = localStorage.getItem('lastResumeText') || ''
    }
    
    // Fallback to localStorage
    if (!content) {
      content = localStorage.getItem('lastResumeText') || ''
    }
    
    setResumeContent(content)
    
    if (content) {
      loadRecommendations(content)
    }
  }, [resumeText, analysisResult])

  const loadRecommendations = async (resume = resumeContent) => {
    if (!resume || !resume.trim()) {
      toast.error('No resume data available')
      return
    }

    setLoading(true)
    try {
      const result = await getJobRecommendations(resume, location)
      setJobs(result.jobs || [])
      if (result.jobs?.length === 0) {
        toast.info('No matching jobs found. Try adjusting location filter.')
      } else {
        toast.success(`Found ${result.jobs.length} job recommendations!`)
      }
    } catch (error) {
      toast.error('Failed to load job recommendations')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
    if (resumeContent) {
      loadRecommendations(resumeContent)
    }
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 border border-accent/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2 flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-accent" />
            <span>Job Recommendations</span>
          </h2>
          <p className="text-neutral/60 text-sm">
            Based on your resume analysis
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-accent/20 hover:bg-accent/30 rounded-lg transition-colors text-sm"
        >
          {showFilters ? 'Hide' : 'Filter'}
        </button>
      </div>

      {/* Location Filter */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 bg-base/50 rounded-xl p-4 border border-neutral/20"
        >
          <label className="block text-sm font-medium text-neutral/80 mb-2">
            Location Filter (optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco, CA or Remote"
              className="flex-1 bg-base border border-neutral/20 rounded-lg p-3 text-neutral focus:outline-none focus:border-accent"
            />
            <button
              onClick={() => loadRecommendations(resumeContent)}
              disabled={loading || !resumeContent}
              className="px-6 py-3 bg-accent hover:bg-accent/80 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            {['Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX'].map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocationChange(loc)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  location === loc
                    ? 'bg-accent text-white'
                    : 'bg-neutral/10 text-neutral/60 hover:bg-neutral/20'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral/60">Finding the best jobs for you...</p>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass rounded-xl p-6 border ${getMatchBgColor(job.matchScore)} hover:scale-105 transition-transform duration-200 cursor-pointer`}
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
                    onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
                >
                  View Job
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && resumeContent && (
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-neutral/30 mx-auto mb-4" />
          <p className="text-neutral/60">No job recommendations found.</p>
          <p className="text-sm text-neutral/40 mt-2">
            Try adjusting your location filter or check back later.
          </p>
        </div>
      )}

      {/* No Resume State */}
      {!loading && !resumeContent && (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 text-neutral/30 mx-auto mb-4" />
          <p className="text-neutral/60">Analyze a resume first to see job recommendations.</p>
          <p className="text-sm text-neutral/40 mt-2">
            Go back to the top and analyze your resume to get personalized job matches.
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default JobRecommendations

