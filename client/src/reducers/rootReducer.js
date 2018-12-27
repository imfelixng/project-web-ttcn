import {combineReducers} from 'redux';
import questionReducer from './questionReducer';
import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';

export default combineReducers({
    questionReducer,
    categoryReducer,
    tagReducer,
    userReducer,
    commentReducer,
});