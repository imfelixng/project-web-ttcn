import React, { Component } from 'react'
import QuestionList from '../../../commons/QuestionList/components/QuestionList';

export default class TagItemScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
            <div className = "mt-5">
                <QuestionList 
                  questions = {this.props.questions}
                  type = 'tag'
                  userOther = {this.props.userOther}
                  getUserOther = {this.props.getUserOther}
                />
            </div>
        </div>
      </React.Fragment>
    )
  }
}
