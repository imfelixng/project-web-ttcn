import * as types from '../constants/index';
import * as APIs from '../api/callAPI';

export const getAllQuestionRequest = () => {
    return async (dispatch) => {
        let questions = await APIs.callQuestionAPI("questions", "GET", null);
        if(questions != null) {
            dispatch(getAllQuestions(questions.data));
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
        let questions = await APIs.callQuestionAPI("questions", "POST", questionItem);
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


