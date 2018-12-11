import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import QuestionDetail from '../components/QuestionDetail';

const mapStateToProps = (state) => {
    return{
        currentUserID: state.userReducer.currentUserID,
        userOther: state.userReducer.userOther,
        categoryQuestion: state.categoryReducer.categoryQuestion,
        question: state.questionReducer.questionItem,
        categories: state.categoryReducer.categories,
        tags: state.tagReducer.tags,
        currentUser: state.userReducer.currentUser,
        isVote: state.questionReducer.isVote,
        isUnVote: state.questionReducer.isUnVote,
        comments: state.commentReducer.comments,
        replyCommentID: state.commentReducer.replyCommentID
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
        updateQuestion: (question) => {
            return dispatch(actions.updateQuestionRequest(question));
        },
        deleteQuestion: (questionID) => {
            return dispatch(actions.deleteQuestionRequest(questionID));
        },
        getCategories: () => {
            return dispatch(actions.getAllCategoryRequest());
        },
        getTags: () => {
            return dispatch(actions.getAllTagsRequest());
        },
        voteQuestion: (vote) => {
            return dispatch(actions.voteQuestionRequest(vote));
        },
        unVoteQuestion: (unvote) => {
            return dispatch(actions.unVoteQuestionRequest(unvote));
        },
        checkVoteQuestion: (questionID) => {
            return dispatch(actions.checkVoteQuestionRequest(questionID))
        },
        updateViewQuestion: (question) => {
            return dispatch(actions.updateViewQuestionRequest(question));
        },
        getAllCommentsQuestion: (questionID) => {
            return dispatch(actions.getAllCommentsQuestionRequest(questionID));
        },
        addNewCommentQuestion: (comment) => {
            return dispatch(actions.addNewCommentQuestionRequest(comment));
        },
        checkReply: (commentID) => {
            return dispatch(actions.checkReply(commentID));
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);