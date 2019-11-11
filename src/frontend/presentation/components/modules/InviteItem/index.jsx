import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import models from '@network/client_models';
import InviteButton from '@elements/InviteButton';

class InviteItem extends React.Component {
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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'InviteItem');
    }

    render() {
        const { repository } = this.props;

        return (
            <div className="invite-item">
                <div className="invite-item__title">{tt('g.invite_title')}</div>
                <div className="invite-item__text">{tt('g.invite_text')}</div>
                <div className="invite-item__button">
                    <InviteButton repository={repository} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(InviteItem);
