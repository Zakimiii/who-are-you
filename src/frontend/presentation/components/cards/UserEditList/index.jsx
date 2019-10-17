import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as userActions from '@redux/User/UserReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import GradationButton from '@elements/GradationButton';
import { SETTING_MENU } from '@entity';
import SettingMenuItem from '@elements/SettingMenuItem';
import oauth from '@network/oauth';

class UserEditList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'UserEditList'
        );
    }

    onClickLogout(e) {
        const { logout } = this.props;

        if (!!logout) logout();
    }

    onClickSettingMenu(e, item) {
        if (e) e.prevendDefault();
        if (item == SETTING_MENU.Logout) {
            oauth.removeAccessToken(localStorage);
            this.props.logout();
            return;
        }
        // if (item == SETTING_MENU.Delete)
        //     this.props.showConfirmLoginForDeleteModal();
    }

    render() {
        const { current_user } = this.props;

        const { onClickSettingMenu } = this;

        if (!current_user) return <div />;

        const renderItem = SETTING_MENU._enums.map((item, index) => (
            <div className="user-edit-list__setting-menu" key={index}>
                <SettingMenuItem
                    title={item.value()}
                    url={item.url}
                    onClick={e => onClickSettingMenu(e, item)}
                />
            </div>
        ));

        return (
            <div className="user-edit-list">
                <div className="user-edit-list__category">
                    {tt('g.setting')}
                </div>
                <div className="user-edit-list__setting-menus">
                    {renderItem}
                </div>
            </div>
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
        logout: () => dispatch(authActions.logout()),
    })
)(UserEditList);
