import * as types from '../constants/index';
import { addNewCommentQuestionRequest } from '../actions';

let initialState = {
    comments: [],
    replyCommentID: '',
    isVoteComment: false,
    isUnVoteComment: false,
    checkVoteComment: {}
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
            let index = state.comments.findIndex(comment => comment.commentID === action.vote_comment.commentID);
            state.comments[index].votes = state.comments[index].votes + 1;
            state.comments[index].unvotes = state.isUnVoteComment ? state.comments[index].unvotes - 1 : state.comments[index].unvotes;
            console.log(state.comments);
            return {
                ...state,
                comments: [...state.comments]
            }
        }
        case types.UNVOTE_COMMENT: {
            let index = state.comments.findIndex(comment => comment.commentID === action.unvote_comment.commentID);
            state.comments[index].unvotes = state.comments[index].unvotes + 1;
            state.comments[index].votes = state.isVoteComment ? state.comments[index].votes - 1 : state.comments[index].votes;
            return {
                ...state,
                comments: [...state.comments]
            }
        }

        case types.ADD_NEW_REPLY_COMMENT_QUESTION: {
            return {
                ...state,
            }
        }

        case types.CHECK_VOTE_COMMENT:
        {
            
            let checkVoteComment = state.checkVoteComment;
            checkVoteComment[action.check.commentID] = {
                isVoteComment: action.check.isVote,
                isUnVoteComment: action.check.isUnvote,
                userID: action.check.userID
            }

            return {
                ...state,
                isVoteComment: action.check.isVote,
                isUnVoteComment: action.check.isUnvote,
                checkVoteComment
            }
        }
        default:
            return state;
    }

}

export default comment;