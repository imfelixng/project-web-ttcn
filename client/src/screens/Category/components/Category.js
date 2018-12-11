import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';


export default class Category extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-bar flex">
        <NavLink to = {"/categories/" + this.props.category.categoryID} className="name-list">{this.props.category.name}</NavLink>
            <ul className="bk-links mr-2 my-3">
              <li className="question-amount"><a href="#"><i className="fa fa-question-circle icon-ques"></i><span className="amount">19</span></a></li>
              <li><a href="#"><i className="fa fa-plus-square"></i></a></li>
            </ul>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
