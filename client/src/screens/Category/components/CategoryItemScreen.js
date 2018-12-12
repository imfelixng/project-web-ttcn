import React, { Component } from 'react'
import QuestionList from '../../../commons/QuestionList/components/QuestionList';

export default class CategoryItemScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
            <QuestionList />
        </div>

      </React.Fragment>
    )
  }
}
