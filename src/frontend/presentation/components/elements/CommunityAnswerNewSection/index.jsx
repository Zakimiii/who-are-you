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
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import { answerNewRoute } from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import InputText from '@elements/InputText';
import * as headingActions from '@redux/Heading/HeadingReducer';
import data_config from '@constants/data_config';

class CommunityAnswerNewSection extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Heading,
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
            'CommunityAnswerNewSection'
        );
    }

    onClick() {
        const { showNew, repository } = this.props;
        showNew(repository);
    }

    render() {
        const { repository } = this.props;

        if (!repository || !repository.Community) return <div />;

        return (
            <div className="answer-new-section">
                <div className="answer-new-section__user">
                    <div className="answer-new-section__user-image">
                        <PictureItem
                            url={repository.Community.picture}
                            width={32}
                            redius={16}
                            alt={repository.Community.body}
                            rollback_url={data_config.default_community_image}
                        />
                    </div>
                    <div className="answer-new-section__user-title">
                        {tt('g.add_answer')}
                    </div>
                </div>
                <div className="answer-new-section__body">
                    <InputText
                        label={tt('g.example_answer')}
                        disabled={true}
                        onClick={this.onClick}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({
        showNew: heading => {
            dispatch(
                communityAnswerActions.setNew({
                    answer: models.CommunityAnswer.build({
                        Heading: heading,
                        HeadingId: heading.id,
                    }),
                })
            );
            dispatch(communityAnswerActions.showNew());
        },
    })
)(CommunityAnswerNewSection);
