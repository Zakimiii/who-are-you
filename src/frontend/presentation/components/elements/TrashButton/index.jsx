import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import models from '@network/client_model';

class TrashButton extends React.Component {
    static propTypes = {
        repository: PropTypes.oneOf([
            AppPropTypes.Heading,
            AppPropTypes.Answer,
        ]),
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TrashButton');
    }

    onClick(e) {
        const { repository, heading_trash, answer_trash } = this.props;

        if (!repository) return;

        if (models.Heading.isInstance(repository)) {
            heading_trash(repository);
        } else if (models.Answer.isInstance(repository)) {
            answer_trash(repository);
        }
    }

    render() {
        return (
            <div className="trash-button" onClick={this.onClick}>
                <Icon src="share" size="2_4x" />
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({
        heading_trash: heading => {
            dispatch(headingActions.trash({ heading }));
        },
        answer_trash: answer => {
            dispatch(answerActions.trash({ answer }));
        },
    })
)(TrashButton);
