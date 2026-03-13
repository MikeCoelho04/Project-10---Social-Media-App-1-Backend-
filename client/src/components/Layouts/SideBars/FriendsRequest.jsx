import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profilePic from '../../../assets/profile-pics/dog-profile-picture.jpg'
import { fetchFollowings } from '../../../store/follow/actions/follow'
import {
  acceptFriendRequest,
  fetchReceivedFriendRequests,
  fetchSentFriendRequests,
  followBackFriendRequest,
  rejectFriendRequest,
} from '../../../store/friendsRequests/actions/friendRequest'
import { fetchCurrentUser } from '../../../store/users/actions/user'

function FriendsRequest() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.friendRequest.loading)
  const receivedRequests = useSelector((state) => state.friendRequest.receivedRequests)
  const sentRequests = useSelector((state) => state.friendRequest.sentRequests)
  const [processingRequestId, setProcessingRequestId] = useState(null)
  const visibleRequests = receivedRequests
    .filter((request) => request.status !== 'rejected')
    .slice(0, 3)

  useEffect(() => {
    dispatch(fetchReceivedFriendRequests())
    dispatch(fetchSentFriendRequests())
  }, [dispatch])

  const handleAcceptRequest = async (requestId) => {
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

  const handleFollowBackRequest = async (requestId, receiverId) => {
    try {
      setProcessingRequestId(requestId)
      await dispatch(followBackFriendRequest(requestId, receiverId))
    } catch (error) {
      console.error(error)
    } finally {
      setProcessingRequestId(null)
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      setProcessingRequestId(requestId)
      await dispatch(rejectFriendRequest(requestId))
    } catch (error) {
      console.error(error)
    } finally {
      setProcessingRequestId(null)
    }
  }

  return (
    <div className="friends-request-card right-side-container">
      <div>
        <div className="messages-header">
          <h5>Friends Request</h5>
          <a>{visibleRequests.length} visible</a>
        </div>

        <span className="latest-friends-request-span">Latest friends request</span>

        <div className="friends-request-indivudal-card-global-container">
          {visibleRequests.map((request) => {
            const sender = request.senderId || {}
            const displayName = sender.fullName || sender.username || 'Unknown user'
            const profileTag = sender.username ? `@${sender.username}` : 'Pending request'
            const avatarSrc = sender.avatarUrl
              ? `${import.meta.env.VITE_API_URL}${sender.avatarUrl}`
              : profilePic
            const isProcessing = processingRequestId === request._id
            const isAccepted = request.status === 'accepted'
            const isRejected = request.status === 'rejected'
            const followBackSent = sentRequests.includes(sender._id)
            const disableDecisionButtons = isProcessing || isAccepted || isRejected

            return (
              <div className="friends-request-indivudal-card" key={request._id}>
                <div>
                  <div className="profile-pic-wrapper">
                    <img
                      className="profile-pic"
                      src={avatarSrc}
                      alt={`${displayName} profile picture`}
                    />
                  </div>

                  <div>
                    <span className="profile-name">{displayName}</span>
                    <span className="profile-info">{profileTag}</span>
                  </div>
                </div>

                <div>
                  <button
                    className="success-button"
                    onClick={() => handleAcceptRequest(request._id)}
                    disabled={disableDecisionButtons}
                  >
                    {isAccepted ? 'Accepted' : isProcessing ? 'Saving...' : 'Accept'}
                  </button>
                  <button
                    className="mutual-button"
                    onClick={() => handleFollowBackRequest(request._id, sender._id)}
                    disabled={isProcessing || isAccepted || isRejected || followBackSent}
                  >
                    {followBackSent ? 'Request sent' : 'Follow Back'}
                  </button>
                  <button
                    className="decline-button"
                    onClick={() => handleRejectRequest(request._id)}
                    disabled={disableDecisionButtons}
                  >
                    {isRejected ? 'Rejected' : 'X'}
                  </button>
                </div>
              </div>
            )
          })}

          {!loading && visibleRequests.length === 0 ? (
            <div className="friends-request-indivudal-card">
              <div>
                <div>
                  <span className="profile-username">No pending requests</span>
                  <span className="profile-tag">You have no friendship requests to accept.</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default FriendsRequest
