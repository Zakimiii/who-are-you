import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import * as communityTemplateActions from '@redux/CommunityTemplate/CommunityTemplateReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as userActions from '@redux/User/UserReducer';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import models from '@network/client_models';
import { Map } from 'immutable';

class AddCommunityHeadingButton extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Template,
        show_community: AppPropTypes.Community,
        current_user: AppPropTypes.User,
    };

    static defaultProps = {
        repository: null,
        show_community: null,
        current_user: null,
    };

    state = {
        heading: Map(models.CommunityHeading.build()),
        submiting: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AddCommunityHeadingButton'
        );
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.screen_shot && !!this.state.submiting) {
            this.handleSubmit(nextProps.screen_shot);
        }
    }

    handleSubmit(screen_shot) {
        this.setState({ submiting: false });

        const { addCommunityHeading, current_user, screenShot, repository } = this.props;
        let { heading } = this.state;

        heading = heading.toJS();
        heading.picture = screen_shot;

        addCommunityHeading({ heading, template: repository });
    }

    onClick() {
        const { show_community, current_user, repository, screenShot } = this.props;

        if (!show_community || !repository) return;

        const heading = models.CommunityHeading.build({
            CommunityId: show_community.id,
            Community: show_community,
            VoterId: !!current_user ? current_user.id : null,
            Voter: current_user,
            Template: repository,
            TemplateId: repository.id,
            body: repository.body,
        });

        this.setState({
            submiting: true,
            heading: Map(heading),
        });

        screenShot(Map(heading));
    }

    render() {
        return (
            <GradationButton
                src={'plus'}
                value={tt('g.add_theme')}
                onClick={this.onClick}
                stop={true}
            />
        );
    }
}

export default connect(
    (state, props) => {
        return {
            show_screen_shot: state.heading.get('show_screen_shot'),
            screen_shot: communityHeadingActions.getScreenShot(state),
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({
        addCommunityHeading: ({ template, heading }) => {
            dispatch(
                communityTemplateActions.addHeading({
                    heading,
                    template,
                })
            );
        },
        screenShot: heading => {
            dispatch(communityHeadingActions.screenShot({ heading }));
        },
    })
)(AddCommunityHeadingButton);
