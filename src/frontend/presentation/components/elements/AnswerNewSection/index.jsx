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
import * as answerActions from '@redux/Answer/AnswerReducer';
import { answerNewRoute } from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import InputText from '@elements/InputText';
import * as headingActions from '@redux/Heading/HeadingReducer';

class AnswerNewSection extends React.Component {
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
            'AnswerNewSection'
        );
    }

    onClick() {
        const { showNew, repository } = this.props;
        showNew(repository);
    }

    render() {
        const { repository } = this.props;

        if (!repository || !repository.User) return <div />;

        return (
            <div className="answer-new-section">
                <div className="answer-new-section__user">
                    <div className="answer-new-section__user-image">
                        <PictureItem
                            url={repository.User.picture_small}
                            width={32}
                            redius={16}
                            alt={repository.User.nickname}
                        />
                    </div>
                    <div className="answer-new-section__user-title">
                        {`${repository.body}の回答を追加`}
                    </div>
                </div>
                <div className="answer-new-section__body">
                    <InputText
                        label={`(例) ${
                            repository.User.nickname
                        }さんは〇〇なところが素敵！`}
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
                answerActions.setNew({
                    answer: models.Answer.build({
                        Heading: heading,
                        HeadingId: heading.id,
                    }),
                })
            );
            dispatch(answerActions.showNew());
        },
    })
)(AnswerNewSection);
