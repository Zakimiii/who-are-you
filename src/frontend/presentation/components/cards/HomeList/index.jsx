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

        const ways = (
            <div className="home-list__ways">
                <div className="home-list__ways-title">
                    {'やり方はカンタン2ステップ'}
                </div>
                <div className="home-list__ways__heading-title">
                    {'1.Twitterでフォローしている友達のお題を作成！'}
                </div>
                <div className="home-list__ways__heading-image">
                    <Img
                        className="home-list__ways__heading-image-img"
                        src={'/images/brands/heading-way.png'}
                    />
                </div>
                <div className="home-list__ways__answer-title">
                    {'2. お題に答えて自分しかしらない友達の魅力を発信！'}
                </div>
                <div className="home-list__ways__answer-image">
                    <Img
                        className="home-list__ways__answer-image-img"
                        src={'/images/brands/answer-way.png'}
                    />
                </div>
            </div>
        );
        return (
            <div className="home-list">
                {top}
                {ways}
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
