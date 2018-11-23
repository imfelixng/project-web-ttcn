import * as types from '../constants/index';
import * as actions from '../actions/index'

let initialState = {
    categories: [],
    categoryQuestion: []
};

const category = (state = initialState, action) => {

    switch(action.type){

        case types.GET_ALL_CATEGORIES: {
            return {
                ...state,
                categories: [...action.categories]
            }
        }

        case types.GET_CATEGORY_QUESTION: {

            let {category} = action;
            return {
                ...state,
                categoryQuestion: [...state.categoryQuestion, category]
            }
        }

        default:
            return state;
    }

}

export default category;