import { FORM_CHANGE } from './types'

export const handleFormChange = (e) => {
  return {
    type: FORM_CHANGE,
    payload: e
  }
}

