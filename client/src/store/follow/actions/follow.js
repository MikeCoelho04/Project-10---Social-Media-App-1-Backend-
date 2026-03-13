import axios from 'axios'

export const FOLLOWS_LOADING = 'FOLLOWS_LOADING'

export const FETCH_FOLLOWS_SUCCESS = 'FETCH_FOLLOWS_SUCCESS'
export const FOLLOWS_FAILED = 'FOLLOWS_FAILED'

export const FETCH_SUGGESTED_FRIENDS_SUCCESS = 'FETCH_SUGGESTED_FRIENDS_SUCCESS'

export const REMOVE_SUGGESTED_FRIEND = 'REMOVE_SUGGESTED_FRIEND'

export const setFollowsLoading = (value) => ({
  type: FOLLOWS_LOADING,
  payload: value
})

export const fetchFollowsSuccess = (follows) => ({
  type: FETCH_FOLLOWS_SUCCESS,
  payload: follows,
})

export const setFollowsFailed = (error) => ({
  type: FOLLOWS_FAILED,
  payload: error,
})

export const fetchSuggestedFriendsSuccess = (users, options = {}) => ({
  type: FETCH_SUGGESTED_FRIENDS_SUCCESS,
  payload: users,
  meta: options,
})

export const removeSuggestedFriend = (userId) => ({
  type: REMOVE_SUGGESTED_FRIEND,
  payload: userId,
})

export const fetchSuggestedFriends = (excludedIds = [], limit = 3, options = {}) => {

  return async (dispatch) => {

    try {

      dispatch(setFollowsLoading(true))

      const params = new URLSearchParams()

      params.append('limit', limit)

      if (excludedIds.length > 0) {
        params.append('excludedIds', excludedIds.join(','))
      }
      
      const query = params.toString() ? `?${params.toString()}` : ''

      const res = await axios.get(`http://localhost:3000/follow/suggested-friends${query}`)

      dispatch(fetchSuggestedFriendsSuccess(res.data.data, options))

      return res.data.data

    } catch (error) {

      const errorData = error.response?.data?.message || error.message

      dispatch(setFollowsFailed(errorData))
      
      throw errorData

    } finally {

      dispatch(setFollowsLoading(false))

    }

  }

}

export const toggleFollowUser = (followingId) => {

  return async (dispatch) => {

    try {

      dispatch(setFollowsLoading(true))

      const res = await axios.post(`http://localhost:3000/users/${followingId}/follow-toggle`)

      return res.data

    } catch (error) {

      const errorData = error.response?.data?.message || error.message

      dispatch(setFollowsFailed(errorData))

      throw errorData

    } finally {

      dispatch(setFollowsLoading(false))

    }

  }

}

export const fetchFollowings = (userId) => {

  return async (dispatch) => {

    try {

      dispatch(setFollowsLoading(true))

      const res = await axios.get(`http://localhost:3000/users/${userId}/following`)

      dispatch(fetchFollowsSuccess(res.data.data || []))

      return res.data.data || []

    } catch (error) {

      const errorData = error.response?.data?.message || error.message

      dispatch(setFollowsFailed(errorData))

      throw errorData

    } finally {

      dispatch(setFollowsLoading(false))

    }

  }

}
