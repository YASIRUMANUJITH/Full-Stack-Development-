export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function request(path, options = {}) {
  const token = localStorage.getItem('syncboard:token')
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers })
  } catch {
    const error = new Error('Network unavailable — check your connection and try again')
    error.isNetworkError = true
    throw error
  }
  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('syncboard:token')
      window.dispatchEvent(new Event('auth:expired'))
    }
    const error = new Error(body.error?.message || `Request failed: ${res.status}`)
    error.status = res.status
    error.code = body.error?.code
    error.details = body.error?.details
    throw error
  }
  return body.data
}
