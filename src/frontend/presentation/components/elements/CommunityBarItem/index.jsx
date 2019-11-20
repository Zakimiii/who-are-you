import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Img from '@elements/react-image';

class CommunityBarItem extends React.Component {

    static propTypes = {
        repository: AppPropTypes.Community,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityBarItem')
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const {
            repository
        } = this.props;

        return (
            <div className="community-bar-item" >
                <Img src={repository.picture} className="community-bar-item__image" />
                <div className="community-bar-item__value" >
                    {repository.body}
                </div>
            </div>
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
)(CommunityBarItem);
