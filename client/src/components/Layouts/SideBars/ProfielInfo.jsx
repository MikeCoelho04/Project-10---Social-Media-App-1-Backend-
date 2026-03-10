import profilePic from '../../../assets/profile-pics/my-profile-picture.jpeg'
import { Link } from 'react-router'

function ProfileInfo () {

  return(
    <div className='left-side-container'>

      <div className='profile-bio-container'>

        <div>
          <Link className='profile-tag' to="/profile">
            <img className='profile-pic' src={profilePic} alt="My profile picture" />
            <div>
              <h5 className='profile-name'>Miguel Coelho</h5>
              <span className="profile-username">@mike</span>
            </div>
          </Link>
        </div>

        <div className='profile-description'>
          <p className='profile-title'>Intro</p>
          <p>Front-end dev. Coffee lover ☕ · Porto</p>
          <p>🏢 Company</p>
          <p>📍 Porto, Portugal</p>
          <p>🕒 Joined 2022</p>
          <p>🔗 website.pt</p>
        </div>

      </div>

    </div>
  )

}

export default ProfileInfo