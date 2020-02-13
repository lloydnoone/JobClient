import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import localAuth from '../lib/localAuth'

import SearchBar from '../components/SearchBar'
import Listings from '../components/Listings'

import './style.scss'

class App extends Component {
  constructor() {
    super()

    this.state = {
      jobs: null,
      jobIds: [],
      title: 'Javascript',
      location: 'London',
      minSalary: null,
      maxSalary: null,
      savedJobs: []
    }
    this.clearUsersJobs = this.clearUsersJobs.bind(this)
    this.loadUsersJobs = this.loadUsersJobs.bind(this)
    this.saveId = this.saveId.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  componentDidMount() {
    //load default job search
    axios.get('api/jobs/javascript/london')
      .then(res => this.setState({ jobs: res.data }))
      .catch(err => console.log(err))
    
    this.loadUsersJobs()
  }

  loadUsersJobs() {
    if (localAuth.isAuthenticated()) {
      axios.get('api/profile', { headers: { Authorization: `Bearer ${localAuth.getToken()}` } })
        .then((res) => {
          const jobIdsArr = res.data.jobs.map(job => {
            return job.jobBoardId
          })
          this.setState({ jobIds: jobIdsArr })
        })
        .catch(err => console.log('error: ', err))
    }
    console.log('load users jobs just ran.')
  }

  clearUsersJobs() {
    this.setState({ jobIds: [] })
    console.log('clear users jobs just ran.')
  }

  saveId(e, jobId, jobUrl) {
    e.preventDefault()
    axios.post('/api/users/jobs', { jobBoardId: jobId }, { //attaches job to currently logged in user
      headers: { Authorization: `Bearer ${localAuth.getToken()}` }
    })
      .then((res) => {
        //extract ids from data
        const jobIdsArr = res.data.jobs.map(job => {
          return job.jobBoardId
        })
        this.setState({ jobIds: jobIdsArr }, () => location.href = jobUrl)
      })
      .catch(err => console.log('error: ', err))
  }

  handleChange(e) {
    this.setState({ [e.target.dataset.name]: (e.target.value || e.target.innerHTML) })
  }

  submitSearch() {
    axios.get(`/api/jobs/${this.state.title}/${this.state.location}`)
      .then(res => this.setState({ jobs: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.jobs) return null
    console.log(this.state)
    return (
      <div className='App'>
        <SearchBar 
          location={this.state.location}  
          handleChange={this.handleChange}
          submitSearch={this.submitSearch}
          loadUsersJobs={this.loadUsersJobs}
          clearUsersJobs={this.clearUsersJobs}
        />
        <Listings 
          jobs={this.state.jobs}
          jobIds={[...this.state.jobIds]}
          saveId={this.saveId}
          minSalary={this.state.minSalary}
          maxSalary={this.state.maxSalary}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
