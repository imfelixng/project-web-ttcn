import * as types from '../constants/index';

let initialState = {
    tags: [],
    countTagItem: {},
    topTags: [],
    tagFollowers: {}
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

        case types.GET_TOP_TAGS: {
            return {
                ...state,
                topTags: action.tags
            }
        }

        case types.FOLLOW_TAG:
        {
            let {tagID} = action;
            let followers = state.tagFollowers[action.tagID] || [];
            followers.push(action.userFollowID);
            
            return {
                ...state,
                tagFollowers: {
                    ...state.tagFollowers,
                    [tagID]: [...followers]
                }
            }
        }

        case types.UNFOLLOW_TAG:
        {
            let {tagID} = action;
            let followers = state.tagFollowers[action.tagID];
            let newFolowers = followers.filter(follower => {
                return follower !== action.userFollowID
            }) || [];
            
            return {
                ...state,
                tagFollowers: {
                    ...state.tagFollowers,
                    [tagID]: [...newFolowers]
                }
            }
        }

        case types.GET_TAG_FOLLOWERS: {
            let index = state.tags.map(tag => tag.tagID)
            .indexOf(action.tagID);
            let tagFollowers = state.tagFollowers;
            if(index !== -1) {
                tagFollowers[action.tagID] = state.tags[index].userFollows;
            }
            return {
                ...state,
                tagFollowers
            }
        }   

        default:
            return state
    }
}

export default tag;