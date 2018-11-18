import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import TagScreen from '../components/TagScreen';

const mapStateToProps = (state) => {
    return {
        tags: state.tagReducer.tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTags: () => {
            return dispatch(actions.getAllTagsRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagScreen);
