import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Img from 'react-image';
import Gallery from '@modules/Gallery';
import TwitterButton from '@elements/TwitterButton';
import IconTextItem from '@elements/IconTextItem';

class WelcomeList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'WelcomeList');
    }

    render() {
        const head = (
            <div className="welcome-list__head">
                <div className="welcome-list__head-logo">
                    <Img
                        className="welcome-list__head-logo-image"
                        src={'/images/brands/who_are_you.png'}
                    />
                </div>
                <div className="welcome-list__head-title">
                    {tt('g.welcome')}
                </div>
            </div>
        );

        const lighting = (
            <div className="welcome-list__lighting">
                <div className="welcome-list__lighting-title">
                    {tt('g.about')}
                </div>
                <Img
                    className="welcome-list__lighting-image"
                    src={'/images/screen_shot_heading.png'}
                />
            </div>
        );

        const ways = (
            <div className="welcome-list__ways">
                <div className="welcome-list__ways-title">
                    {tt('g.ways_title')}
                </div>
                <Gallery className="welcome-list__ways-items">
                    <div className="welcome-list__ways-item">
                        <IconTextItem
                            src={'tip'}
                            text={tt('g.way1_title')}
                            title={tt('g.way1_desc')}
                        />
                    </div>
                    <div className="welcome-list__ways-item">
                        <IconTextItem
                            src={'introduce'}
                            text={tt('g.way2_title')}
                            title={tt('g.way2_desc')}
                        />
                    </div>
                    <div className="welcome-list__ways-item">
                        <IconTextItem
                            src={'tell'}
                            text={tt('g.way3_title')}
                            title={tt('g.way3_desc')}
                        />
                    </div>
                    <div className="welcome-list__ways-item">
                        <IconTextItem
                            text={tt('g.way4_title')}
                            title={tt('g.way4_desc')}
                        />
                    </div>
                </Gallery>
            </div>
        );

        const finallyBody = (
            <div className="welcome-list__finally">
                <Img
                    className="welcome-list__finally-image"
                    src={'/images/brands/who_are_you.png'}
                />
                <div className="welcome-list__finally-desc">
                    {tt('g.welcome_desc')}
                </div>
                <div className="welcome-list__finally-button">
                    <TwitterButton />
                </div>
            </div>
        );

        return (
            <div className="welcome-list">
                {head}
                {lighting}
                {ways}
                {finallyBody}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(WelcomeList);
