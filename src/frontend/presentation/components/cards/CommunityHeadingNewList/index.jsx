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
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import CommunityHeadingCanvas from '@modules/CommunityHeadingCanvas';
import { FileEntity, FileEntities } from '@entity';
import CharacterCounter from '@elements/CharacterCounter';
import data_config from '@constants/data_config';
import prototype_data from '@locales/prototype/ja.json';
import Responsible from '@modules/Responsible';

class CommunityHeadingNewList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {
        repository: Map(models.CommunityHeading.build()),
        submiting: false,
        n: 0,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityHeadingNewList'
        );
    }

    componentWillMount() {
        const count = Object.keys(prototype_data.headings).length;
        this.setState({
            repository: Map(this.props.repository),
            n: Number.prototype.getRandomInt(0, count - 1),
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
            !!nextProps.repository.UserId &&
            !this.props.repository.UserId
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
        let { repository, submiting, n } = this.state;

        repository = repository.toJS();

        const community_section = (
            <div className="heading-new-list__user">
                <div className="heading-new-list__user-image">
                    <PictureItem
                        url={repository.Community && repository.Community.picture}
                        width={32}
                        redius={16}
                        alt={repository.Community && repository.Community.body}
                    />
                </div>
                <div className="heading-new-list__user-title">
                    {tt('g.add_theme')}
                </div>
            </div>
        );

        const form = (
            <form className="heading-new-list__form" onSubmit={this.onSubmit}>
                <div className="heading-new-list__form-input">
                    <InputText
                        label={tt('g.theme')}
                        prelabel={
                            repository.Community && `${repository.Community.body}の`
                        }
                        onChange={this.onChange}
                        placeholder={tt('g.example_theme', {
                            data: tt(`headings.${n}`),
                        })}
                        value={repository.body}
                        focus={false}
                    />
                </div>
                <div className="heading-new-list__form-counter">
                    <CharacterCounter
                        max={data_config.heading_body_max_limit}
                        value={repository.body.length}
                    />
                </div>
                <div className="heading-new-list__form-submit">
                    <GradationButton
                        submit={true}
                        src={'plus'}
                        value={tt('g.add_theme')}
                        disabled={
                            submiting ||
                            repository.body.length <=
                                data_config.heading_body_min_limit ||
                            repository.body.length >=
                                data_config.heading_body_max_limit
                        }
                    />
                </div>
            </form>
        );

        return (
            <div className="heading-new-list">
                {community_section}
                {form}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: communityHeadingActions.getNewHeading(state),
            current_user: authActions.getCurrentUser(state),
            show_screen_shot: state.communityHeading.get('show_screen_shot'),
            screen_shot: communityHeadingActions.getScreenShot(state),
        };
    },

    dispatch => ({
        create: heading => {
            dispatch(communityHeadingActions.createHeading({ heading }));
        },
        screenShot: heading => {
            dispatch(communityHeadingActions.screenShot({ heading }));
        },
    })
)(CommunityHeadingNewList);
