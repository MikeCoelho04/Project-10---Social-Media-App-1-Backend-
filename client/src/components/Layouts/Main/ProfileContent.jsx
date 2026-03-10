import profilePicture from '../../../assets/profile-pics/dog-profile-picture.jpg'
import postPicture from '../../../assets/posts-images/post1.jpeg'

function ProfileContent () {

  return(
    <div className="hidden-panels">

        <input type="radio" name="tabs" id="tab1" defaultChecked />
        <input type="radio" name="tabs" id="tab2" />
        <input type="radio" name="tabs" id="tab3" />
        <input type="radio" name="tabs" id="tab4" />

        <div className="tabs-nav">
          <label className="tabs-label" htmlFor="tab1">Post</label>
          <label className="tabs-label" htmlFor="tab2">About</label>
          <label className="tabs-label" htmlFor="tab3">Photos</label>
          <label className="tabs-label" htmlFor="tab4">Friends</label>
        </div>

      <div id="panel1">

        <div className="post-card">
          <div>
            <img className="profiles-pictures" src={profilePicture} alt="Pedro profile picture" />
            <div>
              <span className='profile-name'>Pedro</span>
              <span className="profile-tag">2h ago · Porto · Public</span>
            </div>
          </div>
          <p className='post-description'>
            Finally testing the new Fronde page! The clear design is 🔝 <br /> <span>#excittedbrbr</span><br /><span>#happy</span>
          </p>
      
          <img className='post-image' src={postPicture} alt="post 1 photo" />

          <div className='post-stats'>
            <p>👍 938</p>
            <p>100 comments 138 shares</p>
          </div>
          
          <hr />

          <div className='social-post-buttons'>
            <button className='post-button'>👍 Like</button>
            <button className='post-button'>💬 Comment</button>
            <button className='post-button'>🔗 Share</button>
          </div>

        </div>

        <div className="post-card">
          <div>
            <img className="profiles-pictures" src={profilePicture} alt="Pedro profile picture" />
            <div>
              <span className='profile-name'>Pedro</span>
              <span className="profile-tag">2h ago · Porto · Public</span>
            </div>
          </div>
          <p className='post-description'>
            Finally testing the new Fronde page! The clear design is 🔝 <br /> <span>#excittedbrbr</span><br /><span>#happy</span>
          </p>
      
          <img className='post-image' src={postPicture} alt="post 1 photo" />

          <div className='post-stats'>
            <p>👍 938</p>
            <p>100 comments 138 shares</p>
          </div>
          
          <hr />

          <div className='social-post-buttons'>
            <button className='post-button'>👍 Like</button>
            <button className='post-button'>💬 Comment</button>
            <button className='post-button'>🔗 Share</button>
          </div>

        </div>

        <div className="post-card">
          <div>
            <img className="profiles-pictures" src={profilePicture} alt="Pedro profile picture" />
            <div>
              <span className='profile-name'>Pedro</span>
              <span className="profile-tag">2h ago · Porto · Public</span>
            </div>
          </div>
          <p className='post-description'>
            Finally testing the new Fronde page! The clear design is 🔝 <br /> <span>#excittedbrbr</span><br /><span>#happy</span>
          </p>
      
          <img className='post-image' src={postPicture} alt="post 1 photo" />

          <div className='post-stats'>
            <p>👍 938</p>
            <p>100 comments 138 shares</p>
          </div>
          
          <hr />

          <div className='social-post-buttons'>
            <button className='post-button'>👍 Like</button>
            <button className='post-button'>💬 Comment</button>
            <button className='post-button'>🔗 Share</button>
          </div>

        </div>

      </div>

      <div id="panel2">

        <div className="about-me-card">
          <p>Basic Information</p>
          <span className="text-body-secondary">Full Name</span>
          <span>Mike Oliver</span>
          <span className="text-body-secondary">Localization</span>
          <span>Porto, Portugal</span>
          <span className="text-body-secondary">Bio</span>
          <span>Front-end, design minimalista, café ☕️</span>
        </div>

        <div className="about-me-card">
          <p>Work and Education</p>
          <span className="text-body-secondary">Company</span>
          <span>Company - Front-end Developer</span>
          <span className="text-body-secondary">Education</span>
          <span>Bachelor's Degree in Computer Science</span>
        </div>

      </div>

      <div id="panel3">

        <img className="my-profile-photos" src={postPicture} alt="" />
        <img className="my-profile-photos" src={postPicture} alt="" />
        <img className="my-profile-photos" src={postPicture} alt="" />
        <img className="my-profile-photos" src={postPicture} alt="" />
        <img className="my-profile-photos" src={postPicture} alt="" />
        <img className="my-profile-photos" src={postPicture} alt="" />
        <img className="my-profile-photos" src={postPicture} alt="" />
        <img className="my-profile-photos" src={postPicture} alt="" />

      </div>

      <div id="panel4" className="panel-container">

        <div className="friend-card">
          <div className='profile-friends-card'>
            <div>
              <img className="profiles-pictures" src={profilePicture} alt="" />
              <div>
                <p className='profile-name'>Ana Ribeiro</p>
                <p className="profile-tag">5 mutual</p>
              </div>
            </div>
            <button className='message-button profile-message-button'>Message</button>
          </div>
        </div>

        <div className="friend-card">
          <div className='profile-friends-card'>
            <div>
              <img className="profiles-pictures" src={profilePicture} alt="" />
              <div>
                <p className='profile-name'>Ana Ribeiro</p>
                <p className="profile-tag">5 mutual</p>
              </div>
            </div>
            <button className='message-button profile-message-button'>Message</button>
          </div>
        </div>

        <div className="friend-card">
          <div className='profile-friends-card'>
            <div>
              <img className="profiles-pictures" src={profilePicture} alt="" />
              <div>
                <p className='profile-name'>Ana Ribeiro</p>
                <p className="profile-tag">5 mutual</p>
              </div>
            </div>
            <button className='message-button profile-message-button'>Message</button>
          </div>
        </div>

        <div className="friend-card">
          <div className='profile-friends-card'>
            <div>
              <img className="profiles-pictures" src={profilePicture} alt="" />
              <div>
                <p className='profile-name'>Ana Ribeiro</p>
                <p className="profile-tag">5 mutual</p>
              </div>
            </div>
            <button className='message-button profile-message-button'>Message</button>
          </div>
        </div>

        <div className="friend-card">
          <div className='profile-friends-card'>
            <div>
              <img className="profiles-pictures" src={profilePicture} alt="" />
              <div>
                <p className='profile-name'>Ana Ribeiro</p>
                <p className="profile-tag">5 mutual</p>
              </div>
            </div>
            <button className='message-button profile-message-button'>Message</button>
          </div>
        </div>

        <div className="friend-card">
          <div className='profile-friends-card'>
            <div>
              <img className="profiles-pictures" src={profilePicture} alt="" />
              <div>
                <p className='profile-name'>Ana Ribeiro</p>
                <p className="profile-tag">5 mutual</p>
              </div>
            </div>
            <button className='message-button profile-message-button'>Message</button>
          </div>
        </div>

      </div>

    </div>
  )

}

export default ProfileContent