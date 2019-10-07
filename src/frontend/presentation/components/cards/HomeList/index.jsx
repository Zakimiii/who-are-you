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
                            src={'/images/brands/who_are_you.png'}
                        />
                    </div>
                    <div className="home-list__top-desc">
                        {
                            'Twitter連携で秒速で始められる\n一問一答形式の友達紹介アプリ'
                        }
                    </div>
                    <div className="home-list__top-button">
                        <TwitterButton />
                    </div>
                    <Img
                        className="home-list__top__back-logo"
                        src={'/images/brands/who-are-you_logo.png'}
                    />
                </div>
            </TipsBackground>
        );

        return <div className="home-list">{top}</div>;
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(HomeList);
