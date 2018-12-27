import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import CategoryItemScreen from '../components/CategoryItemScreen';

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer.questions,
        userOther: state.userReducer.userOther,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllQuestionsCategory: (categoryID) => {
            return dispatch(actions.getAllQuestionsCategoryRequest(categoryID));
        },
        getUserOther: (userID) => {
            return dispatch(actions.getUserOtherRequest(userID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemScreen);