import * as types from '../constants/index';

const initialState = {
    users: [],
    statusCreated: false,
    statusSignIn: false,
    currentUserID: localStorage.getItem('userID') ? localStorage.getItem('userID') : '',
    isLogout: false,
    isSuccess: false,
    errMsg: ''
}

let user = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_USER:
        {
            let {userID} = action.result.data;
            localStorage.setItem("userID", userID);
            return {
                ...state,
                statusCreated: true,
                currentUserID: userID,
                isLogout: false,
                isSuccess: true
            }
        }
            
        case types.SIGN_IN: 
        {
            let {userID} = action.result.data;
            localStorage.setItem("userID", userID);
            return {
                ...state,
                statusSignIn: true,
                currentUserID: userID,
                isLogout: false,
                isSuccess: true
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