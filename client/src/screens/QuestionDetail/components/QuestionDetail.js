import React, { Component } from 'react'

export default class QuestionDetail extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-section">
            <div className="container">
                <div className="main-section-data">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 no-pd question-detail">
                            <div className="main-ws-sec">
                            <div className="posty">
                                <div className="post-bar no-margin">
                                    <div className="post_topbar">
                                    <div className="usy-dt">
                                        <img src="/images/resources/us-pc2.png" alt />
                                        <div className="usy-name">
                                        <h3>John Doe</h3>
                                        <span><img src="/images/clock.png" alt />3 min ago</span>
                                        </div>
                                    </div>
                                    <div className="ed-opts">
                                        <a href="#" title className="ed-opts-open"><i className="la la-ellipsis-v" /></a>
                                        <ul className="ed-options">
                                        <li><a href="#" title>Edit Post</a></li>
                                        <li><a href="#" title>Unsaved</a></li>
                                        <li><a href="#" title>Unbid</a></li>
                                        <li><a href="#" title>Close</a></li>
                                        <li><a href="#" title>Hide</a></li>
                                        </ul>
                                    </div>
                                    </div>
                                    <div className="epi-sec">
                                    <ul className="descp">
                                        <li><img src="/images/icon8.png" alt /><span>Epic Coder</span></li>
                                        <li><img src="/images/icon9.png" alt /><span>India</span></li>
                                    </ul>
                                    <ul className="bk-links">
                                        <li><a href="#" title><i className="la la-bookmark" /></a></li>
                                        <li><a href="#" title><i className="la la-envelope" /></a></li>
                                    </ul>
                                    </div>
                                    <div className="job_descp">
                                    <h3>Senior Wordpress Developer</h3>
                                    <ul className="job-dt">
                                        <li><a href="#" title>Full Time</a></li>
                                        <li><span>$30 / hr</span></li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title>view more</a></p>
                                    <ul className="skill-tags">
                                        <li><a href="#" title>HTML</a></li>
                                        <li><a href="#" title>PHP</a></li>
                                        <li><a href="#" title>CSS</a></li>
                                        <li><a href="#" title>Javascript</a></li>
                                        <li><a href="#" title>Wordpress</a></li> 	
                                    </ul>
                                    </div>
                                    <div className="job-status-bar">
                                    <ul className="like-com">
                                        <li>
                                        <a href="#"><i className="la la-heart" /> Like</a>
                                        <img src="/images/liked-img.png" alt />
                                        <span>25</span>
                                        </li> 
                                        <li><a href="#" title className="com"><img src="/images/com.png" alt /> Comment 15</a></li>
                                    </ul>
                                    <a><i className="la la-eye" />Views 50</a>
                                    </div>
                                </div>{/*post-bar end*/}
                                <div className="comment-section">
                                    <div className="plus-ic">
                                    <i className="la la-plus" />
                                    </div>
                                    <div className="comment-sec">
                                    <ul>
                                        <li>
                                        <div className="comment-list">
                                            <div className="bg-img">
                                            <img src="/images/resources/bg-img1.png" alt />
                                            </div>
                                            <div className="comment">
                                            <h3>John Doe</h3>
                                            <span><img src="/images/clock.png" alt /> 3 min ago</span>
                                            <p>Lorem ipsum dolor sit amet, </p>
                                            <a href="#" title className="active"><i className="fa fa-reply-all" />Reply</a>
                                            </div>
                                        </div>{/*comment-list end*/}
                                        <ul>
                                            <li>
                                            <div className="comment-list">
                                                <div className="bg-img">
                                                <img src="/images/resources/bg-img2.png" alt />
                                                </div>
                                                <div className="comment">
                                                <h3>John Doe</h3>
                                                <span><img src="/images/clock.png" alt /> 3 min ago</span>
                                                <p>Hi John </p>
                                                <a href="#" title><i className="fa fa-reply-all" />Reply</a>
                                                </div>
                                            </div>{/*comment-list end*/}
                                            </li>
                                        </ul>
                                        </li>
                                        <li>
                                        <div className="comment-list">
                                            <div className="bg-img">
                                            <img src="/images/resources/bg-img3.png" alt />
                                            </div>
                                            <div className="comment">
                                            <h3>John Doe</h3>
                                            <span><img src="/images/clock.png" alt /> 3 min ago</span>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at.</p>
                                            <a href="#" title><i className="fa fa-reply-all" />Reply</a>
                                            </div>
                                        </div>{/*comment-list end*/}
                                        </li>
                                    </ul>
                                    </div>{/*comment-sec end*/}
                                    <div className="post-comment">
                                    <div className="cm_img">
                                        <img src="/images/resources/bg-img4.png" alt />
                                    </div>
                                    <div className="comment_box">
                                        <form>
                                        <input type="text" placeholder="Post a comment" />
                                        <button type="submit">Send</button>
                                        </form>
                                    </div>
                                    </div>{/*post-comment end*/}
                                </div>{/*comment-section end*/}
                                </div>{/*posty end*/}

                            </div>
                        </div>
                        <div className = "col-lg-4">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>


      </React.Fragment>
    )
  }
}
