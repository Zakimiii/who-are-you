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
import TextArea from '@elements/TextArea';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import { Map } from 'immutable';
import models from '@network/client_models';
import CharacterCounter from '@elements/CharacterCounter';
import data_config from '@constants/data_config';

class AnswerNewList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {
        submiting: false,
        repository: Map(models.Answer.build()),
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AnswerNewList'
        );
    }

    componentWillMount() {
        this.setState({
            repository: Map(this.props.repository),
        });
    }

    onChange(e) {
        let { repository } = this.state;

        repository = repository.toJS();
        repository.body = e.target.value;

        this.setState({
            repository: Map(repository),
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.screen_shot && !!this.state.submiting) {
            this.handleSubmit(nextProps.screen_shot);
        }

        if (
            !!nextProps.repository &&
            !!nextProps.repository.HeadingId &&
            !this.props.repository.HeadingId
        ) {
            this.setState({
                repository: Map(nextProps.repository),
            });
        }
    }

    handleSubmit(screen_shot) {
        this.setState({ submiting: false });

        const { create, current_user, screenShot } = this.props;
        let { repository } = this.state;

        repository = repository.toJS();
        repository.picture = screen_shot;

        if (current_user) {
            repository.User = current_user;
            repository.UserId = current_user.id;
        }

        create(repository);
    }

    onSubmit(e) {
        if (e.preventDefault) e.preventDefault();

        let { repository } = this.state;

        const { create, current_user, screenShot } = this.props;

        repository = repository.toJS();

        if (!repository) {
            return;
        } else if (!repository.body || repository.body == '') {
            return;
        }
        this.setState({ submiting: true });

        screenShot(Map(repository));
    }

    render() {
        let { repository, submiting } = this.state;

        repository = repository.toJS();

        if (!repository || !repository.Heading) return <div />;

        const user_section = (
            <div className="answer-new-list__user">
                <div className="answer-new-list__user-image">
                    <PictureItem
                        url={repository.Heading.User.picture_small}
                        width={32}
                        redius={16}
                    />
                </div>
                <div className="answer-new-list__user-title">
                    {repository.Heading &&
                        `${repository.Heading.User.nickname}さんの「${
                            repository.Heading.body
                        }」とは...?`}
                </div>
            </div>
        );

        const form = (
            <form className="answer-new-list__form" onSubmit={this.onSubmit}>
                <div className="answer-new-list__form-input">
                    <TextArea
                        label={tt('g.answer')}
                        onChange={this.onChange}
                        placeholder={tt('g.enter', {
                            data: repository.Heading.body,
                        })}
                        value={repository.body}
                        focus={true}
                    />
                </div>
                <div className="answer-new-list__form-counter">
                    <CharacterCounter
                        max={data_config.answer_body_max_limit}
                        value={repository.body.length}
                    />
                </div>
                <div className="answer-new-list__form-submit">
                    <GradationButton
                        submit={true}
                        src={'plus'}
                        value={tt('g.add_answer')}
                        disabled={
                            submiting ||
                            repository.body.length <=
                                data_config.answer_body_min_limit ||
                            repository.body.length >=
                                data_config.answer_body_max_limit
                        }
                    />
                </div>
            </form>
        );

        return (
            <div className="answer-new-list">
                {user_section}
                {form}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: answerActions.getNewAnswer(state),
            current_user: authActions.getCurrentUser(state),
            show_screen_shot: state.answer.get('show_screen_shot'),
            screen_shot: answerActions.getScreenShot(state),
        };
    },

    dispatch => ({
        create: answer => {
            dispatch(answerActions.createAnswer({ answer }));
        },
        screenShot: answer => {
            dispatch(answerActions.screenShot({ answer }));
        },
    })
)(AnswerNewList);
