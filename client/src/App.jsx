import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import Friends from './Pages/Friends.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import NotFound from './Pages/NotFound.jsx'
import NavBarLayout from './components/NavBarLayout.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import PublicRoutes from './components/PublicRoutes.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SearchProvider>
          <NavBarLayout>
            <Routes>
              <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
              <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
              <Route path='/home' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/friends' element={<Friends />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </NavBarLayout>
        </SearchProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
