import profilePic from '../../../assets/profile-pics/dog-profile-picture.jpg'

function FriendsRequest () {

  return(
    <div className="friends-request-card right-side-container">

      <div>

        <div className="friends-request-header">
          <h5>Friends Request</h5>
          <a href="friends.html">3 new · 249 total</a>
        </div>

        <span className='latest-friends-request-span'>Latest friends request</span>

        <div className='friends-request-indivudal-card-global-container'>

          <div className="friends-request-indivudal-card">
            <div>
              <img className="profiles-pictures" src={profilePic} alt="Pedro profile picture" />
              <div>
                <span className="profile-username">Pedro</span>
                <span className="profile-tag">3 friends in common · Designer</span>
              </div>
            </div>
            <div>
              <button className="success-button">Accept</button>
              <button className="mutual-button">Follow Back</button>
              <button className="decline-button">X</button>
            </div>
          </div>
          <div className="friends-request-indivudal-card">
            <div>
              <img className="profiles-pictures" src={profilePic} alt="Pedro profile picture" />
              <div>
                <span className="profile-username">Pedro</span>
                <span className="profile-tag">3 friends in common · Designer</span>
              </div>
            </div>
            <div>
              <button className="success-button">Accept</button>
              <button className="mutual-button">Follow Back</button>
              <button className="decline-button">X</button>
            </div>
          </div>
          <div className="friends-request-indivudal-card">
            <div>
              <img className="profiles-pictures" src={profilePic} alt="Pedro profile picture" />
              <div>
                <span className="profile-username">Pedro</span>
                <span className="profile-tag">3 friends in common · Designer</span>
              </div>
            </div>
            <div>
              <button className="success-button">Accept</button>
              <button className="mutual-button">Follow Back</button>
              <button className="decline-button">X</button>
            </div>
          </div>

        </div>

        <div>
          <a className="see-more-link" href="friends.html">See all</a>
        </div>

      </div>

    </div>
  )

}

export default FriendsRequest