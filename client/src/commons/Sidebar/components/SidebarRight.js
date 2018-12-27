import React, { Component } from 'react'
import QuestionSidebarItem from './QuestionSidebarItem';

export default class SidebarRight extends Component {

    
    componentDidMount() {
        this.props.getTopQuestions();
    }

    showQuestion = (questions) => {
        let result = null;

        if(questions.length > 0) {
            result = questions.map((question, index) => {
                return <QuestionSidebarItem
                            key = {index}
                            question = {question}
                            userOther = {this.props.userOther}
                            getUserOther = {this.props.getUserOther}
                        />
            });
        }

        return result;
    }

  render() {

    const {topQuestions} = this.props;

    return (

      <React.Fragment>
        <div className="right-sidebar">
            <div className="suggestions full-width">
                <div className="sd-title">
                    <img 
                        className = "sidebar__icon" src = "/images/ic_top_questions.png"
                        alt = "icon"
                    />
                    <h3>Top câu hỏi</h3>
                </div>{/*sd-title end*/}
                <div className="suggestions-list">
                    {this.showQuestion(topQuestions)}
                </div>{/*suggestions-list end*/}
            </div>{/*suggestions end*/}
        </div>{/*right-sidebar end*/}
      </React.Fragment>
    )
  }
}
