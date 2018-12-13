import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import TagScreen from '../components/TagScreen';

const mapStateToProps = (state) => {
    return {
        tags: state.tagReducer.tags,
        countTagItem: state.tagReducer.countTagItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTags: () => {
            return dispatch(actions.getAllTagsRequest());
        },
        getCountQuestionsTag: (TagID) => {
            return dispatch(actions.getAllQuestionsTagRequest(TagID));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagScreen);
