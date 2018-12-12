import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import CategoryItemScreen from '../components/CategoryItemScreen';

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCategories: () => {
            return dispatch(actions.getAllCategoryRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemScreen);