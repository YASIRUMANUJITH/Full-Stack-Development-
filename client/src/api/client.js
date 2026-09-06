const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function request(path, options = {}) {
  const token = localStorage.getItem('syncboard:token')
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('syncboard:token')
      window.dispatchEvent(new Event('auth:expired'))
    }
    const message = body.error?.message || `Request failed: ${res.status}`
    const error = new Error(message)
    error.details = body.error?.details
    throw error
  }
  return body.data
}
