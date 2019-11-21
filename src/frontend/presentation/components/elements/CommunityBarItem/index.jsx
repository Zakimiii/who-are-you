import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import { communityShowRoute } from '@infrastructure/RouteInitialize';
import data_config from '@constants/data_config';

class CommunityBarItem extends React.Component {

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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityBarItem')
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const {
            repository
        } = this.props;

        return (
            <Link className="community-bar-item" to={communityShowRoute.getPath({ params: { id: repository.id }})} >
                <PictureItem
                    url={repository.picture}
                    className="community-bar-item__image"
                    width={24}
                    radius={12}
                    rollback_url={data_config.default_community_image}
                />
                <div className="community-bar-item__value" >
                    {repository.body}
                </div>
            </Link>
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
)(CommunityBarItem);
