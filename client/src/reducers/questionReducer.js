import * as types from '../constants/index';
import * as actions from '../actions/index'

let initialState = {
    questions: []
};

const question = (state = initialState, action) => {

    switch(action.type) {
        case types.GET_ALL_QUETIONS:
            return state;
        case types.ADD_NEW_QUESTION:
            console.log(action.questionItem);
            return {
                ...state,
                questions: [action.questionItem, ...state.questions]
            }
        default:
            return state;
    }

}

export default question;