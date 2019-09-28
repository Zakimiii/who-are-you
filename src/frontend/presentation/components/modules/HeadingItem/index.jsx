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

class HeadingItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Heading,
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
        const { repository } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="heading-item__item" key={key}>
                    <AnswerItem />
                </div>
            ));

        return (
            <div className="heading-item">
                <div className="heading-item__head">
                    <div className="heading-item__head-image">
                        <PictureItem
                            url={'/icons/noimage.svg'}
                            width={32}
                            redius={16}
                        />
                    </div>
                    <div className="heading-item__head-title">
                        {'佐藤健さんのチャームポイント'}
                    </div>
                </div>
                <div className="heading-item__border" />
                <div className="heading-item__items">
                    <div className="heading-item__item">
                        <AnswerItem />
                    </div>
                    <div className="heading-item__item">
                        <AnswerItem />
                    </div>
                    <div className="heading-item__item">
                        <AnswerItem />
                    </div>
                </div>
                <Link
                    className="heading-item__link"
                    onClick={this.onClickLoadMore}
                >
                    {tt('g.show_more')}
                </Link>
                <div className="heading-item__button">
                    <AnswerNewButton />
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
)(HeadingItem);
