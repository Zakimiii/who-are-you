import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import TrashButton from '@elements/TrashButton';
import ShareButton from '@elements/ShareButton';

class StatsBar extends React.Component {
    static propTypes = {
        repository: PropTypes.object,
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'StatsBar');
    }

    render() {
        const { repository } = this.props;

        if (!repository) return;

        return (
            <div className="stats-bar">
                <div className="stats-bar__item">
                    <TrashButton repository={repository} />
                </div>
                <div className="stats-bar__item">
                    <ShareButton repository={repository} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(StatsBar);
