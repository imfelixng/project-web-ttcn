import * as types from '../constants/index';

const initialState = {
    users: [],
    statusCreated: false,
    statusSignIn: false,
    currentUserID: localStorage.getItem('userID') ? localStorage.getItem('userID') : '',
    isLogout: false,
    isSuccess: false,
    errMsgSignIn: '',
    errMsgSignUp: '',
    currentUser: null,
    userOther: {},
    topUsers: []
}

let user = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_USER:
        {
            let {userID, isSuccess,description} = action.result;
            if(isSuccess && userID) {
                localStorage.setItem("userID", userID);
            }
            return {
                ...state,
                statusCreated: isSuccess,
                currentUserID: userID ? userID : '',
                isLogout: false,
                isSuccess: isSuccess,
                errMsgSignUp: description ? description : ''
            }
        }
            
        case types.SIGN_IN: 
        {
            let {userID, isSuccess, description} = action.result;
            if(isSuccess && userID) {
                localStorage.setItem("userID", userID);
            }

            return {
                ...state,
                statusSignIn: isSuccess,
                currentUserID: userID ? userID : '',
                isLogout: false,
                isSuccess: isSuccess,
                errMsgSignIn: description ? description : ''
            }
        }
        
        case types.GET_USER: 
        {
            let {user} = action;
            return {
                ...state,
                currentUser: user
            }
        }

        case types.GET_USER_PROFILE: 
        {
            let {user} = action;
            return {
                ...state,
                userItem: user
            }
        }

        case types.GET_USER_OTHER: 
        {
            let {user} = action;
            let newUsers = {
                ...state.userOther
            }

            newUsers[user.userID] = user;

            return {
                ...state,
                userOther: newUsers
            }
        }

        case types.GET_TOP_USERS:
        {
            return {
                ...state,
                topUsers: action.users
            }
        }

        case types.LOG_OUT:
        {
            localStorage.removeItem("userID");
            return {
                ...state,
                currentUserID: '',
                isLogout: true,
                statusCreated: false,
                isSuccess: false
            }
        }
        default:
            return state;
    }
}

export default user;