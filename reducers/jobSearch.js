import { DEFAULT_SEARCH } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case DEFAULT_SEARCH:
      return { ...state, jobs: action.payload }
    default:
      return state
  }
}