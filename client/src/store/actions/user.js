import axios from 'axios'

export const USERS_LOADING = 'USERS_LOADING'

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const USERS_FAILED = 'USERS_FAILED'

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

export const fetchUsers = () => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      const res = await axios.get('http://localhost:3000/users')

      dispatch(fetchUsersSuccess(res.data.data))

    } catch (error) {

      dispatch(setUsersFailed(error.message))

    } 
  
  }

}

export const addUser = (formData) => {

  return async (dispatch) => {

    try {

      dispatch(setUsersLoading(true))

      await axios.post('http://localhost:3000/users/signup', formData)

    } catch (error) {

      dispatch(setUsersFailed(error.response?.data?.message || error.message))

    }

  }

}

export const updateUser = (existingUser) => {

  return async (dispatch) => {

    try {
  
      dispatch(setUsersLoading(true))

      await axios.patch(`http://localhost:3000/users/${existingUser._id}`, existingUser)

      dispatch(fetchUsers())
  
    } catch (error) {
  
      dispatch(setUsersFailed(error.message))
  
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