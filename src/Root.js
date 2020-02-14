import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from '../reducers'

import App from './app'

const Root = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers, 
    initialState,
    applyMiddleware(reduxThunk)
  )
    
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
)