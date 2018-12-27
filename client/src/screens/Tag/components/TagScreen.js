import React, { Component } from 'react'
import Tags from './Tags';
import Main from '../../../commons/Main/components/Main';

export default class TagScreen extends Component {

  componentDidMount() {
    this.props.onGetTags();
  }

  render() {
    return (
      <React.Fragment>
        <Main >
          <p className="mb-3">List tag</p>
          <div className="posts-section">
            <Tags 
              className="side-tag" 
              tags = {this.props.tags}
              countTagItem = {this.props.countTagItem}
              getCountQuestionsTag = {this.props.getCountQuestionsTag}
              getTagFollowers = {this.props.getTagFollowers}
              tagFollowers = {this.props.tagFollowers}
              followTag = {this.props.followTag}
              unFollowTag = {this.props.unFollowTag}
              currentUserID = {this.props.currentUserID}
            />
          </div>{/*posts-section end*/}
        </Main>
      </React.Fragment>
    )
  }
}
