import { useLocation } from "react-router"
import NavBar from './NavBar'

function NavBarLayout ({ children }) {

  const location = useLocation()

  const hidenNavBarRoutes = ['/login', '/register']

  const showNavBar = !hidenNavBarRoutes.includes(location.pathname)

  return (
    <>
    {showNavBar && <NavBar />}
    {children}
    </>
  )

}

export default NavBarLayout