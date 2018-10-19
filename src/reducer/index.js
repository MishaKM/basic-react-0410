import { combineReducers } from 'redux'
import counterReducer from './couter'
import articles from './articles'

export default combineReducers({
  counter: counterReducer,
  articles
})
