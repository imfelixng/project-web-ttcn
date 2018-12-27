import {
    connect
} from 'react-redux';
import * as actions from '../../../actions/index';
import Header from '../components/Header';

const mapStateToProps = (state, ownProps) => {
    return {
        isLogout: state.userReducer.isLogout,
        currentUserID: state.userReducer.currentUserID,
        currentUser: state.userReducer.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            return dispatch(actions.logoutUser())
        },
        getUser: (userID) => {
            return dispatch(actions.getUserRequest(userID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);