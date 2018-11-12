import * as types from '../constants/index';
import * as actions from '../actions/index'

let initialState = {
    categories: []
};

const category = (state = initialState, action) => {

    switch(action.type){

        case types.GET_ALL_CATEGORIES: {
            return {
                ...state,
                categories: [...action.categories]
            }
        }

        default:
            return state;
    }

}

export default category;