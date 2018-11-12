import * as types from '../constants/index';
import * as actions from '../actions/index'

let initialState = {
    questions: []
};

const question = (state = initialState, action) => {

    switch(action.type) {
        case types.GET_ALL_QUETIONS:
            return state;
        default:
            return state;
    }

}

export default question;