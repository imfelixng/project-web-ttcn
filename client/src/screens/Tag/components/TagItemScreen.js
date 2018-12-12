import React, { Component } from 'react'
import QuestionList from '../../../commons/QuestionList/components/QuestionList';

export default class TagItemScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
            <div className = "mt-5">
                <QuestionList />
            </div>

        </div>

      </React.Fragment>
    )
  }
}
