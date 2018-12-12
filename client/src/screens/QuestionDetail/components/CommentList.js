import React, { Component } from 'react'
import CommentItem from './CommentItem';
export default class CommentList extends Component {


    showComment = (comments) => {
        return comments.map((commentItem, index) => {
            return <li key = {index}>
                <CommentItem 
                    currentUserID = {this.props.currentUserID}
                    currentUser = {this.props.currentUser}
                    onAddNewComment = {this.props.addNewCommentQuestion}
                    replyCommentID = {this.props.replyCommentID}
                    checkReply = {this.props.checkReply}
                    userOther = {this.props.userOther}
                    getUserOther = {this.props.getUserOther}
                    voteComment = {this.props.voteComment}
                    unVoteComment = {this.props.unVoteComment}
                    comment = {commentItem}
                    isVoteComment = {this.props.isVoteComment}
                    isUnVoteComment = {this.props.isUnVoteComment}
                    checkVoteComment = {this.props.checkVoteComment}
                    questionID = {this.props.questionID}
                    addNewReplyComment = {this.props.addNewReplyComment}
                    checkVote = {this.props.checkVote}
                />
            </li>
        })
    }

  render() {
      const {comments} = this.props;
    return (
      <React.Fragment>
        <div className="comment-section">
            <div className="plus-ic">
                <i className="la la-plus" />
            </div>
            <div className="comment-sec">
                <ul>
                    {
                        comments.length > 0 && this.showComment(comments)
                    }
                </ul>
            </div>
        </div>
      </React.Fragment>
    )
  }
}
