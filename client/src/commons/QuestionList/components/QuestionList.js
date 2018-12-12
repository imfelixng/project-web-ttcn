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
                            <tr>
                                <th scope="row" colspan = {10}>cau hoi 1</th>
                                <td className = "text-center">An nguyen</td>
                                <td className = "text-center">10</td>
                                <td className = "text-center">6</td>
                                <td className = "text-center">20</td>
                                <td className = "text-center">3h trước</td>
                            </tr>
                            <tr>
                                <th scope="row" colspan = {10}>cau hoi 1</th>
                                <td className = "text-center">An nguyen</td>
                                <td className = "text-center">10</td>
                                <td className = "text-center">6</td>
                                <td className = "text-center">20</td>
                                <td className = "text-center">3h trước</td>
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
