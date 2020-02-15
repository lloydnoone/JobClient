import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'

import SearchBar from '../components/SearchBar'
import Listings from '../components/Listings'

import './style.scss'

class App extends Component {

  componentDidMount() {
    this.props.defaultJobSearch(() => {
      this.props.loadUsersJobs()
    })
  }

  render() {
    console.log('props in app from redux: ', this.props)
    //if (!this.props.jobSearch.jobs || !this.props.jobSearch.jobIds) return null
    return (
      <div className='App'>
        <SearchBar />
        <Listings />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { jobSearch: state.jobSearch }
}

export default connect(mapStateToProps, actions)(App)
