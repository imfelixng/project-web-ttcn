import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';

import EditModal from './EditModal';
import SidebarRight from '../../../commons/Sidebar/components/SidebarRight';
export default class QuestionDetail extends Component {

    constructor(props) {
        super(props);
        props.getQuestion(props.match.params.idQuestion).then(res => {
            if(this.props.question) {
                if(!sessionStorage.getItem(this.props.question.questionID)) {
                    this.props.updateViewQuestion({questionID: this.props.question.questionID,views: this.props.question.views + 1})
                    sessionStorage.setItem(this.props.question.questionID, 'true');
                }

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
        categoryQuestion: {},
        isLoadingVote: false,
        isLoadingUnVote: false
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
        this.props.getQuestion(this.props.match.params.idQuestion).then(() => {
            if(this.props.question) {
                this.props.getUserOther(this.props.question.userID);
                this.props.getCategoryQuestion(this.props.question.categoryID);
            }
        })
        .catch(err => console.log(err));
    }


    onDeleteQuestion = (questionID) => {
        this.props.deleteQuestion(questionID).then(res => {
            this.props.history.push('/');
        })
        .catch(err => console.log(err));

    }

    onVoteQuestion = () => {

        if(this.state.isLoadingVote || this.state.isLoadingUnVote) {
            return;
        }

        this.setState({
            isLoadingVote: true
        })

        if(!this.state.currentUserID) {
            alert("Vui lòng login để có thể tương tác!");
            this.setState({
                isLoadingVote: false
            })
            return;

        }

        let vote = {
            userID: this.props.currentUserID,
            questionID: this.props.question.questionID,
            voteID: 'v_' + new Date().getTime() + this.state.currentUserID + this.props.question.questionID
        }

        this.props.voteQuestion(vote).then(() => {
            this.setState({
                isLoadingVote: false
            })
        })
        .catch(err => console.log(err));

    }

    onUnVoteQuestion = () => {

        if(this.state.isLoadingVote || this.state.isLoadingUnVote) {
            return;
        }

        this.setState({
            isLoadingUnVote: true
        })

        if(!this.state.currentUserID) {
            alert("Vui lòng login để có thể tương tác!");
            this.setState({
                isLoadingUnVote: false
            })
            return;
        }

        let unvote = {
            userID: this.props.currentUserID,
            questionID: this.props.question.questionID,
            unvoteID: 'uv_' + new Date().getTime() + this.state.currentUserID + this.props.question.questionID
        }

        this.props.unVoteQuestion(unvote).then(() => {
            this.setState({
                isLoadingUnVote: false
            })
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
                    alt = "logo"
                />
            });
        }

        if(images.length === 2) {
            return images.map((image, index) => {
                return <img 
                    src = {image.dataURL}
                    key = {index}
                    className = "question_image--50"
                    alt = "logo"
                />
            });
        }

        if(images.length === 3) {
            return images.map((image, index) => {
                return <img 
                    src = {image.dataURL}
                    key = {index}
                    className = "question_image--30"
                    alt = "logo"
                />
            });
        } else {
            return images.map((image, index) => {
                if(index < 2) {
                    return <img 
                        src = {image.dataURL}
                        key = {index}
                        className = "question_image--30"
                        alt = "logo"
                    />
                }
                if( index === 2) {
                    return <div key = {index} className = "question_image--30 more">
                        <img 
                            src = {image.dataURL}
                            className = "img_more"
                            alt = "logo"
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
    let userInfo = null;
    let categoryInfo = null;

    let timeAgo = 'Thời gian đăng';

    if(question) {
        userInfo = this.state.userOther[question.userID];
        categoryInfo = this.state.categoryQuestion[question.categoryID];
        timeAgo = question ? moment(question._created, "YYYY-MM-DD HH:mm:ss", 'vn').fromNow() : 'Thời gian đăng';
    }

    return (
      <React.Fragment>
        <main>
            <div className="main-section">
                <div className="container">
                    <div className="main-section-data">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 no-pd">
                                <div className="main-ws-sec">
                                <div className="posty">


                                    <div className="post-bar">
                                                <div className="post_topbar">
                                                    <div className="usy-dt">
                                                        <img className = "user-picy" src= {userInfo ? userInfo.avatar : "/images/users/img_avatar_default.png"} alt = "logo" />
                                                        <div className="usy-name">
                                                            <h3>{userInfo ? userInfo.fullname : "yourname"}</h3>
                                                            <span><img src="/images/clock.png" alt = "logo" />{timeAgo}</span>
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
                                                                <li><a href="#" data-toggle="modal" data-target="#EditModal" data-backdrop="static" onClick = {this.onOpenFunctional}>Edit</a></li>
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
                                                                                    {
                                                                                        (question && (this.state.currentUserID !== question.userID))&&
                                                                                        <li>
                                                                                            <a href="#" ><i className="la la-bookmark" /></a>
                                                                                        </li>
                                                                                        
                                                                                    }
                                                                                    <li><a href="#" ><i className= "la la-check" /></a></li>
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
                                                                                <a  className="com" onClick = {this.onVoteQuestion}>
                                                                                    {
                                                                                        this.state.isLoadingVote ? 
                                                                                            <img className = "loading-vote"src= "/images/ic_loading.gif" alt = "loading"/>
                                                                                        :
                                                                                        <i className = "la la-thumbs-up"></i>
                                                                                    }
                                                                                </a>
                                                                                <a  className="com">{question ? (question.votes - question.unvotes) : 0}</a>
                                                                                <a  className="com" onClick = {this.onUnVoteQuestion}>
                                                                                    {
                                                                                        this.state.isLoadingUnVote ? 
                                                                                        <img className = "loading-vote"src= "/images/ic_loading.gif" alt = "loading" />
                                                                                        :
                                                                                        <i className = "la la-thumbs-down"></i>                
                                                                                    }
                                                                                </a>
                                                                            </li> 
                                                                            <li><a   className="com"><img src="/images/com.png"  /> {question ? question.comments : 0}</a></li>
                                                                            <li><a className="com"><i className="la la-eye" /> {question ? question.views : 0}</a></li>
                                                                            </ul>
                                                                            
                                                                        </div>

                                                    
                                            </div>{/*post-bar end*/}
                                            {
                                                question && this.state.currentUserID === question.userID &&
                                                <EditModal
                                                    onCloseFunctional = {this.onCloseFunctional}
                                                    tags = {this.props.tags}
                                                    categories = {this.props.categories}
                                                    getCategories = {this.props.getCategories}
                                                    getTags = {this.props.getTags}
                                                    questionID = {this.props.match.params.idQuestion}
                                                    getQuestion = {this.props.getQuestion}
                                                    updateQuestion = {this.props.updateQuestion}
                                                    question = {this.props.question}
                                                />
                                            }
                                    <div className="comment-section">
                                        <div className="plus-ic">
                                        <i className="la la-plus" />
                                        </div>
                                        <div className="comment-sec">
                                        <ul>
                                            <li>
                                            <div className="comment-list">
                                                <div className="bg-img">
                                                <img src="/images/resources/bg-img1.png" alt = "logo"/>
                                                </div>
                                                <div className="comment">
                                                <h3>John Doe</h3>
                                                <span><img src="/images/clock.png" alt = "logo" /> 3 min ago</span>
                                                <p>Lorem ipsum dolor sit amet, </p>
                                                <a href="#"  className="active"><i className="fa fa-reply-all" />Reply</a>
                                                </div>
                                            </div>{/*comment-list end*/}
                                            <ul>
                                                <li>
                                                <div className="comment-list">
                                                    <div className="bg-img">
                                                    <img src="/images/resources/bg-img2.png" alt = "logo" />
                                                    </div>
                                                    <div className="comment">
                                                    <h3>John Doe</h3>
                                                    <span><img src="/images/clock.png"alt = "logo" /> 3 min ago</span>
                                                    <p>Hi John </p>
                                                    <a href="#" ><i className="fa fa-reply-all" />Reply</a>
                                                    </div>
                                                </div>{/*comment-list end*/}
                                                </li>
                                            </ul>
                                            </li>
                                            <li>
                                            <div className="comment-list">
                                                <div className="bg-img">
                                                <img src="/images/resources/bg-img3.png" alt = "logo"/>
                                                </div>
                                                <div className="comment">
                                                <h3>John Doe</h3>
                                                <span><img src="/images/clock.png" alt = "logo" /> 3 min ago</span>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at.</p>
                                                <a href="#" ><i className="fa fa-reply-all" />Reply</a>
                                                </div>
                                            </div>{/*comment-list end*/}
                                            </li>
                                        </ul>
                                        </div>{/*comment-sec end*/}
                                        {
                                            this.state.currentUserID ?  
                                            <div className="post-comment">
                                                <div className="cm_img">
                                                    <img src="/images/resources/bg-img4.png" alt = "logo" />
                                                </div>
                                                <div className="comment_box">
                                                    <form>
                                                    <input type="text" placeholder="Post a comment" />
                                                    <button type="submit">Send</button>
                                                    </form>
                                                </div>
                                            </div> :
                                            <div className="post-comment">
                                                <span>Vui lòng <NavLink to = "/sign-in"><b>Login</b></NavLink> để tham gia cuộc thảo luận này!</span>
                                            </div>
                                        }
                                    </div>{/*comment-section end*/}
                                    </div>{/*posty end*/}

                                </div>
                            </div>
                            <div className = "col-md-4">
                                <SidebarRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>

      </React.Fragment>
    )
  }
}


