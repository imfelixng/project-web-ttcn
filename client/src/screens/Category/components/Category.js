import React, { Component } from 'react'

export default class Category extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-bar flex">
            <a>Toán học</a>
            <ul className="bk-links mr-2 my-3">
                <li><a href="#"><i className="la la-bell" /></a></li>
            </ul>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
