import profilePic from '../../../assets/profile-pics/dog-profile-picture.jpg'

function Messages () {

  return(
    <div className="messages-container right-side-container">

      <div>

        <div className="messages-header">
          <h5>Messages</h5>
          <a>1 unread</a>
        </div>

        <div className="messages-invidual-container">

          <div>
            <img className="profiles-pictures" src={profilePic} alt="Mary profile picture" />
            <div>
              <span className="profile-username">Mary</span>
              <span className="profile-tag">Are you going to the company event?</span>
            </div>
            <button class="reply-button">Reply</button>
          </div>

        </div>

        <div className="messages-invidual-container">

          <div>
            <img className="profiles-pictures" src={profilePic} alt="Mary profile picture" />
            <div>
              <span className="profile-username">Mary</span>
              <span className="profile-tag">Are you going to the company event?</span>
            </div>
            <button class="open-button">Open</button>
          </div>

        </div>

        <div>
          <a className="see-more-link">See all</a>
        </div>

      </div>

    </div>
  )

}

export default Messages