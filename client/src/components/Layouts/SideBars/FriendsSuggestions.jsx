import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSuggestedFriends,
  removeSuggestedFriend,
} from '../../../store/follow/actions/follow'
import {
  fetchSentFriendRequests,
  sendFriendRequest,
} from '../../../store/friendsRequests/actions/friendRequest'

function FriendsSuggestions() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.follow.loading)
  const suggestedFriends = useSelector(state => state.follow.suggestedFriends)
  const seenSuggestedFriendIds = useSelector(state => state.follow.seenSuggestedFriendIds)

  const hasMoreSuggestions = suggestedFriends.length > 0
  const shouldShowNoMoreUsersMessage = !loading && !hasMoreSuggestions

  useEffect(() => {
    dispatch(fetchSuggestedFriends())
    dispatch(fetchSentFriendRequests())
  }, [dispatch])

  async function handleSeeMore() {
    await dispatch(fetchSuggestedFriends(seenSuggestedFriendIds))
  }

  async function handleDismissSuggestion(userId) {
    dispatch(removeSuggestedFriend(userId))

    const updatedExcludedIds = [...seenSuggestedFriendIds, userId]

    try {
      await dispatch(fetchSuggestedFriends(updatedExcludedIds, 1, { append: true }))
    } catch (error) {
      console.error(error)
    }
  }

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

  const [sendingId, setSendingId] = useState(null)
  const { sentRequests } = useSelector((state) => state.friendRequest)

  const handleSendRequest = async (receiverId) => {
    try {
      setSendingId(receiverId)
      await dispatch(sendFriendRequest(receiverId))
    } catch (error) {
      console.error(error)
    } finally {
      setSendingId(null)
    }
  }

  return (
    <div className="left-side-container">
      <div>
        <h5>Suggestions</h5>

        {suggestedFriends?.map((user) => {
          const isSent = sentRequests.includes(user._id)
          const isSending = sendingId === user._id

          return (
            <div className="suggestions-container" key={user._id}>
              <div>
                <div className="profile-pic-wrapper">
                  {user?.avatarUrl ? (
                    <img
                      className="profile-pic"
                      src={`${import.meta.env.VITE_API_URL}${user.avatarUrl}`}
                      alt={`${user.username} profile picture`}
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
                  <span className="profile-name">
                    {user?.fullName || user?.username}
                  </span>

                  <span className="profile-info">
                    @{user?.username}
                  </span>
                </div>
              </div>

              <div className="friends-controls">
                <button
                  className="message-button"
                  onClick={() => handleSendRequest(user._id)}
                  disabled={isSent || isSending}
                >
                  {isSending ? 'Sending...' : isSent ? 'Request sent' : 'Follow'}
                </button>

                <button
                  className="cancel-button"
                  onClick={() => handleDismissSuggestion(user._id)}
                >
                  X
                </button>
              </div>
            </div>
          )
        })}

        {hasMoreSuggestions ? (
          <div className="see-more-link-wrapper">
            <button className="see-more-link" onClick={handleSeeMore}>
              See more
            </button>
          </div>
        ) : shouldShowNoMoreUsersMessage ? (
          <div className="see-more-link-wrapper">
            <span className="profile-info">There are no more users to show.</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default FriendsSuggestions
