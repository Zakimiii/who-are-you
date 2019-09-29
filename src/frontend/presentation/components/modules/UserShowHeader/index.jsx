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

class UserShowHeader extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
        _repository: AppPropTypes.User,
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
            'UserShowHeader'
        );
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const { _repository } = this.props;

        return (
            <div className="user-show-header">
                <div className="user-show-header__image">
                    <PictureItem
                        width={120}
                        radius={60}
                        url={_repository.picture_small}
                    />
                </div>
                <div className="user-show-header__name">
                    {_repository.nickname}
                </div>
                <div className="user-show-header__detail">
                    {_repository.detail}
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
