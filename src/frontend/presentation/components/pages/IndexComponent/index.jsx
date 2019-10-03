import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import FollowerBar from '@modules/FollowerBar';
import SideBar from '@modules/SideBar';

class IndexComponent extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object,
        showSide: PropTypes.bool,
    };

    static defaultProps = {
        style: {},
        showSide: true,
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

        return showSide ? (
            <div className="index-component" style={style}>
                <div className="index-component__center">{children}</div>
            </div>
        ) : (
            <div className="index-component" style={style}>
                {children}
            </div>
        );
        // return showSide ? (
        //     <div className="index-component" style={style}>
        //         <div className="index-component__left">
        //             <SideBar/>
        //         </div>
        //         <div className="index-component__center">
        //             {children}
        //         </div>
        //         <div className="index-component__right">
        //             <FollowerBar/>
        //         </div>
        //     </div>
        // ) : (
        //     <div className="index-component" style={style}>
        //         {children}
        //     </div>
        // )
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(IndexComponent);
