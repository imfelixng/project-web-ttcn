import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';


export default class Category extends Component {

  componentDidMount() {
    this.props.getAllQuestionsCategory(this.props.category.categoryID);
    this.props.getCountQuestionsCategory(this.props.category.categoryID);
    this.props.getCategoryFollowers(this.props.category.categoryID);
  }

  showFollow = (followers) => {
      let result = null;

      if(followers.length === 0) {
        result = <li ><a onClick={() => this.onFollowCategory(this.props.category.categoryID, this.props.currentUserID)}><i className="la la-plus" /></a></li>;
      } else {
        if (followers.filter(userID => userID === this.props.currentUserID).length > 0) {
            result = <li ><a ><i className="la la-check" 
                onClick={() => this.onUnFollowCategory(this.props.category.categoryID, this.props.currentUserID)}
            /></a></li>;
        } else {
            result = <li ><a onClick={() => this.onFollowCategory(this.props.category.categoryID, this.props.currentUserID)}><i className="la la-plus" /></a></li>;
        }
      }
      
      return result;
  }

  onFollowCategory = (categoryID, userFollowID) => {
      this.props.followCategory(categoryID, userFollowID);
  }

  onUnFollowCategory = (categoryID, userFollowID) => {
      this.props.unFollowCategory(categoryID, userFollowID);
  }

  render() {
    let followers = this.props.categoryFollowers[this.props.category.categoryID] ? this.props.categoryFollowers[this.props.category.categoryID] : null;
    return (
      <React.Fragment>
        <div className="post-bar flex">
        <NavLink to = {"/categories/" + this.props.category.categoryID} className="name-list">{this.props.category.name}</NavLink>
            <ul className="bk-links mr-2 my-3">
              <li className="question-amount"><a ><i className="fa fa-question-circle icon-ques"></i><span className="amount">{this.props.count}</span></a></li>
              {
                followers ? this.showFollow(followers) :
                <li ><a onClick={() => this.onFollowCategory(this.props.category.categoryID, this.props.currentUserID)}><i className="la la-plus" /></a></li>
              }
            </ul>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
