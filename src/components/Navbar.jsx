import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [dark, setDark] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">S</span>
        SyncBoard
      </Link>
      <div className="navbar-right">
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
          SU
        </Link>
      </div>
    </nav>
  )
}
