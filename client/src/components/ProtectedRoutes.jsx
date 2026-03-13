import { Navigate } from 'react-router'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLoginCheck } from '../store/users/actions/user'

function ProtectedRoutes ({ children }) {

  const [isAuth, setIsAuth] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(userLoginCheck())
    .then(() => setIsAuth(true))
    .catch(() => setIsAuth(false)) 

  }, [dispatch])

  if(isAuth === null) {
    return <div>Loading...</div>
  }

  if(isAuth === false) {
    return <Navigate to='/login' replace />
  }

  return children

}

export default ProtectedRoutes
