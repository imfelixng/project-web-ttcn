import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

export default class QuestionItem extends Component {


  showContent = (contentBlock) => {
    if (contentBlock) {
        return {__html: draftToHtml(contentBlock)};
      }
  }

  render() {
    const {question} = this.props;
    return (
      <React.Fragment>
        <tr>
            <th scope="row" colSpan = {15}>
              <NavLink to = {"/questions/" + question.questionID} className = "question_list_content">
                <span 
                    dangerouslySetInnerHTML = { question && this.showContent( question.content)}>
                </span>
              </NavLink>
            </th>
            <td className = "text-center">{question.userID}</td>
            <td className = "text-center">{question.votes - question.unvotes}</td>
            <td className = "text-center">{question.comments}</td>
            <td className = "text-center">{question.views}</td>
            <td className = "text-center">{question._updated}</td>
        </tr>
      </React.Fragment>
    )
  }
}
