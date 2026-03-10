import './css/NavBar.css'
import logo from '../assets/fronder-logo.png'
import { Link } from 'react-router'

function NavBar () {

  let isOpen = false

  function controlHamburgerMenu () {

    const hamburgerMenu = document.getElementById('navbarSupportedContent')

    if(isOpen == false) {
      hamburgerMenu.style.display = 'flex'
      isOpen = true
    } else {
      hamburgerMenu.style.display = 'none'
      isOpen = false
    }

  }

  return(
    <nav id='navbar'>

      <div>

        <Link className='logo-link' to="/home">
          <img id="logo-img" src={logo} alt="Fronder logo" />
        </Link>
        <Link className="navbar-brand" to="/home">Fronde</Link>

        <form role="search">
          <input className="search-bar" type="search" placeholder="Search" aria-label="Search"/>
        </form>

        <svg onClick={controlHamburgerMenu} className='hamburger-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
          <path
            stroke="rgba(33, 37, 41, 0.75)"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M4 7h22M4 15h22M4 23h22"
          />
        </svg>

        <div className='account-buttons'>
          <a>🔔</a>
          <a>➕</a>
          <a href="profile.html">👤</a>
        </div>
      </div>

      <div id="navbarSupportedContent">
        <ul >
          <li className="nav-item">
            <a class=" operating" aria-current="page" href="#">
              <span>🏠</span> Home
              </a>
          </li>
          <li className="nav-item">
            <a class="" href="messages.html">
              <span>✉️</span> Messages
            </a>
          </li>
          <li className="nav-item">
            <a class="" href="#">
              <span>⟡</span> Explore
            </a>
          </li>
          <li className="nav-item">
            <a class="" href="friends.html">
              <span>👯‍♂️</span> Friends
            </a>
          </li>
          <li className="nav-item">
            <a class="" href="#">
              <span>⚙</span> Settings
            </a>
          </li>
        </ul>
      </div>

    </nav> 
  )

}

export default NavBar