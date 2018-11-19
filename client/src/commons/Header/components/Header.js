import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom';
export default class Header extends Component {


    state = {
        isOpenInfo: false,
        isLogout: false,
        currentUserID: ''
    }

    onToggleInfo = () => {
        this.setState({
            isOpenInfo: !this.state.isOpenInfo
        });
    }

    onLogout = () => {
        this.onToggleInfo();
        this.props.onLogout();
        this.setState({
            isLogout: true
        });
    }

    static getDerivedStateFromProps(prevProps, prevState) {
        return {
            isLogout: prevProps.isLogout,
            currentUserID: prevProps.currentUserID
        }
    }

    componentDidMount() {
        this.props.getUser(this.props.currentUserID)
    }

    showFullName = (fullname) => {
        let lastSpace  = fullname.lastIndexOf(' ');
        return fullname.slice(lastSpace);
    }

  render() {
    return (
      <React.Fragment>
        {this.state.isLogout && <Redirect to = "/sign-in"/>}
        <header>
            <div className="container">
                <div className="header-data">
                <div className="logo">
                    <NavLink to="/" exact><img src="/images/logo.png" /></NavLink>
                </div>{/*logo end*/}
                <div className="search-bar">
                    <form action = "/search">
                    <input type="text" name="search" placeholder="Search..." />
                    <button type="submit"><i className="la la-search" /></button>
                    </form>
                </div>{/*search-bar end*/}
                    <nav>
                        <ul>
                        <li>
                            <NavLink to="/categories" >
                            <span><img src="/images/icon2.png" /></span>
                            Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tags" >
                            <span><img src="/images/icon4.png" /></span>
                            Tag
                            </NavLink>
                        </li>
                        {
                            this.state.currentUserID && 
                            <li>
                                <NavLink to = "/notifications">
                                <span><img src="/images/icon7.png" /></span>
                                Notification
                                </NavLink>
                            </li>
                        }
                        </ul>
                    </nav>
                <div className="menu-btn">
                    <a href="javascript:void()" ><i className="fa fa-bars" /></a>
                </div>{/*menu-btn end*/}
                <div className="user-account">
                    {
                        this.state.currentUserID ?
                        <div className="user-info" >
                            <NavLink to = "/user/U_12345">
                                <img src= {this.props.currentUser ? this.props.currentUser.avatar : '/images/users/img_avatar_default.png'} />
                                <span>{this.props.currentUser ? this.showFullName(this.props.currentUser.fullname) : 'name'}</span>
                            </NavLink>
                            <i className="la la-sort-down" onClick = {this.onToggleInfo}/>
                        </div> : 
                        <NavLink className = "btn btn-light" to = "/sign-in">Sign In</NavLink>
                    }
                    {
                        this.state.isOpenInfo && 
                        <div className="user-account-settingss active">
                            <h3>Setting</h3>
                            <ul className="us-links">
                                <li><a href="profile-account-setting.html" >View profile</a></li>
                                <li><a href="profile-account-setting.html" >Account Setting</a></li>
                            </ul>
                            <h3 className="tc" onClick = {this.onLogout}>Logout</h3>   
                        </div>
                    }
                </div>
                </div>{/*header-data end*/}
            </div>
            </header>{/*header end*/}

      </React.Fragment>
    )
  }
}
