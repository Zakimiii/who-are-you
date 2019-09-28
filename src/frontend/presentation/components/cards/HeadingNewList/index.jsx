import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import InputText from '@elements/InputText';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import TextArea from '@elements/TextArea';

class HeadingNewList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'HeadingNewList'
        );
    }

    onChange(e) {
        // const
        // this.setState({  })
    }

    onSubmit(e) {}

    render() {
        const user_section = (
            <div className="heading-new-list__user">
                <div className="heading-new-list__user-image">
                    <PictureItem
                        url={'/icons/noimage.svg'}
                        width={32}
                        redius={16}
                    />
                </div>
                <div className="heading-new-list__user-title">
                    {'佐藤健さんの紹介カードを追加'}
                </div>
            </div>
        );

        const form = (
            <form className="heading-new-list__form">
                <div className="heading-new-list__form-input">
                    <InputText
                        label={'紹介カード'}
                        onChange={this.onChange}
                        placeholder={'佐藤健さんの紹介カードを追加'}
                    />
                </div>
                <div className="heading-new-list__form-submit">
                    <GradationButton
                        submit={true}
                        src={'plus'}
                        value={'紹介カードを追加'}
                        onClick={this.onSubmit}
                    />
                </div>
            </form>
        );

        return (
            <div className="heading-new-list">
                {user_section}
                {form}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(HeadingNewList);
