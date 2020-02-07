import React from 'react'
import axios from 'axios'

import localAuth from '../lib/localAuth'

import Dropdown from './Dropdown'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      userId: ''
    }

    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this)
  }

  handleFormChange(e) {
    this.setState({ [e.target.dataset.name]: (e.target.value || e.target.innerHTML) })
  }

  handleSubmitLogin(e) {
    e.preventDefault()
    axios.post('/api/login', this.state)
      .then(res => {
        localAuth.setToken(res.data.token)
        this.props.loadUsersJobs()
        this.setState({ email: '', password: '', userId: res.data.userId })
        console.log('data from response. ', res.data)
      })
      .catch(err => console.log(err.message))
  }

  handleLogOut(e) {
    e.preventDefault()
    localAuth.logout()
    this.props.clearUsersJobs()
    this.setState({ userId: '' })
  }

  handleSubmitRegister(e) {
    e.preventDefault()
    axios.post('/api/register', this.state)
      .then((res) => {
        localAuth.setToken(res.data.token)
        this.setState({ email: '', password: '', userId: res.data.userId, passwordConfirmation: '', username: '' })
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log('search bar state: ', this.state)
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
          <Dropdown location={this.props.location} onClick={(e) => this.props.handleChange(e)} />
          <input data-name="title" placeholder="Job Title..." onChange={this.props.handleChange} />
          <input className='salaryInput' data-name="minSalary" placeholder='Minimum Salary' onChange={this.props.handleChange} type='number' min='10000' max='100000' />
          <input className='salaryInput' data-name="maxSalary" placeholder='Maximum Salary' onChange={this.props.handleChange} type='number' min='10000' max='100000' />
          <button className="button" onClick={this.props.submitSearch}>Search</button>
        </div>
      </div>
    )
  }
}

export default SearchBar