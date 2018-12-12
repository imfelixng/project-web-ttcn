import React, { Component } from 'react'

export default class QuestionItem extends Component {
  render() {
    return (
      <React.Fragment>
        <tr>
            <th scope="row" colspan = {15}>cau hoi 1</th>
            <td className = "text-center">An nguyen</td>
            <td className = "text-center">10</td>
            <td className = "text-center">6</td>
            <td className = "text-center">20</td>
            <td className = "text-center">3h trước</td>
        </tr>
      </React.Fragment>
    )
  }
}
