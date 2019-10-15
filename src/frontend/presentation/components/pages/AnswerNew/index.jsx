/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import CloseButton from '@elements/CloseButton';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import AnswerNewList from '@cards/AnswerNewList';
import { answerNewRoute } from '@infrastructure/RouteInitialize';
import Responsible from '@modules/Responsible';
import IconButton from '@elements/IconButton';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';

class AnswerNew extends React.Component {
    static propTypes = {
        onCancel: PropTypes.func,
    };

    static defaultProps = {};

    static pushURLState(title, id) {
        if (window)
            window.history.pushState(
                {},
                title,
                answerNewRoute.getPath({
                    params: {
                        id,
                    },
                })
            );
    }

    static state = {
        beforePathname: '/',
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'AnswerNew');
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        this.setState({
            beforePathname:
                !answerNewRoute.isValidPath(
                    browserHistory.getCurrentLocation().pathname
                ) && browserHistory.getCurrentLocation().pathname,
        });
    }

    componentDidMount() {
        const { repository } = this.props;
        if (!!repository && !!repository.HeadingId)
            AnswerNew.pushURLState('', repository.HeadingId);
        if (process.env.BROWSER)
            window.addEventListener(
                'touchmove',
                e => {
                    e.preventDefault();
                },
                true
            );
    }

    componentWillUnmount() {
        browserHistory.push(this.state.beforePathname);
        if (process.env.BROWSER)
            window.removeEventListener(
                'touchmove',
                e => {
                    e.preventDefault();
                },
                true
            );
    }

    onCancel = e => {
        if (e.preventDefault) e.preventDefault();
        const { onCancel } = this.props;
        if (onCancel) onCancel();
    };

    render() {
        const { onCancel } = this.props;

        return (
            <div className="answer-new">
                <div className="answer-new__button">
                    <IconButton onClick={onCancel} src="close" size={'2x'} />
                </div>
                <div className="answer-new__items">
                    <AnswerNewList />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: answerActions.getNewAnswer(state),
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({})
)(AnswerNew);
