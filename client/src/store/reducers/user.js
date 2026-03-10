import {
  USERS_LOADING,
  FETCH_USERS_SUCCESS,
  USERS_FAILED,
} from '../actions/user'

const initialState = {
  loading: false,
  data: [],
  error: null,
} 

const userReducer = (state = initialState, action) => {

  switch(action.type) {

    case USERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      } 
    
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    
    case USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state

  }

}

export default userReducer