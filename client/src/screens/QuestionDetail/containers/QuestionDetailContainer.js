import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import QuestionDetail from '../components/QuestionDetail';

const mapStateToProps = (state) => {
    return{
        currentUserID: state.userReducer.currentUserID,
        userOther: state.userReducer.userOther,
        categoryQuestion: state.categoryReducer.categoryQuestion,
        question: state.questionReducer.questionItem
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getQuestion: (questionID) => {
            return dispatch(actions.getQuestionRequest(questionID))
        },
        getUserOther: (userID) => {
            return dispatch(actions.getUserOtherRequest(userID));
        },
        getCategoryQuestion: (categoryID) => {
            return dispatch(actions.getCategoryQuestionRequest(categoryID));
        },
        deleteQuestion: (questionID) => {
            return dispatch(actions.deleteQuestionRequest(questionID));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);