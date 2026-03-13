import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser, updateUser } from '../../../store/users/actions/user'

const API_URL = import.meta.env.VITE_API_URL

function ProfileHeader() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.singleUser)
  const loading = useSelector((state) => state.user.loading)
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false)
  const [formValues, setFormValues] = useState({
    fullName: '',
    username: '',
    bio: '',
  })

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

  function openEditProfilePopup() {
    setFormValues({
      fullName: user?.fullName || '',
      username: user?.username || '',
      bio: user?.bio || '',
    })
    setShowEditProfilePopup(true)
  }

  function closeEditProfilePopup() {
    setShowEditProfilePopup(false)
  }

  async function handleUpdateProfile(event) {
    event.preventDefault()

    if (!user?._id) {
      return
    }

    try {
      await dispatch(updateUser({
        _id: user._id,
        fullName: formValues.fullName,
        username: formValues.username,
        bio: formValues.bio,
      }))

      await dispatch(fetchCurrentUser())
      closeEditProfilePopup()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="profile-card">
      <div className="top-part"></div>

      <div className="avatar-wrap">
        {user?.avatarUrl ? (
          <img
            className="avatar"
            src={`${API_URL}${user.avatarUrl}`}
            alt={`${user.fullName || user.username} profile picture`}
          />
        ) : (
          <div
            className="avatar profile-pic-placeholder"
            style={{ background: getColorFromName(user?.username || 'U') }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="bottom-part">
        <div>
          <p className="profile-name-big">{user?.fullName || 'Unknown user'}</p>
          <p className="profile-card-tag">@{user?.username || 'user'}</p>
          <p className="stats">
            <span>{user?.numberOfFollowers ?? 0}</span> followers <br className="stats-break" />
            <span>{user?.numberOfFollowing ?? 0}</span> following <br className="stats-break" />
            <span>{user?.numberOfPosts ?? 0}</span> posts
          </p>
        </div>

        <div>
          <button
            className="edit-profile-button"
            onClick={openEditProfilePopup}
          >
            ✏️ Edit profile
          </button>
          <button className="more-button">...</button>
        </div>
      </div>

      {showEditProfilePopup && createPortal(
        <div className="edit-profile-overlay" onClick={closeEditProfilePopup}>
          <div
            className="edit-profile-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="edit-profile-header">
              <h3>Edit profile</h3>
              <button
                type="button"
                className="close-popup-button"
                onClick={closeEditProfilePopup}
              >
                x
              </button>
            </div>

            <form className="edit-profile-form" onSubmit={handleUpdateProfile}>
              <div className="edit-profile-input-group">
                <label htmlFor="edit-full-name">Full name</label>
                <input
                  id="edit-full-name"
                  type="text"
                  value={formValues.fullName}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, fullName: event.target.value }))
                  }
                />
              </div>

              <div className="edit-profile-input-group">
                <label htmlFor="edit-username">Username</label>
                <input
                  id="edit-username"
                  type="text"
                  value={formValues.username}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, username: event.target.value }))
                  }
                />
              </div>

              <div className="edit-profile-input-group">
                <label htmlFor="edit-bio">Bio</label>
                <textarea
                  id="edit-bio"
                  rows="4"
                  value={formValues.bio}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, bio: event.target.value }))
                  }
                />
              </div>

              <button type="submit" className="create-post-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default ProfileHeader
