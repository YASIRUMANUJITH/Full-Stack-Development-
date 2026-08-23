import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './ProfilePage.css'

export default function ProfilePage() {
  return (
    <div className="profile-shell">
      <Navbar />
      <main className="profile-page">
        <section className="profile-card">
          <span className="profile-avatar">SU</span>
          <h1 className="profile-name">Demo User</h1>
          <p className="profile-email">demo@syncboard.app</p>
          <span className="profile-role">Developer</span>
          <Link to="/" className="signout-link">
            Sign out
          </Link>
        </section>
      </main>
    </div>
  )
}
