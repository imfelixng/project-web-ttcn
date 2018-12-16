import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class QuestionSidebarItem extends Component {
  render() {
    const {question, userOther} = this.props;

    let userInfo = userOther[question.userID] ? userOther[question.userID] : null;

    return (
      <React.Fragment>
        <div className="suggestion-usd">
            <img className = "suggestion-usd__avatar" src= {userInfo ? userInfo.avatar : '/images/users/img_avatar_default.png'} alt = "logo" />
            <div className="sgt-text">
                <h4><NavLink to = {"/questions/" + question.questionID} className="name-question">{question.title}</NavLink></h4>
                <span>{userInfo ? userInfo.fullname : 'yourname'}</span>
                <div className="like-cmt">
                    <a><i className="fa fa-heart"><span>{question.votes - question.unvotes}</span></i></a>
                    <a><i className="fa fa-comment"><span>{question.comments}</span></i></a>
                </div>
            </div>
        </div>
      </React.Fragment>
    )
  }
}
