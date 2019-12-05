/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import classnames from 'classnames';
import CommunityShowList from '@cards/CommunityShowList';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import IndexComponent from '@pages/IndexComponent';
import ActionButton from '@modules/ActionButton';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as appActions from '@redux/App/AppReducer';
import { communityNewRoute } from '@infrastructure/RouteInitialize';
import autobind from 'class-autobind';
import models from '@network/client_models';

class CommunityShow extends React.Component {
    static propTypes = {
        routeParams: PropTypes.object,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.state = {};
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityShow'
        );
    }

    onClick(e) {
        const { repository, showNew } = this.props;
        showNew(repository);
    }

    render() {
        var { id, section } = this.props.routeParams;

        if (!section) {
            section = 'headings';
        }

        return (
            <IndexComponent
                action_button={
                    <ActionButton
                        size={'3x'}
                        src={'plus'}
                        onClick={this.onClick}
                    />
                }
            >
                <CommunityShowList id={id} section={section} />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '/community/:id(/:section)',
    component: connect(
        (state, ownProps) => {
            return {
                repository: communityActions.getShowCommunity(state),
            };
        },
        dispatch => {
            return {
                showNew: community => {
                    dispatch(
                        communityHeadingActions.setNew({
                            heading: models.CommunityHeading.build({
                                Community: community,
                                CommunityId: community.id,
                            }),
                        })
                    );
                    dispatch(communityHeadingActions.showNew());
                },
            };
        }
    )(CommunityShow),
};
