import axios from 'axios'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, togglePostLike, updatePost } from '../../../store/posts/actions/posts'
import { fetchFollowings } from '../../../store/follow/actions/follow'
import { fetchCurrentUser } from '../../../store/users/actions/user'

function ProfileContent() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.data)
  const postsLoading = useSelector((state) => state.posts.loading)
  const user = useSelector((state) => state.user.singleUser)
  const followings = useSelector((state) => state.follow.data)
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [editedContent, setEditedContent] = useState('')
  const [savingPost, setSavingPost] = useState(false)

  useEffect(() => {
    dispatch(fetchPosts())

    if (!user?._id) {
      dispatch(fetchCurrentUser())
      return
    }

    dispatch(fetchFollowings(user._id))
  }, [dispatch, user?._id])

  function formatPostDate(dateString) {
    if (!dateString) {
      return 'Recently'
    }

    const postDate = new Date(dateString)
    if (Number.isNaN(postDate.getTime())) {
      return 'Recently'
    }

    const diffMs = Date.now() - postDate.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMinutes < 1) {
      return 'Just now'
    }

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`
    }

    const diffHours = Math.floor(diffMinutes / 60)

    if (diffHours < 24) {
      return `${diffHours}h ago`
    }

    const diffDays = Math.floor(diffHours / 24)

    if (diffDays < 7) {
      return `${diffDays}d ago`
    }

    return postDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  function getColorFromName(name) {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6']

    let hash = 0

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const userPosts = posts.filter((post) => {
    const authorId = typeof post.author === 'object' ? post.author?._id : post.author
    return authorId && authorId === user?._id
  })
  const userPhotos = userPosts.filter((post) => post.mediaUrls)
  const followingUsers = followings
    .map((follow) => follow.followingId)
    .filter(Boolean)

  async function handleToggleLike(postId) {
    try {
      await dispatch(togglePostLike(postId))
    } catch (error) {
      console.error(error)
    }
  }

  async function openCommentsPopup(post) {
    setSelectedPost(post)
    setCommentText('')
    setLoadingComments(true)

    try {
      const res = await axios.get(`http://localhost:3000/posts/${post._id}/comments`)
      setComments(res.data.data || [])
    } catch (error) {
      console.error(error)
      setComments([])
    } finally {
      setLoadingComments(false)
    }
  }

  function closeCommentsPopup() {
    setSelectedPost(null)
    setComments([])
    setCommentText('')
  }

  async function handleCreateComment() {
    if (!selectedPost || !commentText.trim()) {
      return
    }

    try {
      setSubmittingComment(true)

      await axios.post(`http://localhost:3000/posts/${selectedPost._id}/comments`, {
        text: commentText.trim(),
      })

      const res = await axios.get(`http://localhost:3000/posts/${selectedPost._id}/comments`)
      setComments(res.data.data || [])
      setCommentText('')
      dispatch(fetchPosts())
    } catch (error) {
      console.error(error)
    } finally {
      setSubmittingComment(false)
    }
  }

  function openEditPostPopup(post) {
    setEditingPost(post)
    setEditedContent(post.content || '')
  }

  function closeEditPostPopup() {
    setEditingPost(null)
    setEditedContent('')
  }

  async function handleUpdatePost(event) {
    event.preventDefault()

    if (!editingPost) {
      return
    }

    try {
      setSavingPost(true)
      await dispatch(updatePost(editingPost._id, { content: editedContent.trim() }))
      closeEditPostPopup()
    } catch (error) {
      console.error(error)
    } finally {
      setSavingPost(false)
    }
  }

  return (
    <div className="hidden-panels">
      <input type="radio" name="tabs" id="tab1" defaultChecked />
      <input type="radio" name="tabs" id="tab2" />
      <input type="radio" name="tabs" id="tab3" />
      <input type="radio" name="tabs" id="tab4" />

      <div className="tabs-nav">
        <label className="tabs-label" htmlFor="tab1">Post</label>
        <label className="tabs-label" htmlFor="tab2">About</label>
        <label className="tabs-label" htmlFor="tab3">Photos</label>
        <label className="tabs-label" htmlFor="tab4">Friends</label>
      </div>

      <div id="panel1">
        {postsLoading && userPosts.length === 0 ? (
          <div className="post-card">
            <p className="post-description">Loading posts...</p>
          </div>
        ) : userPosts.length > 0 ? (
          userPosts.map((post) => {
            const isLiked = post.likedByCurrentUser === true

            return (
              <div className="post-card" key={post._id}>
                <div className="profile-post-header">
                  <div className="profile-post-author">
                    <div className="profile-pic-wrapper">
                      {user?.avatarUrl ? (
                        <img
                          className="profile-pic"
                          src={`${import.meta.env.VITE_API_URL}${user.avatarUrl}`}
                          alt={`${user.fullName || user.username} profile picture`}
                        />
                      ) : (
                        <div
                          className="profile-pic-placeholder"
                          style={{ background: getColorFromName(user?.username || 'U') }}
                        >
                          {(user?.username || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="profile-name">{user?.fullName || user?.username}</span>
                      <span className="profile-tag">{formatPostDate(post.createdAt)} - Public</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="more-button profile-post-edit-button"
                    onClick={() => openEditPostPopup(post)}
                  >
                    ✏️ Edit
                  </button>
                </div>

                {post.content ? (
                  <p className="post-description">{post.content}</p>
                ) : null}

                {post.mediaUrls ? (
                  <img
                    className="post-image"
                    src={`${import.meta.env.VITE_API_URL_POSTS}${post.mediaUrls}`}
                    alt="post"
                  />
                ) : null}

                <div className="post-stats">
                  <p>Likes {post.likesCount || 0}</p>
                  <p>{post.commentCount || 0} comments</p>
                </div>

                <hr />

                <div className="social-post-buttons">
                  <button
                    className="post-button"
                    onClick={() => handleToggleLike(post._id)}
                  >
                    {isLiked ? '💙 Liked' : '👍 Like'}
                  </button>
                  <button
                    className="post-button"
                    onClick={() => openCommentsPopup(post)}
                  >
                    💬 Comment
                  </button>
                  <button className="post-button">🔗 Share</button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="post-card">
            <p className="post-description">You have not created any posts yet.</p>
          </div>
        )}
      </div>

      <div id="panel2">
        <div className="about-me-card">
          <p>Basic Information</p>
          <span className="text-body-secondary">Full Name</span>
          <span>{user?.fullName || '---'}</span>
          <span className="text-body-secondary">Username</span>
          <span>{user?.username ? `@${user.username}` : '---'}</span>
          <span className="text-body-secondary">Email</span>
          <span>{user?.email || '---'}</span>
          <span className="text-body-secondary">Bio</span>
          <span>{user?.bio || '---'}</span>
        </div>

        <div className="about-me-card">
          <p>More Information</p>
          <span className="text-body-secondary">Joined</span>
          <span>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString('pt-PT', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : '---'}
          </span>
          <span className="text-body-secondary">Avatar</span>
          <span>{user?.avatarUrl ? 'Added' : '---'}</span>
        </div>
      </div>

      <div id="panel3">
        {userPhotos.length > 0 ? (
          userPhotos.map((post) => (
            <img
              key={post._id}
              className="my-profile-photos"
              src={`${import.meta.env.VITE_API_URL_POSTS}${post.mediaUrls}`}
              alt="Post photo"
            />
          ))
        ) : (
          <div className="about-me-card">
            <p>No photos yet</p>
            <span>---</span>
          </div>
        )}
      </div>

      <div id="panel4" className="panel-container">
        {followingUsers.length > 0 ? (
          followingUsers.map((friend) => (
            <div className="friend-card" key={friend._id}>
              <div className="profile-friends-card">
                <div>
                  <div className="profile-pic-wrapper">
                    {friend.avatarUrl ? (
                      <img
                        className="profile-pic"
                        src={`${import.meta.env.VITE_API_URL}${friend.avatarUrl}`}
                        alt={`${friend.fullName || friend.username} profile picture`}
                      />
                    ) : (
                      <div
                        className="profile-pic-placeholder"
                        style={{ background: getColorFromName(friend.username || 'U') }}
                      >
                        {(friend.username || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="profile-name">{friend.fullName || friend.username}</p>
                    <p className="profile-tag">@{friend.username}</p>
                  </div>
                </div>
                <button className="message-button profile-message-button">Message</button>
              </div>
            </div>
          ))
        ) : (
          <div className="about-me-card">
            <p>No friends yet</p>
            <span>---</span>
          </div>
        )}
      </div>

      {selectedPost && createPortal(
        <div className="comments-popup-overlay" onClick={closeCommentsPopup}>
          <div
            className="comments-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="comments-popup-header">
              <h3>Comments</h3>
              <button
                type="button"
                className="close-popup-button"
                onClick={closeCommentsPopup}
              >
                x
              </button>
            </div>

            <div className="comments-popup-body">
              {loadingComments ? (
                <p className="post-description">Loading comments...</p>
              ) : comments.length > 0 ? (
                comments.map((comment) => {
                  const author = comment.authorId || {}
                  const commentAuthorName = author.fullName || author.username || 'Unknown user'

                  return (
                    <div className="comment-card" key={comment._id}>
                      <div className="comment-card-header">
                        <div className="profile-pic-wrapper">
                          {author.avatarUrl ? (
                            <img
                              className="profile-pic"
                              src={`${import.meta.env.VITE_API_URL}${author.avatarUrl}`}
                              alt={`${commentAuthorName} profile picture`}
                            />
                          ) : (
                            <div
                              className="profile-pic-placeholder"
                              style={{ background: getColorFromName(author.username || 'U') }}
                            >
                              {(author.username || 'U').charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className="comment-card-meta">
                          <span className="profile-name">{commentAuthorName}</span>
                          <span className="profile-info">{formatPostDate(comment.createdAt)}</span>
                        </div>
                      </div>

                      <p className="comment-card-text">{comment.text}</p>
                    </div>
                  )
                })
              ) : (
                <p className="post-description">No comments yet.</p>
              )}
            </div>

            <div className="comments-popup-footer">
              <textarea
                className="comment-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              />

              <button
                type="button"
                className="create-post-button"
                onClick={handleCreateComment}
                disabled={submittingComment || !commentText.trim()}
              >
                {submittingComment ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {editingPost && createPortal(
        <div className="edit-profile-overlay" onClick={closeEditPostPopup}>
          <div
            className="edit-profile-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="edit-profile-header">
              <h3>Edit post</h3>
              <button
                type="button"
                className="close-popup-button"
                onClick={closeEditPostPopup}
              >
                x
              </button>
            </div>

            <form className="edit-profile-form" onSubmit={handleUpdatePost}>
              <div className="edit-profile-input-group">
                <label htmlFor="edit-post-content">Post content</label>
                <textarea
                  id="edit-post-content"
                  rows="6"
                  value={editedContent}
                  onChange={(event) => setEditedContent(event.target.value)}
                />
              </div>

              <button type="submit" className="create-post-button" disabled={savingPost}>
                {savingPost ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default ProfileContent
