import axios from 'axios'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

export function getStoredUser() {
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const AUTH_CHANGE_EVENT = 'shoppyglobe-auth-change'

function notifyAuthChange() {
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT))
}

export function setAuthSession({ token, user }) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  notifyAuthChange()
}

export function clearAuthSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  notifyAuthChange()
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('token'))
}
