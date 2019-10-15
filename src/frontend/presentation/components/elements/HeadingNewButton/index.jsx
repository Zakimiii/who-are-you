import React from 'react';

import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import * as headingActions from '@redux/Heading/HeadingReducer';
import models from '@network/client_models';

class HeadingNewButton extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'HeadingNewButton'
        );
    }

    onClick(e) {
        const { showNew, repository } = this.props;
        showNew(repository);
    }

    render() {
        return (
            <GradationButton
                src={'plus'}
                value={tt('g.add_theme')}
                onClick={this.onClick}
            />
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({
        showNew: user => {
            dispatch(
                headingActions.setNew({
                    heading: models.Heading.build({
                        User: user,
                        UserId: user.id,
                    }),
                })
            );
            dispatch(headingActions.showNew());
        },
    })
)(HeadingNewButton);
