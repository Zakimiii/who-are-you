/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import { Enum, defineEnum } from '@extension/Enum';

class SectionHeader extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object,
    };

    static defaultProps = {
        style: {},
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="section-header" style={this.props.style}>
                <div className="section-header__component fade-in--1">
                    {this.props.children}
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
)(SectionHeader);
