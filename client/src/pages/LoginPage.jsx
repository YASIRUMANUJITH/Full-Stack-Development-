import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const errors = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ''
      : 'Enter a valid email address.',
    password:
      password.length >= 8 ? '' : 'Password must be at least 8 characters.',
  }
  const isValid = !errors.email && !errors.password

  return (
    <main className="login-page">
      <form
        className="login-card"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
          if (!isValid) return
          login({ email })
          navigate('/boards')
        }}
      >
        <h1 className="login-title">SyncBoard</h1>
        <p className="login-subtitle">Sign in to your team workspace</p>

        <label className="field">
          Email
          <input
            type="email"
            placeholder="you@team.com"
            className={submitted && errors.email ? 'field-invalid' : ''}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        {submitted && errors.email && <p className="field-error">{errors.email}</p>}

        <label className="field">
          Password
          <input
            type="password"
            placeholder="********"
            className={submitted && errors.password ? 'field-invalid' : ''}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {submitted && errors.password && (
          <p className="field-error">{errors.password}</p>
        )}

        <button type="submit" className="login-button">
          Sign in
        </button>
        <p className="login-note">
          No account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </main>
  )
}
