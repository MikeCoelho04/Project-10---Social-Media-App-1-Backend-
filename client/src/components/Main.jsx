import './css/Main.css'
import memoriePhoto from '../assets/memories-images/New-York.jpg'
import profilePic from '../assets/profile-pics/assistant-profile-pictur.jpg'
import postImg from '../assets/posts-images/post1.jpeg'
import Memories from './Layouts/Main/Memories'
import SharePost from './Layouts/Main/SharePost'
import Post from './Layouts/Main/Post'
import ProfileHeader from './Layouts/Main/ProfileHeader'
import ProfileContent from './Layouts/Main/ProfileContent'
import FriendsDashboard from './Layouts/Main/FriendsDashboard'

function Main ( { variant } ) {

  return(
    <div className="middle-container">

      {variant === 'home' && <Memories />}
      {variant === 'home' && <SharePost />}
      {variant === 'home' && <Post />}

      {variant === 'profile' && <ProfileHeader />}
      {variant === 'profile' && <ProfileContent />}

      {variant === 'friends' && <FriendsDashboard />}

    </div>
  )

}

export default Main