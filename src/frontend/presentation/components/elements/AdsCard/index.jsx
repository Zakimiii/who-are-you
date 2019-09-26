import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import env from '@env/env.json';
import AdSense from 'react-adsense';
import Img from 'react-image';
import LoadingIndicator from '@elements/LoadingIndicator';
import { detected } from 'adblockdetect';
import ad_config from '@constants/ad_config';

class AdsCard extends React.Component {
    static propTypes = {
        force: PropTypes.bool,
    };

    static defaultProps = {
        force: false,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'AdsCard');
    }

    componentDidMount() {
        if (
            window &&
            document &&
            process.env.NODE_ENV == 'production' &&
            !detected() &&
            (ad_config.show_ads || this.props.force)
        ) {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: env.GOOGLE.AD_CLIENT,
                    enable_page_level_ads: true,
                });
            } catch (e) {
                return;
            }
        }
    }

    render() {
        if (detected() || !(ad_config.show_ads || this.props.force))
            return <div />;

        return (
            <div className="ads-card">
                {process.env.NODE_ENV == 'development' ? (
                    <Img
                        className="ads-card__item"
                        src={'/images/sample.jpg'}
                    />
                ) : (
                    <AdSense.Google
                        className="ads-card__item"
                        client={env.GOOGLE.AD_CLIENT}
                        slot={env.GOOGLE.AD_SLOT}
                        style={{ display: 'block' }}
                        format="auto"
                        responsive="true"
                    />
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(AdsCard);
