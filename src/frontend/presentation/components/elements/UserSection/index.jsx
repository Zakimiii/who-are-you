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

class UserSection extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
        image_width: PropTypes.number,
        image_height: PropTypes.number,
    };

    static defaultProps = {
        repository: null,
        image_width: 44,
        image_height: 44,
    };

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'UserSection');
    }

    render() {
        let { repository, image_width, image_height } = this.props;

        if (!repository) {
            repository = dummy.User;
        }

        return (
            <Link
                className="user-section"
                to={
                    repository.username == dummy.User.username
                        ? null
                        : userShowRoute.getPath({
                              params: {
                                  username: repository.username,
                              },
                          })
                }
            >
                <div className="user-section__image">
                    <PictureItem
                        width={image_width}
                        redius={image_width / 2}
                        url={repository && repository.picture_small}
                        alt={repository && repository.nickname}
                    />
                </div>
                <div className="user-section__title">
                    {repository && repository.nickname}
                </div>
            </Link>
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
