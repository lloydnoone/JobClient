import { DEFAULT_SEARCH, LOAD_USERS_JOBS, CLEAR_USERS_JOBS, SAVE_ID, SEARCH_CHANGE, SUBMIT_SEARCH } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case DEFAULT_SEARCH:
      return { ...state, jobs: action.payload }
    case LOAD_USERS_JOBS:
      return { ...state, jobIds: action.payload }
    case CLEAR_USERS_JOBS:
      return { ...state, jobIds: action.payload }
    case SAVE_ID:
      return { ...state, jobIds: action.payload }
    case SEARCH_CHANGE:
      return { ...state, [action.payload.target.dataset.name]: (action.payload.target.value || action.payload.target.innerHTML) }
    case SUBMIT_SEARCH:
      return { ...state, jobs: action.payload }
    default:
      return state
  }
}