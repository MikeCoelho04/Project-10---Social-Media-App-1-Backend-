import { Link } from 'react-router'

function QuickLinks () {

  return (
    <div className="left-side-container">

        <div className="profile-card-links">
          <p>Quick Links:</p>
          <a href="index.html"><span>🏠</span> Home</a>
          <a href="messages.html"><span>✉️</span> Messages</a>
          <a href="#"><span>⟡</span> Explore</a>
          <Link to="/friends"><span>👯‍♂️</span> Friends</Link>
          <a href="#"><span>⚙</span> Settings</a>
        </div>

    </div>
  )

}

export default QuickLinks