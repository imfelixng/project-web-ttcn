import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class Tag extends Component {

  componentDidMount() {
    this.props.getCountQuestionsTag(this.props.tag.id);
    this.props.getTagFollowers(this.props.tag.tagID);
  }

  showFollow = (followers) => {
      let result = null;

      if(followers.length === 0) {
        result = <li ><a onClick={() => this.onFollowTag(this.props.tag.tagID, this.props.currentUserID)}><i className="la la-plus" /></a></li>;
      } else {
        if (followers.filter(userID => userID === this.props.currentUserID).length > 0) {
            result = <li ><a ><i className="la la-check" 
                onClick={() => this.onUnFollowTag(this.props.tag.tagID, this.props.currentUserID)}
            /></a></li>;
        } else {
            result = <li ><a onClick={() => this.onFollowTag(this.props.tag.tagID, this.props.currentUserID)}><i className="la la-plus" /></a></li>;
        }
      }
      
      return result;
  }

onFollowTag = (tagID, userFollowID) => {
    this.props.followTag(tagID, userFollowID);
}

onUnFollowTag = (tagID, userFollowID) => {
    this.props.unFollowTag(tagID, userFollowID);
}

  render() {
    let followers = this.props.tagFollowers[this.props.tag.tagID] ? this.props.tagFollowers[this.props.tag.tagID] : null;
    return (
      <React.Fragment>
        <div className="post-bar flex">
            <NavLink className="name-list" to = {"/tags/" + this.props.tag.id}>{this.props.tag.text}</NavLink>
            <ul className="bk-links mr-2 my-3">
              <li className="question-amount"><a href="#"><i className="fa fa-question-circle icon-ques"></i><span className="amount">{this.props.count}</span></a></li>
              {
                followers ? this.showFollow(followers) :
                <li ><a onClick={() => this.onFollowTag(this.props.tag.tagID, this.props.currentUserID)}><i className="la la-plus" /></a></li>
              }
            </ul>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
