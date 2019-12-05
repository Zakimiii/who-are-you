import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import TipsBackground from '@modules/TipsBackground';
import TwitterButton from '@elements/TwitterButton';
import Img from 'react-image';
import CheckLaws from '@elements/CheckLaws';
import WelcomeList from '@cards/WelcomeList';
import ScrollNavigator from '@elements/ScrollNavigator';
import data_config from '@constants/data_config';

class HomeList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'HomeList');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        const top = (
            <TipsBackground>
                <div className="home-list__top">
                    <div className="home-list__top-logo">
                        <Img
                            className="home-list__top-logo-image"
                            src={data_config.logo_image}
                        />
                    </div>
                    <div className="home-list__top-desc">{tt('apps.home')}</div>
                    <div className="home-list__top-button">
                        <TwitterButton />
                    </div>
                    <div className="home-list__top-check">
                        <CheckLaws />
                    </div>
                    <Img
                        className="home-list__top__back-logo"
                        src={'/images/brands/who-are-you_logo.png'}
                    />
                </div>
            </TipsBackground>
        );

        return (
            <div className="home-list">
                {top}
                <div className="home-list__welcome">
                    <WelcomeList />
                </div>
                <ScrollNavigator />
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(HomeList);
