import React, { Component } from 'react'

export default class SidebarRight extends Component {
  render() {
    return (

      <React.Fragment>
                                <div className="right-sidebar">
                            <div className="suggestions full-width">
                                <div className="sd-title">
                                <h3>Top câu hỏi</h3>
                                </div>{/*sd-title end*/}
                                <div className="suggestions-list">
                                <div className="suggestion-usd">
                                    <img src="/images/resources/s1.png"  />
                                    <div className="sgt-text">
                                    <h4>Jessica William</h4>
                                    <span>Graphic Designer</span>
                                    </div>
                                </div>
                                <div className="suggestion-usd">
                                    <img src="/images/resources/s2.png"  />
                                    <div className="sgt-text">
                                    <h4>John Doe</h4>
                                    <span>PHP Developer</span>
                                    </div>
                                </div>
                                <div className="suggestion-usd">
                                    <img src="/images/resources/s3.png"  />
                                    <div className="sgt-text">
                                    <h4>Poonam</h4>
                                    <span>Wordpress Developer</span>
                                    </div>
                                </div>
                                <div className="suggestion-usd">
                                    <img src="/images/resources/s4.png"  />
                                    <div className="sgt-text">
                                    <h4>Bill Gates</h4>
                                    <span>C &amp; C++ Developer</span>
                                    </div>
                                </div>
                                <div className="suggestion-usd">
                                    <img src="/images/resources/s5.png"  />
                                    <div className="sgt-text">
                                    <h4>Jessica William</h4>
                                    <span>Graphic Designer</span>
                                    </div>
                                </div>
                                <div className="suggestion-usd">
                                    <img src="/images/resources/s6.png"  />
                                    <div className="sgt-text">
                                    <h4>John Doe</h4>
                                    <span>PHP Developer</span>
                                    </div>
                                </div>
                                </div>{/*suggestions-list end*/}
                            </div>{/*suggestions end*/}
                        </div>{/*right-sidebar end*/}

      </React.Fragment>
    )
  }
}
