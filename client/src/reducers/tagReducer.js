import * as types from '../constants/index';

let initialState = {
    tags: []
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
        default:
            return state
    }
}

export default tag;