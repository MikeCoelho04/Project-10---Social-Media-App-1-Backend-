import {
  POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  POSTS_FAILED,
  TOGGLE_POST_LIKE_SUCCESS,
} from '../actions/posts'

const initialState = {
  loading: false,
  data: [],
  error: null,
}

const postsReducer = (state = initialState, action) => {

  switch(action.type) {

    case POSTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }

    case POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case TOGGLE_POST_LIKE_SUCCESS:
      return {
        ...state,
        data: state.data.map((post) => {
          if (post._id !== action.payload.postId) {
            return post
          }

          return {
            ...post,
            likesCount: Math.max(
              0,
              (post.likesCount || 0) + (action.payload.liked ? 1 : -1)
            ),
            likedByCurrentUser: action.payload.liked,
          }
        }),
      }

    default:
      return state

  }

}

export default postsReducer
