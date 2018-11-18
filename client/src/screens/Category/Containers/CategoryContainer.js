import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import CategoryScreen from '../components/CategoryScreen';

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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);