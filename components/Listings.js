import React from 'react'

import Listing from './Listing'

class Listings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailsDisplay: true
    }
  }

  render() {
    console.log('listings render. ')
    return (
      <div className="listings">
        {this.props.jobs.jobsArray
          .filter((job) => {
            if (!this.props.minSalary && !this.props.maxSalary) return true
            if (job.minSalary >= parseInt(this.props.minSalary) && !this.props.maxSalary) return true
            if (job.maxSalary <= parseInt(this.props.maxSalary) && !this.props.minSalary) return true
            return job.minSalary >= parseInt(this.props.minSalary) && job.maxSalary <= parseInt(this.props.maxSalary)
          })
          .map(job => {
            return <Listing 
              key={job.id} 
              job={job} 
              applied={this.props.jobIds.includes(job.id)}
              saveId={this.saveId}
            />
          })
        }
      </div>
    )
  }
}

export default Listings