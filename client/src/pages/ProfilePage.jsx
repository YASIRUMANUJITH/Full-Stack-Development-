import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const displayUser = user || { name: 'Demo User', email: 'demo@syncboard.app', initials: 'SU', role: 'Developer' }

  return (
    <div className="profile-shell">
      <Navbar />
      <main className="profile-page">
        <section className="profile-card">
          <span className="profile-avatar">{displayUser.initials}</span>
          <h1 className="profile-name">{displayUser.name}</h1>
          <p className="profile-email">{displayUser.email}</p>
          <span className="profile-role">{displayUser.role || 'Member'}</span>
          <button
            type="button"
            className="signout-link"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            Sign out
          </button>
          <Link to="/boards" className="login-note" style={{ marginTop: '0.5rem' }}>
            Back to boards
          </Link>
        </section>
      </main>
    </div>
  )
}
