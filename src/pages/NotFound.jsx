import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search, FileText, Sparkles } from 'lucide-react'

const NotFound = () => {
  const quickLinks = [
    { path: '/', icon: Home, label: 'Home', desc: 'Go to homepage' },
    { path: '/dashboard', icon: FileText, label: 'Dashboard', desc: 'Analyze your resume' },
    { path: '/jobs', icon: Search, label: 'Jobs', desc: 'Find opportunities' },
  ]

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
            <br />
            Don't worry, we'll help you find your way back.
          </p>
        </motion.div>

        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="mb-12 flex justify-center"
        >
          <div className="glass rounded-full p-8 border border-accent/20">
            <Sparkles className="w-16 h-16 text-accent" />
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-neutral/80">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.div
                  key={link.path}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Link
                    to={link.path}
                    className="block glass rounded-2xl p-6 border border-accent/20 hover:border-accent/40 transition-all duration-200 group"
                  >
                    <Icon className="w-8 h-8 text-accent mb-3 mx-auto group-hover:text-secondary transition-colors" />
                    <h4 className="font-semibold text-neutral mb-1">{link.label}</h4>
                    <p className="text-sm text-neutral/60">{link.desc}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-accent/20 hover:bg-accent/30 text-accent rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex justify-center space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound

