import React, { Component } from 'react'

import CommentQuestion from './CommentQuestion'

export default class CommentItem extends Component {


    state = {
        issReply: false
    }

    onOpenReplyBox = () => {
        this.setState({
            isReply: true
        })
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
                <a onClick = {this.onOpenReplyBox}><i className="fa fa-reply-all" onClick = {this.onOpenReplyBox}/>Reply</a>
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
                        this.state.isReply &&
                        <div className="post-comment">
                            <CommentQuestion 
                                currentUser = {this.props.currentUser}
                            />
                        </div>
                    }
                </li>
            </ul>      
      </React.Fragment>
    )
  }
}
