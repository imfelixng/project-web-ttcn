import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import moment from 'moment';
export default class QuestionItem extends Component {

  componentDidMount() {
    this.props.getUserOther(this.props.question.userID);
  }

  showTag = (tags) => {
    let result = null;
    if(tags.length > 0 ) {
      result = tags.map((tag, index) => {
        return <NavLink 
                key = {index}
                to = { "/tags/"  + tag.id} 
                className = "question_list_item_tag-item"
              >
                {tag.text}
              </NavLink>
      });
    }
    return result;
  }

  render() {
    const {question, userOther} = this.props;
    let userInfo = userOther[question.userID];
    let timeAgo = question ? moment(question._updated, "YYYY-MM-DD HH:mm:ss", 'vn').fromNow() : 'Thời gian đăng';

    return (
      <React.Fragment>
        <tr>
            <th scope="row" colSpan = {15}>
              <NavLink to = {"/questions/" + question.questionID} className = "question_list_content">
                {question && question.title}
              </NavLink>
              <div className = "question_list_item_tag" >
                  {this.showTag(question.tags)}
              </div>
            </th>
            <td className = "text-center"><img alt = "logo" className = "image_avatar_user_question_list" src = {userInfo ? userInfo.avatar : "/images/users/img_avatar_default.png"}/></td>
            <td className = "text-center">{question.votes - question.unvotes}</td>
            <td className = "text-center">{question.comments}</td>
            <td className = "text-center">{question.views}</td>
            <td className = "text-center">{timeAgo}</td>
        </tr>
      </React.Fragment>
    )
  }
}
