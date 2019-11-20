import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
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
import { communityShowRoute, userShowRoute, homeRoute } from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import StatsBar from '@modules/StatsBar';

class CommunityAnswerShowHeader extends React.Component {
    static propTypes = {
        repository: AppPropTypes.CommunityAnswer,
        _repository: AppPropTypes.CommunityAnswer,
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
            'CommunityAnswerShowHeader'
        );
    }

    render() {
        const { _repository } = this.props;

        if (!_repository || !_repository.Heading) return <div />;

        if (!_repository.User) {
            _repository.User = dummy.User;
        }

        return (
            <div
                className="answer-show-header"
                style={{
                    backgroundImage: "url('/images/brands/eye-catch-back.png')",
                }}
            >
                <Link
                    className="answer-show-header__user"
                    to={
                        _repository.Heading.Community.id == dummy.Community.id
                            ? null
                            : communityShowRoute.getPath({
                                  params: {
                                      id:
                                          _repository.Heading.Community.id,
                                  },
                              })
                    }
                >
                    <div className="answer-show-header__user-image">
                        <PictureItem
                            url={_repository.Heading.Community.picture}
                            width={32}
                            redius={16}
                        />
                    </div>
                    <div className="answer-show-header__user-title">
                        {`${_repository.Heading.Community.body}の`}
                    </div>
                </Link>
                <div className="answer-show-header__title">
                    {`「${models.Heading.getBody(_repository.Heading)}」`}
                </div>
                <div className="answer-show-header__border" />
                <div className="answer-show-header__text">
                    {`${_repository.body}`}
                </div>
                <div className="answer-show-header__bar">
                    <StatsBar repository={_repository} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            _repository: communityAnswerActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(CommunityAnswerShowHeader);
