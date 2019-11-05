import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import TabBarItem from '@elements/TabBarItem';
import { SideBarSection } from '@entity';
import Img from 'react-image';

class TabBar extends React.Component {
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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TabBar');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const { section, pathname } = this.props;

        const renderItem = items =>
            items._enums.map((item, index) => {
                switch (item.value) {
                    default:
                        return (
                            <div key={index} className="tab-bar__item">
                                <TabBarItem
                                    value={item.string()}
                                    image={item.image}
                                    link={item.link}
                                    active={item.active(pathname)}
                                    loginRequire={item.loginRequire}
                                />
                            </div>
                        );
                }
            });

        return (
            <div className="tab-bar">
                <div className="tab-bar__items">
                    {section && renderItem(section)}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            pathname: browserHistory
                ? browserHistory.getCurrentLocation().pathname
                : null,
        };
    },

    dispatch => ({})
)(TabBar);
