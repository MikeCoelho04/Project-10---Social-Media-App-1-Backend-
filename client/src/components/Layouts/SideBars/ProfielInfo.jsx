import { useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '../../../store/users/actions/user'

const API_URL = import.meta.env.VITE_API_URL

function ProfileInfo() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.singleUser)

  useEffect(() => {
    if (!user?._id) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, user?._id])

  function getColorFromName(name) {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6']

    let hash = 0

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('pt-PT', {
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <div className="left-side-container">
      <div className="profile-bio-container">
        <div>
          <Link className="profile-tag" to="/profile">
            <div className="profile-pic-wrapper">
              {user?.avatarUrl ? (
                <img
                  className="profile-pic"
                  src={`${API_URL}${user.avatarUrl}`}
                  alt="My profile picture"
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
              <h5 className="profile-name">{user?.fullName || 'Unknown user'}</h5>
              <span className="profile-username">@{user?.username || 'user'}</span>
            </div>
          </Link>
        </div>

        <div className="profile-description">
          <p className="profile-title">Intro</p>
          <p>{user?.bio || 'No bio added yet.'}</p>
          {joinedDate ? <p>Joined {joinedDate}</p> : null}
          {user?.email ? <p>{user.email}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
