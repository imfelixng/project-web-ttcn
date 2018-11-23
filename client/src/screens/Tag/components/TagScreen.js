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
            <Tags tags = {this.props.tags}/>
          </div>{/*posts-section end*/}
        </Main>
      </React.Fragment>
    )
  }
}
