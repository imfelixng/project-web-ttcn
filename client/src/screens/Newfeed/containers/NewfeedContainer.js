import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import NewfeedScreen from '../components/NewfeedScreen';

const mapStateToProps = (state) => {

    return{
        questions: state.questionReducer.questions,
        categories: state.categoryReducer.categories
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getQuestions: () => {
            dispatch(actions.getAllQuestionRequest())
        },
        addNewQuestion: (questionItem) => {
            dispatch(actions.addNewQuestionRequest(questionItem));
        },
        getCategories: () => {
            dispatch(actions.getAllCategoryRequest());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewfeedScreen);