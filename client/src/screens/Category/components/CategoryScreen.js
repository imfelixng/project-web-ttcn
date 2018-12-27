import React, { Component } from 'react'
import Categories from './Categories';
import Main from '../../../commons/Main/components/Main';

export default class CategoryScreen extends Component {

  componentDidMount() {
    this.props.onGetCategories();
  }

  render() {
    return (
      <React.Fragment>
        <Main>
          <p className="mb-3">List category</p>
          <div className="posts-section">
            <Categories 
              categories = {this.props.categories}
              questions = {this.props.questions}
              getAllQuestionsCategory = {this.props.getAllQuestionsCategory}
              countCategoryItem = {this.props.countCategoryItem}
              getCountQuestionsCategory = {this.props.getCountQuestionsCategory}
              getCategoryFollowers = {this.props.getCategoryFollowers}
              categoryFollowers = {this.props.categoryFollowers}
              followCategory = {this.props.followCategory}
              unFollowCategory = {this.props.unFollowCategory}
              currentUserID = {this.props.currentUserID}
            />
          </div>{/*posts-section end*/}
        </Main>
      </React.Fragment>
    )
  }
}
