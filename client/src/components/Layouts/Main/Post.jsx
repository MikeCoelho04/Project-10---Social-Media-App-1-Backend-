import profilePic from '../../../assets/profile-pics/assistant-profile-pictur.jpg'
import postImg from '../../../assets/posts-images/post1.jpeg'

function Post() {

  return(
    <div className="post-container">

      <div className="post-card">

        <div>
          <img className="profiles-pictures" src={profilePic} alt="Pedro profile picture" />
          <div>
            <span className='profile-username'>Pedro</span>
            <span className="profile-tag">2h ago · Porto · Public</span>
          </div>
        </div>

        <p className='post-description'>
          Finally testing the new Fronde page! The clear design is 🔝 <br /> <span >#excittedbrbr</span><br /><span >#happy</span>
        </p>
        
        <img className='post-img' src={postImg} alt="post 1 photo" />

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
          <img className="profiles-pictures" src={profilePic} alt="Pedro profile picture" />
          <div>
            <span className='profile-username'>Pedro</span>
            <span className="profile-tag">2h ago · Porto · Public</span>
          </div>
        </div>

        <p className='post-description'>
          Finally testing the new Fronde page! The clear design is 🔝 <br /> <span >#excittedbrbr</span><br /><span >#happy</span>
        </p>
        
        <img className='post-img' src={postImg} alt="post 1 photo" />

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
          <img className="profiles-pictures" src={profilePic} alt="Pedro profile picture" />
          <div>
            <span className='profile-username'>Pedro</span>
            <span className="profile-tag">2h ago · Porto · Public</span>
          </div>
        </div>

        <p className='post-description'>
          Finally testing the new Fronde page! The clear design is 🔝 <br /> <span >#excittedbrbr</span><br /><span >#happy</span>
        </p>
        
        <img className='post-img' src={postImg} alt="post 1 photo" />

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
  )

}

export default Post