import {
  FOLLOWS_LOADING,
  FETCH_FOLLOWS_SUCCESS,
  FOLLOWS_FAILED,
  FETCH_SUGGESTED_FRIENDS_SUCCESS,
  REMOVE_SUGGESTED_FRIEND,
} from '../actions/follow'

const initialState = {
  loading: false,
  suggestedFriends: [],
  seenSuggestedFriendIds: [],
  data: [],
  error: null,
}

const followReducer = (state = initialState, action) => {

  switch(action.type) {

    case FOLLOWS_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case FETCH_FOLLOWS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }

    case FOLLOWS_FAILED: 
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case FETCH_SUGGESTED_FRIENDS_SUCCESS: {
      const incoming = action.payload || []
      const shouldAppend = action.meta?.append === true
      const incomingIds = incoming.map((user) => user._id)
      const seenSuggestedFriendIds = [
        ...new Set([...state.seenSuggestedFriendIds, ...incomingIds])
      ]
      const suggestedFriends = shouldAppend
        ? [...state.suggestedFriends, ...incoming].filter(
            (user, index, arr) =>
              index === arr.findIndex((item) => item._id === user._id)
          )
        : incoming

      return {
        ...state,
        suggestedFriends,
        seenSuggestedFriendIds,
        error: null,
      }

    }
    
    case REMOVE_SUGGESTED_FRIEND:
      return {
        ...state,
        suggestedFriends: state.suggestedFriends.filter(
          (user) => user._id !== action.payload
        ),
        seenSuggestedFriendIds: [...new Set([...state.seenSuggestedFriendIds, action.payload])]
      }

    default:
      return state

  }

}

export default followReducer
