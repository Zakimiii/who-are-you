import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import HeadingItem from '@modules/HeadingItem';
import CommunityHeadingItem from '@modules/CommunityHeadingItem';
import AppPropTypes from '@extension/AppPropTypes';
import models from '@network/client_models';

class ConditionalHeadingItem extends React.Component {
    static propTypes = {
        repository: PropTypes.object,
    };

    static defaultProps = {
        repository: null,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'ConditionalHeadingItem')
    }

    render() {
        const { repository } = this.props;

        const renderItem = item => {
            if (!item) return <div />;
            switch (true) {
                case models.Heading.isInstance(item):
                    return <HeadingItem repository={repository} />;
                case models.CommunityHeading.isInstance(item):
                    return <CommunityHeadingItem repository={repository} />;
                default:
                    return <div />;
            }
        };

        return <div className="conditional-heading-item">{renderItem(repository)}</div>;
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(ConditionalHeadingItem);
