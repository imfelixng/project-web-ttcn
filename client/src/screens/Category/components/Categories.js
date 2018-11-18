import React, { Component } from 'react'
import Category from './Category';

export default class Categories extends Component {

  onShowCategory = (categories) => {
    return categories.map((category, index) => {
      return <Category 
                key = {index}
                category  = {category}
            />
    });
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.onShowCategory(this.props.categories)}
      </React.Fragment>
    )
  }
}
