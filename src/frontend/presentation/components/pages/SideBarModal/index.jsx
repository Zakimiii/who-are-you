import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as appActions from '@redux/App/AppReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import SideBar from '@modules/SideBar';
import { Enum, defineEnum } from '@extension/Enum';
import { menuSection } from '@entity';
import { SideBarSection } from '@entity';

class SideBarModal extends React.Component {
    static propTypes = {
        section: PropTypes.object,
        onCancel: PropTypes.func,
    };

    static defaultProps = {
        section: SideBarSection,
    };

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'SideBarModal'
        );
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel = e => {
        if (e.preventDefault) e.preventDefault();
        const { onCancel } = this.props;
        if (onCancel) onCancel();
    };

    render() {
        const { onCancel, section } = this.props;
        return (
            <div className="side-bar-modal" onClick={onCancel}>
                <div className="side-bar-modal__body" onClick={onCancel}>
                    <SideBar section={section} />
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
)(SideBarModal);
