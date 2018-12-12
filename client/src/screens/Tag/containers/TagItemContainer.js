import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import TagItemScreen from '../components/TagItemScreen';

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer.questions,
        userOther: state.userReducer.userOther,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllQuestionsTag: (TagID) => {
            return dispatch(actions.getAllQuestionsTagRequest(TagID));
        },
        getUserOther: (userID) => {
            return dispatch(actions.getUserOtherRequest(userID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagItemScreen);