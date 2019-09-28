import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import UserShowHeader from '@modules/UserShowHeader';
import HeadingNewButton from '@elements/HeadingNewButton';
import HeadingItem from '@modules/HeadingItem';

class UserShowList extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        username: null,
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'UserShowList'
        );
    }

    render() {
        const { repository } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__item" key={key}>
                    <HeadingItem />
                </div>
            ));

        return (
            <div className="user-show-list">
                <div className="user-show-list__header">
                    <UserShowHeader />
                </div>
                <div className="user-show-list__body">
                    <div className="user-show-list__body__heading-new">
                        <HeadingNewButton repository={repository} />
                    </div>
                    <div className="user-show-list__body__category">
                        {'佐藤健さんの紹介カード'}
                    </div>
                    <div className="user-show-list__body__items">
                        <div className="user-show-list__body__item">
                            <HeadingItem />
                        </div>
                        <div className="user-show-list__body__item">
                            <HeadingItem />
                        </div>
                        <div className="user-show-list__body__item">
                            <HeadingItem />
                        </div>
                        <div className="user-show-list__body__item">
                            <HeadingItem />
                        </div>
                        <div className="user-show-list__body__item">
                            <HeadingItem />
                        </div>
                        <div className="user-show-list__body__item">
                            <HeadingItem />
                        </div>
                    </div>
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
)(UserShowList);
