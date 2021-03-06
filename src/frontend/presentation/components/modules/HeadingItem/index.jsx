import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import AnswerNewButton from '@elements/AnswerNewButton';
import AnswerItem from '@modules/AnswerItem';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import dummy from '@network/dummy';
import * as userActions from '@redux/User/UserReducer';
import HeadingWantedItem from '@modules/HeadingWantedItem';
import {
    headingShowRoute,
    userShowRoute,
} from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import StatsBar from '@modules/StatsBar';

class HeadingItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Heading,
        _repository: AppPropTypes.Heading,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'HeadingItem');
    }

    onClickLoadMore(e) {
        if (e) e.preventDefault();
        const { getMore, _repository } = this.props;
        getMore(_repository);
    }

    onClick(e) {
        const { _repository } = this.props;
        if (e) e.preventDefault();
        browserHistory.push(
            headingShowRoute.getPath({
                params: {
                    id: _repository.id,
                },
            })
        );
    }

    render() {
        const { _repository } = this.props;

        const { onClick } = this;

        if (!_repository) return <div />;

        if (!_repository.User) {
            _repository.User = dummy.User;
        }

        const renderItems = items =>
            items.map((item, key) => (
                <div className="heading-item__item" key={key}>
                    <AnswerItem repository={item} />
                </div>
            ));

        if (!_repository.Answers || _repository.Answers.length == 0)
            return <HeadingWantedItem repository={_repository} />;

        return (
            <div className="heading-item" onClick={onClick}>
                <div
                    className="heading-item__container"
                    style={{
                        backgroundImage:
                            "url('/images/brands/eye-catch-back.png')",
                    }}
                >
                    <div className="heading-item__head">
                        <Link
                            className="heading-item__head-image"
                            onClick={e => e.stopPropagation()}
                            to={
                                _repository.User.username == dummy.User.username
                                    ? null
                                    : userShowRoute.getPath({
                                          params: {
                                              username:
                                                  _repository.User.username,
                                          },
                                      })
                            }
                        >
                            <PictureItem
                                url={
                                    _repository.User &&
                                    _repository.User.picture_small
                                }
                                width={32}
                                redius={16}
                                alt={
                                    _repository.User &&
                                    _repository.User.nickname
                                }
                            />
                        </Link>
                        <div className="heading-item__head-title">
                            {`${_repository.User.nickname}さんの`}
                        </div>
                    </div>
                    <div className="heading-item__title">
                        {`「${models.Heading.getBody(_repository)}」`}
                    </div>
                    <div className="heading-item__border" />
                </div>
                <div className="heading-item__items">
                    {_repository.Answers && renderItems(_repository.Answers)}
                </div>
                {_repository.answer_count > _repository.Answers.length && (
                    <Link
                        className="heading-item__link"
                        to={headingShowRoute.getPath({
                            params: {
                                id: _repository.id,
                            },
                        })}
                    >
                        {tt('g.show_more')}
                    </Link>
                )}
                <div className="heading-item__button">
                    <AnswerNewButton repository={_repository} />
                </div>
                <div className="heading-item__bar">
                    <StatsBar repository={_repository} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            current_user: authActions.getCurrentUser(state),
            _repository: headingActions.bind(props.repository, state),
        };
    },

    dispatch => ({
        getMore: heading => {
            dispatch(userActions.getMoreUserHeadingAnswer({ heading }));
        },
    })
)(HeadingItem);
