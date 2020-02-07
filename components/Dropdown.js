import React from 'react'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="dropdown">
        <button className="button">
          <span>Location: {this.props.location}</span>
          <i className="fas fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <li data-name="location" onClick={this.props.onClick}>London</li>
          <li data-name="location" onClick={this.props.onClick}>Manchester</li>
        </div>
      </div>
    )
  }
}

export default Dropdown