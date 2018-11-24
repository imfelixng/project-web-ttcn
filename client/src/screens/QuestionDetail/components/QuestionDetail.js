import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import EditModal from './EditModal';
export default class QuestionDetail extends Component {

    constructor(props) {
        super(props);
        props.getQuestion(props.match.params.idQuestion).then(res => {
            if(this.props.question) {
                this.props.getUserOther(this.props.question.userID);
                this.props.getCategoryQuestion(this.props.question.categoryID);
            }
        }).catch(err => {   
            console.log(err);
        });   
    }

    state = {
        isOpenFunctional: false,
        currentUserID: '',
        userOther: [],
        categoryQuestion: []
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

    static getDerivedStateFromProps(prevProps, state) {

        return {
            currentUserID: prevProps.currentUserID,
            userOther: prevProps.userOther,
            categoryQuestion: prevProps.categoryQuestion,
        }

    }

    componentDidMount() {
        if(this.props.question) {
            this.props.getUserOther(this.props.question.userID);
            this.props.getCategoryQuestion(this.props.question.categoryID);
        }

    }


    onDeleteQuestion = (questionID) => {
        this.props.deleteQuestion(questionID);
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

    onShowLoginModal = () => {
        if(this.state.currentUserID) {
            this.props.history.push('/questions/' + this.props.question.questionID);
        }
    }

  render() {
    let {question} = this.props;
    let userInfo = null;
    let categoryInfo = null;

    if(question) {
        userInfo = this.state.userOther[question.userID];
        categoryInfo = this.state.categoryQuestion[question.categoryID];
    }


    return (
      <React.Fragment>
        <div className="post-bar">
            <div className="post_topbar">
                <div className="usy-dt">
                    <img className = "user-picy" src= {userInfo ? userInfo.avatar : "/images/users/img_avatar_default.png"}  />
                    <div className="usy-name">
                        <h3>{userInfo ? userInfo.fullname : "yourname"}</h3>
                        <span><img src="/images/clock.png"  />3 min ago</span>
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
                            <li><a href="#" >Mark</a></li>
                            <li><a href="#" >Notify</a></li>
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
                                                <li><a href="#" ><i className="la la-bookmark" /></a></li>
                                                <li><a href="#" ><i className="la la-bell" /></a></li>
                                            </ul>
                                        }
                                    </div>
            <div className="job_descp">
                                        <div 
                                            className = "question__content" 
                                            dangerouslySetInnerHTML = { question && this.showContent( question.content)}>
                                        </div>
                                        <div
                                            className = "question_images"
                                        >
                                            {
                                                question ?
                                                this.showImages(question.images) : null
                                            }
                                            
                                        </div>
                                        <ul className="skill-tags">
                                            { question ? this.showTags(question.tags) : null}
                                        </ul>
                                    </div>
            <div className="job-status-bar">
                                        <ul className="like-com">
                                        <li>
                                            <a  className="com"><i className = "la la-heart-o"></i> {question && (question.vote - question.unvote)}</a>
                                        </li> 
                                        <li><a   className="com"><img src="/images/com.png"  /> 15</a></li>
                                        <li><a className="com"><i className="la la-eye" /> 50</a></li>
                                        </ul>
                                        
                                    </div>
            <div className="question_top-comment">
                {
                    question && question.topComment.commentID && 
                    <div className= "top-comment">
                        Noi dung top comment
                    </div>
                }
                <div>
                    <div className= "btn btn-info btn-join" data-toggle={!this.state.currentUserID ? "modal" : " "} data-target= {!this.state.currentUserID ? "#showLogin" : " "} onClick = {this.onShowLoginModal}>Join in this discuss</div>
                </div>
            </div>
        </div>{/*post-bar end*/}
        <EditModal history = {this.props.history} />
      </React.Fragment>
    )
  }
}


//         <div className="main-section">
//             <div className="container">
//                 <div className="main-section-data">
//                     <div className="row">
//                         <div className="col-lg-8 col-md-8 no-pd question-detail">
//                             <div className="main-ws-sec">
//                             <div className="posty">
//                                 <div className="post-bar no-margin">
//                                     <div className="post_topbar">
//                                     <div className="usy-dt">
//                                         <img src="/images/resources/us-pc2.png" alt />
//                                         <div className="usy-name">
//                                         <h3>John Doe</h3>
//                                         <span><img src="/images/clock.png" alt />3 min ago</span>
//                                         </div>
//                                     </div>
//                                     <div className="ed-opts">
//                                         <a onClick = {this.onOpenFunctional} className="ed-opts-open"><i className="la la-ellipsis-v" /></a>
//                                         {
//                                             this.state.isOpenFunctional &&
//                                             <ul className="ed-options active">
//                                                 <li><a href="#" title>Edit Post</a></li>
//                                                 <li><a href="#" title>Unsaved</a></li>
//                                                 <li><a href="#" title>Unbid</a></li>
//                                                 <li><a href="#" title>Close</a></li>
//                                                 <li><a href="#" title>Hide</a></li>
//                                             </ul>
//                                         }
//                                     </div>
//                                     </div>
//                                     <div className="epi-sec">
//                                     <ul className="descp">
//                                         <li><img src="/images/icon8.png" alt /><span>Epic Coder</span></li>
//                                         <li><img src="/images/icon9.png" alt /><span>India</span></li>
//                                     </ul>
//                                     <ul className="bk-links">
//                                         <li><a href="#" title><i className="la la-bookmark" /></a></li>
//                                         <li><a href="#" title><i className="la la-envelope" /></a></li>
//                                     </ul>
//                                     </div>
//                                     <div className="job_descp">
//                                     <h3>Senior Wordpress Developer</h3>
//                                     <ul className="job-dt">
//                                         <li><a href="#" title>Full Time</a></li>
//                                         <li><span>$30 / hr</span></li>
//                                     </ul>
//                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title>view more</a></p>
//                                     <ul className="skill-tags">
//                                         <li><a href="#" title>HTML</a></li>
//                                         <li><a href="#" title>PHP</a></li>
//                                         <li><a href="#" title>CSS</a></li>
//                                         <li><a href="#" title>Javascript</a></li>
//                                         <li><a href="#" title>Wordpress</a></li> 	
//                                     </ul>
//                                     </div>
//                                     <div className="job-status-bar">
//                                     <ul className="like-com">
//                                         <li>
//                                         <a href="#"><i className="la la-heart" /> Like</a>
//                                         <img src="/images/liked-img.png" alt />
//                                         <span>25</span>
//                                         </li> 
//                                         <li><a href="#" title className="com"><img src="/images/com.png" alt /> Comment 15</a></li>
//                                     </ul>
//                                     <a><i className="la la-eye" />Views 50</a>
//                                     </div>
//                                 </div>{/*post-bar end*/}
//                                 <div className="comment-section">
//                                     <div className="plus-ic">
//                                     <i className="la la-plus" />
//                                     </div>
//                                     <div className="comment-sec">
//                                     <ul>
//                                         <li>
//                                         <div className="comment-list">
//                                             <div className="bg-img">
//                                             <img src="/images/resources/bg-img1.png" alt />
//                                             </div>
//                                             <div className="comment">
//                                             <h3>John Doe</h3>
//                                             <span><img src="/images/clock.png" alt /> 3 min ago</span>
//                                             <p>Lorem ipsum dolor sit amet, </p>
//                                             <a href="#" title className="active"><i className="fa fa-reply-all" />Reply</a>
//                                             </div>
//                                         </div>{/*comment-list end*/}
//                                         <ul>
//                                             <li>
//                                             <div className="comment-list">
//                                                 <div className="bg-img">
//                                                 <img src="/images/resources/bg-img2.png" alt />
//                                                 </div>
//                                                 <div className="comment">
//                                                 <h3>John Doe</h3>
//                                                 <span><img src="/images/clock.png" alt /> 3 min ago</span>
//                                                 <p>Hi John </p>
//                                                 <a href="#" title><i className="fa fa-reply-all" />Reply</a>
//                                                 </div>
//                                             </div>{/*comment-list end*/}
//                                             </li>
//                                         </ul>
//                                         </li>
//                                         <li>
//                                         <div className="comment-list">
//                                             <div className="bg-img">
//                                             <img src="/images/resources/bg-img3.png" alt />
//                                             </div>
//                                             <div className="comment">
//                                             <h3>John Doe</h3>
//                                             <span><img src="/images/clock.png" alt /> 3 min ago</span>
//                                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at.</p>
//                                             <a href="#" title><i className="fa fa-reply-all" />Reply</a>
//                                             </div>
//                                         </div>{/*comment-list end*/}
//                                         </li>
//                                     </ul>
//                                     </div>{/*comment-sec end*/}
//                                     <div className="post-comment">
//                                     <div className="cm_img">
//                                         <img src="/images/resources/bg-img4.png" alt />
//                                     </div>
//                                     <div className="comment_box">
//                                         <form>
//                                         <input type="text" placeholder="Post a comment" />
//                                         <button type="submit">Send</button>
//                                         </form>
//                                     </div>
//                                     </div>{/*post-comment end*/}
//                                 </div>{/*comment-section end*/}
//                                 </div>{/*posty end*/}

//                             </div>
//                         </div>
//                         <div className = "col-lg-4">
                            
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

