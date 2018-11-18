import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import Header from '../components/Header';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        isLogout: state.userReducer.isLogout,
        currentUserID: state.userReducer.currentUserID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            return dispatch(actions.logoutUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
