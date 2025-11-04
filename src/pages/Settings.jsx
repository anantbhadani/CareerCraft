import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Shield, Trash2, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const Settings = () => {
  const [theme, setTheme] = useState('dark')
  const [privacyMode, setPrivacyMode] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedPrivacy = localStorage.getItem('privacyMode')
    
    if (savedTheme) setTheme(savedTheme)
    if (savedPrivacy !== null) setPrivacyMode(JSON.parse(savedPrivacy))
  }, [])

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    toast.success(`Theme switched to ${newTheme}`)
    // Note: Full theme implementation would require CSS variables
  }

  const handlePrivacyToggle = () => {
    setPrivacyMode(!privacyMode)
    localStorage.setItem('privacyMode', JSON.stringify(!privacyMode))
    toast.success(`Privacy mode ${!privacyMode ? 'enabled' : 'disabled'}`)
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all local data? This cannot be undone.')) {
      localStorage.clear()
      toast.success('All data cleared')
      window.location.reload()
    }
  }

  const handleExportData = () => {
    const data = {
      profile: localStorage.getItem('userProfile'),
      skills: localStorage.getItem('skillProgress'),
      scans: localStorage.getItem('scanHistory'),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'careercraft-data.json'
    a.click()
    toast.success('Data exported successfully')
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            Settings
          </h1>
        </motion.div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 border border-accent/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? (
                  <Moon className="w-6 h-6 text-accent" />
                ) : (
                  <Sun className="w-6 h-6 text-accent" />
                )}
                <div>
                  <h3 className="text-xl font-semibold">Theme</h3>
                  <p className="text-sm text-neutral/60">Switch between dark and light mode</p>
                </div>
              </div>
              <button
                onClick={handleThemeToggle}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-accent' : 'bg-neutral/30'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Privacy Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-accent/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="text-xl font-semibold">Privacy Mode</h3>
                  <p className="text-sm text-neutral/60">
                    {privacyMode
                      ? 'Your data is stored locally only'
                      : 'Data may be synced to cloud (if enabled)'}
                  </p>
                </div>
              </div>
              <button
                onClick={handlePrivacyToggle}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  privacyMode ? 'bg-green-500' : 'bg-neutral/30'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    privacyMode ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-accent/20"
          >
            <h3 className="text-xl font-semibold mb-4">Data Management</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleExportData}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent/20 hover:bg-accent/30 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Export Data</span>
              </button>
              <button
                onClick={handleClearData}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Clear All Data</span>
              </button>
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 border border-accent/20 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">CareerCraft</h3>
            <p className="text-neutral/60 mb-4">Version 1.0.0</p>
            <p className="text-sm text-neutral/40">
              Built with ❤️ • Powered by AI & Open Source
            </p>
            <p className="text-sm text-neutral/40 mt-2">
              License: MIT
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Settings

