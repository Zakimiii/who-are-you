import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as appActions from '@redux/App/AppReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import classNames from 'classnames';

class LoadingScreen extends React.Component {
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
            'LoadingScreen'
        );
    }

    render() {
        const { loading } = this.props;

        return (
            <div
                className={classNames('loading-screen', {
                    loaded: !loading,
                })}
            >
                <div className="loading-screen__wrapper">
                    <div className="loading-screen__wrapper-loader" />
                    <div className="loading-screen__wrapper__section">
                        <div className="loading-screen__wrapper__section-left" />
                        <div className="loading-screen__wrapper__section-right" />
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
)(LoadingScreen);
