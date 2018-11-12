import React, { Component } from 'react'

export default class LoginScreen extends Component {
  render() {
    return (
      <React.Fragment>
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
                            <li data-tab="tab-1" className="current"><a >Sign in</a></li>				
                            <li data-tab="tab-2"><a  >Sign up</a></li>				
                        </ul>			
                        <div className="sign_in_sec current" id="tab-1">
                            <h3>Sign in</h3>
                            <form>
                            <div className="row">
                                <div className="col-lg-12 no-pdd">
                                        <div className="sn-field">
                                        <input type="text" name="email" placeholder="Email" />
                                        <i className="la la-envelope-o"></i>
                                        </div>
                                    </div>
                                <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                    <input type="password" name="password" placeholder="Password" />
                                    <i className="la la-lock" />
                                </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                <div className="checky-sec">
                                    <div className="fgt-sec">
                                    <input type="checkbox" name="cc" id="c1" />
                                    <label htmlFor="c1">
                                        <span />
                                    </label>
                                    <small>Remember me</small>
                                    </div>{/*fgt-sec end*/}
                                    <a href="#" >Forgot Password?</a>
                                </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                <button type="submit" value="submit">Sign in</button>
                                </div>
                            </div>
                            </form>
                            <div className="login-resources">
                            <h4>Login Via Social Account</h4>
                            <ul>
                                <li><a href="#"  className="fb"><i className="fa fa-facebook" />Login Via Facebook</a></li>
                                <li><a href="#"  className="tw"><i className="fa fa-twitter" />Login Via Twitter</a></li>
                            </ul>
                            </div>{/*login-resources end*/}
                        </div>{/*sign_in_sec end*/}
                        <div className="sign_in_sec" id="tab-2">
                            <div className="dff-tab current" id="tab-3">
                            <form>
                                <div className="row">
                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="text" name="email" placeholder="Email" />
                                    <i className="la la-envelope-o"></i>
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="text" name="name" placeholder="Full Name" />
                                    <i className="la la-user" />
                                    </div>
                                </div>

                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="password" name="password" placeholder="Password" />
                                    <i className="la la-lock" />
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="password" name="repeat-password" placeholder="Repeat Password" />
                                    <i className="la la-lock" />
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <div className="checky-sec st2">
                                    <div className="fgt-sec">
                                        <input type="checkbox" name="cc" id="c2" />
                                        <label htmlFor="c2">
                                        <span />
                                        </label>
                                        <small>Yes, I understand and agree to the workwise Terms &amp; Conditions.</small>
                                    </div>{/*fgt-sec end*/}
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <button type="submit" value="submit">Get Started</button>
                                </div>
                                </div>
                            </form>
                            </div>{/*dff-tab end*/}
                            <div className="dff-tab" id="tab-4">
                            <form>
                                <div className="row">
                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="text" name="company-name" placeholder="Company Name" />
                                    <i className="la la-building" />
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="text" name="country" placeholder="Country" />
                                    <i className="la la-globe" />
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="password" name="password" placeholder="Password" />
                                    <i className="la la-lock" />
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <div className="sn-field">
                                    <input type="password" name="repeat-password" placeholder="Repeat Password" />
                                    <i className="la la-lock" />
                                    </div>
                                </div>
                                <div className="col-lg-12 no-pdd">
                                    <div className="checky-sec st2">
                                    <div className="fgt-sec">
                                        <input type="checkbox" name="cc" id="c3" />
                                        <label htmlFor="c3">
                                        <span />
                                        </label>
                                        <small>Yes, I understand and agree to the workwise Terms &amp; Conditions.</small>
                                    </div>{/*fgt-sec end*/}
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
