import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import FollowerBar from '@modules/FollowerBar';
import CommunityBar from '@modules/CommunityBar';
import SideBar from '@modules/SideBar';
import {
    communityIndexRoute,
    communityShowRoute,
} from '@infrastructure/RouteInitialize';

class IndexComponent extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object,
        showSide: PropTypes.bool,
        loginRequire: PropTypes.bool,
    };

    static defaultProps = {
        style: {},
        showSide: true,
        loginRequire: false,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'IndexComponent'
        );
    }

    render() {
        const { style, showSide, children } = this.props;
        const { pathname } = browserHistory.getCurrentLocation();
        // return showSide ? (
        //     <div className="index-component" style={style}>
        //         <div className="index-component__center">{children}</div>
        //     </div>
        // ) : (
        //     <div className="index-component" style={style}>
        //         {children}
        //     </div>
        // );
        return showSide ? (
            <div className="index-component" style={style}>
                <div className="index-component__left">
                    <div className="index-component__left-in">
                        <SideBar />
                    </div>
                </div>
                <div className="index-component__wrapper">
                    <div className="index-component__wrapper-in">
                        <div className="index-component__center">
                            <div className="index-component__center-in">
                                {children}
                            </div>
                        </div>
                        <div className="index-component__right">
                            <div className="index-component__right-in">
                                <CommunityBar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="index-component" style={style}>
                {children}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(IndexComponent);
