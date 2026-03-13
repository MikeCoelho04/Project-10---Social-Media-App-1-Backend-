import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCurrentUser } from '../../../store/users/actions/user'

const API_URL = import.meta.env.VITE_API_URL

function ProfileResumeLinks({ variant }) {
  function getColorFromName(name) {
    const colors = [
      '#6366f1',
      '#8b5cf6',
      '#ec4899',
      '#ef4444',
      '#f59e0b',
      '#10b981',
      '#3b82f6',
    ]

    let hash = 0

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.singleUser)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <div className="left-side-container">
      <div>
        <div>
          <Link className="profile-tag" to="/profile">
            <div className="profile-pic-wrapper">
              {user?.avatarUrl ? (
                <img
                  className="profile-pic"
                  src={`${API_URL}${user.avatarUrl}`}
                  alt="Profile"
                />
              ) : (
                <div
                  className="profile-pic-placeholder"
                  style={{ background: getColorFromName(user?.username || 'U') }}
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h5 className="profile-name">{user?.fullName}</h5>
              <span className="profile-username">@{user?.username}</span>
            </div>
          </Link>
        </div>

        <div className="profile-card-links">
          <Link
            className={variant === 'home' ? 'quick-link-selected' : ''}
            to="/home"
          >
            <span>🏠</span> Home
          </Link>
          <a>
            <span>✉️</span> Messages
          </a>
          <a>
            <span>⟡</span> Explore
          </a>
          <Link
            className={variant === 'friends' ? 'quick-link-selected' : ''}
            to="/friends"
          >
            <span>👯‍♂️</span> Friends
          </Link>
          <a>
            <span>⚙</span> Settings
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProfileResumeLinks
