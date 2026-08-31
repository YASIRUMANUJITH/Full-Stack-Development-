import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './SignupPage.css'

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const errors = {
    name: name.trim().length >= 2 ? '' : 'Enter at least 2 characters.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address.',
    password: password.length >= 8 ? '' : 'Password must be at least 8 characters.',
    confirm: confirm === password ? '' : 'Passwords do not match.',
  }
  const isValid = !errors.name && !errors.email && !errors.password && !errors.confirm

  return (
    <main className="login-page">
      <form
        className="login-card"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
          if (!isValid) return
          login({ name, email })
          navigate('/boards')
        }}
      >
        <h1 className="login-title">Create account</h1>
        <p className="login-subtitle">Join your team on SyncBoard</p>

        <label className="field">
          Name
          <input
            placeholder="Alex Rivera"
            className={submitted && errors.name ? 'field-invalid' : ''}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        {submitted && errors.name && <p className="field-error">{errors.name}</p>}

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
        {submitted && errors.password && <p className="field-error">{errors.password}</p>}

        <label className="field">
          Confirm password
          <input
            type="password"
            placeholder="********"
            className={submitted && errors.confirm ? 'field-invalid' : ''}
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />
        </label>
        {submitted && errors.confirm && <p className="field-error">{errors.confirm}</p>}

        <button type="submit" className="login-button">
          Create account
        </button>
        <p className="login-note">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </form>
    </main>
  )
}
