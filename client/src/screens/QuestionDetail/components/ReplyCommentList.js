import React, { Component } from 'react'
import ReplyCommentItem from './ReplyCommentItem';

export default class ReplyCommentList extends Component {
  render() {
    return (
      <React.Fragment>
        <ul>
            <li>
                <ReplyCommentItem />
            </li>
            <li>
                <ReplyCommentItem />
            </li>
        </ul> 
      </React.Fragment>
    )
  }
}
