import React, { Component } from 'react'
import QuestionItem from './QuestionItem';

export default class QuestionList extends Component {


    showQuestion = (questions) => {
        let result = null;
        if(questions.length > 0) {
            result = questions.map((question, index) => {
                return <QuestionItem 
                            key = {index}
                            question = {question}
                            userOther = {this.props.userOther}
                            getUserOther = {this.props.getUserOther}
                        />
            });
        }
        return result
    }

  render() {
    const {questions} = this.props;
    return (
      <React.Fragment>
        <div className = "container">
            <div className = "row">
                <div className = "col-12 table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Question</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th scope="col" className = "text-center">User</th>
                                <th scope="col" className = "text-center">Votes</th>
                                <th scope="col" className = "text-center">Comments</th>
                                <th scope="col" className = "text-center">Views</th>
                                <th scope="col" className = "text-center">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                questions.length > 0 ? 
                                this.showQuestion(questions) :
                                <tr>
                                    <td colSpan = {20} className = "text-center">Không có dữ liệu nào!</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </React.Fragment>
    )
  }
}
