import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';
import Lightbox from 'react-images';
import {convertFromRaw} from 'draft-js';

import {Url} from '../../../constants/configs';
import TopComment from './TopComment';
export default class Question extends Component {

    state = {
        isOpenFunctional: false,
        currentUserID: '',
        userOther: {},
        categoryQuestion: {},
        lightboxIsOpen: false,
        currentImageIndex: 0,
        question: null
    }

    onOpenFunctional = () => {
        this.setState({
            isOpenFunctional: !this.state.isOpenFunctional
        })
    }

    showContent = (contentState) => {
        if (contentState) {
            return {__html: draftToHtml(contentState)};
          }
        return null;
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
            categoryQuestion: props.categoryQuestion,
        }
    }

    componentDidMount() {
        this.props.getUserOther(this.props.question.userID);
        this.props.getCategoryQuestion(this.props.question.categoryID);
        this.props.getQuestionFollowers(this.props.question.questionID);
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
                    src = {Url + "/" + image.dataURL}
                    key = {index}
                    className = "question_image--100"
                    alt = "logo"
                    onClick = {() => this.openLightbox(index)}
                />
            });
        }

        if(images.length === 2) {
            return images.map((image, index) => {
                return <img 
                    src = {Url + "/" +  image.dataURL}
                    key = {index}
                    className = "question_image--50"
                    alt = "logo"
                    onClick = {() => this.openLightbox(index)}
                />
            });
        }

        if(images.length === 3) {
            return images.map((image, index) => {
                return <img 
                    src = {Url + "/" + image.dataURL}
                    key = {index}
                    className = "question_image--30"
                    alt = "logo"
                    onClick = {() => this.openLightbox(index)}
                />
            });
        }

        if(images.length > 3) {
            return images.map((image, index) => {
                if(index < 2) {
                    return <img 
                        src = {Url + "/" + image.dataURL}
                        key = {index}
                        className = "question_image--30"
                        alt = "logo"
                        onClick = {() => this.openLightbox(index)}
                    />
                }
                if( index === 2) {
                    return <div key = {index} className = "question_image--30 more">
                        <img 
                            src = {Url + "/" + image.dataURL}
                            className = "img_more"
                            alt = "logo"
                            onClick = {() => this.openLightbox(index)}
                        />
                        <div className = "div_more">
                            <i className="la la-plus">{images.length - 2}</i>
                        </div>
                    </div>
                }
                
            });
        }
    }

    openLightbox = (i) => {
        console.log(i);
        this.setState({
            lightboxIsOpen: true,
            currentImageIndex: i
        })
    }

    closeLightbox = () => {
        this.setState({
            lightboxIsOpen: false
        })
    }

    gotoPrevious = (allImages) => {
        let index = (this.state.currentImageIndex - 1 ) % allImages;
        this.setState({
            currentImageIndex: index
        })
    }

    gotoNext = (allImages) => {
        let index = (this.state.currentImageIndex + 1 ) % allImages;
        this.setState({
            currentImageIndex: index
        })
    }

    onClickThumbnail = (i) => {
        this.setState({
            currentImageIndex: i
        })
    }

    showFollow = (followers) => {
        let result = null;

        if(followers.filter(userID => userID === this.state.currentUserID).length > 0) {
            result = <li ><a ><i className="la la-check" /></a></li>;
        } else {
            result = <li ><a onClick = {() => this.onFollowQuestion(this.props.question.questionID, this.state.currentUserID)}><i className="la la-plus" /></a></li>;
        }
        return result;
    }

    onFollowQuestion = (questionID, userFollowID) => {
        this.props.followQuestion(questionID, userFollowID);
    }

  render() {
    
    let {question, questionFollowers} = this.props;
    let userInfo = this.state.userOther[question.userID];
    let categoryInfo = this.state.categoryQuestion[question.categoryID];
    let timeAgo = question ? moment(question._created, "YYYY-MM-DD HH:mm:ss", 'vn').fromNow() : 'Thời gian đăng';
    let followers = questionFollowers[question.questionID] ? questionFollowers[question.questionID] : null;
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
                                                {
                                                  !(this.state.currentUserID === question.userID) ? 
                                                  followers && this.showFollow(followers) :
                                                  <li><a ><i className= "la la-check" /></a></li>
                                                }
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
                                            {
                                                                                    question && question.images.length > 0 &&
                                                                                    <Lightbox 
                                                                                        images = {
                                                                                            question.images.map((image, index) => {
                                                                                                return {
                                                                                                    src: Url + "/" +image.dataURL
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        isOpen = {this.state.lightboxIsOpen}
                                                                                        onClickPrev={() => this.gotoPrevious(question.images.length)}
                                                                                        onClickNext={() => this.gotoNext(question.images.length)}
                                                                                        onClose={this.closeLightbox}
                                                                                        currentImage = {this.state.currentImageIndex}
                                                                                        backdropClosesModal = {true}
                                                                                        showThumbnails = {true}
                                                                                        onClickThumbnail = {this.onClickThumbnail}
                                                                                    />
                                                                                }
                                        </div>
                                        <ul className="skill-tags">
                                            {question.tags && this.showTags(question.tags)}
                                        </ul>
                                    </div>
            <div className="job-status-bar">
                                        <ul className="like-com">
                                        <li>
                                            <a  className="com"><i className = {(question ? (question.votes - question.unvotes) : 0) > 0 ? "la la-heart-o active_vote_unvote" : "la la-heart-o"}></i> {question ? (question.votes - question.unvotes) : 0}</a>
                                        </li> 
                                        <li><a   className="com"><img src="images/com.png"  /> {question ? (question.comments) : 0}</a></li>
                                        <li><a className="com"><i className="la la-eye" /> {question ? (question.views) : 0}</a></li>
                                        </ul>
                                        
                                    </div>
            <div className="question_top-comment">
                {
                    question.topComment.commentID && (question.topComment.votes - question.topComment.unvotes) > 0 && 
                    <TopComment
                        topComment = {question.topComment}
                        userOther = {this.props.userOther}
                        getUserOther = {this.props.getUserOther}
                    />
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
