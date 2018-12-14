import React, { Component } from 'react'

export default class SidebarRight extends Component {
  render() {
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
                    <div className="suggestion-usd">
                        <img src="images/resources/s5.png"  />
                        <div className="sgt-text">
                            <h4><a className="name-question">Chia hai phân số?</a></h4>
                            <span>Jessica</span>
                            <div className="like-cmt">
                            <a><i className="fa fa-heart"><span>19</span></i></a>
                            <a><i className="fa fa-comment"><span>19</span></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="suggestion-usd">
                        <img src="images/resources/s5.png"  />
                        <div className="sgt-text">
                            <h4><a className="name-question">Jessica William</a></h4>
                            <span>Graphic Designer</span>
                            <div className="like-cmt">
                            <a><i className="fa fa-heart"><span>19</span></i></a>
                            <a><i className="fa fa-comment"><span>19</span></i></a>
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
