import * as types from '../constants/index';

let initialState = {
    categories: [],
    categoryQuestion: {},
    countCategoryItem: {},
    categoryFollowers: {}
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

        case types.GET_COUNT_QUESTIONS_CATEGORY: {
            let countCategoryItem = {...state.countCategoryItem};
            let categoryID = action.categoryID;
            countCategoryItem[categoryID] = action.questions.length
            return {
                ...state,
                countCategoryItem
            }
        }

        case types.FOLLOW_CATEGORY:
        {
            let {categoryID} = action;
            let followers = state.categoryFollowers[action.categoryID] || [];
            followers.push(action.userFollowID);
            
            return {
                ...state,
                categoryFollowers: {
                    ...state.categoryFollowers,
                    [categoryID]: [...followers]
                }
            }
        }

        case types.UNFOLLOW_CATEGORY:
        {
            let {categoryID} = action;
            let followers = state.categoryFollowers[action.categoryID];
            let newFolowers = followers.filter(follower => {
                return follower !== action.userFollowID
            }) || [];
            
            return {
                ...state,
                categoryFollowers: {
                    ...state.categoryFollowers,
                    [categoryID]: [...newFolowers]
                }
            }
        }

        case types.GET_CATEGORY_FOLLOWERS: {
            let index = state.categories.map(category => category.categoryID)
            .indexOf(action.categoryID);
            let categoryFollowers = state.categoryFollowers;
            if(index !== -1) {
                categoryFollowers[action.categoryID] = state.categories[index].userFollows;
            }
            return {
                ...state,
                categoryFollowers
            }
        }        

        default:
            return state;
    }

}

export default category;