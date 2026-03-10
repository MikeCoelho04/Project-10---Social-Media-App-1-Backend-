import './css/Home.css'
import LeftSideBar from '../components/LeftSideBar'
import Main from '../components/Main'
import RightSideBar from '../components/RightSideBar'

function Home() {

  return(
    <div id="main">
      <LeftSideBar variant='home' />
      <Main variant='home' />
      <RightSideBar variant='home' />
    </div>
  )

}

export default Home