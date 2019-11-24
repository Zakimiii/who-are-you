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

class CategoryBarItem extends React.Component {

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
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CategoryBarItem')
    }

    render() {
        const {
            repository
        } = this.props;

        if (!repository) return <div />;

        return (
            <Link className="category-bar-item" to={categoryShowRoute.getPath({ params: { id: repository.id }})} >
                <Icon size="2x" src="tag" className="category-bar-item__icon" />
                <div className="category-bar-item__value" >
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
)(CategoryBarItem);
