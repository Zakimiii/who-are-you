import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import dummy from '@network/dummy';
import PictureItem from '@elements/PictureItem';
import data_config from '@constants/data_config';
import { categoryShowRoute, categoryIndexRoute } from '@infrastructure/RouteInitialize';
import Responsible from '@modules/Responsible';

class CategoryViewerItem extends React.Component {

    static propTypes = {
        repository: AppPropTypes.Category,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategoryViewerItem')
    }

    render() {
        const {
            repository,
        } = this.props;

        if (!repository) return <div/>;

        return (
            <Link
                className="category-viewer-item"
                to={repository.id == dummy.AllCategory.id ?
                    categoryIndexRoute.path :
                    categoryShowRoute.getPath({ params: { id: repository.id }})}
            >
                <Responsible
                    defaultContent={(
                        <PictureItem
                            url={repository.picture}
                            width={120}
                            radius={60}
                            className="category-viewer-item__image"
                            rollback_url={data_config.default_community_image}
                        />
                    )}
                    breakingContent={(
                        <PictureItem
                            url={repository.picture}
                            width={80}
                            radius={40}
                            className="category-viewer-item__image"
                            rollback_url={data_config.default_community_image}
                        />
                    )}
                    breakFm={true}
                />
                <div className="category-viewer-item__value" >
                    {repository.body}
                </div>
            </Link>
        )
    }
}

export default connect(
    (state, props) => {
        return {
        };
    },

    dispatch => ({
    })
)(CategoryViewerItem);
