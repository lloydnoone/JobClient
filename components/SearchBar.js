import React from 'react'
import { connect } from 'react-redux'

import localAuth from '../lib/localAuth'
import * as actions from '../actions'

import Dropdown from './Dropdown'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this)
  }

  handleFormChange(e) {
    this.props.handleFormChange(e)
  }

  handleSubmitLogin(e) {
    const { email, password } = this.props.auth
    e.preventDefault()
    this.props.signIn({ email, password }, () => {
      this.props.loadUsersJobs()
    })
  }

  handleLogOut(e) {
    const { signOut, clearUsersJobs } = this.props
    e.preventDefault()
    signOut(() => {
      clearUsersJobs()  
    })
  }

  handleSubmitRegister(e) {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      register
    } = this.props.auth

    e.preventDefault()
    register({  username, email, password, passwordConfirmation })
  }

  render() {
    return (
      <div className='searchBar'>
        <div className='login'>
          {!localAuth.isAuthenticated() &&
            <>
              <div className='loginForm'>
                <button className='loginButton button'>Login</button>
                <div className='loginFormContent'>
                  <form>
                    <input className='dropdownInput' data-name="email" placeholder='Email' onChange={this.handleFormChange} type='email' autoComplete='new-password' />
                    <input className='dropdownInput' data-name="password" placeholder='Password' onChange={this.handleFormChange} type='password' autoComplete='new-password' />
                    <button className="button" onClick={this.handleSubmitLogin}>Submit</button>
                  </form>
                </div>
              </div>
              <div className='registerForm'>
                <button className='registerButton button'>Register</button>
                <div className='registerFormContent'>
                  <form>
                    <input className='dropdownInput' data-name="username" placeholder='Username' onChange={this.handleFormChange} type='text' autoComplete='new-password' />
                    <input className='dropdownInput' data-name="email" placeholder='Email' onChange={this.handleFormChange} type='email' autoComplete='new-password' />
                    <input className='dropdownInput' data-name="password" placeholder='Password' onChange={this.handleFormChange} type='password' autoComplete='new-password' />
                    <input className='dropdownInput' data-name="passwordConfirmation" placeholder='Password Confirmation' onChange={this.handleFormChange} type='text' autoComplete='new-password' />
                    <button className="button" onClick={this.handleSubmitRegister}>Register</button>
                  </form>
                </div>
              </div>
              
            </>
          }
          {localAuth.isAuthenticated() && <button className="button" onClick={this.handleLogOut}>Log Out</button>}
        </div>
        <div className='jobSearch'>
          <Dropdown location={this.props.jobSearch.location} onClick={(e) => this.props.handleSearchChange(e)} />
          <input data-name="title" placeholder="Job Title..." onChange={this.props.handleSearchChange} />
          <input className='salaryInput' data-name="minSalary" placeholder='Minimum Salary' onChange={this.props.handleSearchChange} type='number' min='10000' max='100000' />
          <input className='salaryInput' data-name="maxSalary" placeholder='Maximum Salary' onChange={this.props.handleSearchChange} type='number' min='10000' max='100000' />
          <button className="button" onClick={() => this.props.submitSearch(this.props.jobSearch.title, this.props.jobSearch.location)}>Search</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state from redux: ', state)
  return { 
    auth: state.auth,
    jobSearch: state.jobSearch
  }
}

export default connect(mapStateToProps, actions)(SearchBar)