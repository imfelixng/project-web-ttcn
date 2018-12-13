import React, { Component } from 'react'
import SidebarRight from '../../../commons/Sidebar/components/SidebarRight';
import QuestionSearchList from './QuestionSearchList';

export default class SearchScreen extends Component {

  componentDidMount() {
    let index = this.props.location.search.lastIndexOf('=');
    let keyword = this.props.location.search.slice(index + 1);

    if(keyword) {
      this.props.getAllQuestionsSearch(keyword);
    }

  }

  render() {
    return (
      <React.Fragment>
        <div className = "wrapper mt-5">
          <div className = "container">
            <div className = "row">
              <div className = "col-lg-8">
                <QuestionSearchList 
                  questions = {this.props.questions}
                  userOther = {this.props.userOther}
                  getUserOther = {this.props.getUserOther}
                  categoryQuestion = {this.props.categoryQuestion}
                  getCategoryQuestion = {this.props.getCategoryQuestion}
                />
              </div>
              <div className = "col-lg-4">
                <SidebarRight />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
