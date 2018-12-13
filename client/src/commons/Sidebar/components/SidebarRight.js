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
                        <img src="images/resources/s5.png"  />
                        <div className="sgt-text">
                            <h4><a className="name-question">Chia hai phân số?</a></h4>
                            <span>Jessica</span>
                            <div className="like-cmt">
                            <a><i class="fa fa-heart"><span>19</span></i></a>
                            <a><i class="fa fa-comment"><span>19</span></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="suggestion-usd">
                        <img src="images/resources/s5.png"  />
                        <div className="sgt-text">
                            <h4><a className="name-question">Jessica William</a></h4>
                            <span>Graphic Designer</span>
                            <div className="like-cmt">
                            <a><i class="fa fa-heart"><span>19</span></i></a>
                            <a><i class="fa fa-comment"><span>19</span></i></a>
                            </div>
                        </div>
                    </div>
                </div>{/*suggestions-list end*/}
            </div>{/*suggestions end*/}
        </div>{/*right-sidebar end*/}

      </React.Fragment>
    )
  }
}
