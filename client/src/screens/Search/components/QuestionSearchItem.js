import React, { Component } from 'react'

export default class QuestionSearchItem extends Component {
  render() {
    return (
      <React.Fragment>
            <div className = "question_search_item">
              <div className = "question_search_item__left">
              <img className = "question_search_item__avatar" src = "/images/users/img_avatar_default.png" />
              </div>
              <div className = "question_search_item__right">
                <div className = "question_search_item__title"><a>Tieu de cau hoi</a></div>
                <div className = "question_search_item__time"><img src = "/images/clock.png" className =  "question_search_item__time-icon" /> 27/10/2997</div>
                <div className = "question_search_item__relation">
                  <div className = "question_search_item_category">
                    <span className = "question_search_item_category-item" >Toán học</span>
                  </div>
                  <div className = "question_search_item_tag">
                    <span className = "question_search_item_tag-item">Hình học không gian</span>
                    <span className = "question_search_item_tag-item">Tích phân</span>
                  </div>
                </div>
                <div className = "question_search_item_content">
                  <p>Noi dung bai viet</p>
                </div>
              </div>
            </div>        
      </React.Fragment>
    )
  }
}
