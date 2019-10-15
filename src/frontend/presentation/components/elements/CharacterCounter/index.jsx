import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import classNames from 'classnames';

class CharacterCounter extends React.Component {
    static propTypes = {
        max: PropTypes.number,
        value: PropTypes.number,
    };

    static defaultProps = {
        max: 0,
        value: 0,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CharacterCounter'
        );
    }

    render() {
        const { max, value } = this.props;

        return (
            <div className="character-counter">
                <div
                    className={classNames('character-counter__value', {
                        max: value > max,
                    })}
                >
                    {value}
                </div>
                <div className="character-counter__separate">/</div>
                <div className="character-counter__limit">{max}</div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(CharacterCounter);
