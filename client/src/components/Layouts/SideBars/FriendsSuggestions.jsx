import profilePic from '../../../assets/profile-pics/my-profile-picture.jpeg'

function FriendsSuggestions() {

  return(
    <div className="left-side-container">

      <div>
        <h5>Suggestions</h5>

        <div className="suggestions-container">
          <div>

            <img className="profile-pic" src={profilePic} alt="Peter profile picture" />
            <div>
              <span className='profile-name'>Peter</span>
              <span className="profile-info">3 friends in common</span>
            </div>

          </div>
          
          <div className='friends-controls'>
            <button className='follow-button'>Follow</button>
            <button className='cancel-button'>X</button>
          </div>
          
        </div>

        <div className="suggestions-container">
          <div>

            <img className="profile-pic" src={profilePic} alt="Katrine profile picture" />
            <div>
              <span className='profile-name'>Katrine</span>
              <span className="profile-info">13 friends in common</span>
            </div>

          </div>

          <div className='friends-controls'>
            <button className='follow-button'>Follow</button>
            <button className='cancel-button'>X</button>
          </div>

        </div>

        <div>
          <a className="see-more-link" href="friends.html">See more</a>
        </div>

      </div>
    </div>
  )

}

export default FriendsSuggestions