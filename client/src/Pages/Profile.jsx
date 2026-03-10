import './css/Profile.css'
import LeftSideBar from "../components/LeftSideBar"
import Main from '../components/Main'
import RightSideBar from '../components/RightSideBar'

function Profile() {

  return (

    <div id="main">
      <LeftSideBar variant='profile' />
      <Main variant='profile' />
      <RightSideBar variant='profile' />
    </div>

  )

}

export default Profile