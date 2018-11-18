import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
export default class LoginScreen extends Component {


    state = {
        isSignIn: true,
        email: '',
        password: '',
        email_signup: '',
        fullname: '',
        password_signup: '',
        repeat_password_signup: '',
        check_password_signup: true,
        isSuccess: false,
        error: ''
    }

    showSignIn = (isSignIn) => {
        this.setState({
            isSignIn
        });
    }

    onSignUp = (e) => {
        e.preventDefault();
        let {password_signup, repeat_password_signup} = this.state;

        if(password_signup !== repeat_password_signup) {
            this.setState({
                check_password_signup: false
            });
            return false;
        }

        let user = {
            userID: "u_" + new Date().getTime(),
            email: this.state.email_signup,
            password: this.state.password_signup,
            fullname: this.state.fullname,
            username: '',
            vote: 0,
            unvote: 0,
            avatar: '/images/user/img_avatar_default.png'
        }

        this.props.onCreateUser(user).then(res => {
            if(this.props.statusCreated) {
                console.log("AHIHI");
                this.setState({
                    email_signup: '',
                    fullname: '',
                    password_signup: '',
                    repeat_password_signup: '',
                    check_password_signup: true,
                    isSuccess: true
                });
            } else {
                this.setState({
                    error: "Đã có lỗi xãy ra!"
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }

    onSignIn = (e) => {
        e.preventDefault();
        
    }

    onLoginSocial = (name) => {
        if(name === "fb") {
            alert("Tính năng này đang được phát triển!");
        }

    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.value === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState(
            {
                [name]: value
            }
        )
    }

  render() {
    return (
      <React.Fragment>
        {
            this.state.isSuccess && <Redirect to = "/"/>
        }

        <div className="wrapper">
        <div className="sign-in-page">
            <div className="signin-popup">
            <div className="signin-pop">
                <div className="row">
                <div className="col-lg-6">
                    <div className="cmp-info">
                    <div className="cm-logo">
                        <img src="images/cm-logo.png"  />
                        <p>Workwise,  is a global freelancing platform and social networking where businesses and independent professionals connect and collaborate remotely</p>
                    </div>{/*cm-logo end*/}	
                    <img src="images/cm-main-img.png"  />			
                    </div>{/*cmp-info end*/}
                </div>
                <div className="col-lg-6">
                    <div className="login-sec">
                    <ul className="sign-control">
                        <li data-tab="tab-1" className= {this.state.isSignIn ? "current" : ""} onClick = {() => this.showSignIn(true)}><a >Sign in</a></li>				
                        <li data-tab="tab-2" className= {!this.state.isSignIn ? "current" : ""} onClick = {() => this.showSignIn(false)}><a  >Sign up</a></li>				
                    </ul>			
                    <div className={this.state.isSignIn ? "sign_in_sec current" : "sign_in_sec"} id="tab-1">
                        <h3>Sign in</h3>
                        <form method="post" onSubmit = {this.onSignIn}>
                        <div className="row">
                            <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="email" name="email" placeholder="Email" onChange = {this.handleChange} value = {this.state.email} required/>
                                    <i className="la la-envelope-o"></i>
                                    </div>
                                </div>
                            <div className="col-lg-12 no-pdd">
                            <div className="sn-field">
                                <input type="password" name="password" placeholder="Password" onChange = {this.handleChange} value = {this.state.password} required/>
                                <i className="la la-lock" />
                            </div>
                            </div>
                            <div className="col-lg-12 no-pdd">
                            <button type="submit" value="submit">Sign in</button>
                            </div>
                        </div>
                        </form>
                        <div className="login-resources">
                        <h4>Đăng nhập với</h4>
                        <ul>
                            <li><a className="fb" onClick = {() => this.onLoginSocial("fb")}><i className="fa fa-facebook" />Đăng nhập với Facebook</a></li>
                        </ul>
                        </div>{/*login-resources end*/}
                    </div>{/*sign_in_sec end*/}
                    <div className={!this.state.isSignIn ? "sign_in_sec current" : "sign_in_sec"} id="tab-2">
                        <div className="dff-tab current" id="tab-3">
                        <h3>Sign up</h3>
                        <form method = "post" onSubmit = {this.onSignUp}>
                            <div className="row">
                            <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                <input type="email" name="email_signup" placeholder="Email" onChange = {this.handleChange} value = {this.state.email_signup} required/>
                                <i className="la la-envelope-o"></i>
                                </div>
                            </div>
                            <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                <input type="text" name="fullname" placeholder="Full Name" onChange = {this.handleChange} value = {this.state.fullname} required/>
                                <i className="la la-user" />
                                </div>
                            </div>

                            <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                <input type="password" name="password_signup" placeholder="Password" onChange = {this.handleChange} value = {this.state.password_signup} required/>
                                <i className="la la-lock" />
                                </div>
                            </div>
                            {!this.state.check_password_signup && <span className = "sign_error">Mật khẩu không khớp</span>}
                            <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                <input type="password" name="repeat_password_signup" placeholder="Repeat Password" onChange = {this.handleChange} value = {this.state.repeat_password_signup} required/>
                                <i className="la la-lock" />
                                </div>
                            </div>
                            <div className="col-lg-12 no-pdd">
                                <button type="submit" value="submit">Get Started</button>
                            </div>
                            </div>
                        </form>
                        </div>{/*dff-tab end*/}
                    </div>		
                    </div>{/*login-sec end*/}
                </div>
                </div>		
            </div>{/*signin-pop end*/}
            </div>{/*signin-popup end*/}
            
        </div>{/*sign-in-page end*/}
        </div>{/*theme-layout end*/}
      </React.Fragment>
    )
  }
}
