import React, { Component } from 'react'
import QuestionTopbar from './QuestionTopbar';
import Question from './Question';
import LoadMore from '../../../commons/LoadMore/components/LoadMore';
import Main from '../../../commons/Main/components/Main';

export default class NewfeedScreen extends Component {

  componentDidMount = () => {
    this.props.getQuestions();
  }
  
  render() {
    return (
      <React.Fragment>
        <Main>
          <div className="wrapper">
              <QuestionTopbar />
              <div className="posts-section">
                                      <Question />
                                      <Question />
                                      <Question />
                                      <Question />
                                      <LoadMore />
              </div>{/*posts-section end*/}
          </div>{/*theme-layout end*/}
        </Main>
      </React.Fragment>
    )
  }
}
