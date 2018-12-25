import * as types from '../constants/index';
import * as APIs from '../api/callAPI';

export const getAllQuestionRequest = () => {
    return async (dispatch) => {
        let questions = await APIs.callAPI("questions", "GET", null);
        if(questions != null) {
            dispatch(getAllQuestions(questions.data._items));
        }
    }

};

export const getAllQuestions = (questions) => {
    return {
        type: types.GET_ALL_QUETIONS,
        questions
    }
};

export const addNewQuestionRequest = (questionItem) => {

    return async (dispatch) => {
        console.log(questionItem);
        let result = await APIs.callAPI("questions", "POST", questionItem);
        console.log(result);
        if(result != null) {
            dispatch(addNewQuestion(result.data));
        }
    }
};

export const addNewQuestion = (questionItem) => {
    return {
        type: types.ADD_NEW_QUESTION,
        questionItem
    }
};

export const getQuestionRequest = (questionID) => {
    return async (dispatch) => {
        
        let result = await APIs.callAPI("questions/" + questionID, "GET");
            if(result != null) {
                dispatch(getQuestion(result.data));
            }
    }
}

export const getQuestion = (question) => {
    return {
        type: types.GET_QUESTION,
        question
    }
}

export const updateQuestionRequest = (question) => {
    return async (dispatch) => {
        console.log(question);
        let result = await APIs.callAPI("questions/" + question.questionID, "PATCH", question);
        console.log(result);    
        if(result != null) {
                dispatch(updateQuestion(result.data));
            }
    }
}

export const updateQuestion = (question) => {
    return {
        type: types.UPDATE_QUESTION,
        question
    }
}

export const updateViewQuestionRequest = (question) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("questions/" + question.questionID +"/views", "PATCH", question);
        console.log(result);    
        if(result != null) {
                dispatch(updateViewQuestion(result.data));
            }
    }
}

export const updateViewQuestion = (question) => {
    return {
        type: types.UPDATE_VIEW_QUESTION,
        question
    }
}

export const voteQuestionRequest = (vote) => {
    return async (dispatch) => {
        //dispatch(voteQuestion(vote));
        let result = await APIs.callAPI("questions/" + vote.questionID +"/votes", "POST", vote);   
        if(result != null) {
                dispatch(voteQuestion(result.data));
        }
    }
}

export const voteQuestion = (vote) => {
    return {
        type: types.VOTE_QUESTION,
        vote
    }
}

export const followQuestionRequest = (questionID, userFollowID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("questions/" + questionID +"/follow", "PATCH", null);   
        if(result != null) {
                dispatch(followQuestion(questionID, userFollowID));
        }
    }
}

export const followQuestion = (questionID, userFollowID) => {
    return {
        type: types.FOLLOW_QUESTION,
        questionID,
        userFollowID
    }
}

export const getQuestionFollowers = (questionID) => {
    return {
        type: types.GET_QUESTION_FOLLOWERS,
        questionID,
    }
}

export const unVoteQuestionRequest = (unvote) => {
    return async (dispatch) => {

        let result = await APIs.callAPI("questions/" + unvote.questionID +"/unvotes", "POST", unvote);   
        if(result != null) {
                dispatch(unVoteQuestion(result.data));
        }
    }
}

export const unVoteQuestion = (unvote) => {
    return {
        type: types.UNVOTE_QUESTION,
        unvote
    }
}

export const checkVoteQuestionRequest = (questionID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("questions/" + questionID +"/isvote_isunvote", "GET", null);   
        console.log(result);
        if(result != null) {
                dispatch(checkVoteQuestion(result.data));
        }
    }
}

export const checkVoteQuestion = (check) => {
    return {
        type: types.CHECK_VOTE_QUESTION,
        check
    }
}

export const deleteQuestionRequest = (questionID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("questions/" + questionID, "DELETE", null);
        console.log(result);
        if(result != null) {
            dispatch(deleteQuestion(questionID));
        }
    }
};

export const deleteQuestion = (questionID) => {
    return {
        type: types.DELETE_QUESTION,
        questionID
    }
};

export const getAllCommentsQuestionRequest = (questionID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("questions/" + questionID + "/comments", "GET");
        console.log(result);
        if(result != null) {
            dispatch(getAllCommentsQuestion(result.data._items));
        }
    }
};

export const getAllCommentsQuestion = (comments) => {
    return {
        type: types.GET_ALL_COMMENTS_QUESTION,
        comments
    }
};

export const addNewCommentQuestionRequest = (comment) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("comments", "POST", comment);
        if(result != null) {
            dispatch(addNewCommentQuestion(result.data));
        }
    }
};

export const addNewCommentQuestion = (comment) => {
    return {
        type: types.ADD_NEW_COMMENT_QUESTION,
        comment
    }
};

export const voteCommentRequest = (vote_comment) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("comments/" + vote_comment.commentID +"/votes", "POST", {questionID: vote_comment.questionID, voteID: vote_comment.voteID});   
        console.log(result);
        if(result != null) {
                dispatch(voteComment(result.data));
        }
    }
}

export const voteComment = (vote_comment) => {
    return {
        type: types.VOTE_COMMENT,
        vote_comment
    }
}

export const unVoteCommentRequest = (unvote_comment) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("comments/" + unvote_comment.commentID +"/unvotes", "POST", {questionID: unvote_comment.questionID, unvoteID: unvote_comment.unvoteID});   
        console.log(result);
        if(result != null) {
                dispatch(unVoteComment(result.data));
        }
    }
}

export const unVoteComment = (unvote_comment) => {
    return {
        type: types.UNVOTE_COMMENT,
        unvote_comment
    }
}

export const checkVoteCommentRequest = (commentID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("comments/" + commentID +"/isvote_isunvote", "GET", null);   
        console.log(result);
        if(result != null) {
                dispatch(checkVoteComment(result.data));
                
        }
    }
}

export const checkVoteComment = (check) => {
    return {
        type: types.CHECK_VOTE_COMMENT,
        check
    }
}

export const addNewReplyCommentRequest = (reply) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("comments/" + reply.commentID + "/replies", "PATCH", reply);
        console.log(result);
        if(result != null) {
            dispatch(addNewReplyComment(result.data));
        }
    }
};

export const addNewReplyComment = (comment) => {
    return {
        type: types.ADD_NEW_REPLY_COMMENT_QUESTION,
        comment
    }
};

export const checkReply = (commentID) => {
    return {
        type: types.CHECK_REPLY,
        commentID
    }
}

export const getAllCategoryRequest = () => {
    return async (dispatch) => {
        let categories = await APIs.callAPI("categories", "GET", null);
        if(categories != null) {
            dispatch(getAllCategories(categories.data._items));
        }
    }

};

export const getAllCategories = (categories) => {
    return {
        type: types.GET_ALL_CATEGORIES,
        categories
    }
};

export const getCategoryQuestionRequest = (categoryID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("categories/" + categoryID, "GET");
            if(result != null) {
                dispatch(getCategoryQuestion(result.data));
            }
    }
}

export const getCategoryQuestion = (category) => {
    return {
        type: types.GET_CATEGORY_QUESTION,
        category
    }
}

export const getAllQuestionsCategoryRequest = (categoryID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("categories/" + categoryID + "/questions", "GET");
        if(result != null) {
            dispatch(getAllQuestions(result.data._items));
            dispatch(getCountQuestionCategory(result.data._items, categoryID));
        }
    }
};

export const getCountQuestionCategory = (questions, categoryID) => {
    return {
        type: types.GET_COUNT_QUESTIONS_CATEGORY,
        questions,
        categoryID
    }
}

export const followCategoryRequest = (categoryID, userFollowID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("categories/" + categoryID +"/follow", "PATCH", null);   
        if(result != null) {
                dispatch(followCategory(categoryID, userFollowID));
        }
    }
}

export const followCategory = (categoryID, userFollowID) => {
    return {
        type: types.FOLLOW_CATEGORY,
        categoryID,
        userFollowID
    }
}



export const getAllTagsRequest = () => {
    return async (dispatch) => {
        let tags = await APIs.callAPI("tags", "GET", null);
        if(tags != null) {
            dispatch(getAllTags(tags.data._items));
        }
    }
}

export const getAllTags = (tags) => {
    return {
        type: types.GET_ALL_TAGS,
        tags
    }
}

export const addNewTagsRequest = (tags) => {
    return async (dispatch) => {
        for (let i = 0 ; i < tags.length ;i++) {
            let newTag = await APIs.callAPI("tags", "POST", tags[i]);
            if(newTag != null) {
                dispatch(addNewTag(tags[i]));
            }
        }
    }
}

export const addNewTag = (tag) => {
    return {
        type: types.ADD_NEW_TAGS,
        tag
    }
}

export const getAllQuestionsTagRequest = (tagID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("tags/" + tagID +"/questions", "GET");
        console.log(result);
        if(result != null) {
            dispatch(getAllQuestions(result.data._items));
            dispatch(getCountQuestionTag(result.data._items, tagID));
        }
    }
};

export const getCountQuestionTag = (questions, tagID) => {
    return {
        type: types.GET_COUNT_QUESTIONS_TAG,
        questions,
        tagID
    }
}

export const getAllQuestionsSearchRequest = (keyword) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("search?search=" + keyword, "GET");
        console.log(result);
        if(result != null) {
            dispatch(getAllQuestions(result.data._items));
        }
    }
};

export const createUserRequest = (user) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("signup", "POST", user);
            if(result != null) {
                dispatch(createUser(result.data));
            }
    }
}

export const createUser = (result) => {
    return {
        type: types.CREATE_USER,
        result
    }
}

export const checkUserRequest = (user) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("signin", "POST", user);
            if(result != null) {
                dispatch(checkUser(result.data));
            }
    }
}

export const checkUser = (result) => {
    return {
        type: types.SIGN_IN,
        result
    }
}

export const logoutUser = () => {
    return {
        type: types.LOG_OUT
    }
}

export const getUserRequest = (userID) => {
    return async (dispatch) => {
        if(userID) {
            let result = await APIs.callAPI("users/" + userID, "GET");
            if(result != null) {
                dispatch(getUser(result.data));
            }
        }

    }
}

export const getUser = (user) => {
    return {
        type: types.GET_USER,
        user
    }
}

export const getUserOtherRequest = (userID) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("users/" + userID, "GET");
            if(result != null) {
                dispatch(getUserOther(result.data));
            }
    }
}

export const getUserOther = (user) => {
    return {
        type: types.GET_USER_OTHER,
        user
    }
}

export const getTopUsersRequest = () => {
    return async (dispatch) => {
        let result = await APIs.callAPI("users/topusers", "GET");
            if(result != null) {
                dispatch(getTopUsers(result.data._items));
            }
    }
}

export const getTopUsers = (users) => {
    return {
        type: types.GET_TOP_USERS,
        users
    }
}

export const getTopTagsRequest = () => {
    return async (dispatch) => {
        let result = await APIs.callAPI("tags/toptags", "GET");
            if(result != null) {
                dispatch(getTopTags(result.data._items));
            }
    }
}

export const getTopTags = (tags) => {
    return {
        type: types.GET_TOP_TAGS,
        tags
    }
}

export const getTopQuestionsRequest = () => {
    return async (dispatch) => {
        let result = await APIs.callAPI("questions/topquestions", "GET");
            if(result != null) {
                dispatch(getTopQuestions(result.data._items));
            }
    }
}

export const getTopQuestions = (questions) => {
    return {
        type: types.GET_TOP_QUESTIONS,
        questions
    }
}

