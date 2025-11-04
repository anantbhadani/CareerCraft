import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const analyzeResume = async (formData) => {
  const response = await api.post('/analyze', formData)
  return response.data
}

export const getSkillRecommendations = async (missingSkills) => {
  const response = await api.get('/skills', {
    params: { skills: missingSkills.join(',') },
  })
  return response.data
}

export const exportResume = async (optimizedData) => {
  const response = await api.post('/export', optimizedData, {
    responseType: 'blob',
  })
  return response.data
}

export default api

