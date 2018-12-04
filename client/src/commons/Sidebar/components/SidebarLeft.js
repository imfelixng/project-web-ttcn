import React, { Component } from 'react'
import { Images } from "./../../../themes";

export default class SidebarLeft extends Component {
  render() {
    return (
      <React.Fragment>
                                <div className="main-left-sidebar no-margin">
                            <div className="suggestions full-width">
                                <div className="sd-title">
                                    <h3>Top người giúp đỡ</h3>
                                </div>{/*sd-title end*/}
                                <div className="suggestions-list">
                                    <div className="suggestion-usd">
                                        <img src="images/resources/s1.png"  />
                                        <div className="sgt-text">
                                        <h4>Jessica William</h4>
                                        <i class="fa fa-heart"></i>
                                        <span>15</span>
                                        <img src={Images.goldMedal} alt="goldMedal" className="img-award"></img>

                                        </div>
                                    </div>
                                    <div className="suggestion-usd">
                                        <img src="images/resources/s2.png"  />
                                        <div className="sgt-text">
                                        <h4>John Doe</h4>
                                        <span>PHP Developer</span>
                                        </div>
                                    </div>
                                    <div className="suggestion-usd">
                                        <img src="images/resources/s3.png"  />
                                        <div className="sgt-text">
                                        <h4>Poonam</h4>
                                        <span>Wordpress Developer</span>
                                        </div>
                                    </div>
                                    <div className="suggestion-usd">
                                        <img src="images/resources/s4.png"  />
                                        <div className="sgt-text">
                                        <h4>Bill Gates</h4>
                                        <span>C &amp; C++ Developer</span>
                                        </div>
                                    </div>
                                    <div className="suggestion-usd">
                                        <img src="images/resources/s5.png"  />
                                        <div className="sgt-text">
                                        <h4>Jessica William</h4>
                                        <span>Graphic Designer</span>
                                        </div>
                                    </div>
                                    <div className="suggestion-usd">
                                        <img src="images/resources/s6.png"  />
                                        <div className="sgt-text">
                                        <h4>John Doe</h4>
                                        <span>PHP Developer</span>
                                        </div>
                                    </div>
                                </div>{/*suggestions-list end*/}
                            </div>{/*suggestions end*/}
                            <div className="suggestions full-width">
                            <div className="sd-title">
                            <h3>Top thẻ</h3>
                            </div>{/*sd-title end*/}
                            <div className="suggestions-list">
                            <div className="suggestion-usd">
                                <div className="sgt-text top-tag">
                                  <div className="link-tag">
                                      <a className="name-tag">Top thẻ 1</a>
                                      <button className="amount-tag">19</button>
                                  </div>
                                  <div className="link-tag">
                                      <a className="name-tag">Top thẻ 1</a>
                                      <button className="amount-tag">19</button>
                                  </div>
                                  <div className="link-tag">
                                      <a className="name-tag">Top thẻ 1</a>
                                      <button className="amount-tag">19</button>
                                  </div>
                                  <div className="link-tag">
                                      <a className="name-tag">Top thẻ 1</a>
                                      <button className="amount-tag">19</button>
                                  </div>
                                  <div className="link-tag">
                                      <a className="name-tag">Top thẻ 1</a>
                                      <button className="amount-tag">19</button>
                                  </div>
                                </div>
                            </div>
                            </div>{/*suggestions-list end*/}
                        </div>{/*suggestions end*/}
                        </div>{/*main-left-sidebar end*/}
      </React.Fragment>
    )
  }
}
