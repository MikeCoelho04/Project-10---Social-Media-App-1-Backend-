import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../../store/posts/actions/posts'
import { fetchUsers } from '../../../store/users/actions/user'
import { useSearch } from '../../../context/SearchContext'

function SearchResults() {
  const dispatch = useDispatch()
  const { searchQuery } = useSearch()
  const users = useSelector((state) => state.user.data)
  const posts = useSelector((state) => state.posts.data)
  const [isPreparingResults, setIsPreparingResults] = useState(false)

  const normalizedQuery = searchQuery.trim().toLowerCase()

  useEffect(() => {
    if (!normalizedQuery) {
      return undefined
    }

    let isMounted = true

    async function prepareResults() {
      try {
        setIsPreparingResults(true)

        const requests = []

        if (users.length === 0) {
          requests.push(dispatch(fetchUsers()))
        }

        if (posts.length === 0) {
          requests.push(dispatch(fetchPosts()))
        }

        await Promise.all(requests)
      } catch (error) {
        console.error(error)
      } finally {
        if (isMounted) {
          setIsPreparingResults(false)
        }
      }
    }

    prepareResults()

    return () => {
      isMounted = false
    }
  }, [dispatch, normalizedQuery, posts.length, users.length])

  const filteredUsers = useMemo(() => (
    users.filter((user) => user?.username?.toLowerCase().includes(normalizedQuery))
  ), [normalizedQuery, users])

  const filteredPosts = useMemo(() => (
    posts.filter((post) => post?.content?.toLowerCase().includes(normalizedQuery))
  ), [normalizedQuery, posts])

  function getColorFromName(name) {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6']

    let hash = 0

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  function formatPostDate(dateString) {
    if (!dateString) {
      return 'Recentemente'
    }

    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
      return 'Recentemente'
    }

    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  if (!normalizedQuery) {
    return null
  }

  if (isPreparingResults) {
    return (
      <section className="search-results-container">
        <div className="search-results-empty">
          <h2>Looking for results...</h2>
        </div>
      </section>
    )
  }

  if (filteredUsers.length === 0 && filteredPosts.length === 0) {
    return (
      <section className="search-results-container">
        <div className="search-results-empty">
          <p className="search-results-eyebrow">Search</p>
          <h2>Results for "{searchQuery.trim()}"</h2>
          <p>Try searching for a different username or different text from the post description.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="search-results-container">
      <div className="search-results-header">
        <div>
          <p className="search-results-eyebrow">Search</p>
          <h2>Results for "{searchQuery.trim()}"</h2>
        </div>
        <span className="search-results-count">
          {filteredUsers.length + filteredPosts.length} results
        </span>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="search-section">
          <h3>Users</h3>

          <div className="search-grid">
            {filteredUsers.map((user) => {
              const displayName = user.fullName || user.username || 'User'

              return (
                <article className="search-user-card" key={user._id}>
                  {user.avatarUrl ? (
                    <img
                      className="search-avatar"
                      src={`${user.avatarUrl}`}
                      alt={`${displayName} profile`}
                    />
                  ) : (
                    <div
                      className="search-avatar search-avatar-placeholder"
                      style={{ background: getColorFromName(user.username || 'U') }}
                    >
                      {(user.username || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="search-card-title">{displayName}</p>
                    <p className="search-card-subtitle">@{user.username}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      ) : null}

      {filteredPosts.length > 0 ? (
        <div className="search-section">
          <h3>Posts</h3>

          <div className="search-posts-list">
            {filteredPosts.map((post) => {
              const author = post.author || {}
              const displayName = author.fullName || author.username || 'Unknown user'

              return (
                <article className="search-post-card" key={post._id}>
                  <div className="search-post-meta">
                    <p className="search-card-title">{displayName}</p>
                    <span className="search-card-subtitle">{formatPostDate(post.createdAt)}</span>
                  </div>

                  <p className="search-post-text">{post.content}</p>

                  {post.mediaUrls ? (
                    <img
                      className="search-post-image"
                      src={`${import.meta.env.VITE_API_URL_POSTS}${post.mediaUrls}`}
                      alt={`${displayName} post`}
                    />
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default SearchResults
