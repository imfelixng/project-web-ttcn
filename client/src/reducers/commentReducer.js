import * as types from '../constants/index';

let initialState = {
    comments: [],
    replyCommentID: '',
    isVoteComment: false,
    isUnVoteComment: false
};

const comment = (state = initialState, action) => {

    switch(action.type){
        case types.GET_ALL_COMMENTS_QUESTION: {
            return {
                ...state,
                comments: [...action.comments]
            }
        }
        case types.ADD_NEW_COMMENT_QUESTION: {
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }
        }
        case types.CHECK_REPLY: {
            return {
                ...state,
                replyCommentID: action.commentID
            }
        }
        case types.VOTE_COMMENT: {
            return {
                ...state,
            }
        }
        case types.UNVOTE_COMMENT: {
            return {
                ...state,
            }
        }
        case types.CHECK_VOTE_COMMENT:
        {
            return {
                ...state,
                isVoteComment: action.check.isVote,
                isUnVoteComment: action.check.isUnvote
            }
        }
        default:
            return state;
    }

}

export default comment;