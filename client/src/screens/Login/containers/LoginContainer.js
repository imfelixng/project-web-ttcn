import {connect} from 'react-redux';
import LoginScreen from '../components/LoginScreen';
import * as actions from '../../../actions/index';


const mapStateToProps = (state) => {
    return {
        statusCreated: state.userReducer.statusCreated,
        statusSignIn:  state.userReducer.statusSignIn,
        isSuccess: state.userReducer.isSuccess,
        errMsgSignUp: state.userReducer.errMsgSignUp,
        errMsgSignIn: state.userReducer.errMsgSignIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateUser: (user) => {
            return dispatch(actions.createUserRequest(user));
        },
        onSignIn: (user) => {
            return dispatch(actions.checkUserRequest(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);