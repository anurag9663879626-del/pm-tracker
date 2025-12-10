import api from '../api'

export async function register ({ name, email, password }) {
  const res = await api.post('/auth/register', { name, email, password })
  return res.data
}

export async function login ({ email, password }) {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

export function saveAuth (token, user) {
  localStorage.setItem('pm_token', token)
  localStorage.setItem('pm_user', JSON.stringify(user))
}

export function clearAuth () {
  localStorage.removeItem('pm_token')
  localStorage.removeItem('pm_user')
}

export function getAuthUser () {
  const s = localStorage.getItem('pm_user')
  return s ? JSON.parse(s) : null
}

export function getToken () {
  return localStorage.getItem('pm_token')
}
