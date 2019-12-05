/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import CloseButton from '@elements/CloseButton';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import CommunityHeadingNewList from '@cards/CommunityHeadingNewList';
import { communityHeadingNewRoute } from '@infrastructure/RouteInitialize';
import Responsible from '@modules/Responsible';
import IconButton from '@elements/IconButton';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';

class CommunityHeadingNew extends React.Component {
    static propTypes = {
        onCancel: PropTypes.func,
    };

    static defaultProps = {};

    static pushURLState(title, id) {
        if (window)
            window.history.pushState(
                {},
                title,
                communityHeadingNewRoute.getPath({
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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'HeadingNew');
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        this.setState({
            beforePathname:
                !communityHeadingNewRoute.isValidPath(
                    browserHistory.getCurrentLocation().pathname
                ) && browserHistory.getCurrentLocation().pathname,
        });
    }

    componentDidMount() {
        const { repository } = this.props;
        if (!!repository && !!repository.CommunityId)
            CommunityHeadingNew.pushURLState('', repository.CommunityId);
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
            <div className="heading-new">
                <div className="heading-new__button">
                    <IconButton onClick={onCancel} src="close" size={'2x'} />
                </div>
                <div className="heading-new__items">
                    <CommunityHeadingNewList />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: communityHeadingActions.getNewHeading(state),
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({})
)(CommunityHeadingNew);
