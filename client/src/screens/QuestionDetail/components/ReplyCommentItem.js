import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';
import Lightbox from 'react-images';

import {Url} from '../../../constants/configs';
export default class ReplyCommentItem extends Component {

  state = {
    lightboxIsOpen: false,
    currentImageIndex: 0,
  }
  onOpenReplyBox = () => {
    this.props.checkReply(this.props.comment.commentID);
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
                  src = {Url + image.dataURL}
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
                  src = {Url + image.dataURL}
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
                  src = {Url + image.dataURL}
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
                      src = {Url + image.dataURL}
                      key = {index}
                      className = "question_image--30"
                      alt = "logo"
                      onClick = {() => this.openLightbox(index)}
                  />
              }
              if( index === 2) {
                  return <div key = {index} className = "question_image--30 more">
                      <img 
                          src = {Url + image.dataURL}
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

  componentDidMount() {
    if(this.props.reply.userID) {
      this.props.getUserOther(this.props.reply.userID);
    }
  }

  render() {
    const {reply} = this.props;
    const {userOther} = this.props;

    let userInfo = reply ? userOther[reply.userID] : null;;

    return (
      <React.Fragment>
        <div className="comment-list">
          <div className="bg-img">
              <img src = {userInfo ? userInfo.avatar : "/images/users/img_avatar_default.png"} alt = "logo" className = "user_avatar_comment" />
          </div>
          <div className="comment">
              <h3>
                  {
                    userInfo ? userInfo.fullname : "yourname"
                  }
              </h3>
              <span><img src="/images/clock.png"alt = "logo" /> 3 min ago</span>
              <div 
                className = "question__content" 
                dangerouslySetInnerHTML = { reply && this.showContent( reply.content)}>
              </div>
              <div
                    className = "question_images"
                >
                    {
                        reply ?
                        this.showImages(reply.images) : null
                    }
                    {
                        reply && reply.images && reply.images.length > 0 &&
                        <Lightbox 
                            images = {
                                reply.images.map((image, index) => {
                                    return {
                                        src: Url +image.dataURL
                                    }
                                })
                            }
                            isOpen = {this.state.lightboxIsOpen}
                            onClickPrev={() => this.gotoPrevious(reply.images.length)}
                            onClickNext={() => this.gotoNext(reply.images.length)}
                            onClose={this.closeLightbox}
                            currentImage = {this.state.currentImageIndex}
                            backdropClosesModal = {true}
                            showThumbnails = {true}
                            onClickThumbnail = {this.onClickThumbnail}
                        />
                    }
                </div>
              <a onClick = {this.onOpenReplyBox}><i className="fa fa-reply-all" />Reply</a>
          </div>

        </div>{/*comment-list end*/}
      </React.Fragment>
    )
  }
}
