import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import draftToHtml from 'draftjs-to-html';

export default class QuestionSearchItem extends Component {


  componentDidMount() {
    this.props.getCategoryQuestion(this.props.question.categoryID);
    this.props.getUserOther(this.props.question.userID);
  }

  showTag = (tags) => {
    let result = null;
    if(tags.length > 0 ) {
      result = tags.map((tag, index) => {
        return <NavLink 
                key = {index}
                to = { "/tags/"  + tag.id} 
                className = "question_search_item_tag-item"
              >
                {tag.text}
              </NavLink>
      });
    }
    return result;
  }

  showContent = (contentBlock) => {
    if (contentBlock) {
        return {__html: draftToHtml(contentBlock)};
      }
  }

  render() {
    const {question, categoryQuestion, userOther} = this.props;

    let categoryInfo = categoryQuestion[question.categoryID] ? categoryQuestion[question.categoryID] : null;
    let userInfo = userOther[question.userID] ? userOther[question.userID] : null;
    let timeAgo = question ? moment(question._updated, "YYYY-MM-DD HH:mm:ss", 'vn').fromNow() : 'Thời gian đăng';

    return (
      <React.Fragment>
            <div className = "question_search_item">
              <div className = "question_search_item__left">
              <img alt = "logo" className = "question_search_item__avatar" src = {userInfo ? userInfo.avatar : "/images/users/image_avatar_default.png"} />
              </div>
              <div className = "question_search_item__right">
                <div className = "question_search_item__title"><NavLink to = {"/questions/" + question.questionID} >{question.title}</NavLink></div>
                <div className = "question_search_item__time"><img alt = "logo" src = "/images/clock.png" className =  "question_search_item__time-icon" /> {timeAgo}</div>
                <div className = "question_search_item__relation">
                  <div className = "question_search_item_category">
                    <NavLink to = {"/categories/" + question.categoryID} className = "question_search_item_category-item" >{categoryInfo ? categoryInfo.name : "Chuyên Mục"}</NavLink>
                  </div>
                  <div className = "question_search_item_tag">
                    {this.showTag(question.tags)}
                  </div>
                </div>
                <div className = "question_search_item_content">
                  <p 
                    className = "question__content" 
                    dangerouslySetInnerHTML = { question && this.showContent( question.content)}>
                  </p>
                </div>
              </div>
            </div>        
      </React.Fragment>
    )
  }
}
