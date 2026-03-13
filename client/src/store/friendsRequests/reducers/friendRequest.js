import {
  FRIEND_REQUEST_LOADING,
  FETCH_FRIEND_REQUEST_SUCCESS,
  FETCH_SENT_FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_FAILED,
  SEND_FRIEND_REQUEST_SUCCESS,
  REMOVE_RECEIVED_FRIEND_REQUEST,
  UPDATE_RECEIVED_FRIEND_REQUEST_STATUS,
  CLEAR_FRIEND_REQUEST_STATE,
} from '../actions/friendRequest'

const initialState = {
  loading: false,
  receivedRequests: [],
  sentRequests: [],
  error: null,
}

const friendRequestReducer = (state = initialState, action) => {

  switch(action.type) {

    case FRIEND_REQUEST_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case FETCH_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        receivedRequests: action.payload,
        error: null,
      }

    case FETCH_SENT_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        sentRequests: action.payload,
        error: null,
      }

    case FRIEND_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        sentRequests: [...new Set([...state.sentRequests, action.payload.receiverId])]
      }

    case REMOVE_RECEIVED_FRIEND_REQUEST:
      return {
        ...state,
        receivedRequests: state.receivedRequests.filter(
          (request) => request._id !== action.payload
        ),
      }

    case UPDATE_RECEIVED_FRIEND_REQUEST_STATUS:
      return {
        ...state,
        receivedRequests: state.receivedRequests.map((request) =>
          request._id === action.payload.requestId
            ? { ...request, status: action.payload.status }
            : request
        ),
      }

    case CLEAR_FRIEND_REQUEST_STATE:
      return initialState

    default:
      return state

  }

}

export default friendRequestReducer
