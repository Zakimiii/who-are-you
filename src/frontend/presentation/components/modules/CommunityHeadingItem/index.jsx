import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import CommunityAnswerNewButton from '@elements/CommunityAnswerNewButton';
import CommunityAnswerItem from '@modules/CommunityAnswerItem';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import dummy from '@network/dummy';
import * as communityActions from '@redux/Community/CommunityReducer';
import CommunityHeadingWantedItem from '@modules/CommunityHeadingWantedItem';
import {
    communityShowRoute,
    communityHeadingShowRoute,
    userShowRoute,
} from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import StatsBar from '@modules/StatsBar';

class CommunityHeadingItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.CommunityHeading,
        _repository: AppPropTypes.CommunityHeading,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityHeadingItem');
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
            communityHeadingShowRoute.getPath({
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

        if (!_repository.Community) {
            _repository.Community = dummy.Community;
        }

        const renderItems = items =>
            items.map((item, key) => (
                <div className="heading-item__item" key={key}>
                    <CommunityAnswerItem repository={item} />
                </div>
            ));

        if (!_repository.Answers || _repository.Answers.length == 0)
            return <CommunityHeadingWantedItem repository={_repository} />;

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
                                _repository.Community.body == dummy.Community.body
                                    ? null
                                    : communityShowRoute.getPath({
                                          params: {
                                              id: _repository.id,
                                          },
                                      })
                            }
                        >
                            <PictureItem
                                url={
                                    _repository.Community &&
                                    _repository.Community.picture
                                }
                                width={32}
                                redius={16}
                                alt={
                                    _repository.Community &&
                                    _repository.Community.body
                                }
                            />
                        </Link>
                        <div className="heading-item__head-title">
                            {`${_repository.Community.body}の`}
                        </div>
                    </div>
                    <div className="heading-item__title">
                        {`「${models.CommunityHeading.getBody(_repository)}」`}
                    </div>
                    <div className="heading-item__border" />
                </div>
                <div className="heading-item__items">
                    {_repository.Answers && renderItems(_repository.Answers)}
                </div>
                {_repository.answer_count > _repository.Answers.length && (
                    <Link
                        className="heading-item__link"
                        to={communityHeadingShowRoute.getPath({
                            params: {
                                id: _repository.id,
                            },
                        })}
                    >
                        {tt('g.show_more')}
                    </Link>
                )}
                <div className="heading-item__button">
                    <CommunityAnswerNewButton repository={_repository} />
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
            _repository: communityHeadingActions.bind(props.repository, state),
        };
    },

    dispatch => ({
        getMore: heading => {
            // dispatch(communityActions.getMoreCommunityHeadingAnswer({ heading }));
        },
    })
)(CommunityHeadingItem);
