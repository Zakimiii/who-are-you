import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import dummy from '@network/dummy';
import PictureItem from '@elements/PictureItem';
import data_config from '@constants/data_config';
import { communityShowRoute, communityFollowIndexRoute } from '@infrastructure/RouteInitialize';
import Responsible from '@modules/Responsible';
import CommunityItem from '@modules/CommunityItem';

class CommunityViewerItem extends React.Component {

    static propTypes = {
        repository: AppPropTypes.Community,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityViewerItem')
    }

    render() {
        const {
            repository,
        } = this.props;

        if (!repository) return <div/>;

        return (
            <div
                className="category-viewer-item"
            >
                <CommunityItem repository={repository} />
            </div>
        )
    }
}

export default connect(
    (state, props) => {
        return {
        };
    },

    dispatch => ({
    })
)(CommunityViewerItem);
