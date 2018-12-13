import React, { Component } from 'react'
import QuestionSearchItem from './QuestionSearchItem';

export default class QuestionSearchList extends Component {


    
    showQuestionSearchItem = (questions) => {
        let result = null;
        if(questions.length > 0) {
            result = questions.map((question, index) => {
                return <QuestionSearchItem 
                            key = {index}
                            question = {question}
                            userOther = {this.props.userOther}
                            getUserOther = {this.props.getUserOther}
                            categoryQuestion = {this.props.categoryQuestion}
                            getCategoryQuestion = {this.props.getCategoryQuestion}
                        />
            });
            
        } else {
          result = <div>Không có tìm thấy câu hỏi nào liên quan!</div>
        }

        return result;
    }

  render() {
      const {questions} = this.props;
    return (
      <React.Fragment>
        {questions && this.showQuestionSearchItem(questions)}
      </React.Fragment>
    )
  }
}
