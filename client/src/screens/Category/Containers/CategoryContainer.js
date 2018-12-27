import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import CategoryScreen from '../components/CategoryScreen';

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        questions: state.questionReducer.questions,
        countCategoryItem: state.categoryReducer.countCategoryItem,
        categoryFollowers: state.categoryReducer.categoryFollowers,
        currentUserID: state.userReducer.currentUserID,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCategories: () => {
            return dispatch(actions.getAllCategoryRequest());
        },
        getAllQuestionsCategory: (categoryID) => {
            return dispatch(actions.getAllQuestionsCategoryRequest(categoryID));
        },
        getCountQuestionsCategory: (categoryID) => {
            return dispatch(actions.getAllQuestionsCategoryRequest(categoryID));
        },
        getCategoryFollowers: (categoryID) => {
            return dispatch(actions.getCategoryFollowers(categoryID));
        },
        followCategory: (categoryID, userFollowID) => {
            return dispatch(actions.followCategoryRequest(categoryID, userFollowID));
        },
        unFollowCategory: (categoryID, userFollowID) => {
            return dispatch(actions.unFollowCategoryRequest(categoryID, userFollowID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);