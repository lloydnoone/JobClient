import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'

import Listing from './Listing'

class Listings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailsDisplay: true
    }
  }

  render() {
    const { minSalary, maxSalary } = this.props.jobSearch
    return (
      <div className="listings">
        {this.props.jobSearch.jobs.jobsArray
          .filter((job) => {
            if (!minSalary && !maxSalary) return true
            if (job.minSalary >= parseInt(minSalary) && !maxSalary) return true
            if (job.maxSalary <= parseInt(maxSalary) && !minSalary) return true
            return job.minSalary >= parseInt(minSalary) && job.maxSalary <= parseInt(maxSalary)
          })
          .map(job => {
            return <Listing 
              key={job.id} 
              job={job} 
              applied={this.props.jobSearch.jobIds.includes(job.id)}
              saveId={this.props.saveId}
            />
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { jobSearch: state.jobSearch }
}

export default connect(mapStateToProps, actions)(Listings)
