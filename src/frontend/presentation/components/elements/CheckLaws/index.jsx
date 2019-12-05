import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import { termRoute, privacyRoute } from '@infrastructure/RouteInitialize';

class CheckLaws extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CheckLaws');
    }

    render() {
        return (
            <div className="check-laws">
                上記のボタンを押してユーザー登録を進めた場合、<Link
                    className="check-laws__term-value"
                    to={termRoute.path}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {tt('g.terms')}
                </Link>・<Link
                    className="check-laws__term-value"
                    to={privacyRoute.path}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {tt('g.privacy_policy')}
                </Link>に同意したものとみなします
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(CheckLaws);
