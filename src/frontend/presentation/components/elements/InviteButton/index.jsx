import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import * as answerActions from '@redux/Answer/AnswerReducer';
import { answerNewRoute } from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import TwitterHandler from '@network/twitter';

class InviteButton extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Heading,
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'InviteButton'
        );
    }

    render() {
        const { repository } = this.props;

        if (!repository || !repository.id) return <div />;

        return (
            <GradationButton
                src={'plus'}
                value={tt('g.invite')}
                url={TwitterHandler.getInviteUrl({
                    id: repository.twitter_username,
                })}
                button_target={'_blank'}
                isLink={true}
            />
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(InviteButton);
