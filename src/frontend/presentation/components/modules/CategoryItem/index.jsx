import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import { categoryShowRoute } from '@infrastructure/RouteInitialize';
import PictureItem from '@elements/PictureItem';
import data_config from '@constants/data_config';

class CategoryItem extends React.Component {

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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategoryItem')
    }

    render() {
        const {
            repository
        } = this.props;

        if (!repository) return <div />;

        return (
            <Link className="category-item" to={categoryShowRoute.getPath({ params: { id: repository.id }})} >
                {/*<Icon size="3x" src="tag" className="category-item__icon" />*/}
                <PictureItem
                    url={repository.picture}
                    className="category-item__image"
                    width={22}
                    radius={11}
                    rollback_url={data_config.default_community_image}
                />
                <div className="category-item__value" >
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
)(CategoryItem);
