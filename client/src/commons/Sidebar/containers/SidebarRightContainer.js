import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import SidebarRight from '../components/SidebarRight';

const mapStateToProps = (state) => {

    return{
        topQuestions: state.questionReducer.topQuestions,
        userOther: state.userReducer.userOther,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getTopQuestions: () => {
            return dispatch(actions.getTopQuestionsRequest());
        },
        getUserOther: (userID) => {
            return dispatch(actions.getUserOtherRequest(userID));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SidebarRight);