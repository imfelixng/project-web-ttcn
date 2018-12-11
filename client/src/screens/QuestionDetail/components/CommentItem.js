import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';
import Lightbox from 'react-images';

import {Url} from '../../../constants/configs';
import CommentQuestion from './CommentQuestion';
import ReplyCommentList from './ReplyCommentList';

export default class CommentItem extends Component {


    state = {
        replyCommentID: '',
        lightboxIsOpen: false,
        currentImageIndex: 0,
        isLoadingVote: false,
        isLoadingUnVote: false,
        isVote: false,
        isUnVote: false,
        comment: null

    }

    onOpenReplyBox = () => {
        this.props.checkReply(this.props.comment.commentID);
    }

    static getDerivedStateFromProps (props, state) {
        return {
            replyCommentID: props.replyCommentID,
            comment: props.comment,
            isVote : props.isVoteComment,
            isUnVote : props.isUnVoteComment
        }
    }

    componentDidMount() {
        if(this.props.comment.userID) {
            this.props.getUserOther(this.props.comment.userID);
            this.props.checkVoteComment(this.props.comment.commentID);
        }

    }
    
    showContent = (contentBlock) => {
        if (contentBlock) {
            return {__html: draftToHtml(contentBlock)};
          }
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
                    src = {Url + "/" + image.dataURL}
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
        } else {
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

    onVoteComment = () => {
        if(this.state.isLoadingVote || this.state.isLoadingUnVote || this.state.isVote) {
            return;
        }

        this.setState({
            isLoadingVote: true
        })

        if(!this.props.currentUserID) {
            alert("Vui lòng login để có thể tương tác!");
            this.setState({
                isLoadingVote: false
            })
            return;

        }

        let vote_comment = {
            userID: this.props.currentUserID,
            commentID: this.props.comment.commentID,
            voteID: 'vc_' + new Date().getTime() + this.props.currentUserID + this.props.comment.commentID
        }

        this.props.voteComment(vote_comment).then(() => {
            this.props.checkVoteComment(this.props.comment.commentID);
            let comment = this.state.comment;
            comment.votes += 1;
            this.setState({
                isLoadingVote: false,
                comment
            })
        })
        .catch(err => console.log(err));

    }

    onUnVoteComment = () => {
        if(this.state.isLoadingVote || this.state.isLoadingUnVote || this.state.isUnVote) {
            return;
        }

        this.setState({
            isLoadingUnVote: true
        })

        if(!this.props.currentUserID) {
            alert("Vui lòng login để có thể tương tác!");
            this.setState({
                isLoadingUnVote: false
            })
            return;

        }

        let unvote_comment = {
            userID: this.props.currentUserID,
            commentID: this.props.comment.commentID,
            unvoteID: 'uvc_' + new Date().getTime() + this.props.currentUserID + this.props.comment.commentID
        }

        this.props.unVoteComment(unvote_comment).then(() => {
            this.props.checkVoteComment(this.props.comment.commentID);
            let comment = this.state.comment;
            comment.unvotes += 1;
            this.setState({
                isLoadingUnVote: false,
                comment
            })
        })
        .catch(err => console.log(err));

    }

  render() {
        let {comment} = this.state;
        let {userOther} = this.props;
        let userInfo = comment ? userOther[comment.userID] : null;
        let timeAgo = comment ? moment(comment._created, "YYYY-MM-DD HH:mm:ss", 'vn').fromNow() : 'Thời gian đăng';

    return (
      <React.Fragment>
        <div className="comment-list">
            <div className="bg-img">
                <img src= {userInfo ? userInfo.avatar : "/images/users/img_avatar_default.png"} alt = "logo" className = "user_avatar_comment"/>
            </div>
            <div className="comment">
                <h3>
                    {
                        userInfo ? userInfo.fullname : "yourname"
                    }
                </h3>
                <span><img src="/images/clock.png" alt = "logo" /> {timeAgo}</span>
                <div 
                    className = "question__content" 
                    dangerouslySetInnerHTML = { comment && this.showContent( comment.content)}>
                </div>
                <div
                    className = "question_images"
                >
                    {
                        comment ?
                        this.showImages(comment.images) : null
                    }
                    {
                        comment && comment.images.length > 0 &&
                        <Lightbox 
                            images = {
                                comment.images.map((image, index) => {
                                    return {
                                        src: Url + "/" +image.dataURL
                                    }
                                })
                            }
                            isOpen = {this.state.lightboxIsOpen}
                            onClickPrev={() => this.gotoPrevious(comment.images.length)}
                            onClickNext={() => this.gotoNext(comment.images.length)}
                            onClose={this.closeLightbox}
                            currentImage = {this.state.currentImageIndex}
                            backdropClosesModal = {true}
                            showThumbnails = {true}
                            onClickThumbnail = {this.onClickThumbnail}
                        />
                    }
                </div>
                <div className="job-status-bar">
                    <ul className="like-com">
                        <li>
                            <a  className="com" onClick = {this.onVoteComment}>
                                {
                                    this.state.isLoadingVote ? 
                                    <img className = "loading-vote"src= "/images/ic_loading.gif" alt = "loading"/>
                                    :
                                    <i className = {this.state.isVote ? "la la-thumbs-up active_vote_unvote" : "la la-thumbs-up"}></i>
                                }
                            </a>
                            <a  className="com">{comment ? (comment.votes - comment.unvotes) : 0}</a>
                            <a  className="com" onClick = {this.onUnVoteComment}>
                                {
                                    this.state.isLoadingUnVote ? 
                                    <img className = "loading-vote"src= "/images/ic_loading.gif" alt = "loading" />
                                    :
                                    <i className = {this.state.isUnVote ? "la la-thumbs-down active_vote_unvote" : "la la-thumbs-down"}></i>                
                                }
                            </a>
                        </li> 
                        <li><a onClick = {this.onOpenReplyBox} className = "com"><i className="fa fa-reply-all"/>Reply</a></li>
                    </ul>                                                          
                </div>
                
            </div>
        </div>
            <ReplyCommentList />  
            <ul>
                <li>
                    {
                        this.state.replyCommentID && this.state.replyCommentID === this.props.comment.commentID ?
                            this.props.currentUserID ?  
                            <div className="post-comment">
                                <CommentQuestion
                                    currentUser = {this.props.currentUser}
                                    onAddNewComment = {this.props.addNewCommentQuestion}
                                />
                            </div> :
                            <div className="post-comment">
                                <span>Vui lòng <NavLink to = "/sign-in"><b>Login</b></NavLink> để tham gia cuộc thảo luận này!</span>
                            </div> 
                        :
                        null
                    }
                </li>
            </ul>   
      </React.Fragment>
    )
  }
}
