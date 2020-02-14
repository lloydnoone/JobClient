import axios from 'axios'

import { FORM_CHANGE, LOG_IN, LOG_OUT, AUTH_ERROR, REGISTER } from './types'
import localAuth from '../lib/localAuth'

export const handleFormChange = (e) => {
  return {
    type: FORM_CHANGE,
    payload: e
  }
}

export const signIn = (formData, callback) => async dispatch => {
  axios.post('/api/login', formData)
    .then(res => {
      localAuth.setToken(res.data.token)
      //this.props.loadUsersJobs()
      callback()
      dispatch({
        type: LOG_IN,
        payload: res.data.userId
      })
      //this.setState({ email: '', password: '', userId: res.data.userId })
      //console.log('data from response. ', res.data)
    })
    .catch(err =>  { 
      dispatch({ type: AUTH_ERROR, payload: err.message })
    })
}

export const signOut = (callback) => {
  localAuth.logout()
  callback()
  return {
    type: LOG_OUT,
    payload: ''
  }
}

export const register = (formData) => async dispatch => {
  axios.post('/api/register', formData)
    .then(res => {
      localAuth.setToken(res.data.token)
      dispatch({
        type: REGISTER,
        payload: res.data.userId
      })
    })
    .catch(err => {
      return dispatch({ type: AUTH_ERROR, payload: err.message })
    })
}

