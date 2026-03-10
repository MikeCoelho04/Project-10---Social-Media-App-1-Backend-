import './css/Register.css'
import { Link } from 'react-router'

import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { addUser } from '../store/actions/user'

import { setUsersFailed } from '../store/actions/user'

function Register ( { user, setEditUSer, deleteUser } ) {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState(null)

  const [errors, setErrors] = useState({})

  const {loading, error} = useSelector((state) => state.user)

  const dispatch = useDispatch()

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

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }

  console.log(error)

  function add (e) {

    e.preventDefault() // To stop the page from default reload

    if(!validateForm()) return

    const formData = new FormData()

    formData.append('email', email)
    formData.append('username', username)
    formData.append('fullName', fullName)
    formData.append('password', password)
    formData.append('bio', bio)

    if(avatarUrl) {

      formData.append('avatarUrl', avatarUrl)

    }

    dispatch(addUser(formData))

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
                  dispatch(setUsersFailed(null))
                  errors.email = null
                }
              } placeholder="Enter your email" className={(
                error === 'This email is already in use!' || 
                errors.email === 'Email is required!' || 
                errors.email === 'Please insert a valid email!')
                ? 'input-error'
                : ''
              } />
              {(error || errors.email) &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" class
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{error || errors.email}</span>
                </div>
              }
            </div>

            <div className="signup-input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={
                (e) => {
                  setUsername(e.target.value)
                  dispatch(setUsersFailed(null))
                  errors.username = null
                }
              } placeholder="Choose a username" className={
                (
                  error === 'This username is already in use!' ||
                  errors.username === 'Username is required!'
                ) ? 'input-error' : ''
              }/>
              {(error || errors.username) &&
                <div className='error-message'>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" class
                  ="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                  <span>{error || errors.username}</span>
                </div>
              }
            </div>

            <div className="signup-input-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" name={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
            </div>

            <div className="signup-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>

            <div className="signup-input-group">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input type="password" id="repeatPassword" placeholder="Repeat your password" />
              <div id='password-check'>
                <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" class="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1a1m0xk xlup9mm x1kky2od"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"></path></svg>
                The passwords don't match!
              </div>
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
    </div>
  )

}

export default Register