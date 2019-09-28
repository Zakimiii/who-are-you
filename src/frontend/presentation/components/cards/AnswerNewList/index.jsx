import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import TextArea from '@elements/TextArea';

class AnswerNewList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AnswerNewList'
        );
    }

    onChange(e) {
        // const
        // this.setState({  })
    }

    onSubmit(e) {}

    render() {
        const user_section = (
            <div className="answer-new-list__user">
                <div className="answer-new-list__user-image">
                    <PictureItem
                        url={'/icons/noimage.svg'}
                        width={32}
                        redius={16}
                    />
                </div>
                <div className="answer-new-list__user-title">
                    {'佐藤健さんの「チャームポイント」とは...?'}
                </div>
            </div>
        );

        const form = (
            <form className="answer-new-list__form">
                <div className="answer-new-list__form-input">
                    <TextArea
                        label={'回答'}
                        onChange={this.onChange}
                        placeholder={'佐藤健さんの「チャームポイント」を記入'}
                    />
                </div>
                <div className="answer-new-list__form-submit">
                    <GradationButton
                        submit={true}
                        src={'plus'}
                        value={'回答を追加'}
                        onClick={this.onSubmit}
                    />
                </div>
            </form>
        );
        return (
            <div className="answer-new-list">
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
)(AnswerNewList);
