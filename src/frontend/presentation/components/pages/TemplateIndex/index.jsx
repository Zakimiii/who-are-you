import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as appActions from '@redux/App/AppReducer';
import IndexComponent from '@pages/IndexComponent';
import TemplateIndexList from '@cards/TemplateIndexList';

class TemplateIndex extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'TemplateIndex'
        );
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <IndexComponent>
                <TemplateIndexList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/templates',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {
                addSuccess: success =>
                    dispatch(
                        appActions.addSuccess({
                            success,
                        })
                    ),
            };
        }
    )(TemplateIndex),
};
