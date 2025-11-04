import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Sparkles, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { analyzeResume } from '../utils/api'
import toast from 'react-hot-toast'
import ATSScoreMeter from '../components/ATSScoreMeter'
import KeywordHeatmap from '../components/KeywordHeatmap'
import RewriteSuggestions from '../components/RewriteSuggestions'
import SectionAnalysis from '../components/SectionAnalysis'

const Dashboard = () => {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (file) => {
    if (file.type !== 'application/pdf' && !file.name.endsWith('.docx')) {
      toast.error('Please upload a PDF or DOCX file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }
    setResumeFile(file)
    toast.success('File uploaded successfully')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) handleFileUpload(file)
  }

  const handleAnalyze = async () => {
    if (!resumeText && !resumeFile) {
      toast.error('Please upload a resume or paste text')
      return
    }
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      if (resumeFile) {
        formData.append('resume', resumeFile)
      } else {
        formData.append('resumeText', resumeText)
      }
      formData.append('jobDescription', jobDescription)

      const result = await analyzeResume(formData)
      setAnalysisResult(result)
      toast.success('Analysis complete!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Analysis failed')
    } finally {
      setLoading(false)
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
            Resume Analysis Dashboard
          </h1>
          <p className="text-neutral/80 text-lg">
            Upload your resume and job description to get instant ATS feedback
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Resume Upload Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-accent/20"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-accent" />
              <span>Resume</span>
            </h2>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive
                  ? 'border-accent bg-accent/10'
                  : 'border-neutral/30 hover:border-accent/50'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-neutral mb-2">Drag & drop or click to upload</p>
              <p className="text-sm text-neutral/60 mb-4">PDF or DOCX (max 5MB)</p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileInput}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="inline-block px-4 py-2 bg-accent/20 hover:bg-accent/30 rounded-lg cursor-pointer transition-colors"
              >
                Choose File
              </label>
              {resumeFile && (
                <p className="mt-4 text-sm text-accent">{resumeFile.name}</p>
              )}
            </div>

            <div className="mt-6">
              <p className="text-sm text-neutral/60 mb-2">Or paste your resume text:</p>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-48 bg-base/50 border border-neutral/20 rounded-xl p-4 text-neutral focus:outline-none focus:border-accent resize-none"
              />
            </div>
          </motion.div>

          {/* Job Description Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-accent/20"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-secondary" />
              <span>Job Description</span>
            </h2>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-96 bg-base/50 border border-neutral/20 rounded-xl p-4 text-neutral focus:outline-none focus:border-secondary resize-none"
            />
          </motion.div>
        </div>

        {/* Analyze Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-accent to-secondary rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Resume</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Results Section */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* ATS Score */}
            <div className="glass rounded-2xl p-8 border border-accent/20">
              <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-accent" />
                <span>ATS Compatibility Score</span>
              </h2>
              <ATSScoreMeter score={analysisResult.atsScore} />
            </div>

            {/* Keyword Heatmap */}
            <KeywordHeatmap
              matchedKeywords={analysisResult.matchedKeywords}
              missingKeywords={analysisResult.missingKeywords}
            />

            {/* Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Missing Skills */}
              {analysisResult.missingSkills?.length > 0 && (
                <div className="glass rounded-2xl p-6 border border-red-500/20">
                  <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>Missing Critical Skills</span>
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.missingSkills.map((skill, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-neutral">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Soft Skills */}
              <div className="glass rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Soft Skills Balance</span>
                </h3>
                <p className="text-neutral/80">
                  {analysisResult.softSkillsScore || 'Good'} soft skills detected
                </p>
              </div>
            </div>

            {/* Rewrite Suggestions */}
            {analysisResult.suggestions && (
              <RewriteSuggestions suggestions={analysisResult.suggestions} />
            )}

            {/* Detailed Section Analysis */}
            {analysisResult.sectionAnalysis && (
              <SectionAnalysis
                sectionAnalysis={analysisResult.sectionAnalysis}
                scoreBreakdown={analysisResult.scoreBreakdown}
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

