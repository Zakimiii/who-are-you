import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import classNames from 'classnames';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as notificationActions from '@redux/Notification/NotificationReducer';

class NotificationItem extends React.Component {
    static propTypes = {
        repository: PropTypes.object,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
        isChecked: true,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'NotificationItem'
        );
    }

    componentWillMount() {
        this.setState({
            isChecked: Number.prototype.castBool(
                this.props.repository.isChecked
            ),
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         isChecked: Number.prototype.castBool(nextProps.isChecked),
    //     });
    // }

    onClick(e) {
        const { check, current_user, repository } = this.props;

        const { isChecked } = this.state;

        if (!current_user) {
            return;
        }

        check(repository);

        this.setState({
            isChecked: true,
        });
    }

    render() {
        const { repository } = this.props;

        const { isChecked } = this.state;

        if (!repository) return <div />;

        return (
            <Link
                className={classNames('notification-item', {
                    uncheck: !isChecked,
                })}
                to={repository.url}
                onClick={this.onClick}
            >
                <div className="notification-item__text">
                    {tt(`notifications.${repository.template}.title`)}
                </div>
                <Icon
                    className="notification-item__icon"
                    src={'chevron-next'}
                    size={'2x'}
                />
            </Link>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({
        check: notification =>
            dispatch(notificationActions.checkNotification({ notification })),
    })
)(NotificationItem);
