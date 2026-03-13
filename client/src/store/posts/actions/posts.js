import axios from "axios"

export const POSTS_LOADING = 'POSTS_LOADING'

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const POSTS_FAILED = 'POSTS_FAILED'
export const TOGGLE_POST_LIKE_SUCCESS = 'TOGGLE_POST_LIKE_SUCCESS'

export const setPostsLoading = (value) => ({
  type: POSTS_LOADING,
  payload: value
})

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
})

export const setPostsFailed = (error) => ({
  type: POSTS_FAILED,
  payload: error
})

export const togglePostLikeSuccess = (postId, liked) => ({
  type: TOGGLE_POST_LIKE_SUCCESS,
  payload: {
    postId,
    liked,
  }
})

export const addPost = (formData) => {

  return async (dispatch) => {

    try {

      dispatch(setPostsLoading(true))

      const res = await axios.post('http://localhost:3000/posts', formData)

      return res.data

    } catch (error) {

      const errorData = error.response?.data?.errors || error.message

      dispatch(setPostsFailed(errorData))

      throw errorData

    } finally {

      dispatch(setPostsLoading(false))

    }

  }

}

export const fetchPosts = () => {

  return async (dispatch) => {

    try {

      dispatch(setPostsLoading(true))

      const res = await axios.get('http://localhost:3000/posts')

      dispatch(fetchPostsSuccess(res.data.data || []))

      return res.data.data || []

    } catch (error) {

      const errorData = error.response?.data?.message || error.message

      dispatch(setPostsFailed(errorData))

      throw errorData

    } finally {

      dispatch(setPostsLoading(false))

    }

  }

}

export const togglePostLike = (postId) => {

  return async (dispatch) => {

    try {

      const res = await axios.post(`http://localhost:3000/posts/${postId}/like`)

      dispatch(togglePostLikeSuccess(postId, res.data.liked))

      return res.data

    } catch (error) {

      const errorData = error.response?.data?.message || error.message

      dispatch(setPostsFailed(errorData))

      throw errorData

    }

  }

}

export const updatePost = (postId, postData) => {

  return async (dispatch) => {

    try {

      dispatch(setPostsLoading(true))

      const res = await axios.patch(`http://localhost:3000/posts/${postId}`, postData)

      await dispatch(fetchPosts())

      return res.data

    } catch (error) {

      const errorData = error.response?.data?.message || error.message

      dispatch(setPostsFailed(errorData))

      throw errorData

    } finally {

      dispatch(setPostsLoading(false))

    }

  }

}
