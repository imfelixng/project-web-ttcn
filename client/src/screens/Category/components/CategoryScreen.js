import React, { Component } from 'react'
import Categories from './Categories';
import Main from '../../../commons/Main/components/Main';

export default class CategoryScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <Main>
          <p className="mb-3">List category</p>
          <div className="posts-section">
            <Categories />
          </div>{/*posts-section end*/}
        </Main>
      </React.Fragment>
    )
  }
}
