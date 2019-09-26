import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as appActions from '@redux/App/AppReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import LoadingIndicator from '@elements/LoadingIndicator';
import classNames from 'classnames';

class ScreenLoadingIndicator extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
    };

    static defaultProps = {
        loading: false,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'ScreenLoadingIndicator'
        );
    }

    render() {
        const { loading } = this.props;

        return (
            <div
                className={classNames('screen-loading-indicator', {
                    loaded: !loading,
                })}
            >
                <div className="screen-loading-indicator__wrapper">
                    <div className="screen-loading-indicator__wrapper-loader" />
                    <div className="screen-loading-indicator__wrapper__section">
                        <div className="screen-loading-indicator__wrapper__section-left" />
                        <div className="screen-loading-indicator__wrapper__section-right" />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            loading: state.app.get('screen_loading'),
        };
    },

    dispatch => ({})
)(ScreenLoadingIndicator);
