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

class AnswerItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Answer,
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

        const { isShow } = this.state;

        const text = isShow
            ? 'repository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nickname'
            : 'repository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nicknamerepository.nickname';

        // if (!isShow) {

        // }

        return (
            <div className="answer-item">
                <div className="answer-item__user" onClick={onClickUser}>
                    <div className="answer-item__user-image">
                        <PictureItem
                            width={22}
                            redius={22 / 2}
                            url={'/icons/noimage.svg'}
                            alt={'repository && repository.nickname'}
                        />
                    </div>
                    <div className="answer-item__user-value">
                        {'repository.nickname'}
                    </div>
                </div>
                <div className="answer-item__body">{text}</div>
                <div className="answer-item__more" onClick={this.toggleShow}>
                    <Icon
                        className="answer-item__more-raw"
                        src={'more'}
                        size={'2x'}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(AnswerItem);
