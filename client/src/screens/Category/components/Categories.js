import React, { Component } from 'react'
import Category from './Category';

export default class Categories extends Component {

  onShowCategory = (categories) => {
    return categories.map((category, index) => {
      return <Category 
                key = {index}
                category  = {category}
                questions = {this.props.questions}
                getAllQuestionsCategory = {this.props.getAllQuestionsCategory}
            />
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.onShowCategory(this.props.categories)}
      </React.Fragment>
    )
  }
}
