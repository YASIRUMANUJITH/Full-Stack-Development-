import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const [dark, setDark] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="navbar">
      <Link to="/boards" className="brand">
        <span className="brand-mark">S</span>
        SyncBoard
      </Link>
      <div className="navbar-right">
        <Link to="/boards" className="nav-link">
          Boards
        </Link>
        <button
          type="button"
          className="theme-toggle"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          title="Toggle theme"
          onClick={() => {
            document.body.classList.toggle('dark', !dark)
            setDark(!dark)
          }}
        >
          {dark ? '\u2600' : '\u263D'}
        </button>
        <Link to="/profile" className="user-chip" aria-label="Open profile">
          {user?.initials || 'SU'}
        </Link>
      </div>
    </nav>
  )
}
