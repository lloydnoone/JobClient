import { FORM_CHANGE } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case FORM_CHANGE:
      console.log('log in forms reducer: ', state)
      //{ [e.target.dataset.name]: (e.target.value || e.target.innerHTML) }
      return { ...state, [action.payload.target.dataset.name]: (action.payload.target.value || action.payload.target.innerHTML) }
    default:
      return state
  }
}