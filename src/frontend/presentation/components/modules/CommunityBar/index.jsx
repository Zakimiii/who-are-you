import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import CommunityBarItem from '@elements/CommunityBarItem';
import CategoryBarItem from '@elements/CategoryBarItem';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as categoryActions from '@redux/Category/CategoryReducer';

class CategoryBar extends React.Component {
    static propTypes = {
        repositories: PropTypes.array,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategoryBar');
    }

    render() {
        const { repositories } = this.props;

        if (!repositories) return <div />;

        const renderItem = items =>
            items.map((item, key) => (
                <div className="community-bar__item" key={key}>
                    <div className="community-bar__item-category">
                        <CategoryBarItem repository={item} />
                    </div>
                    <div className="community-bar__item-communities">
                        {item.Communities.map((community, i) => (
                            <div className="community-bar__item-community" key={i}>
                                <CommunityBarItem repository={community} />
                            </div>
                        ))}
                    </div>
                </div>
            )
        );

        return (
            <div className="community-bar">
                <div className="community-bar__category">
                    {tt('g.community')}
                </div>
                <div className="community-bar__items">
                    {renderItem(repositories)}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repositories: categoryActions.getHomeCategory(state),
        };
    },

    dispatch => ({})
)(CategoryBar);
