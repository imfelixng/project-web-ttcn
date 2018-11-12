import * as types from '../constants/index';

export const getAllQuestionRequest = () => {
    console.log("Goi API");
};

export const getAllQuestions = () => {
    return {
        type: types.GET_ALL_QUETIONS
    }
};

export const addNewQuestionRequest = () => {
    console.log("Goi API");
};

export const addNewQuestion = (questionItem) => {
    return {
        type: types.ADD_NEW_QUESTION,
        questionItem
    }
};


