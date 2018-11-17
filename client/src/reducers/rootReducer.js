import {combineReducers} from 'redux';
import questionReducer from './questionReducer';
import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';

export default combineReducers({
    questionReducer,
    categoryReducer,
    tagReducer
});