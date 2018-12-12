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
                        <thead className="thead-dark">
                            <tr className="table-primary">
                            <th scope="col">Question</th>
                            <th scope="col">User</th>
                            <th scope="col">Votes</th>
                            <th scope="col">Comments</th>
                            <th scope="col">Views</th>
                            <th scope="col">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">cau hoi 1</th>
                                <td>An nguyen</td>
                                <td>10</td>
                                <td>6</td>
                                <td>20</td>
                                <td>3h trước</td>
                            </tr>
                            <tr>
                                <th scope="row">cau hoi 1</th>
                                <td>An nguyen</td>
                                <td>10</td>
                                <td>6</td>
                                <td>20</td>
                                <td>3h trước</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </React.Fragment>
    )
  }
}
