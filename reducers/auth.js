import { AUTH_ERROR, LOG_IN, LOG_OUT, REGISTER, FORM_CHANGE } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    case LOG_IN:
      return { ...state, email: '', password: '', userId: action.payload }
    case LOG_OUT:
      return { ...state, userId: action.payload }
    case REGISTER:
      return { 
        ...state, 
        email: '', 
        password: '', 
        userId: action.payload,
        passwordConfirmation: '',
        username: ''
      }
    case FORM_CHANGE:
      console.log('log in forms reducer: ', state)
      return { ...state, [action.payload.target.dataset.name]: (action.payload.target.value || action.payload.target.innerHTML) }
    default:
      return state
  }
}