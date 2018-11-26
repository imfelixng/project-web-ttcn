import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import NewfeedScreen from '../components/NewfeedScreen';

const mapStateToProps = (state) => {

    return{
        questions: state.questionReducer.questions,
        categories: state.categoryReducer.categories,
        tags: state.tagReducer.tags,
        currentUserID: state.userReducer.currentUserID,
        currentUser: state.userReducer.currentUser,
        userOther: state.userReducer.userOther,
        categoryQuestion: state.categoryReducer.categoryQuestion
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getQuestions: () => {
            return dispatch(actions.getAllQuestionRequest())
        },
        addNewQuestion: (questionItem) => {
            return dispatch(actions.addNewQuestionRequest(questionItem));
        },
        getCategories: () => {
            return dispatch(actions.getAllCategoryRequest());
        },
        getTags: () => {
            return dispatch(actions.getAllTagsRequest());
        },
        getUser: (userID) => {
            return dispatch(actions.getUserRequest(userID));
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


export default connect(mapStateToProps, mapDispatchToProps)(NewfeedScreen);