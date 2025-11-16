# CareerCraft 🚀

**Get Past the Bots. Build Your Career Smarter.**

CareerCraft is an AI-powered resume analysis and career development platform that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS), discover personalized job opportunities, and build the skills needed to advance their careers.

## 📖 Introduction

In today's competitive job market, most resumes are filtered by ATS before they even reach human recruiters. CareerCraft bridges this gap by providing intelligent resume analysis, keyword optimization, and personalized career guidance. The platform combines advanced resume parsing, job matching algorithms, and AI-powered feedback to help users create ATS-friendly resumes and identify the best career opportunities.

Whether you're a recent graduate or an experienced professional, CareerCraft provides actionable insights to improve your resume's visibility, match with relevant job postings, and develop the skills that employers are looking for.

## 🎯 How It Works

1. **Resume Upload & Analysis**: Users can upload their resume (PDF/DOCX) or paste resume text, along with a target job description.

2. **ATS Compatibility Scoring**: The platform analyzes the resume against the job description, calculating an ATS compatibility score based on keyword matching, formatting, and content quality.

3. **Detailed Feedback**: Users receive comprehensive feedback including:
   - Matched and missing keywords visualization
   - Section-by-section analysis
   - AI-powered improvement suggestions
   - Optimized phrase recommendations

4. **Job Recommendations**: Based on the resume analysis, the system recommends relevant job opportunities with match scores and skill gap analysis.

5. **Skill Development**: The platform identifies missing skills and provides personalized learning paths with curated resources and practice projects.

## ✨ Features

### 🔍 Resume Analysis
- **ATS Score Calculation**: Real-time compatibility scoring (0-100%) with visual progress indicators
- **Keyword Heatmap**: Interactive visualization of matched and missing keywords from job descriptions
- **Section Analysis**: Detailed breakdown of resume sections (Experience, Education, Skills, etc.)
- **File Support**: Upload PDF or DOCX files, or paste resume text directly
- **Drag & Drop Interface**: Intuitive file upload with drag-and-drop support

### 🤖 AI-Powered Insights
- **GenAI Feedback**: Comprehensive AI analysis with strengths, weaknesses, and improvement tips
- **Optimized Phrases**: AI-suggested phrase replacements to improve ATS compatibility
- **Priority-Based Recommendations**: Categorized suggestions (high/medium/low priority)
- **Overall Summary**: Executive summary of resume quality and optimization opportunities

### 💼 Job Recommendations
- **Intelligent Matching**: Job recommendations based on resume content and skills
- **Match Scoring**: Percentage-based compatibility scores for each job listing
- **Location Filtering**: Filter jobs by location (Remote, specific cities, etc.)
- **Skill Gap Analysis**: Shows matched and missing skills for each position
- **Direct Application Links**: Quick access to job postings

### 📚 Skill Development Planner
- **Personalized Learning Paths**: Customized skill development recommendations
- **Curated Resources**: Links to courses, tutorials, and learning platforms
- **Practice Projects**: GitHub project suggestions to build practical experience
- **Progress Tracking**: Visual charts showing skill growth over time
- **Status Management**: Track skills as pending, in progress, or mastered

### 🎨 User Experience
- **Modern UI/UX**: Beautiful glassmorphism design with smooth animations
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark theme optimized for extended use
- **Real-time Feedback**: Instant notifications and toast messages
- **Smooth Animations**: Framer Motion powered transitions and interactions

## 🛠️ Technologies & Tools Used

### Frontend Framework
- **React 18.2.0** - Modern UI library with hooks and component-based architecture
- **React Router DOM 6.20.0** - Client-side routing and navigation
- **Vite 5.0.8** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Animation library for smooth transitions
- **Lucide React 0.294.0** - Beautiful icon library
- **Custom Glassmorphism** - Modern glass-effect UI components

### Data Visualization
- **Recharts 2.10.3** - Composable charting library for progress tracking

### HTTP & API
- **Axios 1.6.2** - Promise-based HTTP client for API requests
- **RESTful API Integration** - Backend API communication

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing with Autoprefixer
- **Git** - Version control

### Backend Integration
- **REST API** - Integration with CareerCraft backend service (deployed on Render)

## 🚀 How to Run the Project Locally

### Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/anantbhadani/CareerCraft.git
   cd CareerCraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or if using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables** (Optional)
   
   Create a `.env` file in the root directory if you want to use a custom backend URL:
   ```env
   VITE_API_URL=https://careercraft-be-im3c.onrender.com/api
   ```
   
   If not provided, the app will use the default backend URL.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🔮 Future Updates

We're continuously working to improve CareerCraft. Here are some planned features and enhancements:

### Short-term Roadmap
- **Resume Export**: Download optimized resume in PDF/DOCX format with suggested improvements applied
- **Multi-resume Management**: Save and manage multiple resume versions
- **Job Application Tracker**: Track application status and interview scheduling
- **Cover Letter Generator**: AI-powered cover letter generation based on job descriptions
- **Interview Preparation**: Mock interview questions and preparation tips based on job requirements

### Medium-term Enhancements
- **User Authentication**: Sign up/login system with profile management
- **Resume Templates**: Pre-designed ATS-friendly resume templates
- **LinkedIn Integration**: Import profile data and sync with LinkedIn
- **Email Notifications**: Alerts for new job matches and skill recommendations
- **Advanced Analytics**: Detailed analytics dashboard with resume performance metrics
- **Collaborative Features**: Share resume analysis with mentors or career coaches

### Long-term Vision
- **Mobile App**: Native iOS and Android applications
- **Browser Extension**: Quick resume analysis while browsing job postings
- **AI Resume Writer**: Complete AI-powered resume creation from scratch
- **Industry-Specific Insights**: Tailored recommendations based on industry trends
- **Salary Insights**: Market rate analysis based on skills and experience
- **Career Path Visualization**: Interactive career progression maps
- **Community Features**: User forums and peer feedback system

### Technical Improvements
- **Performance Optimization**: Code splitting, lazy loading, and caching strategies
- **Offline Support**: Progressive Web App (PWA) capabilities
- **Internationalization**: Multi-language support
- **Accessibility**: Enhanced WCAG compliance and screen reader support
- **Testing**: Comprehensive unit and integration test coverage


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📧 Contact & Support

For questions, suggestions, or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ to help job seekers succeed in their career journey.**

