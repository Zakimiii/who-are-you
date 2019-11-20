import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import Icon from '@elements/Icon';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import dummy from '@network/dummy';
import data_config from '@constants/data_config';
import {
    communityAnswerShowRoute,
    communityShowRoute,
    userShowRoute,
    homeRoute,
} from '@infrastructure/RouteInitialize';
import StatsBar from '@modules/StatsBar';

class CommunityAnswerItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.CommunityAnswer,
        _repository: AppPropTypes.CommunityAnswer,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
        isShow: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityAnswerItem');
    }

    onClickUser(e) {
        const { _repository } = this.props;

        if (e) e.stopPropagation();

        const path =
            _repository.Community.id == dummy.Community.id
                ? null
                : communityShowRoute.getPath({
                      params: {
                          id: _repository.Community.id,
                      },
                  });

        if (path) browserHistory.push(path);
    }

    onClick(e) {
        const { _repository } = this.props;
        if (e) e.stopPropagation();
        browserHistory.push(
            communityAnswerShowRoute.getPath({
                params: {
                    id: _repository.id,
                },
            })
        );
    }

    toggleShow(e) {
        if (e) e.stopPropagation();
        const { isShow } = this.state;

        this.setState({ isShow: !isShow });
    }

    render() {
        const { onClickUser, onClick } = this;

        const { _repository } = this.props;

        const { isShow } = this.state;

        if (!_repository) return <div />;

        if (!_repository.Community) {
            _repository.Community = dummy.Community;
        }

        const text =
            isShow &&
            _repository.body.length > data_config.answer_show_text_limit
                ? _repository.body
                : _repository.body.slice(
                      0,
                      data_config.answer_show_text_limit
                  ) +
                  (_repository.body.length > data_config.answer_show_text_limit
                      ? '...'
                      : '');

        return (
            <div className="answer-item" onClick={onClick}>
                <Link className="answer-item__user" onClick={onClickUser}>
                    <div className="answer-item__user-image">
                        <PictureItem
                            width={22}
                            redius={22 / 2}
                            url={
                                _repository.Community &&
                                _repository.Community.picture
                            }
                            alt={_repository.Community && _repository.Community.body}
                        />
                    </div>
                    <div className="answer-item__user-value">
                        {_repository.Community && _repository.Community.body}
                    </div>
                </Link>
                <div className="answer-item__body">{text}</div>
                {_repository.body.length >
                    data_config.answer_show_text_limit && (
                    <div
                        className="answer-item__more"
                        onClick={this.toggleShow}
                    >
                        {isShow ? '少なく表示' : '全て表示'}
                    </div>
                )}
                {/*<div className="answer-item__bar">
                    <StatsBar repository={_repository} />
                </div>*/}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            current_user: authActions.getCurrentUser(state),
            _repository: communityAnswerActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(CommunityAnswerItem);
