import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import models from '@network/client_models';
import * as categoryActions from '@redux/Category/CategoryReducer';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as appActions from '@redux/App/AppReducer';
import LoadingIndicator from '@elements/LoadingIndicator';
import { isScrollEndByClass } from '@extension/scroll';
import Gallery from '@modules/Gallery';
import CommunityItem from '@modules/CommunityItem';

class CategoryShowList extends React.Component {
    static propTypes = {
        // repository: AppPropTypes.Category,
        // repositories: AppPropTypes.Community,
    };

    static defaultProps = {
        repository: models.Category.build(),
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CategoryShowList'
        );
    }

    componentWillMount() {
        if (process.env.BROWSER)
            window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillReceiveProps(nextProps) {
        const { more_loading, repositories } = this.props;

        this.setState({
            fetched:
                more_loading &&
                !nextProps.more_loading &&
                repositories.length == nextProps.repositories.length,
        });
    }

    onWindowScroll() {
        const { getMore } = this.props;
        const { fetched } = this.state;
        const isEnd = isScrollEndByClass('user-show-list__body__items');
        if (isEnd && getMore && !fetched) getMore();
    }

    render() {
        const {
            repositories,
            loading,
            current_user,
            more_loading,
            repository,
        } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__community" key={key}>
                    <CommunityItem repository={item} />
                </div>
            ));

        return (
            <div className="user-show-list">
                <div className="user-show-list__body">
                    <div className="user-show-list__body__category">
                        {`${tt('g.category')}: ${repository.body || ''}`}
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
                    {more_loading && (
                        <center>
                            <LoadingIndicator
                                style={{ marginBottom: '2rem' }}
                                type={'circle'}
                            />
                        </center>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: categoryActions.getShowCategory(state),
            repositories: categoryActions.getCategoryCommunity(state),
            loading: appActions.categoryShowPageLoading(state),
            contents_loading: appActions.categoryShowContentsLoading(state),
            more_loading: state.app.get('more_loading'),
        };
    },

    dispatch => ({
        getMore: () => {
            dispatch(categoryActions.getMoreCategoryCommunity());
        },
    })
)(CategoryShowList);
