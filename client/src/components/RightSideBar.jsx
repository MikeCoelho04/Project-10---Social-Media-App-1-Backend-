import './css/RightSideBar.css'
import profilePic from '../assets/profile-pics/dog-profile-picture.jpg'
import FriendsRequest from './Layouts/SideBars/FriendsRequest'
import Messages from './Layouts/SideBars/Messages'
import RecentActivity from './Layouts/SideBars/RecentActivity'

function RightSideBar ({ variant }) {

  return(
    <div id="right-side-content">

      {variant === 'home' && <FriendsRequest />}
      {variant === 'home' && <Messages />}

      {variant === 'profile' && <RecentActivity />}

      {variant === 'friends' && <Messages />}

    </div>
  )

}

export default RightSideBar