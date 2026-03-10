import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import userReducer from './reducers/user'
import { composeWithDevTools } from '@redux-devtools/extension'

const rootReducer = combineReducers({
  user: userReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store