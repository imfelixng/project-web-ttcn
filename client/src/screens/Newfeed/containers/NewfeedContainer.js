import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import NewfeedScreen from '../components/NewfeedScreen';

const mapStateToProps = (state) => {
    return{
        questions: state.questionReducer.questions
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getQuestions: () => {
            dispatch(actions.getAllQuestions())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewfeedScreen);