import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Gallery from '@modules/Gallery';
import CommunityItem from '@modules/CommunityItem';
import { isScrollEndByClass } from '@extension/scroll';
import LoadingIndicator from '@elements/LoadingIndicator';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as userActions from '@redux/User/UserReducer';
import * as communityTemplateActions from '@redux/CommunityTemplate/CommunityTemplateReducer';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as appActions from '@redux/App/AppReducer';

class CommunityIndexList extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    state = {
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityIndexList')
    }

    componentWillMount() {
        if (process.env.BROWSER)
            window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    onWindowScroll() {
        const { getMore } = this.props;
        const isEnd = isScrollEndByClass('user-show-list__body__items');
        if (isEnd && getMore) getMore();
    }

    render() {
        const { repositories, loading, current_user } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__community" key={key}>
                    <CommunityItem repository={item}/>
                </div>
            )
        );


        return (
            <div className="template-index-list">
                <div className="user-show-list__body">
                    <div className="user-show-list__body__category">
                        {tt('g.community')}
                    </div>
                    <Gallery className="user-show-list__body__items">
                        {loading ? (
                            <div
                                style={{
                                    marginLeft: '48%',
                                    marginRight: '48%',
                                }}
                            >
                                <LoadingIndicator type={'circle'} />
                            </div>
                        ) : (
                            repositories &&
                            repositories.length > 0 &&
                            renderItems(repositories)
                        )}
                    </Gallery>
                    {/*{loading && (
                        <center>
                            <LoadingIndicator style={{ marginBottom: '2rem' }} />
                        </center>
                    )}*/}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            loading: appActions.communityIndexPageLoading(state),
            repositories: communityActions.getHomeCommunity(state),
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(communityActions.getMoreHome());
        },
    })
)(CommunityIndexList);
