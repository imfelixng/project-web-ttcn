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
                count = {this.props.countCategoryItem[category.categoryID] ? this.props.countCategoryItem[category.categoryID] : 0}
                getCountQuestionsCategory = {this.props.getCountQuestionsCategory}
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
