import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Attach token from localStorage if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('pm_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor: auto-logout on 401 to keep UX consistent
api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status
    if (status === 401) {
      try {
        localStorage.removeItem('pm_token')
        localStorage.removeItem('pm_user')
      } catch (e) {}
      // redirect to login page (SPA)
      if (typeof window !== 'undefined') window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
