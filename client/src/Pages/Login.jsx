import './css/Login.css'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/users/actions/user'

function Login () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})

  const {loading, error} = useSelector((state) => state.user)

  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function validateForm () {

    const newErrors = {}

    if(!email.trim()) {
      newErrors.email = 'Email is required!'
    } else if(!email.includes('@')) {
      newErrors.email = 'Please insert a valid email!'
    }

    if(!password.trim()) {
      newErrors.password = 'Password is required!'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }

  async function addLogin (e) {

    e.preventDefault()

    validateForm()

    const userData = {
      email,
      password
    }

    try {

      await dispatch(userLogin(userData))
      setShowLoginSuccessPopup(true)

    } catch (error) {

    }


  }

  return(

    <div className="login-page">
      <div className="login-card right-side-container">
        <div>
          <div className="login-header">
            <h2>Login</h2>
            <p>Log in to your account to continue.</p>
          </div>

          <form className="login-form" onSubmit={addLogin}>
            <div className="login-input-group">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" value={email} placeholder="Enter your email" onChange={ (e) => {
                setEmail(e.target.value)
                setErrors((prev) => ({
                  ...prev,
                  email: null,
                }))
              }
              } className={errors.email ? 'input-error' : ''} />
              {(errors.email) &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{errors.email}</span>
                </div>
              }
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} placeholder="Enter your password" onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev) => ({
                  ...prev,
                  password: null
                }))
              }} className={errors.password ? 'input-error' : ''} />
              {(errors.password) &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{errors.password}</span>
                </div>
              }
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <Link>Did you forget your password?</Link>
            </div>

            {(error) &&
              <div className='error-message'>
                <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                <span>{error}</span>
              </div>
            }

            <button type="submit" className="success-button login-button">
              Login
            </button>
          </form>

          <div className="login-footer">
            <span>Don't have an account yet?</span>
            <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>

      {showLoginSuccessPopup && (
        <div
          className="success-popup-overlay"
          onClick={() => setShowLoginSuccessPopup(false)}
        >
          <div
            className="success-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="success-popup-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                width="28"
                height="28"
                aria-hidden="true"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Login successful</h3>
            <p>You have logged in successfully.</p>

            <button
              className="success-popup-button"
              onClick={() => {
                setShowLoginSuccessPopup(false)
                navigate('/home')
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>

  )

}

export default Login