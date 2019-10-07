import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import SideBarItem from '@elements/SideBarItem';
import UserSideItem from '@modules/UserSideItem';
import { SideBarSection } from '@entity';
import Img from 'react-image';

class SideBar extends React.Component {
    static propTypes = {
        section: PropTypes.object,
        pathname: PropTypes.string,
    };

    static defaultProps = {
        section: SideBarSection,
        pathname: browserHistory
            ? browserHistory.getCurrentLocation().pathname
            : null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'SideBar');
    }

    render() {
        const { section, pathname } = this.props;

        const renderItem = items =>
            items._enums.map((item, index) => {
                switch (item.value) {
                    default:
                        return (
                            <li key={index} className="side-bar__item">
                                <SideBarItem
                                    value={item.string()}
                                    image={item.image}
                                    link={item.link}
                                    active={item.active(pathname)}
                                />
                            </li>
                        );
                }
            });

        return (
            <div className="side-bar">
                <div className="side-bar__user">
                    <UserSideItem />
                </div>
                <ul className="side-bar__items">
                    {section && renderItem(section)}
                </ul>
                <div className="side-bar__logo">
                    <Img
                        className="side-bar__logo-image"
                        src={'/images/brands/gray-logo.png'}
                    />
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
)(SideBar);
