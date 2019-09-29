import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
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
    }

    render() {
        const { _repository } = this.props;

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

        return (
            <div className="heading-item">
                <div className="heading-item__head">
                    <div className="heading-item__head-image">
                        <PictureItem
                            url={
                                _repository.User &&
                                _repository.User.picture_small
                            }
                            width={32}
                            redius={16}
                            alt={_repository.User && _repository.User.nickname}
                        />
                    </div>
                    <div className="heading-item__head-title">
                        {_repository.body}
                    </div>
                </div>
                <div className="heading-item__border" />
                <div className="heading-item__items">
                    {_repository.Answers && renderItems(_repository.Answers)}
                </div>
                <Link
                    className="heading-item__link"
                    onClick={this.onClickLoadMore}
                >
                    {tt('g.show_more')}
                </Link>
                <div className="heading-item__button">
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
)(HeadingItem);
