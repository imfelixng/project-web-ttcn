import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class LoginModal extends Component {


    onLogin = () => {
        this.props.history.replace("/sign-in");
    }

  render() {
    return (
      <React.Fragment>
          {/* modal show question detail */}
          <div className="modal fade" id="showLogin" tabIndex={-1} role="dialog" aria-labelledby="showLoginLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="showLoginLabel">Cảnh báo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Vui lòng đăng nhập để sử dụng tính năng này!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-dismiss= "modal" onClick = {this.onLogin}>Login</button>
                    </div>
                    </div>
                </div>
            </div>
      </React.Fragment>
    )
  }
}
