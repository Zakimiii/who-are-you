import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import CategoryViewerItem from '@elements/CategoryViewerItem';
import Responsible from '@modules/Responsible';
import AdsCard from '@elements/AdsCard';
import ad_config from '@constants/ad_config';
import { detected } from 'adblockdetect';
import dummy from '@network/dummy';

class CategoryViewer extends React.Component {

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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategoryViewer')
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

        _repositories.splice(0, 0, dummy.AllCategory);

        if (
            isAds &&
            _repositories.length > 0 &&
            !_repositories.includes(CategoryViewer.adsKey)
        ) {
            _repositories.splice(1, 0, CategoryViewer.adsKey);
        }

        const renderItem = items =>
            items.map(
                (item, key) =>
                    item == CategoryViewer.adsKey ? (
                        <div
                            className="category-viewer__ad"
                            key={key}
                            style={adBlocked ? { display: 'none' } : {}}
                        >
                            <AdsCard />
                        </div>
                    ) : (
                        <div className="category-viewer__item" key={key}>
                            <CategoryViewerItem repository={item} />
                        </div>
                    )
            );

        return (
            <div className="category-viewer">
                <div className="category-viewer__container">
                    <div className="category-viewer__items">
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
)(CategoryViewer);
