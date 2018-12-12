import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import css from './error404.css'
export default class Error404 extends Component {
  render() {
    return (
      <React.Fragment>
        <div className = "wrapper">
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>4<span />4</h1>
              </div>
              <h2>Oops! Page Not Be Found</h2>
              <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
              <NavLink to="/">Back to homepage</NavLink>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
