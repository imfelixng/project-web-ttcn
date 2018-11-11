import React, { Component } from 'react'
import Category from './Category';

export default class Categories extends Component {
  render() {
    return (
      <React.Fragment>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </React.Fragment>
    )
  }
}
