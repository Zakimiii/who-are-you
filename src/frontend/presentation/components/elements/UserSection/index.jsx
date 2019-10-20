import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import models from '@network/client_models';
import PictureItem from '@elements/PictureItem';
import { browserHistory } from 'react-router';
import { userShowRoute } from '@infrastructure/RouteInitialize';
import tt from 'counterpart';
import Responsible from '@modules/Responsible';
import dummy from '@network/dummy';
import Icon from '@elements/Icon';
import autobind from 'class-autobind';

class UserSection extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
        image_width: PropTypes.number,
        image_height: PropTypes.number,
        title: PropTypes.string,
    };

    static defaultProps = {
        repository: null,
        image_width: 24,
        image_height: 24,
        title: '',
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'UserSection');
    }

    onClick(e) {
        const { repository, image_width, image_height, title } = this.props;

        if (e) e.stopPropagation();

        repository &&
            browserHistory.push(
                userShowRoute.getPath({
                    params: {
                        username: repository.username,
                    },
                })
            );
    }

    render() {
        let { repository, image_width, image_height, title } = this.props;

        if (!repository) {
            repository = dummy.User;
        }

        return (
            <div className="user-section" onClick={this.onClick}>
                <div className="user-section__title">{title}</div>
                <div className="user-section__image">
                    <PictureItem
                        width={image_width}
                        redius={image_width / 2}
                        url={repository && repository.picture_small}
                        alt={repository && repository.nickname}
                    />
                </div>
                <div className="user-section__name">
                    {repository && repository.nickname}
                </div>
                {repository.username != dummy.User.username && (
                    <Link
                        className="user-section__icon"
                        to={
                            repository.username == dummy.User.username
                                ? null
                                : `https://twitter.com/${
                                      repository.twitter_username
                                  }`
                        }
                        target={'_blank'}
                        onClick={e => e.stopPropagation()}
                    >
                        <Icon
                            className="user-section__icon-src"
                            src={'twitter'}
                            size={'3x'}
                        />
                    </Link>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const current_user = authActions.getCurrentUser(state);
        const isMyAccount = userActions.isMyAccount(state, props.repository);
        return {
            current_user,
            isMyAccount,
        };
    },

    dispatch => ({})
)(UserSection);
