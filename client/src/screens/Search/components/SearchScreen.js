import React, { Component } from 'react'
import QuestionSearchItem from './QuestionSearchItem';
import SidebarRight from '../../../commons/Sidebar/components/SidebarRight';

export default class SearchScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <div className = "wrapper mt-5">
          <div className = "container">
            <div className = "row">
              <div className = "col-lg-8">
                <QuestionSearchItem />
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
