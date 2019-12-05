import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import CommunityViewerItem from '@elements/CommunityViewerItem';
import Responsible from '@modules/Responsible';
import AdsCard from '@elements/AdsCard';
import ad_config from '@constants/ad_config';
import { detected } from 'adblockdetect';
import dummy from '@network/dummy';

class CommunityViewer extends React.Component {

    static propTypes = {
        repositories: PropTypes.array,
        isAds: PropTypes.bool,
    };

    static adsKey = 'ads';

    static defaultProps = {
        repositories: [],
        isAds: false,
    };

    state = {
        adBlocked: !ad_config.show_ads,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityViewer')
    }

    componentDidMount = () => {
        this.setState({
            adBlocked: detected() || !ad_config.show_ads,
        });
    };

    render() {
        const {
            repositories,
            isAds,
        } = this.props;

        const { adBlocked } = this.state;

        const _repositories = repositories;

        _repositories.splice(0, 0, dummy.AllCommunity);

        if (
            isAds &&
            _repositories.length > 0 &&
            !_repositories.includes(CommunityViewer.adsKey)
        ) {
            _repositories.splice(1, 0, CommunityViewer.adsKey);
        }

        const renderItem = items =>
            items.map(
                (item, key) =>
                    item == CommunityViewer.adsKey ? (
                        <div
                            className="community-viewer__ad"
                            key={key}
                            style={adBlocked ? { display: 'none' } : {}}
                        >
                            <AdsCard />
                        </div>
                    ) : (
                        <div className="community-viewer__item" key={key}>
                            <CommunityViewerItem repository={item} />
                        </div>
                    )
            );

        return (
            <div className="community-viewer">
                <div className="community-viewer__container">
                    <div className="community-viewer__items">
                        {_repositories.length > 0 && renderItem(_repositories)}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
        };
    },

    dispatch => ({
    })
)(CommunityViewer);
