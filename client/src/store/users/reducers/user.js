import {
  USERS_LOADING,
  FETCH_USERS_SUCCESS,
  USERS_FAILED,
  CLEAR_USER_ERROR_FIELD,
  FETCH_SINGLE_USER_SUCCESS,
} from '../actions/user'

const initialState = {
  loading: false,
  singleUser: null,
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

    case FETCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        singleUser: action.payload
      }

    case CLEAR_USER_ERROR_FIELD: {

      const updateErrors = {...state.error }
      delete updateErrors[action.payload]

      return {
        ...state,
        error: updateErrors
      }

    }

    default:
      return state

  }

}

export default userReducer