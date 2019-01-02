import React, { Component } from 'react'


export default class GuestProfileScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="section">
            <img className="img-cover" src="https://st.quantrimang.com/photos/image/2018/01/11/anh-bia-facebook-5.jpg" alt="">
            </img>
            <a className="change-cover" href="">
             <i className="fa fa-camera"> Change Image</i>
            </a>
          </div>
          <div className="main-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                 <div className="main-left-sidebar">
                  <div className="user_profile">
                    <div className="user-pro-img">
                      <img className="img-pro" src="https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/31958494_890304734484946_1677189054120067072_n.jpg?_nc_cat=109&_nc_oc=AQnA4NQJh0dese5xlDM59kbYzLHgjC4W2txgXo5pZ1hoTbi2K6yGhsfGG7ANCwgkEssmp5A-CCTaTxFgm9clPrL3&_nc_ht=scontent.fdad2-1.fna&oh=abd0c52f6d5b50a8491791b0fb76fa40&oe=5C961F6B" alt=""></img>
                      <a href="">
                        <i className="fa fa-camera"></i>
                      </a>
                      <p className="name-user">Nguyễn Quang An</p>
                    </div>
                    <div className="user_pro_status">
                     <ul className="flw-status">
                       <li>
                         <span>Post</span>
                         <b>15</b>
                       </li>
                       <li>
                         <span>Following</span>
                         <b>9</b>
                       </li>
                     </ul>
                    </div>
                    <ul className="social_links"> 
                       <li>
                         <a href="https://www.facebook.com/mai.thao.2206">
                           <i className= "fa fa-facebook-square"></i>
                           "Http://www.facebook.com/mai..."
                         </a>
                       </li>
                       <li>
                         <a href="https://www.facebook.com/mai.thao.2206">
                         <i className= "fa fa-envelope mail-icon"></i>
                           "Http://www.gmail.com/mai..."
                         </a>
                       </li>
                       <li>
                         <a href="https://www.facebook.com/mai.thao.2206">
                         <i className= "fa fa-twitter-square"></i>
                           "Http://www.twitter.com/mai..."
                         </a>
                       </li>
                     </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div class="post-bar profile-question">
                    <div class="post_topbar">
                      <div class="usy-dt">
                        <img class="user-picy" src="/images/users/img_avatar_default.png"/>
                        <div class="usy-name">
                          <h3>Nguyễn Quang An</h3>
                          <span>10 hours ago</span>
                        </div>
                      </div>
                      <div class="ed-opts">
                        <a class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
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
                      <ul class="bk-links">
                        <li>
                          <a><i class="la la-bookmark"></i></a>
                        </li>
                        <li>
                          <a><i class="la la-plus"></i></a>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
