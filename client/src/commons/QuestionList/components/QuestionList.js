import React, { Component } from 'react'
import QuestionItem from './QuestionItem';

export default class QuestionList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className = "container">
            <div className = "row">
                <div className = "col-12 table-responsive">
                    <table className="table table-hover">
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
                            <QuestionItem />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </React.Fragment>
    )
  }
}
