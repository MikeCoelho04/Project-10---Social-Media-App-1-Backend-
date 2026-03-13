import { Navigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLoginCheck } from '../store/users/actions/user'

function PublicRoutes ({ children }) {
  const [isAuth, setIsAuth] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userLoginCheck())
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
  }, [dispatch])

  if (isAuth === null) {
    return <div>Loading...</div>
  }

  if (isAuth === true) {
    return <Navigate to='/home' replace />
  }

  return children
}

export default PublicRoutes
