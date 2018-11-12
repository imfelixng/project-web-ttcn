import * as types from '../constants/index';

export const getAllQuestionRequest = () => {
    console.log("Goi API");
};

export const getAllQuestions = () => {
    return {
        type: types.GET_ALL_QUETIONS
    }
};


