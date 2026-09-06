import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFoundPage() {
  return (
    <main className="notfound-page">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title">Page not found</h1>
      <p className="notfound-text">
        The page you are looking for does not exist or was moved.
      </p>
      <Link to="/" className="notfound-home">
        Back to SyncBoard
      </Link>
    </main>
  )
}
