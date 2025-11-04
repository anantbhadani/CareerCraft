import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Target, TrendingUp } from 'lucide-react'

const Hero = () => {
  const features = [
    { icon: Zap, title: 'Instant Analysis', desc: 'Get ATS scores in seconds' },
    { icon: Target, title: 'Keyword Matching', desc: 'Find missing critical skills' },
    { icon: TrendingUp, title: 'Skill Growth', desc: 'Personalized learning paths' },
    { icon: Shield, title: 'Privacy First', desc: 'Your data stays secure' },
  ]

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent"
          >
            Get Past the Bots.
            <br />
            Build Your Career Smarter.
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral mb-8 max-w-2xl mx-auto"
          >
            Analyze resumes for ATS compatibility, compare with job descriptions,
            and unlock personalized skill development insights.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <span>Start Scan</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 border border-accent/20"
                >
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral/80">{feature.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Hero

