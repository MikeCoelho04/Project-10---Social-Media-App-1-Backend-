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
import SearchResults from './Layouts/Main/SearchResults'
import { useSearch } from '../context/SearchContext'

function Main ( { variant } ) {
  const { searchQuery } = useSearch()
  const hasActiveSearch = searchQuery.trim().length > 0

  return(
    <div className="middle-container">
      {hasActiveSearch && <SearchResults />}

      {!hasActiveSearch && variant === 'home' && <Memories />}
      {!hasActiveSearch && variant === 'home' && <Post />}

      {!hasActiveSearch && variant === 'profile' && <ProfileHeader />}
      {!hasActiveSearch && variant === 'profile' && <ProfileContent />}

      {!hasActiveSearch && variant === 'friends' && <FriendsDashboard />}

    </div>
  )

}

export default Main
