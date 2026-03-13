import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '../../../store/users/actions/user'
import {
  fetchFollowings,
  fetchSuggestedFriends,
  removeSuggestedFriend,
  toggleFollowUser,
} from '../../../store/follow/actions/follow'
import {
  acceptFriendRequest,
  fetchReceivedFriendRequests,
  fetchSentFriendRequests,
  followBackFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from '../../../store/friendsRequests/actions/friendRequest'

function FriendsDashboard() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.singleUser)
  const followings = useSelector((state) => state.follow.data)
  const suggestedFriends = useSelector((state) => state.follow.suggestedFriends)
  const seenSuggestedFriendIds = useSelector((state) => state.follow.seenSuggestedFriendIds)
  const loading = useSelector((state) => state.follow.loading)
  const receivedRequests = useSelector((state) => state.friendRequest.receivedRequests)
  const sentRequests = useSelector((state) => state.friendRequest.sentRequests)
  const [processingUserId, setProcessingUserId] = useState(null)
  const [processingRequestId, setProcessingRequestId] = useState(null)
  const [sendingSuggestedId, setSendingSuggestedId] = useState(null)
  const [unfollowedIds, setUnfollowedIds] = useState([])

  useEffect(() => {
    if (!currentUser?._id) {
      dispatch(fetchCurrentUser())
      return
    }

    dispatch(fetchFollowings(currentUser._id))
    dispatch(fetchReceivedFriendRequests())
    dispatch(fetchSentFriendRequests())
    dispatch(fetchSuggestedFriends())
  }, [dispatch, currentUser?._id])

  function getColorFromName(name) {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6']

    let hash = 0

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const followingUsers = followings
    .map((follow) => follow.followingId)
    .filter(Boolean)

  async function handleUnfollow(userId) {
    try {
      setProcessingUserId(userId)
      const result = await dispatch(toggleFollowUser(userId))

      if (result.following === false) {
        setUnfollowedIds((prev) => [...new Set([...prev, userId])])
      }
    } catch (error) {
      console.error(error)
    } finally {
      setProcessingUserId(null)
    }
  }

  async function handleAcceptRequest(requestId) {
    try {
      setProcessingRequestId(requestId)
      await dispatch(acceptFriendRequest(requestId))
      const updatedUser = await dispatch(fetchCurrentUser())

      if (updatedUser?._id) {
        await dispatch(fetchFollowings(updatedUser._id))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setProcessingRequestId(null)
    }
  }

  async function handleFollowBackRequest(requestId, receiverId) {
    try {
      setProcessingRequestId(requestId)
      await dispatch(followBackFriendRequest(requestId, receiverId))
    } catch (error) {
      console.error(error)
    } finally {
      setProcessingRequestId(null)
    }
  }

  async function handleRejectRequest(requestId) {
    try {
      setProcessingRequestId(requestId)
      await dispatch(rejectFriendRequest(requestId))
    } catch (error) {
      console.error(error)
    } finally {
      setProcessingRequestId(null)
    }
  }

  async function handleSendSuggestedRequest(receiverId) {
    try {
      setSendingSuggestedId(receiverId)
      await dispatch(sendFriendRequest(receiverId))
    } catch (error) {
      console.error(error)
    } finally {
      setSendingSuggestedId(null)
    }
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

  return (
    <div>
      <input type="radio" name="tabs" id="pane-1" defaultChecked />
      <input type="radio" name="tabs" id="pane-2" />
      <input type="radio" name="tabs" id="pane-3" />

      <div className="pane-nav">
        <label className="pane-label" htmlFor="pane-1">All Friends</label>
        <label className="pane-label" htmlFor="pane-2">Friend Requests</label>
        <label className="pane-label" htmlFor="pane-3">Suggested Friends</label>
      </div>

      <div className="pane-panel" id="panel-1">
        <div className="filters-bar">
          <div className="filters-container">
            <button className="filters-button active-filter">All</button>
            <button className="filters-button">Online</button>
            <button className="filters-button">Recently Added</button>
            <button className="filters-button">Work</button>
            <button className="filters-button">Family</button>
          </div>

          <div className="filters-container">
            <form className="filters-form" action="">
              <select name="sort" id="friends-sort">
                <option value="az">Sort: A -&gt; Z</option>
                <option value="za">Sort: Z -&gt; A</option>
                <option value="mutuals">Most mutuals</option>
                <option value="recent">Recently active</option>
              </select>
              <input id="filter-search-bar" type="text" placeholder="Filter by name..." />
            </form>
          </div>
        </div>

        <div className="panel-container">
          {loading && followingUsers.length === 0 ? (
            <div className="friend-card">
              <p className="profile-name">Loading friends...</p>
            </div>
          ) : followingUsers.length > 0 ? (
            followingUsers.map((user) => (
              <div className="friend-card" key={user._id}>
                <div>
                  <div className="profile-info">
                    <div className="profile-pic-wrapper">
                      {user.avatarUrl ? (
                        <img
                          className="profile-pic"
                          src={`${import.meta.env.VITE_API_URL}${user.avatarUrl}`}
                          alt={`${user.fullName || user.username} profile picture`}
                        />
                      ) : (
                        <div
                          className="profile-pic-placeholder"
                          style={{ background: getColorFromName(user.username || 'U') }}
                        >
                          {(user.username || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="profile-name">{user.fullName || user.username}</p>
                      <p className="profile-tag">@{user.username}</p>
                    </div>
                  </div>

                  <div className="profile-status">
                    {unfollowedIds.includes(user._id) ? 'Unfollowed' : 'Following'}
                  </div>
                </div>

                <div className="friend-card-controllers">
                  <button className="message-button">Message</button>
                  <button className="profile-button">Profile</button>
                  <button
                    className="unfollow-button"
                    onClick={() => handleUnfollow(user._id)}
                    disabled={processingUserId === user._id || unfollowedIds.includes(user._id)}
                  >
                    {processingUserId === user._id
                      ? 'Updating...'
                      : unfollowedIds.includes(user._id)
                        ? 'Unfollowed'
                        : 'Unfollow'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="friend-card">
              <p className="profile-name">You are not following anyone yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="pane-panel" id="panel-2">
        <div className="panel-container">
          {receivedRequests.length > 0 ? (
            receivedRequests.map((request) => {
              const sender = request.senderId || {}
              const displayName = sender.fullName || sender.username || 'Unknown user'
              const isProcessing = processingRequestId === request._id
              const isAccepted = request.status === 'accepted'
              const isRejected = request.status === 'rejected'
              const followBackSent = sentRequests.includes(sender._id)
              const disableDecisionButtons = isProcessing || isAccepted || isRejected

              return (
                <div className="friend-card" key={request._id}>
                  <div>
                    <div className="profile-info">
                      <div className="profile-pic-wrapper">
                        {sender.avatarUrl ? (
                          <img
                            className="profile-pic"
                            src={`${import.meta.env.VITE_API_URL}${sender.avatarUrl}`}
                            alt={`${displayName} profile picture`}
                          />
                        ) : (
                          <div
                            className="profile-pic-placeholder"
                            style={{ background: getColorFromName(sender.username || 'U') }}
                          >
                            {(sender.username || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="profile-name">{displayName}</p>
                        <p className="profile-tag">@{sender.username}</p>
                      </div>
                    </div>
                  </div>

                  <div className="friend-card-controllers">
                    <button
                      className="message-button"
                      onClick={() => handleAcceptRequest(request._id)}
                      disabled={disableDecisionButtons}
                    >
                      {isAccepted ? 'Accepted' : isProcessing ? 'Updating...' : 'Accept'}
                    </button>
                    <button
                      className="profile-button"
                      onClick={() => handleFollowBackRequest(request._id, sender._id)}
                      disabled={isProcessing || isAccepted || isRejected || followBackSent}
                    >
                      {followBackSent ? 'Request sent' : 'Follow Back'}
                    </button>
                    <button
                      className="unfollow-button"
                      onClick={() => handleRejectRequest(request._id)}
                      disabled={disableDecisionButtons}
                    >
                      {isRejected ? 'Declined' : 'Decline'}
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="friend-card">
              <p className="profile-name">You have no pending friend requests.</p>
            </div>
          )}
        </div>
      </div>

      <div className="pane-panel" id="panel-3">
        <div className="panel-container">
          {suggestedFriends.length > 0 ? (
            suggestedFriends.map((user) => {
              const isSent = sentRequests.includes(user._id)
              const isSending = sendingSuggestedId === user._id

              return (
                <div className="friend-card" key={user._id}>
                  <div>
                    <div className="profile-info">
                      <div className="profile-pic-wrapper">
                        {user.avatarUrl ? (
                          <img
                            className="profile-pic"
                            src={`${import.meta.env.VITE_API_URL}${user.avatarUrl}`}
                            alt={`${user.fullName || user.username} profile picture`}
                          />
                        ) : (
                          <div
                            className="profile-pic-placeholder"
                            style={{ background: getColorFromName(user.username || 'U') }}
                          >
                            {(user.username || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="profile-name">{user.fullName || user.username}</p>
                        <p className="profile-tag">@{user.username}</p>
                      </div>
                    </div>
                  </div>

                  <div className="friend-card-controllers">
                    <button
                      className="message-button"
                      onClick={() => handleSendSuggestedRequest(user._id)}
                      disabled={isSent || isSending}
                    >
                      {isSending ? 'Sending...' : isSent ? 'Request sent' : 'Add friend'}
                    </button>
                    <button className="profile-button">Profile</button>
                    <button
                      className="unfollow-button"
                      onClick={() => handleDismissSuggestion(user._id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="friend-card">
              <p className="profile-name">There are no suggested friends to show.</p>
            </div>
          )}
        </div>
      </div>

      <div className="pagination">
        <nav aria-label="Page navigation example">
          <ul>
            <li><a href="#">Previous</a></li>
            <li className="pagitanion-selected"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default FriendsDashboard
