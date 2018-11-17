import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom';
export default class Header extends Component {


    state = {
        isOpenInfo: false,
        isLogout: false,
    }

    onToggleInfo = () => {
        this.setState({
            isOpenInfo: !this.state.isOpenInfo
        });
    }

    onLogout = () => {
        this.onToggleInfo();
        this.setState({
            isLogout: true
        })
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
                    <li>
                        <NavLink to = "/notifications">
                        <span><img src="/images/icon7.png" /></span>
                        Notification
                        </NavLink>
                    </li>
                    </ul>
                </nav>{/*nav end*/}
                <div className="menu-btn">
                    <a href="#" ><i className="fa fa-bars" /></a>
                </div>{/*menu-btn end*/}
                <div className="user-account">
                    <div className="user-info" onClick = {this.onToggleInfo}>
                    <img src="/images/resources/user.png" />
                    <a href="#" >John</a>
                    <i className="la la-sort-down" />
                    </div>
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
