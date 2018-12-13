import * as types from '../constants/index';

let initialState = {
    tags: [],
    countTagItem: {}
}

let tag = (state=initialState, action) => {

    switch(action.type) {
        case types.GET_ALL_TAGS: {
            return {
                ...state,
                tags: action.tags
            }
        }
        case types.ADD_NEW_TAGS: {
            return {
                ...state,
                tags: [action.tag, ...state.tags]
            }
        }

        case types.GET_COUNT_QUESTIONS_TAG: {
            let countTagItem = {...state.countTagItem};
            let tagID = action.tagID;
            countTagItem[tagID] = action.questions.length
            return {
                ...state,
                countTagItem
            }
        }

        default:
            return state
    }
}

export default tag;