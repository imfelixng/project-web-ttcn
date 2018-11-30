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
        let questions = await APIs.callAPI("questions", "POST", questionItem);
        if(questions != null) {
            dispatch(addNewQuestion(questionItem));
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
        console.log(questionID);
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

export const createUserRequest = (user) => {
    return async (dispatch) => {
        let result = await APIs.callAPI("signup", "POST", user);
        console.log(result);
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
        let result = await APIs.callAPI("users/" + userID, "GET");
            if(result != null) {
                dispatch(getUser(result.data));
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

