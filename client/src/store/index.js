import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import userReducer from './users/reducers/user'
import postsReducer from './posts/reducers/posts'
import followReducer from './follow/reducers/follow'
import friendRequestReducer from './friendsRequests/reducers/friendRequest'
import { composeWithDevTools } from '@redux-devtools/extension'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  follow: followReducer,
  friendRequest: friendRequestReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store