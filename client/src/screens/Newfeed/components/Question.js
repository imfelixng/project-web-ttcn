import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
export default class Question extends Component {

    state = {
        isOpenFunctional: false,
        currentUserID: ''
    }

    onOpenFunctional = () => {
        this.setState({
            isOpenFunctional: !this.state.isOpenFunctional
        })
    }

    showContent = (contentBlock) => {
        if (contentBlock) {
            return {__html: draftToHtml(contentBlock)};
          }
    }

    showTags(tagIDs) {
        return tagIDs.map((tagID, index) => {
            return <li key = {index}><a href="#" >{tagID.id}</a></li>;
        });
    }

    static getDerivedStateFromProps(props, state) {
        return {
            currentUserID: props.currentUserID
        }
    }

  render() {
    let {question} = this.props;
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
                                            {
                                                this.state.currentUserID &&
                                                <a  className="ed-opts-open" onClick = {this.onOpenFunctional}><i className="la la-ellipsis-v" /></a>
                                            }
                                            {
                                                this.state.isOpenFunctional &&
                                                <ul className="ed-options active">
                                                    <li><a href="#" >Edit Post</a></li>
                                                    <li><a href="#" >Delete</a></li>
                                                    <li><a href="#" >UnMarked</a></li>
                                                    <li><a href="#" >Report</a></li>
                                                </ul>
                                            }
                                        </div>
                                    </div>
            <div className="epi-sec">
                                        <ul className="descp">
                                        <li>
                                            <ul className="job-dt">
                                            <li><a href="#" >{question.categoryID}</a></li>
                                            </ul>
                                        </li>
                                        </ul>
                                        {
                                            this.state.currentUserID && 
                                            <ul className="bk-links">
                                                <li><a href="#" ><i className="la la-bookmark" /></a></li>
                                                <li><a href="#" ><i className="la la-bell" /></a></li>
                                            </ul>
                                        }
                                    </div>
            <div className="job_descp">
                                        <div 
                                            className = "question__content" 
                                            dangerouslySetInnerHTML = {this.showContent(question.content)}>
                                        </div>
                                        <ul className="skill-tags">
                                            {this.showTags(question.tagIDs)}
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
