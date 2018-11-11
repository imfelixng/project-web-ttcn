import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class Question extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-bar">
            <div className="post_topbar">
                                        <div className="usy-dt">
                                        <img src="images/resources/us-pic.png"  />
                                        <div className="usy-name">
                                            <h3>John Doe</h3>
                                            <span><img src="images/clock.png"  />3 min ago</span>
                                        </div>
                                        </div>
                                        <div className="ed-opts">
                                            <a  className="ed-opts-open"><i className="la la-ellipsis-v" /></a>
                                            <ul className="ed-options">
                                                <li><a href="#" >Edit Post</a></li>
                                                <li><a href="#" >Unsaved</a></li>
                                                <li><a href="#" >Report</a></li>
                                            </ul>
                                        </div>
                                    </div>
            <div className="epi-sec">
                                        <ul className="descp">
                                        <li>
                                            <ul className="job-dt">
                                            <li><a href="#" >Full Time</a></li>
                                            <li><a href="#" >Part Time</a></li>
                                            </ul>
                                        </li>
                                        </ul>
                                        <ul className="bk-links">
                                        <li><a href="#" ><i className="la la-bookmark" /></a></li>
                                        <li><a href="#" ><i className="la la-bell" /></a></li>
                                        </ul>
                                    </div>
            <div className="job_descp">
                                        <h3>Senior Wordpress Developer</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" >view more</a></p>
                                        <ul className="skill-tags">
                                        <li><a href="#" >HTML</a></li>
                                        <li><a href="#" >PHP</a></li>
                                        <li><a href="#" >CSS</a></li>
                                        <li><a href="#" >Javascript</a></li>
                                        <li><a href="#" >Wordpress</a></li> 	
                                        </ul>
                                    </div>
            <div className="job-status-bar">
                                        <ul className="like-com">
                                        <li>
                                            <a href="#"><i className="la la-thumbs-up" /></a>
                                        </li> 
                                        <li>
                                            <img src="images/liked-img.png"  />
                                            <span>10</span>
                                        </li>
                                        <li>
                                            <a href="#"><i className="la la-thumbs-down" /></a>
                                        </li> 
                                        <li><a href="#"  className="com"><img src="images/com.png"  /> 15</a></li>
                                        </ul>
                                        <a><i className="la la-eye" /> 50</a>
                                    </div>
            <div className="question_top-comment">
                <div className= "top-comment">
                    Noi dung top comment
                </div>
                <div>
                    <NavLink to = "/questions/123" className= "btn btn-info btn-join">Join in this discuss</NavLink>
                </div>
            </div>
        </div>{/*post-bar end*/}
      </React.Fragment>
    )
  }
}
