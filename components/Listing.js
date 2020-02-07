import React from 'react'
import localAuth from '../lib/localAuth'

class Listing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailsDisplay: false
    }

    this.toggleDetails = this.toggleDetails.bind(this)
    this.HTMLtoText = this.HTMLtoText.bind(this)
  }

  toggleDetails() {
    this.setState({ detailsDisplay: !this.state.detailsDisplay })
  }

  HTMLtoText(str) {
    const ele = document.createElement('p')
    ele.innerHTML = str
    return ele.textContent
  }

  render() {
    console.log('applied: ', this.props.applied)
    const { job } = this.props
    return (
      <div key={job.id} className='listing'>
        <p>Job Title: {this.HTMLtoText(job.title)}</p>
        <p>Location: {job.location}</p>
        <p>Company: {job.company}</p>
        <button className='button' onClick={this.toggleDetails}>Details</button>
        {this.props.applied && <button className='button applied'>Applied</button>}
        <div className={`details ${this.state.detailsDisplay ? 'detailsOpen' : ''}`}>
          <p>Salary: {job.minSalary} - {job.maxSalary}</p>
          <h3>Description: </h3>
          <p>{this.HTMLtoText(job.description)}</p>
          {!this.props.applied && localAuth.isAuthenticated() &&
          <a href={job.url}>
            <button onClick={(e) => this.props.saveId(e, job.id)} className='button'>Apply</button>
          </a>}
          {!this.props.applied && !localAuth.isAuthenticated() &&
            <button className='button'>Sign in to apply!</button>
          }
        </div>
      </div>
    )
  }
}

export default Listing