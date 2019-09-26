import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Reveal from '@elements/Reveal';
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';
import tt from 'counterpart';
import * as appActions from '@redux/App/AppReducer';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';

class Modals extends React.Component {

    static defaultProps = {
    };

    static propTypes = {
    };

    constructor() {
        super();
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Modals');
    }

    render() {
        const {
            nightmodeEnabled,
        } = this.props;

        const themeClass = nightmodeEnabled ? ' theme-dark' : ' theme-original';

        return (
            <div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            nightmodeEnabled: state.app.getIn([
                'user_preferences',
                'nightmode',
            ]),
        };
    },
    dispatch => ({
    })
)(Modals);
