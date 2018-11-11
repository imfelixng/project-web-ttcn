import React, { Component } from 'react'
import Tags from './Tags';
import Main from '../../../commons/Main/components/Main';

export default class TagScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <Main >
          <p className="mb-3">List tags</p>
          <div className="posts-section">
            <Tags />
          </div>{/*posts-section end*/}
        </Main>
      </React.Fragment>
    )
  }
}
