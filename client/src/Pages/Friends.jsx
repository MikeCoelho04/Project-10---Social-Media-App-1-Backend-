import './css/Friends.css'
import LeftSideBar from '../components/LeftSideBar'
import Main from '../components/Main'
import RightSideBar from '../components/RightSideBar'

function Friends () {

  return(
    <div id="main">

      <LeftSideBar variant='friends' />
      <Main variant='friends' />
      <RightSideBar variant='friends' />

    </div>
  )

}

export default Friends