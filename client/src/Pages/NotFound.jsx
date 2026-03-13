import { Link } from 'react-router'
import './css/NotFound.css'

function NotFound () {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <span className="not-found-code">404</span>
        <h1>We couldn't find the page you're looking for.</h1>
        <p>We apologize, but the address you tried to access either does not exist or is no longer available.</p>
        <Link to="/home" className="not-found-link">Return to homepage</Link>
      </section>
    </main>
  )
}

export default NotFound
