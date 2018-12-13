import React, { Component } from 'react'
import QuestionList from '../../../commons/QuestionList/components/QuestionList';

export default class CategoryItemScreen extends Component {

  componentDidMount() {
    this.props.getAllQuestionsCategory(this.props.match.params.idCategory);
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
            <div className = "mt-5">
                <QuestionList 
                  questions = {this.props.questions}
                  type = 'category'
                  userOther = {this.props.userOther}
                  getUserOther = {this.props.getUserOther}
                />
            </div>
        </div>

      </React.Fragment>
    )
  }
}
