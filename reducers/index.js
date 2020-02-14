import { combineReducers } from 'redux'
import authReducer from './auth'
import jobSearchReducer from './jobSearch'

export default combineReducers({
  auth: authReducer,
  jobSearch: jobSearchReducer 
})