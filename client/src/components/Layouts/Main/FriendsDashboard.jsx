import profilePic from '../../../assets/profile-pics/dog-profile-picture.jpg'

function FriendsDashboard () {

  return(

    <div>

      <input type="radio" name="tabs" id="pane-1" defaultChecked />
      <input type="radio" name="tabs" id="pane-2" />
      <input type="radio" name="tabs" id="pane-3" />
        

      <div className="pane-nav">
        <label className="pane-label" htmlFor="pane-1">All Friends</label>
        <label className="pane-label" htmlFor="pane-2">Friend Requests</label>
        <label className="pane-label" htmlFor="pane-3">Suggested Friends</label>
      </div>
      
      <div className="pane-panel" id="panel-1">

        <div className="filters-bar">

          <div className="filters-container">
            <button className="filters-button active-filter">All</button>
            <button className="filters-button">Online</button>
            <button className="filters-button">Recently Added</button>
            <button className="filters-button">Work</button>
            <button className="filters-button">Fammily</button>
          </div>

          <div className="filters-container">
            <form className="filters-form" action="">
              <select name="asd" id="">
                <option value="asd">Sort: A -&gt; Z</option>
                <option value="asd">Sort: Z -&gt; A</option>
                <option value="asd">Most mutuals</option>
                <option value="ad">Recently active</option>
              </select>
              <input id="filter-search-bar" type="text" placeholder="Filter by name..." />
            </form>
          </div>

        </div>

        <div className="panel-container">

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

              <div className="profile-status">
                🟢 online
              </div>
            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Message</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>Unfollow</button>
            </div>

          </div>

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

              <div className="profile-status">
                🟢 online
              </div>
            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Message</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>Unfollow</button>
            </div>

          </div>

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

              <div className="profile-status">
                🟢 online
              </div>
            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Message</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>Unfollow</button>
            </div>

          </div>

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

              <div className="profile-status">
                🟢 online
              </div>
            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Message</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>Unfollow</button>
            </div>

          </div>

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

              <div className="profile-status">
                🟢 online
              </div>
            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Message</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>Unfollow</button>
            </div>

          </div>

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

              <div className="profile-status">
                🟢 online
              </div>
            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Message</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>Unfollow</button>
            </div>

          </div>

        </div>

      </div>

      <div className="pane-panel" id="panel-2">

        <div className="panel-container">

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Accept</button>
              <button className='profile-button'>Later</button>
              <button className='unfollow-button'>Decline</button>
            </div>

          </div>
          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Accept</button>
              <button className='profile-button'>Later</button>
              <button className='unfollow-button'>Decline</button>
            </div>

          </div>
          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Accept</button>
              <button className='profile-button'>Later</button>
              <button className='unfollow-button'>Decline</button>
            </div>

          </div>
          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Accept</button>
              <button className='profile-button'>Later</button>
              <button className='unfollow-button'>Decline</button>
            </div>

          </div>
          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Accept</button>
              <button className='profile-button'>Later</button>
              <button className='unfollow-button'>Decline</button>
            </div>

          </div>
          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Accept</button>
              <button className='profile-button'>Later</button>
              <button className='unfollow-button'>Decline</button>
            </div>

          </div>

        </div>
      </div>

      <div className="pane-panel"  id="panel-3">
        <div className="panel-container">

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Add friend</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>X</button>
            </div>

          </div>

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Add friend</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>X</button>
            </div>

          </div>

          <div className="friend-card">

            <div>

              <div className="profile-info">
                <img className="profile-pic" src={profilePic} alt="" />
                <div>
                  <p className='profile-name'>Ana Ribeiro</p>
                  <p className="profile-tag">5 mutual friends</p>
                </div>
              </div>

            </div>

            <div className='friend-card-controllers'>
              <button className='message-button'>Add friend</button>
              <button className='profile-button'>Profile</button>
              <button className='unfollow-button'>X</button>
            </div>

          </div>

        </div>
      </div>

      <div className='pagination'>

        <nav aria-label="Page navigation example">
          <ul>
            <li><a href="#">Previous</a></li>
            <li className='pagitanion-selected'><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">Next</a></li>
          </ul>
        </nav>

      </div>

    </div>

  )

}

export default FriendsDashboard