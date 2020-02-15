import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import * as actions from '../actions'

import SearchBar from '../components/SearchBar'
import Listings from '../components/Listings'

import './style.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      jobs: null,
      jobIds: [],
      title: 'Javascript',
      location: 'London',
      minSalary: null,
      maxSalary: null,
      savedJobs: []
    }
    this.submitSearch = this.submitSearch.bind(this)
  }

  componentDidMount() {
    this.props.defaultJobSearch(() => {
      this.props.loadUsersJobs()
    })
  }

  submitSearch() {
    axios.get(`/api/jobs/${this.state.title}/${this.state.location}`)
      .then(res => this.setState({ jobs: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    console.log('props in app from redux: ', this.props)
    //if (!this.props.jobSearch.jobs || !this.props.jobSearch.jobIds) return null
    return (
      <div className='App'>
        <SearchBar 
          location={this.props.jobSearch.location}
          handleChange={this.props.handleSearchChange}
          submitSearch={this.props.submitSearch}
          loadUsersJobs={this.props.loadUsersJobs}
          clearUsersJobs={this.props.clearUsersJobs}
        />
        <Listings 
          jobs={this.props.jobSearch.jobs}
          jobIds={[...this.props.jobSearch.jobIds]}
          saveId={this.props.saveId}
          minSalary={this.state.minSalary}
          maxSalary={this.state.maxSalary}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { jobSearch: state.jobSearch }
}

export default connect(mapStateToProps, actions)(App)
