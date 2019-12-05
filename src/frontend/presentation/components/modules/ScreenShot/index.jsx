import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import HeadingCanvas from '@modules/HeadingCanvas';
import AnswerCanvas from '@modules/AnswerCanvas';
import CommunityHeadingCanvas from '@modules/CommunityHeadingCanvas';
import CommunityAnswerCanvas from '@modules/CommunityAnswerCanvas';

class ScreenShot extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'ScreenShot');
    }

    onHeadingShot(screen_shot) {
        this.props.finishHeadingScreenShot(screen_shot);
    }

    onAnswerShot(screen_shot) {
        this.props.finishAnswerScreenShot(screen_shot);
    }

    onCommunityHeadingShot(screen_shot) {
        this.props.finishCommunityHeadingScreenShot(screen_shot);
    }

    onCommunityAnswerShot(screen_shot) {
        this.props.finishCommunityAnswerScreenShot(screen_shot);
    }

    render() {
        const {
            show_heading_screen_shot,
            screen_shot_heading,
            show_answer_screen_shot,
            screen_shot_answer,
            show_community_heading_screen_shot,
            screen_shot_community_heading,
            show_community_answer_screen_shot,
            screen_shot_community_answer,
        } = this.props;

        return (
            <div>
                {show_heading_screen_shot && (
                    <HeadingCanvas
                        repository={screen_shot_heading}
                        onShot={this.onHeadingShot}
                    />
                )}
                {show_answer_screen_shot && (
                    <AnswerCanvas
                        repository={screen_shot_answer}
                        onShot={this.onAnswerShot}
                    />
                )}
                {show_community_heading_screen_shot && (
                    <CommunityHeadingCanvas
                        repository={screen_shot_community_heading}
                        onShot={this.onCommunityHeadingShot}
                    />
                )}
                {show_community_answer_screen_shot && (
                    <CommunityAnswerCanvas
                        repository={screen_shot_community_answer}
                        onShot={this.onCommunityAnswerShot}
                    />
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const show_heading_screen_shot = state.heading.get('show_screen_shot');
        const show_answer_screen_shot = state.answer.get('show_screen_shot');
        const show_community_heading_screen_shot = state.communityHeading.get('show_screen_shot');
        const show_community_answer_screen_shot = state.communityAnswer.get('show_screen_shot');
        return {
            show_heading_screen_shot,
            screen_shot_heading: headingActions.getScreenShotHeading(state),
            show_answer_screen_shot,
            screen_shot_answer: answerActions.getScreenShotAnswer(state),
            show_community_heading_screen_shot,
            screen_shot_community_heading: communityHeadingActions.getScreenShotHeading(state),
            show_community_answer_screen_shot,
            screen_shot_community_answer: communityAnswerActions.getScreenShotAnswer(state),
        };
    },

    dispatch => ({
        finishHeadingScreenShot: screen_shot => {
            dispatch(headingActions.finishScreenShot({ screen_shot }));
        },
        finishAnswerScreenShot: screen_shot => {
            dispatch(answerActions.finishScreenShot({ screen_shot }));
        },
        finishCommunityHeadingScreenShot: screen_shot => {
            dispatch(communityHeadingActions.finishScreenShot({ screen_shot }));
        },
        finishCommunityAnswerScreenShot: screen_shot => {
            dispatch(communityAnswerActions.finishScreenShot({ screen_shot }));
        },
    })
)(ScreenShot);
