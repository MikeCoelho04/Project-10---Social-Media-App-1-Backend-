import axios from 'axios'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, togglePostLike } from '../../../store/posts/actions/posts'
import { fetchCurrentUser } from '../../../store/users/actions/user'

function Post() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.data)
  const loading = useSelector((state) => state.posts.loading)
  const currentUser = useSelector((state) => state.user.singleUser)
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editedCommentText, setEditedCommentText] = useState('')
  const [savingEditedComment, setSavingEditedComment] = useState(false)

  useEffect(() => {
    dispatch(fetchPosts())

    if (!currentUser?._id) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch, currentUser?._id])

  const visiblePosts = posts.filter((post) => {
    const authorId = typeof post.author === 'object' ? post.author?._id : post.author
    return authorId && authorId !== currentUser?._id
  })

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
    setEditingCommentId(null)
    setEditedCommentText('')
    setLoadingComments(true)

    try {
      await loadComments(post._id)
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
    setEditingCommentId(null)
    setEditedCommentText('')
  }

  async function loadComments(postId) {
    const res = await axios.get(`http://localhost:3000/posts/${postId}/comments`)
    setComments(res.data.data || [])
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

      await loadComments(selectedPost._id)
      setCommentText('')
      dispatch(fetchPosts())
    } catch (error) {
      console.error(error)
    } finally {
      setSubmittingComment(false)
    }
  }

  function startEditingComment(comment) {
    setEditingCommentId(comment._id)
    setEditedCommentText(comment.text || '')
  }

  function cancelEditingComment() {
    setEditingCommentId(null)
    setEditedCommentText('')
  }

  async function handleUpdateComment(commentId) {
    if (!selectedPost || !editedCommentText.trim()) {
      return
    }

    try {
      setSavingEditedComment(true)
      await axios.patch(`http://localhost:3000/comments/${commentId}`, {
        text: editedCommentText.trim(),
      })
      await loadComments(selectedPost._id)
      cancelEditingComment()
    } catch (error) {
      console.error(error)
    } finally {
      setSavingEditedComment(false)
    }
  }

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

  if (loading && posts.length === 0) {
    return (
      <div className="post-container">
        <div className="post-card">
          <p className="post-description">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (visiblePosts.length === 0) {
    return (
      <div className="post-container">
        <div className="post-card">
          <p className="post-description">There are no posts to show yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="post-container">
      {visiblePosts.map((post) => {
        const author = post.author || {}
        const displayName = author.fullName || author.username || 'Unknown user'
        const profileTag = `${formatPostDate(post.createdAt)} - Public`
        const isLiked = post.likedByCurrentUser === true

        return (
          <div className="post-card" key={post._id}>
            <div>
              <div className="profile-pic-wrapper">
                {author.avatarUrl ? (
                  <img
                    className="profile-pic"
                    src={`${import.meta.env.VITE_API_URL}${author.avatarUrl}`}
                    alt={`${displayName} profile picture`}
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

              <div>
                <span className="profile-name">{displayName}</span>
                <span className="profile-info">{profileTag}</span>
              </div>
            </div>

            {post.content ? (
              <p className="post-description">{post.content}</p>
            ) : null}

            {post.mediaUrls ? (
              <img
                className="post-img"
                src={`${import.meta.env.VITE_API_URL_POSTS}${post.mediaUrls}`}
                alt={`${displayName} post`}
              />
            ) : null}

            <div className="post-stats">
              <p>👍 {post.likesCount || 0}</p>
              <p>{post.commentCount || 0} comments</p>
            </div>

            <hr />

            <div className="social-post-buttons">
              <button
                className="post-button"
                onClick={() => handleToggleLike(post._id)}
              >
                {isLiked ? 'Liked' : 'Like'}
              </button>
              <button
                className="post-button"
                onClick={() => openCommentsPopup(post)}
              >
                Comment
              </button>
            </div>
          </div>
        )
      })}

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
                  const commentAuthorId = typeof author === 'object' ? author._id : null
                  const isOwnComment = commentAuthorId === currentUser?._id
                  const isEditingThisComment = editingCommentId === comment._id

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

                      {isEditingThisComment ? (
                        <div className="comment-edit-section">
                          <textarea
                            className="comment-input"
                            value={editedCommentText}
                            onChange={(event) => setEditedCommentText(event.target.value)}
                          />

                          <div className="comment-edit-actions">
                            <button
                              type="button"
                              className="post-button"
                              onClick={() => handleUpdateComment(comment._id)}
                              disabled={savingEditedComment || !editedCommentText.trim()}
                            >
                              {savingEditedComment ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              type="button"
                              className="post-button"
                              onClick={cancelEditingComment}
                              disabled={savingEditedComment}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="comment-card-text">{comment.text}</p>

                          {isOwnComment ? (
                            <button
                              type="button"
                              className="comment-edit-button"
                              onClick={() => startEditingComment(comment)}
                            >
                              ✏️ Edit comment
                            </button>
                          ) : null}
                        </>
                      )}
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
    </div>
  )
}

export default Post
