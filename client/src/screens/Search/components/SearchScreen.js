import React, { Component } from 'react'

export default class SearchScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <p className="mb-3">List result with keyword <b>abc</b></p>
        <div className="posts-section">
          <h2>Search</h2>
        </div>{/*posts-section end*/}
      </React.Fragment>
    )
  }
}
