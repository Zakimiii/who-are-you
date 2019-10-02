import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import { Map } from 'immutable';
import Img from 'react-image';
import PictureItem from '@elements/PictureItem';
import models from '@network/client_models';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import AnswerNewButton from '@elements/AnswerNewButton';

class HeadingWantedItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Heading,
        _repository: AppPropTypes.Heading,
    };

    static defaultProps = {
        repository: models.Heading.build(),
        _repository: models.Heading.build(),
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'HeadingWantedItem'
        );
    }

    render() {
        const { _repository } = this.props;

        return (
            <div
                className="heading-wanted-item"
                style={{
                    backgroundImage: "url('/images/brands/eye-catch-back.png')",
                }}
            >
                <div className="heading-wanted-item__user">
                    <div className="heading-wanted-item__user-image">
                        <PictureItem
                            url={_repository.User.picture_small}
                            width={32}
                            redius={16}
                        />
                    </div>
                    <div className="heading-wanted-item__user-title">
                        {`${_repository.User.nickname}さんの`}
                    </div>
                </div>
                <div className="heading-wanted-item__title">
                    {`「${_repository.body}」`}
                </div>
                <div className="heading-wanted-item__border" />
                <div className="heading-wanted-item__text">
                    {`回答募集中です！`}
                </div>
                <div className="heading-wanted-item__button">
                    <AnswerNewButton repository={_repository} />
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

    dispatch => ({})
)(HeadingWantedItem);
