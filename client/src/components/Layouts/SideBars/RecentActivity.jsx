import profilePic from '../../../assets/profile-pics/dog-profile-picture.jpg'

function RecentActivity () {

  return(
    <div className="recent-activity-container right-side-container">

      <div>

        <div className="recent-activity-header">
          <h5>Recent Activity</h5>
          <a href="friends.html">See All</a>
        </div>

        <div className="recent-activity-card">
          <img className="profile-pic" src={profilePic} alt="" />
          <div>
            <span className='profile-name'>You liked this post</span>
            <span className='profile-tag'>10 min ago</span>
          </div>
        </div>

        <div className="recent-activity-card">
          <img className="profile-pic" src={profilePic} alt="" />
          <div>
            <span className='profile-name'>You liked this post</span>
            <span className='profile-tag'>10 min ago</span>
          </div>
        </div>

        <div className="recent-activity-card">
          <img className="profile-pic" src={profilePic} alt="" />
          <div>
            <span className='profile-name'>You liked this post</span>
            <span className='profile-tag'>10 min ago</span>
          </div>
        </div>

      </div>

    </div>
  )

}

export default RecentActivity