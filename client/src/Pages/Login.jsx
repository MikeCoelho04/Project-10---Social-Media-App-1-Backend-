import './css/Login.css'
import { Link } from 'react-router'

function Login () {

  return(

    <div className="login-page">
      <div className="login-card right-side-container">
        <div>
          <div className="login-header">
            <h2>Login</h2>
            <p>Log in to your account to continue.</p>
          </div>

          <form className="login-form">
            <div className="login-input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/">Did you forget your password?</a>
            </div>

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
    </div>

  )

}

export default Login