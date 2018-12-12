import React, { Component } from 'react'
import ReplyCommentItem from './ReplyCommentItem';

export default class ReplyCommentList extends Component {

  showReply = (replies) => {
    let result = null;
    if(replies.length > 0) {
      result = replies.map((reply, index) => {
        return <li key = {index}>
                <ReplyCommentItem 
                  checkReply = {this.props.checkReply}
                  comment = {this.props.comment}
                  reply = {reply}
                  userOther = {this.props.userOther}
                  getUserOther = {this.props.getUserOther}
                />
              </li>
      }); 
    }

    return result;
  }

  render() {
    return (
      <React.Fragment>
        <ul>
            {this.showReply(this.props.comment.replies)}
        </ul> 
      </React.Fragment>
    )
  }
}
