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
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import dummy from '@network/dummy';
import data_config from '@constants/data_config';
import { userShowRoute, homeRoute } from '@infrastructure/RouteInitialize';

class AnswerShowHeader extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Answer,
        _repository: AppPropTypes.Answer,
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
            'AnswerShowHeader'
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
                <div className="answer-show-header__user">
                    <div className="answer-show-header__user-image">
                        <PictureItem
                            url={_repository.Heading.User.picture_small}
                            width={64}
                            redius={32}
                        />
                    </div>
                    <div className="answer-show-header__user-title">
                        {`${_repository.Heading.User.nickname}の`}
                    </div>
                </div>
                <div className="answer-show-header__title">
                    {`「${_repository.Heading.body}」`}
                </div>
                <div className="answer-show-header__border" />
                <div className="answer-show-header__text">
                    {`${_repository.body}`}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            _repository: answerActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(AnswerShowHeader);
