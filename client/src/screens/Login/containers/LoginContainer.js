import {connect} from 'react-redux';
import LoginScreen from '../components/LoginScreen';
import * as actions from '../../../actions/index';


const mapStateToProps = (state) => {
    console.log(state);
    return {
        statusCreated: state.userReducer.statusCreated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateUser: (user) => {
            return dispatch(actions.createUserRequest(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);