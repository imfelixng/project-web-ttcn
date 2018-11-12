import {combineReducers} from 'redux';
import questionReducer from './questionReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    questionReducer,
    categoryReducer
});