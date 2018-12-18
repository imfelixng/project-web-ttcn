import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

export default class TopComment extends Component {

    componentDidMount() {
        this.props.getUserOther(this.props.topComment.userID);
    }

    showContent = (contentBlock) => {
        if (contentBlock) {
            return {__html: draftToHtml(contentBlock)};
          }
    }

  render() {

    const {topComment, userOther} = this.props;
    let userInfo = userOther[topComment.userID] ? userOther[topComment.userID] : null;

    return (
      <React.Fragment>
        <div className= "top-comment">
            <div className = "top-comment__left">
                <img 
                    src = {userInfo ? userInfo.avatar : "/images/users/img_avatar_default.png"}
                    alt = "avatar"
                    className = "top-comment__avatar"
                />
            </div>
            <div className = "top-comment__right">
                <NavLink
                    to = {"/users/" + topComment.userID}
                    className = "top-comment__fullname"
                >
                    {userInfo ? userInfo.fullname: "yourname"}
                </NavLink>
                <p 
                    className = "top-comment__content"
                    dangerouslySetInnerHTML = {this.showContent(topComment.content)}
                >
                </p>
                <ul className = "top-comment__info">
                    <li>
                        <i className="la la-heart top-comment__icon top-comment__icon-pink"> {topComment.votes - topComment.unvotes}</i>
                    </li>
                    <li>
                        <i className="la la-comments top-comment__icon top-comment__icon-gray"> {topComment.replies.length}</i>
                    </li>
                </ul>
            </div>
        </div>
      </React.Fragment>
    )
  }
}
