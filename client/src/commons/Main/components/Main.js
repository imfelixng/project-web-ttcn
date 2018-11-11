import React, { Component } from 'react'
import SidebarLeft from '../../Sidebar/components/SidebarLeft';
import SidebarRight from '../../Sidebar/components/SidebarRight';


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
                            <SidebarLeft />
                        </div>
                        <div className="col-lg-6 col-md-8 no-pd">
                            <div className="main-ws-sec">
                                {this.props.children}
                            </div>{/*main-ws-sec end*/}
                        </div>
                        <div className="col-lg-3 pd-right-none no-pd">
                            <SidebarRight />
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
