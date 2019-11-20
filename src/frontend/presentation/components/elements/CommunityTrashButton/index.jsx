import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as appActions from '@redux/App/AppReducer';
import models from '@network/client_models';
import { ClientError } from '@extension/Error';

class CommunityTrashButton extends React.Component {
    static propTypes = {
        repository: PropTypes.object,
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityTrashButton');
    }

    onClick(e) {
        const {
            repository,
            heading_trash,
            answer_trash,
            addError,
            showLogin,
            current_user,
        } = this.props;

        if (!repository) return;

        if (e) e.stopPropagation();

        if (!current_user) showLogin();

        const error = new ClientError({
            error: new Error('require admin'),
            tt_key: 'errors.cannot_trash',
        });

        if (models.CommunityHeading.isInstance(repository)) {
            if (
                current_user.id != repository.VoterId
            ) {
                addError(error);
                return;
            }
            heading_trash(repository);
        } else if (models.CommunityAnswer.isInstance(repository)) {
            if (
                current_user.id != repository.UserId
            ) {
                addError(error);
                return;
            }
            answer_trash(repository);
        }
    }

    render() {
        return (
            <div className="trash-button" onClick={this.onClick}>
                <Icon src="trash" size="2_4x" className="trash-button__icon" />
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const current_user = authActions.getCurrentUser(state);
        return {
            current_user: current_user,
        };
    },

    dispatch => ({
        heading_trash: heading => {
            dispatch(communityHeadingActions.trashHeading({ heading }));
        },
        answer_trash: answer => {
            dispatch(communityAnswerActions.trashAnswer({ answer }));
        },
        showLogin: () => {
            dispatch(authActions.showLogin());
        },
        addError: error => {
            dispatch(appActions.addError({ error }));
        },
    })
)(CommunityTrashButton);
