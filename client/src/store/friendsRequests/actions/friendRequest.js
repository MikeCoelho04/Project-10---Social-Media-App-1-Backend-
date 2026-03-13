import axios from 'axios'

export const FRIEND_REQUEST_LOADING = 'FRIEND_REQUEST_LOADING'
export const FETCH_FRIEND_REQUEST_SUCCESS = 'FETCH_FRIEND_REQUEST_SUCCESS'
export const FETCH_SENT_FRIEND_REQUEST_SUCCESS = 'FETCH_SENT_FRIEND_REQUEST_SUCCESS'
export const FRIEND_REQUEST_FAILED = 'FRIEND_REQUEST_FAILED'
export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS'
export const REMOVE_RECEIVED_FRIEND_REQUEST = 'REMOVE_RECEIVED_FRIEND_REQUEST'
export const UPDATE_RECEIVED_FRIEND_REQUEST_STATUS = 'UPDATE_RECEIVED_FRIEND_REQUEST_STATUS'
export const CLEAR_FRIEND_REQUEST_STATE = 'CLEAR_FRIEND_REQUEST_STATE'

export const setFriendRequestLoading = (value) => ({
  type: FRIEND_REQUEST_LOADING,
  payload: value,
})

export const fetchFriendRequestSuccess = (friendsRequest) => ({
  type: FETCH_FRIEND_REQUEST_SUCCESS,
  payload: friendsRequest,
})

export const fetchSentFriendRequestSuccess = (friendsRequest) => ({
  type: FETCH_SENT_FRIEND_REQUEST_SUCCESS,
  payload: friendsRequest,
})

export const setFriendRequestFailed = (error) => ({
  type: FRIEND_REQUEST_FAILED,
  payload: error,
})

export const sendFriendRequestSuccess = (friendRequest) => ({
  type: SEND_FRIEND_REQUEST_SUCCESS,
  payload: friendRequest,
})

export const removeReceivedFriendRequest = (requestId) => ({
  type: REMOVE_RECEIVED_FRIEND_REQUEST,
  payload: requestId,
})

export const updateReceivedFriendRequestStatus = (requestId, status) => ({
  type: UPDATE_RECEIVED_FRIEND_REQUEST_STATUS,
  payload: {
    requestId,
    status,
  },
})

export const clearFriendRequestState = () => ({
  type: CLEAR_FRIEND_REQUEST_STATE,
})

export const fetchReceivedFriendRequests = () => {
  return async (dispatch) => {
    try {
      dispatch(setFriendRequestLoading(true))

      const res = await axios.get('http://localhost:3000/friend-request/received')

      dispatch(fetchFriendRequestSuccess(res.data.data))

      return res.data.data
    } catch (error) {
      const errorData = error.response?.data?.message || error.message
      dispatch(setFriendRequestFailed(errorData))
      throw errorData
    } finally {
      dispatch(setFriendRequestLoading(false))
    }
  }
}

export const sendFriendRequest = (receiverId) => {
  return async (dispatch) => {
    try {
      dispatch(setFriendRequestLoading(true))

      const res = await axios.post(
        'http://localhost:3000/friend-request/send',
        { receiverId }
      )

      dispatch(sendFriendRequestSuccess({ receiverId }))

      return res.data
    } catch (error) {
      const errorData = error.response?.data?.message || error.message
      dispatch(setFriendRequestFailed(errorData))
      throw errorData
    } finally {
      dispatch(setFriendRequestLoading(false))
    }
  }
}

export const fetchSentFriendRequests = () => {
  return async (dispatch) => {
    try {
      dispatch(setFriendRequestLoading(true))

      const res = await axios.get('http://localhost:3000/friend-request/sent')
      const sentReceiverIds = (res.data.data || []).map((request) => {
        const receiverId = request.receiverId
        return typeof receiverId === 'object' ? receiverId._id : receiverId
      })

      dispatch(fetchSentFriendRequestSuccess(sentReceiverIds))

      return sentReceiverIds
    } catch (error) {
      const errorData = error.response?.data?.message || error.message
      dispatch(setFriendRequestFailed(errorData))
      throw errorData
    } finally {
      dispatch(setFriendRequestLoading(false))
    }
  }
}

export const acceptFriendRequest = (requestId) => {
  return async (dispatch) => {
    try {
      dispatch(setFriendRequestLoading(true))

      const res = await axios.patch(
        `http://localhost:3000/friend-request/accept/${requestId}`
      )

      dispatch(updateReceivedFriendRequestStatus(requestId, 'accepted'))

      return res.data
    } catch (error) {
      const errorData = error.response?.data?.message || error.message
      dispatch(setFriendRequestFailed(errorData))
      throw errorData
    } finally {
      dispatch(setFriendRequestLoading(false))
    }
  }
}

export const rejectFriendRequest = (requestId) => {
  return async (dispatch) => {
    try {
      dispatch(setFriendRequestLoading(true))

      const res = await axios.patch(
        `http://localhost:3000/friend-request/reject/${requestId}`
      )

      dispatch(updateReceivedFriendRequestStatus(requestId, 'rejected'))

      return res.data
    } catch (error) {
      const errorData = error.response?.data?.message || error.message
      dispatch(setFriendRequestFailed(errorData))
      throw errorData
    } finally {
      dispatch(setFriendRequestLoading(false))
    }
  }
}

export const followBackFriendRequest = (requestId, receiverId) => {
  return async (dispatch) => {
    try {
      dispatch(setFriendRequestLoading(true))

      const res = await axios.patch(
        `http://localhost:3000/friend-request/follow-back/${requestId}`
      )

      dispatch(sendFriendRequestSuccess({ receiverId }))

      return res.data
    } catch (error) {
      const errorData = error.response?.data?.message || error.message
      dispatch(setFriendRequestFailed(errorData))
      throw errorData
    } finally {
      dispatch(setFriendRequestLoading(false))
    }
  }
}
