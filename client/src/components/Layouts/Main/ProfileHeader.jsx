import porfilePic from '../../../assets/profile-pics/dog-profile-picture.jpg'

function ProfileHeader () {

  return(
    <div className="profile-card">

      <div className="top-part"></div>

      <div className="avatar-wrap">
        <img className="avatar" src={porfilePic} alt="" />
      </div>

      <div className="bottom-part">

        <div>
          <p className="profile-name-big">Miguel Coelho</p>
          <p className="profile-card-tag">@mike · Porto</p>
          <p className="stats"><span>428</span> amigos <br className='stats-break' /> <span>73</span> fotos <br className='stats-break' /> <span>154</span> posts</p>
        </div>

        <div>
          <button class="edit-profile-button">✏️ Edit profile</button>
          <button class="more-button">⋯</button>
        </div>

      </div>

    </div> 
  )

}

export default ProfileHeader