import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import { Map } from 'immutable';
import Img from 'react-image';
import PictureItem from '@elements/PictureItem';
import models from '@network/client_models';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import CommunityAnswerNewButton from '@elements/CommunityAnswerNewButton';
import {
    communityShowRoute,
    headingShowRoute,
    userShowRoute,
} from '@infrastructure/RouteInitialize';
import dummy from '@network/dummy';
import StatsBar from '@modules/StatsBar';

class CommunityHeadingWantedItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.CommunityHeading,
        _repository: AppPropTypes.CommunityHeading,
    };

    static defaultProps = {
        repository: models.CommunityHeading.build(),
        _repository: models.CommunityHeading.build(),
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityHeadingWantedItem'
        );
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

        if (!_repository || !_repository.Community) return <div />;

        return (
            <div
                className="heading-wanted-item"
                style={{
                    backgroundImage: "url('/images/brands/eye-catch-back.png')",
                }}
                onClick={onClick}
            >
                <Link
                    className="heading-wanted-item__user"
                    onClick={e => e.stopPropagation()}
                    to={
                        _repository.Community.body == dummy.Community.body
                            ? null
                            : communityShowRoute.getPath({
                                  params: {
                                      id: _repository.Community.id,
                                  },
                              })
                    }
                >
                    <div className="heading-wanted-item__user-image">
                        <PictureItem
                            url={_repository.Community.picture}
                            width={32}
                            redius={16}
                        />
                    </div>
                    <div className="heading-wanted-item__user-title">
                        {`${_repository.Community.body}の`}
                    </div>
                </Link>
                <div className="heading-wanted-item__title">
                    {`「${models.CommunityHeading.getBody(_repository)}」`}
                </div>
                <div className="heading-wanted-item__border" />
                <div className="heading-wanted-item__text">
                    {`回答募集中です！`}
                </div>
                <div className="heading-wanted-item__button">
                    <CommunityAnswerNewButton repository={_repository} />
                </div>
                <div className="heading-wanted-item__bar">
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

    dispatch => ({})
)(CommunityHeadingWantedItem);
