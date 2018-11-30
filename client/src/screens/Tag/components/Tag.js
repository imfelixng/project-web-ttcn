import React, { Component } from 'react'

export default class Tag extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-bar flex">
            <a>{this.props.tag.text}</a>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
