import './css/Register.css'
import { Link, useNavigate } from 'react-router'

import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { addUser, clearUserErrorField } from '../store/users/actions/user'

function Register () {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState(null)

  const [errors, setErrors] = useState({})

  const {loading, error} = useSelector((state) => state.user)

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  function validateForm () {

    const newErrors = {}

    if(!email.trim()) {
      newErrors.email = 'Email is required!'
    } else if(!email.includes('@')) {
      newErrors.email = 'Please insert a valid email!'
    }

    if(!username.trim()) {
      newErrors.username = 'Username is required!'
    }

    if(!fullName.trim()) {
      newErrors.fullName = 'Full name is required!'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required!'
    } 
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-\/]).{8,}/.test(password)) {
      newErrors.password =
        'Password must have at least 8 characters, one uppercase, one lowercase, one number and one special character (! to /)'
    }

    if (!repeatPassword.trim()) {
      newErrors.repeatPassword = 'This field is required!'
    } else if (repeatPassword !== password) {
      newErrors.repeatPassword = `The passwords don't match!`
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }

  async function add (e) {

    e.preventDefault() // To stop the page from default reload

    validateForm()

    const formData = new FormData()

    formData.append('email', email)
    formData.append('username', username)
    formData.append('fullName', fullName)
    formData.append('password', password)
    formData.append('repeatedPassword', repeatPassword)
    formData.append('bio', bio)

    if(avatarUrl) {

      formData.append('avatarUrl', avatarUrl)

    }

    try {

      const result = await dispatch(addUser(formData))

      setShowSuccessPopup(true)

    } catch(error) {

    }

  }

  return (
    <div className="signup-page">
      <div className="signup-card right-side-container">
        <div>
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Fill in your details to create a new account</p>
          </div>

          <form className="signup-form" onSubmit={add}>

            <div className="signup-input-group">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" value={email} onChange={
                (e) => { 
                  setEmail(e.target.value)
                  dispatch(clearUserErrorField('email'))
                  setErrors((prev) => ({
                    ...prev,
                    email: null
                  }))
                }
              } placeholder="Enter your email" className={(
                error?.email === 'This email is already in use!' || 
                errors.email === 'Email is required!' || 
                errors.email === 'Please insert a valid email!')
                ? 'input-error'
                : ''
              } />
              {(error?.email === 'This email is already in use!' ||
                errors.email === 'Email is required!' || 
                errors.email === 'Please insert a valid email!'
              ) &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{error?.email || errors.email}</span>
                </div>
              }
            </div>

            <div className="signup-input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={
                (e) => {
                  setUsername(e.target.value)
                  dispatch(clearUserErrorField('username'))
                  setErrors((prev) => ({
                    ...prev,
                    username: null,
                  }))
                }
              } placeholder="Choose a username" className={
                (
                  error?.username === 'This username is already in use!' ||
                  errors.username === 'Username is required!'
                ) ? 'input-error' : ''
              }/>
              {(
                error?.username === 'This username is already in use!' || 
                errors.username === 'Username is required!'
              ) &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{error?.username || errors.username}</span>
                </div>
              }
            </div>

            <div className="signup-input-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" name={fullName} onChange={(e) => {
                setFullName(e.target.value)
                setErrors((prev) => ({
                  ...prev,
                  fullName: null,
                  })
                )
              }
              } placeholder="Enter your full name" className={errors.fullName ? 'input-error' : ''} />
              {errors.fullName &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{errors.fullName}</span>
                </div>
              }
            </div>

            <div className="signup-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name={password} onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev) => ({
                  ...prev,
                  password: null,
                }))
              } } placeholder="Enter your password" className={errors.password ? 'input-error' : ''} />
              {errors.password &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{errors.password}</span>
                </div>
              }
            </div>

            <div className="signup-input-group">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input type="password" id="repeatPassword" placeholder="Repeat your password" onChange={(e) => {
                setRepeatPassword(e.target.value)
                setErrors((prev) => ({
                  ...prev,
                  repeatPassword: null
                }))
              }} className={errors.repeatPassword ? 'input-error' : ''}/>
              {errors.repeatPassword &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fillRule="evenodd" clipRule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{errors.repeatPassword}</span>
                </div>
              }
            </div>

            <div className="signup-input-group">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" rows="4" name={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us a little about yourself"></textarea>
            </div>

            <div className="signup-input-group">
              <label htmlFor="profilePic">Upload Profile Picture</label>
              <input type="file" id="profilePic" name={avatarUrl} onChange={(e) => setAvatarUrl(e.target.files[0])} />
            </div>

            <button type="submit" className="success-button signup-button">
              Create Account
            </button>
          </form>

          <div className="signup-footer">
            <span>Already have an account?</span>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div
          className="success-popup-overlay"
          onClick={() => setShowSuccessPopup(false)}
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

            <h3>Account created successfully</h3>
            <p>Your account has been created and is ready to use.</p>

            <button
              className="success-popup-button"
              onClick={() => {
                setShowSuccessPopup(false)
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

export default Register