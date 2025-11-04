import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { getSkillRecommendations } from '../utils/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const [progressData, setProgressData] = useState([])

  // Load from localStorage
  useEffect(() => {
    const savedSkills = localStorage.getItem('skillProgress')
    if (savedSkills) {
      const parsed = JSON.parse(savedSkills)
      setSkills(parsed.skills || [])
      setProgressData(parsed.progress || [])
    } else {
      // Mock data for demonstration
      loadMockRecommendations()
    }
  }, [])

  const loadMockRecommendations = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockSkills = [
        {
          name: 'Python Programming',
          status: 'in_progress',
          resources: [
            { name: 'Python Crash Course', type: 'course', url: 'https://coursera.org', platform: 'Coursera' },
            { name: 'Learn Python', type: 'tutorial', url: 'https://freecodecamp.org', platform: 'freeCodeCamp' },
          ],
          githubProject: 'Build a REST API using Flask',
        },
        {
          name: 'React.js',
          status: 'pending',
          resources: [
            { name: 'React Complete Guide', type: 'course', url: 'https://udemy.com', platform: 'Udemy' },
          ],
          githubProject: 'Create a todo app with hooks',
        },
        {
          name: 'Machine Learning',
          status: 'pending',
          resources: [
            { name: 'ML Specialization', type: 'course', url: 'https://coursera.org', platform: 'Coursera' },
          ],
          githubProject: 'Train a sentiment analysis model',
        },
      ]
      setSkills(mockSkills)
      setLoading(false)
    }, 1000)
  }

  const updateSkillStatus = (index, status) => {
    const updated = [...skills]
    updated[index].status = status
    setSkills(updated)
    saveToLocalStorage(updated, progressData)
    toast.success(`Skill marked as ${status === 'mastered' ? 'mastered' : 'in progress'}`)
  }

  const saveToLocalStorage = (skillsData, progressData) => {
    localStorage.setItem('skillProgress', JSON.stringify({ skills: skillsData, progress: progressData }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'mastered':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-neutral/10 text-neutral border-neutral/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'mastered':
        return <CheckCircle className="w-5 h-5" />
      case 'in_progress':
        return <Clock className="w-5 h-5" />
      default:
        return null
    }
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
            Skill Development Planner
          </h1>
          <p className="text-neutral/80 text-lg">
            Personalized learning paths based on your career goals
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Skills List */}
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 border border-accent/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{skill.name}</h3>
                    <span
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm border ${getStatusColor(
                        skill.status
                      )}`}
                    >
                      {getStatusIcon(skill.status)}
                      <span className="capitalize">{skill.status?.replace('_', ' ')}</span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {skill.status !== 'mastered' && (
                      <button
                        onClick={() => updateSkillStatus(index, 'in_progress')}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm"
                      >
                        Start Learning
                      </button>
                    )}
                    {skill.status !== 'mastered' && (
                      <button
                        onClick={() => updateSkillStatus(index, 'mastered')}
                        className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm"
                      >
                        Mark Mastered
                      </button>
                    )}
                  </div>
                </div>

                {/* Learning Resources */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    <span>Learning Resources</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skill.resources?.map((resource, rIdx) => (
                      <a
                        key={rIdx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass rounded-lg p-4 hover:border-accent/50 transition-colors border border-neutral/20 flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-sm text-neutral/60">{resource.platform}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral/60 group-hover:text-accent transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* GitHub Project */}
                {skill.githubProject && (
                  <div className="bg-base/50 rounded-lg p-4 border border-neutral/20">
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                      <span>Practice Project</span>
                    </h4>
                    <p className="text-neutral/80">{skill.githubProject}</p>
                  </div>
                )}
              </motion.div>
            ))}

            {skills.length === 0 && (
              <div className="text-center py-12 glass rounded-2xl">
                <p className="text-neutral/60">No skill recommendations yet.</p>
                <p className="text-sm text-neutral/40 mt-2">
                  Analyze a resume to get personalized skill suggestions.
                </p>
              </div>
            )}

            {/* Progress Chart */}
            {progressData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 border border-accent/20"
              >
                <h3 className="text-2xl font-semibold mb-6">Skill Growth Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.1)" />
                    <XAxis dataKey="date" stroke="#E2E8F0" />
                    <YAxis stroke="#E2E8F0" />
                    <Tooltip
                      contentStyle={{
                        background: '#1e293b',
                        border: '1px solid #38BDF8',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="skills"
                      stroke="#38BDF8"
                      strokeWidth={2}
                      dot={{ fill: '#38BDF8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Skills

