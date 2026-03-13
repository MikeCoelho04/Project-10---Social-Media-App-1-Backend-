import './css/NavBar.css'
import logo from '../assets/fronder-logo.png'
import { Link, useLocation, useNavigate } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../store/users/actions/user'
import { addPost } from '../store/posts/actions/posts'
import { useSearch } from '../context/SearchContext'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { searchQuery, setSearchQuery } = useSearch()

  const [isOpen, setIsOpen] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false)
  const [content, setContent] = useState('')
  const [mediaUrls, setMediaUrls] = useState(null)
  const [errors, setErrors] = useState(null)
  const [showPostSuccessPopup, setShowPostSuccessPopup] = useState(false)

  const popupRef = useRef(null)
  const isHomePage = location.pathname === '/home'
  const isFriendsPage = location.pathname === '/friends'

  function openCreatePostPopup() {
    setShowCreatePostPopup(true)
  }

  function closeCreatePostPopup() {
    setShowCreatePostPopup(false)
    setContent('')
    setMediaUrls(null)
    setErrors(null)
  }

  async function createPost(event) {
    event.preventDefault()

    if (!content && !mediaUrls) {
      setErrors('A post must contain either text or media!')
      return
    }

    const formData = new FormData()
    formData.append('content', content)

    if (mediaUrls) {
      formData.append('mediaUrls', mediaUrls)
    }

    try {
      await dispatch(addPost(formData))
      setShowPostSuccessPopup(true)
      closeCreatePostPopup()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!showPostSuccessPopup) {
      return undefined
    }

    const timer = setTimeout(() => {
      setShowPostSuccessPopup(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [showPostSuccessPopup])

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAccountMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function controlHamburgerMenu() {
    const hamburgerMenu = document.getElementById('navbarSupportedContent')

    if (!hamburgerMenu) {
      return
    }

    if (!isOpen) {
      hamburgerMenu.style.display = 'flex'
      setIsOpen(true)
    } else {
      hamburgerMenu.style.display = 'none'
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const hamburgerMenu = document.getElementById('navbarSupportedContent')

    if (hamburgerMenu) {
      hamburgerMenu.style.display = 'none'
    }

    setIsOpen(false)
  }, [location.pathname])

  async function logout() {
    try {
      await dispatch(userLogout())
      setIsOpen(false)
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav id="navbar">
      <div>
        <Link className="logo-link" to="/home">
          <img id="logo-img" src={logo} alt="Fronder logo" />
        </Link>
        <Link className="navbar-brand" to="/home">Fronde</Link>

        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <input
            className="search-bar"
            type="search"
            placeholder="Search by username or post description"
            aria-label="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>

        <svg onClick={controlHamburgerMenu} className="hamburger-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
          <path
            stroke="rgba(33, 37, 41, 0.75)"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M4 7h22M4 15h22M4 23h22"
          />
        </svg>

        <div className="account-buttons">
          <a>🔔</a>
          <a className="create-post-trigger" onClick={openCreatePostPopup}>➕</a>
          <div className="account-menu-container">
            <span
              className="account-icon"
              onClick={() => setShowAccountMenu(!showAccountMenu)}
            >
              👤
            </span>

            {showAccountMenu && (
              <div className="account-dropdown" ref={popupRef}>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="navbarSupportedContent">
        <ul>
          <li className="nav-item">
            <Link className={isHomePage ? 'operating' : ''} to="/home">
              <span>🏠</span> Home
            </Link>
          </li>
          <li className="nav-item">
            <a>
              <span>✉️</span> Messages
            </a>
          </li>
          <li className="nav-item">
            <a>
              <span>⟡</span> Explore
            </a>
          </li>
          <li className="nav-item">
            <Link className={isFriendsPage ? 'operating' : ''} to="/friends">
              <span>👯‍♂️</span> Friends
            </Link>
          </li>
          <li className="nav-item">
            <a>
              <span>⚙</span> Settings
            </a>
          </li>
          <li className="nav-item">
            <button type="button" className="hamburger-logout-button" onClick={logout}>
              <span>?</span> Logout
            </button>
          </li>
        </ul>
      </div>

      {showCreatePostPopup && createPortal(
        <div
          className="create-post-overlay"
          onClick={closeCreatePostPopup}
        >
          <div
            className="create-post-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="create-post-header">
              <h3>Create Post</h3>
              <button
                type="button"
                className="close-popup-button"
                onClick={closeCreatePostPopup}
              >
                ×
              </button>
            </div>

            <form className="create-post-form" onSubmit={createPost}>
              <div className="create-post-input-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Write something..."
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value)
                    setErrors(null)
                  }}
                  className={errors ? 'input-error' : ''}
                />
              </div>

              <div className="create-post-input-group">
                <label htmlFor="photo">Photo</label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={(event) => {
                    setMediaUrls(event.target.files[0])
                    setErrors(null)
                  }}
                  className={errors ? 'input-error' : ''}
                />
              </div>

              {errors && (
                <div className="error-message">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z" />
                  </svg>
                  <span>{errors}</span>
                </div>
              )}

              <button type="submit" className="create-post-button">
                Publish
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {showPostSuccessPopup && createPortal(
        <div className="success-popup">
          <div className="success-popup-content">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>

            <span>✔ Post created successfully</span>
          </div>
        </div>,
        document.body
      )}
    </nav>
  )
}

export default NavBar


