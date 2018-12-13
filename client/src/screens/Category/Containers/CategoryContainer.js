import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import CategoryScreen from '../components/CategoryScreen';

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        questions: state.questionReducer.questions,
        countCategoryItem: state.categoryReducer.countCategoryItem,
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);