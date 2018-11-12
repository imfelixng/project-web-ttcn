import * as types from '../constants/index';
import * as actions from '../actions/index'

let initialState = {
    questions: []
};

const question = (state = initialState, action) => {

    switch(action.type) {
        case types.GET_ALL_QUETIONS:
            return {
                ...state,
                questions: action.questions
            };
        case types.ADD_NEW_QUESTION:
            let {questions} = state;
            return {
                ...state,
                questions: [action.questionItem, ...questions]
            }
        default:
            return state;
    }

}

export default question;