import axios from 'axios'
import { clearFriendRequestState } from '../../friendsRequests/actions/friendRequest'

export const USERS_LOADING = 'USERS_LOADING'

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const USERS_FAILED = 'USERS_FAILED'

export const FETCH_SINGLE_USER_SUCCESS = 'FETCH_SINGLE_USER_SUCCESS'

export const CLEAR_USER_ERROR_FIELD = 'CLEAR_USER_ERROR_FIELD'

export const setUsersLoading = (value) => ({
  type: USERS_LOADING,
  payload: value
})

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
})

export const setUsersFailed = (error) => ({
  type: USERS_FAILED,
  payload: error
})

export const fetchSingleUserSuccess = (user) => ({
  type: FETCH_SINGLE_USER_SUCCESS,
  payload: user
})

export const clearUserErrorField = (field) => ({
  type: CLEAR_USER_ERROR_FIELD,
  payload: field
})

export const fetchUsers = () => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.get('http://localhost:3000/users')

      dispatch(fetchUsersSuccess(res.data.data))
      return res.data.data

    } catch (error) {

      dispatch(setUsersFailed(error.message))
      throw error

    } finally {

      dispatch(setUsersLoading(false))

    } 
  
  }

}

export const fetchSingleUser = (userId) => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.get(`http://localhost:3000/users/${userId}`)

      dispatch(fetchSingleUserSuccess(res.data))

    } catch (error) {

      dispatch(setUsersFailed(error.message))

    } finally {

      dispatch(setUsersLoading(false))

    }

  }

}

export const fetchCurrentUser = () => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.get('http://localhost:3000/users/me')

      dispatch(fetchSingleUserSuccess(res.data.data))
      return res.data.data

    } catch (error) {

      dispatch(setUsersFailed(error.response?.data?.message || error.message))

      throw error

    } finally {

      dispatch(setUsersLoading(false))

    }

  }

}

export const userLogin = (userData) => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.post('http://localhost:3000/users/signin', userData)

      return res.data

    } catch (error) {

      const errorData = error.response?.data?.message || error.message

      dispatch(setUsersFailed(errorData))

      throw errorData

    } finally {

      dispatch(setUsersLoading(false))

    }

  }

}

export const addUser = (formData) => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.post('http://localhost:3000/users/signup', formData)

      return res.data

    } catch (error) {

      const errorData = error.response?.data?.errors || error.message

      dispatch(setUsersFailed(errorData))

      throw errorData

    } finally {

      dispatch(setUsersLoading(false))

    }

  }

}

export const userLogout = () => {
  
  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.post('http://localhost:3000/users/logout')
      dispatch(clearFriendRequestState())

      return res.data

    } catch(error) {

      throw error

    } finally {
      dispatch(setUsersLoading(false))
    }

  }

}

export const updateUser = (existingUser) => {

  return async (dispatch) => {

    try {
  
      dispatch(setUsersLoading(true))

      const res = await axios.patch(`http://localhost:3000/users/${existingUser._id}`, existingUser)

      if (res.data?.data) {
        dispatch(fetchSingleUserSuccess(res.data.data))
      }

      dispatch(fetchUsers())
      return res.data

    } catch (error) {
  
      dispatch(setUsersFailed(error.response?.data?.message || error.message))
      throw error

    } finally {

      dispatch(setUsersLoading(false))
  
    }

  }

}

export const deleteUser = (existingUser) => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      await axios.delete(`http://localhost:3000/users/${existingUser._id}`)
      
      dispatch(fetchUsers())
 
    } catch (error) {

      dispatch(setUsersFailed(error.message))

    }

  }

}

export const userLoginCheck = () => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.get('http://localhost:3000/auth/check')

      return res.data

    } catch (error) {

      throw error

    } finally {

      dispatch(setUsersLoading(false))

    }

  }

}
