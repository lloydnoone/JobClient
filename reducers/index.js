import { combineReducers } from 'redux'
import formsReducer from './forms'

export default combineReducers({
  forms: formsReducer
})