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

class AnswerItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Answer,
        _repository: AppPropTypes.Answer,
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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'AnswerItem');
    }

    onClickUser(e) {
        if (e) e.preventDefault();
    }

    toggleShow(e) {
        if (e) e.stopPropagation();
        const { isShow } = this.state;

        this.setState({ isShow: !isShow });
    }

    render() {
        const { onClickUser } = this;

        const { _repository } = this.props;

        const { isShow } = this.state;

        if (!_repository) return <div />;

        const text =
            isShow && _repository.body.length > 50
                ? _repository.body.slice(0, 50) + '...'
                : _repository.body;

        return (
            <div className="answer-item">
                <div className="answer-item__user" onClick={onClickUser}>
                    <div className="answer-item__user-image">
                        <PictureItem
                            width={22}
                            redius={22 / 2}
                            url={
                                _repository.User &&
                                _repository.User.picture_small
                            }
                            alt={_repository.User && _repository.User.nickname}
                        />
                    </div>
                    <div className="answer-item__user-value">
                        {_repository.User && _repository.User.nickname}
                    </div>
                </div>
                <div className="answer-item__body">{text}</div>
                {_repository.body.length > 50 && (
                    <div
                        className="answer-item__more"
                        onClick={this.toggleShow}
                    >
                        <Icon
                            className="answer-item__more-raw"
                            src={'more'}
                            size={'2x'}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            current_user: authActions.getCurrentUser(state),
            _repository: answerActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(AnswerItem);
