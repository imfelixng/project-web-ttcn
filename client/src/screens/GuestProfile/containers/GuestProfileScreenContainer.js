import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import GuestProfileScreen from '../components/GuestProfileScreen';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userItem: state.userReducer.userItem,
        questions: state.questionReducer.questions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (userID) => {
            return dispatch(actions.getUserProfileRequest(userID));
        },
        getAllQuestionsUser: (userID) => {
            return dispatch(actions.getAllQuestionsUserRequest(userID));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestProfileScreen);