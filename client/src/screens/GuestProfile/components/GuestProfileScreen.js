import React, { Component } from 'react'


export default class GuestProfileScreen extends Component {
  componentDidMount () {
    let userID = this.props.match.params.idUser;
    this.props.getUserProfile(userID);
    this.props.getAllQuestionsUser(userID);
  }

  showQuestion = (questions) => {
    let result = null;
    if(questions.length > 0) {
      return questions.map((question, index) => {
        return (
          <div class="post-bar profile-question" key = {index}>
                    <div class="post_topbar">
                      <div class="usy-dt">
                        <img class="user-picy" src="/images/users/img_avatar_default.png"/>
                        <div class="usy-name">
                          <h3>{this.props.userItem ? this.props.userItem.fullname : "yourname"}</h3>
                          <span>10 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div class="epi-sec">
                      <ul class="descp">
                        <li>
                          <ul class="job-dt">
                            <li><a href="/categories/3">Triet hoc</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="job_descp">
                      <div class="question__content">
                        <p>gfgfgdvghh</p>
                      </div>
                      <div class="question_images">
                      </div>
                      <ul class="skill-tags">
                        <li><a href="/tags/t_1545924032744">Hóa hữu cơ</a></li>
                      </ul>
                    </div>
                    <div class="job-status-bar">
                      <ul class="like-com">
                        <li><a class="com"><i class="la la-heart-o active_vote_unvote"></i>2</a> </li>
                        <li><a class="com"><i class="la la-eye"></i> 5</a></li>
                        <li><a class="com"><i class="la la-eye"></i> 4</a></li>
                      </ul>
                    </div>
                    <div class="question_top-comment">
                      <div>
                        <a class="btn btn-info btn-join" href="/questions/q_1545927330671u_1545923833901">Join in this discuss</a>
                      </div>
                    </div>
                  </div>
        )
      })
    }
  }

  render() {
    let {userItem, questions} = this.props;
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="section">
            <img className="img-cover" src="https://st.quantrimang.com/photos/image/2018/01/11/anh-bia-facebook-5.jpg" alt="">
            </img>
          </div>
          <div className="main-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                 <div className="main-left-sidebar">
                  <div className="user_profile">
                    <div className="user-pro-img">
                      <img className="img-pro" src= {userItem ? userItem.avatar : "/images/users/img_avatar_default.png"} alt=""></img>
                    </div>
                    <div className="user_pro_status">
                    <h3 className = "user-pro__fullname">{userItem && userItem.fullname}</h3>
                     <ul className="flw-status">
                       <li>
                         <span>Question</span>
                         <b>{questions.length}</b>
                       </li>
                       <li>
                         <span>Following</span>
                         <b>{userItem ? (userItem.tags.length + userItem.categories.length) : 0}</b>
                       </li>
                     </ul>
                    </div>
                    <ul className="social_links"> 
                       <li>
                         <a href="https://www.facebook.com/mai.thao.2206">
                           <i className= "fa fa-facebook-square"></i>
                           http://www.facebook.com/mai...
                         </a>
                       </li>
                     </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  {this.showQuestion(questions)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
