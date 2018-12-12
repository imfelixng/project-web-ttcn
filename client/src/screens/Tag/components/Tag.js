import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class Tag extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-bar flex">
            <NavLink className="name-list" to = {"/tags/" + this.props.tag.id}>{this.props.tag.text}</NavLink>
            <ul className="bk-links mr-2 my-3">
              <li className="question-amount"><a href="#"><i className="fa fa-question-circle icon-ques"></i><span className="amount">19</span></a></li>
              <li><a href="#"><i className="fa fa-plus-square"></i></a></li>
            </ul>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
