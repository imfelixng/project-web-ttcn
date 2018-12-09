import * as types from '../constants/index';

let initialState = {
    comments: [],
};

const comment = (state = initialState, action) => {

    switch(action.type){
        case types.ADD_NEW_COMMENT_QUESTION: {
            console.log(action);
            return {
                ...state
            }
        }
        default:
            return state;
    }

}

export default comment;