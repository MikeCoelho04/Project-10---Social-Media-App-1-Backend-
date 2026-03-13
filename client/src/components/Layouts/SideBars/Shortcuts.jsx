import { Link } from "react-router"
import { useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import { addPost } from "../../../store/posts/actions/posts"

function Shortcuts () {

  const dispatch = useDispatch()
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false)
  const [content, setContent] = useState('')
  const [mediaUrls, setMediaUrls] = useState(null)
  const [errors, setErrors] = useState(null)

  const [showPostSuccessPopup, setShowPostSuccessPopup] = useState(false)

  function openCreatePostPopup() {
    setShowCreatePostPopup(true)
  }

  function closeCreatePostPopup() {
    setShowCreatePostPopup(false)
    setContent('')
    setMediaUrls(null)
  }

  async function createPost(e) {

    e.preventDefault()

    if (!content && !mediaUrls) {
      setErrors('A post must contain either text or media!')
    }

    const formData = new FormData()

    formData.append('content', content)

    if(photo) {
      formData.append('mediaUrls', mediaUrls)
    }

    try {

      await dispatch(addPost(formData))

      setShowPostSuccessPopup(true)

      closeCreatePostPopup()

    } catch (error) {

    }

  }

  useEffect(() => {

    if(showPostSuccessPopup) {

      const timer = setTimeout(() => {
        setShowPostSuccessPopup(false)
      }, 5000)

      return () => clearTimeout(timer)

    }

  }, [showPostSuccessPopup])

  return(
    <div>
      <div className="left-side-container">
        <div>
          <h5>Shortcuts</h5>
          <div className='shortcuts-container'>
            <a className="shortcuts-paragraphs" onClick={openCreatePostPopup}>🔵 New Post</a>
            <Link className="shortcuts-paragraphs" to='/friends'>🟢 Friends</Link>
            <a className="shortcuts-paragraphs" href="">🟡 Trends</a>
          </div>
        </div>
      </div>
      {showCreatePostPopup && (
        <div
          className="create-post-overlay"
          onClick={closeCreatePostPopup}
        >
          <div
            className="create-post-popup"
            onClick={(e) => e.stopPropagation()}
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
                  onChange={(e) => {
                    setContent(e.target.value)
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
                  onChange={(e) => {
                    setMediaUrls(e.target.files[0])
                    setErrors(null)
                  }}
                  className={errors ? 'input-error' : ''}
                />
              </div>
              {errors &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{errors}</span>
                </div>
              }
              <button type="submit" className="create-post-button">
                Publish
              </button>
            </form>
          </div>
        </div>
      )}
      {showPostSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-content">

            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>

            <span>✔ Post created successfully</span>

          </div>
        </div>
      )}
    </div>
  )

}

export default Shortcuts