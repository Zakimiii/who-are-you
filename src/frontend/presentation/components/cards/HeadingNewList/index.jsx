import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import InputText from '@elements/InputText';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import TextArea from '@elements/TextArea';
import { Map } from 'immutable';
import models from '@network/client_models';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import HeadingCanvas from '@modules/HeadingCanvas';
import { FileEntity, FileEntities } from '@entity';

class HeadingNewList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {
        repository: Map(models.Heading.build()),
        submiting: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'HeadingNewList'
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
    }

    handleSubmit(screen_shot) {
        this.setState({ submiting: false });

        const { create, current_user, screenShot } = this.props;
        let { repository } = this.state;

        repository = repository.toJS();
        repository.picture = screen_shot;

        if (current_user) {
            repository.Voter = current_user;
            repository.VoterId = current_user.id;
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

        const user_section = (
            <div className="heading-new-list__user">
                <div className="heading-new-list__user-image">
                    <PictureItem
                        url={repository.User && repository.User.picture_small}
                        width={32}
                        redius={16}
                        alt={repository.User && repository.User.nickname}
                    />
                </div>
                <div className="heading-new-list__user-title">
                    {repository.User &&
                        `${repository.User.nickname}さんの紹介テーマを追加`}
                </div>
            </div>
        );

        const form = (
            <form className="heading-new-list__form" onSubmit={this.onSubmit}>
                <div className="heading-new-list__form-input">
                    <InputText
                        label={'紹介テーマ'}
                        onChange={this.onChange}
                        placeholder={
                            repository.User &&
                            `${repository.User.nickname}さんの紹介テーマを追加`
                        }
                        value={repository.body}
                        focus={true}
                    />
                </div>
                <div className="heading-new-list__form-submit">
                    <GradationButton
                        submit={true}
                        src={'plus'}
                        value={'紹介テーマを追加'}
                        disabled={submiting}
                    />
                </div>
            </form>
        );

        return (
            <div className="heading-new-list">
                {user_section}
                {form}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: headingActions.getNewHeading(state),
            current_user: authActions.getCurrentUser(state),
            show_screen_shot: state.heading.get('show_screen_shot'),
            screen_shot: headingActions.getScreenShot(state),
        };
    },

    dispatch => ({
        create: heading => {
            dispatch(headingActions.createHeading({ heading }));
        },
        screenShot: heading => {
            dispatch(headingActions.screenShot({ heading }));
        },
    })
)(HeadingNewList);
