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
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import { answerNewRoute } from '@infrastructure/RouteInitialize';
import models from '@network/client_models';

class CommunityAnswerNewButton extends React.Component {
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
            'CommunityAnswerNewButton'
        );
    }

    onClick() {
        const { showNew, repository } = this.props;
        showNew(repository);
    }

    render() {
        return (
            <GradationButton
                src={'plus'}
                value={tt('g.add_answer')}
                onClick={this.onClick}
                stop={true}
            />
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({
        showNew: heading => {
            dispatch(
                communityAnswerActions.setNew({
                    answer: models.CommunityAnswer.build({
                        Heading: heading,
                        HeadingId: heading.id,
                    }),
                })
            );
            dispatch(communityAnswerActions.showNew());
        },
    })
)(CommunityAnswerNewButton);
