import React, { Component } from 'react';

export default class NotificationScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <div className = "wrapper">
        <div className="container">
          <div className="header-notify">
            <div className="notify-title"><p >Your Notification</p></div>
            <span className="notify-setting"><a>Notification Settings</a></span>
          </div>
          <hr className="under-line"></hr>
          <div>
            <ul className="menu-list">
             <a className="list-item">
              <li className="list-notify">
                <img className = "noti__user-avatar" src="/images/users/img_avatar_default.png" alt = "logo" />
                <div className="sgt-text">
                <div className="detail-notify">
                <h4>An Nguyễn</h4>
                <p className="comment-notify"> đã thích bài viết của bạn</p>
                </div>
                <span><i className="fa fa-heart"></i></span>
                <span className="time-notify">1h</span>
                </div>
              </li>
              <li className="list-notify">
                <img className = "noti__user-avatar" src="/images/users/img_avatar_default.png" alt = "logo" />
                <div className="sgt-text">
                <div className="detail-notify">
                <h4>An Nguyễn</h4>
                <p className="comment-notify"> đã thích bài viết của bạn</p>
                </div>
                <span><i className="fa fa-heart"></i></span>
                <span className="time-notify">1h</span>
                </div>
              </li>
              <li className="list-notify">
                <img className = "noti__user-avatar" src="/images/users/img_avatar_default.png" alt = "logo" />
                <div className="sgt-text">
                <div className="detail-notify">
                <h4>An Nguyễn</h4>
                <p className="comment-notify"> đã thích bài viết của bạn</p>
                </div>
                <span><i className="fa fa-heart"></i></span>
                <span className="time-notify">1h</span>
                </div>
              </li>
              <li className="list-notify">
                <img className = "noti__user-avatar" src="/images/users/img_avatar_default.png" alt = "logo" />
                <div className="sgt-text">
                <div className="detail-notify">
                <h4>An Nguyễn</h4>
                <p className="comment-notify"> đã thích bài viết của bạn</p>
                </div>
                <span><i className="fa fa-heart"></i></span>
                <span className="time-notify">1h</span>
                </div>
              </li>
              </a>
            </ul>

          </div>
        </div>
        </div>

      </React.Fragment>
    )
  }
}
