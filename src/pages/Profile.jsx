import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Briefcase, Calendar, FileText, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'User',
    profession: 'Software Developer',
    email: 'user@example.com',
    joinedDate: new Date().toLocaleDateString(),
  })
  const [scanHistory, setScanHistory] = useState([])

  useEffect(() => {
    // Load from localStorage
    const savedProfile = localStorage.getItem('userProfile')
    const savedHistory = localStorage.getItem('scanHistory')

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
    if (savedHistory) {
      setScanHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleProfileUpdate = (field, value) => {
    const updated = { ...profile, [field]: value }
    setProfile(updated)
    localStorage.setItem('userProfile', JSON.stringify(updated))
    toast.success('Profile updated!')
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
            My Profile
          </h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 border border-accent/20 mb-8"
        >
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center text-4xl font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                className="text-3xl font-bold bg-transparent border-none outline-none focus:border-b-2 focus:border-accent mb-2 w-full"
              />
              <div className="flex items-center space-x-4 text-neutral/80">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <input
                    type="text"
                    value={profile.profession}
                    onChange={(e) => handleProfileUpdate('profession', e.target.value)}
                    className="bg-transparent border-none outline-none focus:border-b focus:border-accent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profile.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-accent" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileUpdate('email', e.target.value)}
                className="flex-1 bg-base/50 border border-neutral/20 rounded-lg px-4 py-2 focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </motion.div>

        {/* Scan History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 border border-accent/20"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <FileText className="w-6 h-6 text-accent" />
            <span>Saved Scans ({scanHistory.length})</span>
          </h2>

          {scanHistory.length > 0 ? (
            <div className="space-y-4">
              {scanHistory.map((scan, idx) => (
                <div
                  key={idx}
                  className="bg-base/50 rounded-lg p-4 border border-neutral/20 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{scan.jobTitle || 'Untitled Scan'}</p>
                    <p className="text-sm text-neutral/60">
                      Score: {scan.score}% • {scan.date}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-accent/20 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-accent" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-neutral/30 mx-auto mb-4" />
              <p className="text-neutral/60">No saved scans yet.</p>
              <p className="text-sm text-neutral/40 mt-2">
                Analyze a resume to see your scan history here.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile

