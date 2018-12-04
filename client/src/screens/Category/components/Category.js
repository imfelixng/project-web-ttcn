import React, { Component } from 'react'

export default class Category extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-bar flex">
        <a className="name-list">{this.props.category.name}</a>
            <ul className="bk-links mr-2 my-3">
              <li className="question-amount"><a href="#"><i class="fa fa-question-circle icon-ques"></i><span className="amount">19</span></a></li>
              <li><a href="#"><i class="fa fa-plus-square"></i></a></li>
            </ul>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
