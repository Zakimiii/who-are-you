import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Reveal from '@elements/Reveal';
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';
import tt from 'counterpart';
import * as appActions from '@redux/App/AppReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import LoginModal from '@pages/LoginModal';
import AnswerNew from '@pages/AnswerNew';
import HeadingNew from '@pages/HeadingNew';

class Modals extends React.Component {
    static defaultProps = {
        className: '',
        show_login_modal: false,
        show_new_heading_modal: false,
        show_new_answer_modal: false,
    };

    static propTypes = {
        className: PropTypes.string,
        show_login_modal: PropTypes.bool,
        show_new_heading_modal: PropTypes.bool,
        show_new_answer_modal: PropTypes.bool,
        hideLogin: PropTypes.func.isRequired,
        hideNewHeading: PropTypes.func.isRequired,
        hideNewAnswer: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Modals');
    }

    render() {
        const {
            nightmodeEnabled,
            hideLogin,
            show_login_modal,
            hideNewHeading,
            show_new_heading_modal,
            hideNewAnswer,
            show_new_answer_modal,
            className,
        } = this.props;

        const themeClass = nightmodeEnabled ? ' theme-dark' : ' theme-original';

        return (
            <div className={className}>
                {show_login_modal && (
                    <Reveal onHide={hideLogin} show={show_login_modal}>
                        <LoginModal onCancel={hideLogin} />
                    </Reveal>
                )}
                {show_new_heading_modal && (
                    <Reveal
                        onHide={hideNewHeading}
                        show={show_new_heading_modal}
                    >
                        <HeadingNew onCancel={hideNewHeading} />
                    </Reveal>
                )}
                {show_new_answer_modal && (
                    <Reveal onHide={hideNewAnswer} show={show_new_answer_modal}>
                        <AnswerNew onCancel={hideNewAnswer} />
                    </Reveal>
                )}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            nightmodeEnabled: state.app.getIn([
                'user_preferences',
                'nightmode',
            ]),
            show_login_modal: state.auth.get('show_login_modal'),
            show_new_heading_modal: state.heading.get('show_new_modal'),
            show_new_answer_modal: state.answer.get('show_new_modal'),
        };
    },
    dispatch => ({
        hideNewHeading: e => {
            if (e) e.preventDefault();
            dispatch(headingActions.hideNew());
        },
        hideNewAnswer: e => {
            if (e) e.preventDefault();
            dispatch(answerActions.hideNew());
        },
        hideLogin: e => {
            if (e) e.preventDefault();
            dispatch(authActions.hideLogin());
        },
    })
)(Modals);
