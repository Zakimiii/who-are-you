import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import * as userActions from '@redux/User/UserReducer';
import models from '@network/client_models';
import dummy from '@network/dummy';
import Responsible from '@modules/Responsible';
import TwitterBar from '@elements/TwitterBar';

class UserShowHeader extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
        _repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
        _repository: dummy.User,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'UserShowHeader'
        );
    }

    componentWillReceiveProps(nextProps) {}

    render() {
        let { _repository } = this.props;

        if (!_repository) {
            _repository = dummy.User;
        }

        return (
            <div className="user-show-header">
                <div
                    className="user-show-header__background"
                    style={{
                        backgroundImage: `url('${_repository.picture_large}')`,
                    }}
                >
                    <div className="user-show-header__background-filter" />
                </div>
                <div className="user-show-header__foreground">
                    <Responsible
                        className="user-show-header__image"
                        defaultContent={
                            <PictureItem
                                width={120}
                                radius={60}
                                url={_repository.picture_small}
                            />
                        }
                        breakingContent={
                            <PictureItem
                                width={80}
                                radius={40}
                                url={_repository.picture_small}
                            />
                        }
                        breakFm={true}
                    />
                    <div className="user-show-header__name">
                        {_repository.nickname}
                    </div>
                    <div className="user-show-header__detail">
                        {_repository.detail}
                    </div>
                    <div className="user-show-header__bar">
                        <TwitterBar repository={_repository} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            _repository: userActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(UserShowHeader);
