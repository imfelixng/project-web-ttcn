import React, { Component } from 'react'
import QuestionList from '../../../commons/QuestionList/components/QuestionList';

export default class TagItemScreen extends Component {

  state  = {
    idTag: ''
  }
  componentDidMount() {
    this.props.getAllQuestionsTag(this.props.match.params.idTag);
  }

  static getDerivedStateFromProps(prevProps, state) {
    if(prevProps.match.params.idTag !== state.idTag) {
      prevProps.getAllQuestionsTag(prevProps.match.params.idTag);
      return {
        idTag: prevProps.match.params.idTag
      }
    }
    return {
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
            <div className = "mt-5">
                <QuestionList 
                  questions = {this.props.questions}
                  type = 'tag'
                  userOther = {this.props.userOther}
                  getUserOther = {this.props.getUserOther}
                />
            </div>
        </div>
      </React.Fragment>
    )
  }
}
