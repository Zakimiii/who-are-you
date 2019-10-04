import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import SideBarItem from '@elements/SideBarItem';

class SideBar extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'SideBar');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const { section } = this.props;

        const renderItem = items =>
            items._enums.map((item, index) => {
                switch (item.value) {
                    case 'Border':
                        return <div className="side-bar__border" key={index} />;
                    case 'MyPage':
                        if (!!current_user) {
                            return (
                                <li key={index} className="side-bar__item">
                                    <SideBarItem
                                        value={item.string()}
                                        image={item.image}
                                        link={item.link(current_user.id)}
                                        active={item.active(
                                            current_user.id,
                                            pathname
                                        )}
                                    />
                                </li>
                            );
                        } else {
                            return (
                                <li key={index} className="side-bar__item">
                                    <SideBarItem
                                        value={item.string()}
                                        image={item.image}
                                        onClick={showLogin}
                                    />
                                </li>
                            );
                        }
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
                <ul className="side-bar__items">
                    {section && renderItem(section)}
                </ul>
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
