import React, { Component } from 'react'

export default class ReplyCommentItem extends Component {
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}
