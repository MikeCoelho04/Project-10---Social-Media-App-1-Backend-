import profilePic from '../../../assets/profile-pics/my-profile-picture.jpeg'
import { Link } from 'react-router'

function ProfileResumeLinks() {

  return(
    <div className="left-side-container">

      <div>
        <div>
          <Link className='profile-tag' to="/profile">
            <img className='profile-pic' src={profilePic} alt="My profile picture" />
            <div>
              <h5 className='profile-name'>Miguel Coelho</h5>
              <span className="profile-username">@mike</span>
            </div>
          </Link>
        </div>

        <div className="profile-card-links">
          <a className='quick-link-selected' href="#"><span>🏠</span> Home</a>
          <a href="messages.html" ><span>✉️</span> Messages</a>
          <a href="#"><span>⟡</span> Explore</a>
          <Link to='/friends'><span>👯‍♂️</span> Friends</Link>
          <a href="#"><span>⚙</span> Settings</a>
        </div>

      </div>
      
    </div>
  )

}

export default ProfileResumeLinks