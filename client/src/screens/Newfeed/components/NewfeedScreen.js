import React, { Component } from 'react'
import QuestionTopbar from './QuestionTopbar';
import Question from './Question';
import LoadMore from '../../../commons/LoadMore/components/LoadMore';
import Main from '../../../commons/Main/components/Main';

export default class NewfeedScreen extends Component {

  state = {
    currentUserID: '',
    currentUser: null
  }

  componentDidMount = () => {
    this.props.getQuestions();
    this.props.getCategories();
    this.props.getTags();
    this.props.getUser(this.props.currentUserID);
  }
  
  showQuestion = (questions) => {
    if(questions.length > 0) {
      return questions.map((question, index) => {
        return <Question 
          key = {index}
          question = {question}
          currentUserID  = {this.props.currentUserID}
          currentUser = {this.state.currentUser}
          getUserOther = {this.props.getUserOther}
          userOther = {this.props.userOther}
          getCategoryQuestion = {this.props.getCategoryQuestion}
          categoryQuestion = {this.props.categoryQuestion}
          deleteQuestion = {this.props.deleteQuestion}
          history = {this.props.history}
        />
      });
    }
    
  }

  static getDerivedStateFromProps(props) {
    return {
      currentUserID: props.currentUserID,
      currentUser: props.currentUser
    }
  }

  render() {
    return (
      <React.Fragment>
        <Main>
          <div className="wrapper">
              {
                this.state.currentUserID &&
                <QuestionTopbar 
                  addNewQuestion = {this.props.addNewQuestion}
                  categories = {this.props.categories}
                  suggestions = {this.props.tags}
                  currentUser = {this.state.currentUser}
                />
              }
              <div className="posts-section">
                {this.showQuestion(this.props.questions)}
                <LoadMore />
              </div>{/*posts-section end*/}
          </div>{/*theme-layout end*/}
        </Main>
      </React.Fragment>
    )
  }
}
