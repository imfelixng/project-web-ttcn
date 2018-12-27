import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import TagScreen from '../components/TagScreen';

const mapStateToProps = (state) => {
    return {
        tags: state.tagReducer.tags,
        countTagItem: state.tagReducer.countTagItem,
        tagFollowers: state.tagReducer.tagFollowers,
        currentUserID: state.userReducer.currentUserID,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTags: () => {
            return dispatch(actions.getAllTagsRequest());
        },
        getCountQuestionsTag: (TagID) => {
            return dispatch(actions.getAllQuestionsTagRequest(TagID));
        },
        getTagFollowers: (tagID) => {
            return dispatch(actions.getTagFollowers(tagID));
        },
        followTag: (tagID, userFollowID) => {
            return dispatch(actions.followTagRequest(tagID, userFollowID));
        },
        unFollowTag: (tagID, userFollowID) => {
            return dispatch(actions.unFollowTagRequest(tagID, userFollowID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagScreen);
