import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import SearchScreen from '../components/SearchScreen';

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer.questions,
        userOther: state.userReducer.userOther,
        categoryQuestion: state.categoryReducer.categoryQuestion,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllQuestionsSearch: (keyword) => {
            return dispatch(actions.getAllQuestionsSearchRequest(keyword));
        },
        getUserOther: (userID) => {
            return dispatch(actions.getUserOtherRequest(userID));
        },
        getCategoryQuestion: (categoryID) => {
            return dispatch(actions.getCategoryQuestionRequest(categoryID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
