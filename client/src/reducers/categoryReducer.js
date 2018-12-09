import * as types from '../constants/index';

let initialState = {
    categories: [],
    categoryQuestion: {}
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

            let newCategories = {
                ...state.categoryQuestion
            }
            newCategories[category.categoryID] = category;
            return {
                ...state,
                categoryQuestion: newCategories
            }
        }

        default:
            return state;
    }

}

export default category;