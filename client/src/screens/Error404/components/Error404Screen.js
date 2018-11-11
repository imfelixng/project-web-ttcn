import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class Error404 extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Error 404</h1>
        <NavLink to = "/">
            Go to home
        </NavLink>
      </React.Fragment>
    )
  }
}
