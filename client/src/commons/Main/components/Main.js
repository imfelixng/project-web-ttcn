import React, { Component } from 'react'
import SidebarLeftContainer from '../../Sidebar/containers/SidebarLeftContainer';
import SidebarRightContainer from '../../Sidebar/containers/SidebarRightContainer';


export default class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
            <div className="main-section">
                <div className="container">
                <div className="main-section-data">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                            <SidebarLeftContainer />
                        </div>
                        <div className="col-lg-6 col-md-12 no-pd">
                            <div className="main-ws-sec">
                                {this.props.children}
                            </div>{/*main-ws-sec end*/}
                        </div>
                        <div className="col-lg-3 pd-right-none no-pd sidebar-right">
                            <SidebarRightContainer 
                                type = "top_questions"
                            />
                        </div>
                    </div>
                </div>{/* main-section-data end*/}
                </div> 
            </div>
        </main>
      </React.Fragment>
    )
  }
}
