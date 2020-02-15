import axios from 'axios'

import { FORM_CHANGE, LOG_IN, LOG_OUT, AUTH_ERROR, REGISTER, DEFAULT_SEARCH, LOAD_USERS_JOBS, CLEAR_USERS_JOBS,
  SAVE_ID, SEARCH_CHANGE, SUBMIT_SEARCH } from './types'
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
      callback()
      dispatch({
        type: LOG_IN,
        payload: res.data.userId
      })
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

export const defaultJobSearch = (callback) => async dispatch => {
  axios.get('api/jobs/javascript/london')
    .then(res => {
      dispatch({
        type: DEFAULT_SEARCH,
        payload: res.data
      })
      callback()
    })
    .catch(err => {
      return dispatch({ type: AUTH_ERROR, payload: err.message })
    })
}

export const loadUsersJobs = () => async dispatch => {
  if (localAuth.isAuthenticated()) {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${localAuth.getToken()}` } })
      .then((res) => {
        const jobIdsArr = res.data.jobs.map(job => {
          return job.jobBoardId
        })
        console.log('ids array in action: ', jobIdsArr)
        dispatch({
          type: LOAD_USERS_JOBS,
          payload: jobIdsArr
        })
      })
      .catch(err => {
        return dispatch({ type: AUTH_ERROR, payload: err.message })
      })
  } else {
    dispatch({
      type: LOAD_USERS_JOBS,
      payload: []
    })
  }
}

export const clearUsersJobs = () => {
  return ({
    type: CLEAR_USERS_JOBS,
    payload: []
  })
}

export const saveId = (e, jobId, jobUrl) => async dispatch => {
  e.preventDefault()
  axios.post('/api/users/jobs', { jobBoardId: jobId }, { //attaches job to currently logged in user
    headers: { Authorization: `Bearer ${localAuth.getToken()}` }
  })
    .then((res) => {
      //extract ids from data
      const jobIdsArr = res.data.jobs.map(job => {
        return job.jobBoardId
      })
      dispatch({
        type: SAVE_ID,
        payload: jobIdsArr
      })
      location.href = jobUrl
    })
    .catch(err => {
      return dispatch({ type: AUTH_ERROR, payload: err.message })
    })
}

export const handleSearchChange = (e) => {
  return {
    type: SEARCH_CHANGE,
    payload: e
  }
}

export const submitSearch = (title, location) => async dispatch => {
  axios.get(`/api/jobs/${title}/${location}`)
    .then(res => {
      dispatch({
        type: SUBMIT_SEARCH,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({ type: AUTH_ERROR, payload: err.message })
    })
}

