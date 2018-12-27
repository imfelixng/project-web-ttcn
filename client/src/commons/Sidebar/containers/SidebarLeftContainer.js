import {connect} from 'react-redux';
import * as actions from '../../../actions/index';
import SidebarLeft from '../components/SidebarLeft';

const mapStateToProps = (state) => {

    return{
        topUsers: state.userReducer.topUsers,
        topTags: state.tagReducer.topTags
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getTopUsers: () => {
            return dispatch(actions.getTopUsersRequest());
        },
        getTopTags: () => {
            return dispatch(actions.getTopTagsRequest());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);