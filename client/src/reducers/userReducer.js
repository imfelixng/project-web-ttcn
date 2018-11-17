import * as types from '../constants/index';

const initialState = {
    users: [],
    statusCreated: false,
    statusSignIn: false
}

let user = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_USER:
            let {userID} = action.result.data;
            localStorage.setItem("userID", userID);
            return {
                ...state,
                statusCreated: !state.statusCreated
            }
        default:
            return state;
    }
}

export default user;