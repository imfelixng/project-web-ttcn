import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';

export default class Question extends Component {

    state = {
        isOpenFunctional: false,
        currentUserID: '',
        userOther: {},
        categoryQuestion: {},
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

    showTags(tags) {
        if(tags.length > 0) {
            return tags.map((tag, index) => {
                return <li key = {index}><NavLink to={"/tags/" + tag.id} >{tag.text}</NavLink></li>;
            });
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            currentUserID: props.currentUserID,
            userOther: props.userOther,
            categoryQuestion: props.categoryQuestion
        }
    }

    componentDidMount() {
        this.props.getUserOther(this.props.question.userID);
        this.props.getCategoryQuestion(this.props.question.categoryID);
    }


    onDeleteQuestion = (questionID) => {
        this.props.deleteQuestion(questionID).then(() => {
            this.setState({
                isOpenFunctional: false
            });
        })
        .catch(err => console.log(err));

    }


    showImages = (images) => {
        
        if(images.length === 1) {
            return images.map((image, index) => {
                return <img 
                    src = {image.dataURL}
                    key = {index}
                    className = "question_image--100"
                />
            });
        }

        if(images.length === 2) {
            return images.map((image, index) => {
                return <img 
                    src = {image.dataURL}
                    key = {index}
                    className = "question_image--50"
                />
            });
        }

        if(images.length === 3) {
            return images.map((image, index) => {
                return <img 
                    src = {image.dataURL}
                    key = {index}
                    className = "question_image--30"
                />
            });
        }

        if(images.length > 3) {
            return images.map((image, index) => {
                if(index < 2) {
                    return <img 
                        src = {image.dataURL}
                        key = {index}
                        className = "question_image--30"
                    />
                }
                if( index === 2) {
                    return <div key = {index} className = "question_image--30 more">
                        <img 
                            src = {image.dataURL}
                            className = "img_more"
                        />
                        <div className = "div_more">
                            <i className="la la-plus">{images.length - 2}</i>
                        </div>
                    </div>
                }
                
            });
        }
    }

  render() {
    
    let {question} = this.props;
    let userInfo = this.state.userOther[question.userID];
    let categoryInfo = this.state.categoryQuestion[question.categoryID];
    let timeAgo = question ? moment(question._created, "YYYY-MM-DD HH:mm:ss", 'vn').fromNow() : 'Thời gian đăng';
    return (
      <React.Fragment>
        <div className="post-bar">
            <div className="post_topbar">
                <div className="usy-dt">
                    <img className = "user-picy" src= {userInfo ? userInfo.avatar : "/images/users/img_avatar_default.png"}  />
                    <div className="usy-name">
                        <h3>{userInfo ? userInfo.fullname : "yourname"}</h3>
                        <span><img src="images/clock.png"  />{timeAgo}</span>
                     </div>
                </div>
                <div className="ed-opts">
                {
                    this.state.currentUserID &&
                    <a  className="ed-opts-open" onClick = {this.onOpenFunctional} ><i className="la la-ellipsis-v" /></a>
                }
                {
                    this.state.isOpenFunctional &&
                    <ul className="ed-options active">
                    {
                        this.state.currentUserID === question.userID ?
                        <React.Fragment>
                            <li><a onClick = {() => this.onDeleteQuestion(question.questionID)} >Delete</a></li>
                        </React.Fragment> :
                        <React.Fragment>
                            <li><a href="#" >Report</a></li>
                        </React.Fragment>
                    }
                    </ul>
                }
                </div>
            </div>
            <div className="epi-sec">
                                        <ul className="descp">
                                        <li>
                                            <ul className="job-dt">
                                                {
                                                    categoryInfo &&
                                                    <li><NavLink to= {"/categories/" + categoryInfo.categoryID} >{categoryInfo.name}</NavLink></li>
                                                }

                                            </ul>
                                        </li>
                                        </ul>
                                        {
                                            this.state.currentUserID && 
                                            <ul className="bk-links">
                                                {  this.state.currentUserID !== question.userID &&
                                                    <li><a href="#" ><i className= "la la-bookmark" /></a></li>
                                                }
                                                <li><a href="#" ><i className="la la-check" /></a></li>
                                            </ul>
                                        }
                                    </div>
            <div className="job_descp">
                                        <div 
                                            className = "question__content" 
                                            dangerouslySetInnerHTML = {this.showContent(question.content)}>
                                        </div>
                                        <div
                                            className = "question_images"
                                        >
                                            {
                                                question.images && this.showImages(question.images)
                                            }
                                            
                                        </div>
                                        <ul className="skill-tags">
                                            {question.tags && this.showTags(question.tags)}
                                        </ul>
                                    </div>
            <div className="job-status-bar">
                                        <ul className="like-com">
                                        <li>
                                            <a  className="com"><i className = "la la-heart-o"></i> {question ? (question.votes - question.unvotes) : 0}</a>
                                        </li> 
                                        <li><a   className="com"><img src="images/com.png"  /> {question ? (question.comments) : 0}</a></li>
                                        <li><a className="com"><i className="la la-eye" /> {question ? (question.views) : 0}</a></li>
                                        </ul>
                                        
                                    </div>
            <div className="question_top-comment">
                {
                    question.topComment.commentID && 
                    <div className= "top-comment">
                        Noi dung top comment
                    </div>
                }
                <div>
                    <NavLink className= "btn btn-info btn-join" to={"/questions/" + question.questionID}>Join in this discuss</NavLink>
                </div>
            </div>
        </div>{/*post-bar end*/}
        
      </React.Fragment>
    )
  }
}
