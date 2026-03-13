import './css/LeftSideBar.css'
import profilePic from '../assets/profile-pics/my-profile-picture.jpeg'
import { Link } from 'react-router'
import FriendsSuggestions from './Layouts/SideBars/FriendsSuggestions'
import Shortcuts from './Layouts/SideBars/Shortcuts'
import ProfileResumeLinks from './Layouts/SideBars/ProfileResumeLinks'
import ProfileInfo from './Layouts/SideBars/ProfielInfo'
import QuickLinks from './Layouts/SideBars/QuickLinks'

function LeftSideBar( { variant } ) {


 
  return(
    <div id="left-side-content">

      {variant === 'home' && <ProfileResumeLinks variant={variant} />}
      {variant === 'home' && <Shortcuts />}
      {variant === 'home' && <FriendsSuggestions />}

      {variant === 'profile' && <ProfileInfo />}
      {variant === 'profile' && <QuickLinks />}

      {variant === 'friends' && <ProfileResumeLinks variant={variant} />}

    </div>  
  )

}

export default LeftSideBar
