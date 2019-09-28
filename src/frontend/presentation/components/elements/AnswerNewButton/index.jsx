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

class AnswerNewButton extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
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
            'AnswerNewButton'
        );
    }

    onClick(e) {
        if (e) e.preventDefault();
    }

    render() {
        return (
            <GradationButton
                src={'plus'}
                value={'回答を追加'}
                onClick={this.onClick}
            />
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(AnswerNewButton);
