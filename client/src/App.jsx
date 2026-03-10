import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import NavBar from './components/NavBar.jsx'
import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import Friends from './Pages/Friends.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'

import { Provider } from 'react-redux'
import store from './store'

import { fetchUsers } from './store/actions/user.js'

function App() {

  let isLoggedIn = false

  return (

    <Provider store={store}>

      <BrowserRouter>
      {/* Para desaparecer com a navbar fazer uma verificação se está com login feito */}
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />}  />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/friends' element={<Friends />} />
        </Routes>
      </BrowserRouter>

    </Provider>

  )

}

export default App
