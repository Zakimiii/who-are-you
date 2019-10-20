import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';

class TwitterBar extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TwitterBar');
    }

    render() {
        const { repository } = this.props;

        if (!repository) return <div />;

        return (
            <Link
                className="twitter-bar"
                to={`https://twitter.com/${repository.twitter_username}`}
                target={'_blank'}
            >
                <Icon
                    className="twitter-bar__image"
                    src={'twitter'}
                    size={'2x'}
                />
                <div className="twitter-bar__text">{tt('g.go_twitter')}</div>
            </Link>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(TwitterBar);
