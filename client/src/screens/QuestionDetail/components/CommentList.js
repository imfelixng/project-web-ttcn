import React, { Component } from 'react'
import CommentItem from './CommentItem';
export default class CommentList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="comment-section">
            <div className="plus-ic">
                <i className="la la-plus" />
            </div>
            <div className="comment-sec">
                <ul>
                    <li>
                        <CommentItem />
                        <CommentItem />
                    </li>
                </ul>
            </div>
        </div>
      </React.Fragment>
    )
  }
}
