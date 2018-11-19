import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import NewfeedScreen from '../components/NewfeedScreen';

const mapStateToProps = (state) => {

    return{
        questions: state.questionReducer.questions,
        categories: state.categoryReducer.categories,
        tags: state.tagReducer.tags,
        currentUserID: state.userReducer.currentUserID,
        currentUser: state.userReducer.currentUser
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
        addNewTags: (tags) => {
            return dispatch(actions.addNewTagsRequest(tags));
        },
        getUser: (userID) => {
            dispatch(actions.getUserRequest(userID));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewfeedScreen);