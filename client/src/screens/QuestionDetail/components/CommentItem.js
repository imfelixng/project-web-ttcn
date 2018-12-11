import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import CommentQuestion from './CommentQuestion'

export default class CommentItem extends Component {


    state = {
        replyCommentID: ''
    }

    onOpenReplyBox = () => {
        this.props.checkReply(this.props.comment.commentID);
    }

    static getDerivedStateFromProps (props, state) {
        return {
            replyCommentID: props.replyCommentID
        }
    }

  render() {
    return (
      <React.Fragment>
        <div className="comment-list">
            <div className="bg-img">
                <img src="/images/resources/bg-img1.png" alt = "logo"/>
            </div>
            <div className="comment">
                <h3>John Doe</h3>
                <span><img src="/images/clock.png" alt = "logo" /> 3 min ago</span>
                <p>Lorem ipsum dolor sit amet, </p>
                <a onClick = {this.onOpenReplyBox}><i className="fa fa-reply-all"/>Reply</a>
            </div>
        </div>{/*comment-list end*/}
            <ul>
                <li>
                <div className="comment-list">
                    <div className="bg-img">
                    <img src="/images/resources/bg-img2.png" alt = "logo" />
                    </div>
                    <div className="comment">
                    <h3>John Doe</h3>
                    <span><img src="/images/clock.png"alt = "logo" /> 3 min ago</span>
                    <p>Hi John </p>
                    <a onClick = {this.onOpenReplyBox}><i className="fa fa-reply-all" />Reply</a>
                    </div>
                </div>{/*comment-list end*/}
                </li>
                <li>
                    {
                        this.state.replyCommentID && this.state.replyCommentID === this.props.comment.commentID ?
                            this.props.currentUserID ?  
                            <div className="post-comment">
                                <CommentQuestion
                                    currentUser = {this.props.currentUser}
                                    onAddNewComment = {this.props.addNewCommentQuestion}
                                />
                            </div> :
                            <div className="post-comment">
                                <span>Vui lòng <NavLink to = "/sign-in"><b>Login</b></NavLink> để tham gia cuộc thảo luận này!</span>
                            </div> 
                        :
                        null
                    }
                </li>
            </ul>      
      </React.Fragment>
    )
  }
}
