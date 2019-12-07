import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as categoryActions from '@redux/Category/CategoryReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import { FileEntity, FileEntities } from '@entity';
import CharacterCounter from '@elements/CharacterCounter';
import data_config from '@constants/data_config';
import models from '@network/client_models';
import { Map, List } from 'immutable';
import InputText from '@elements/InputText';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import Responsible from '@modules/Responsible';
import ImageUploadItem from '@elements/ImageUploadItem';
import SwitchButton from '@elements/SwitchButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CommunityNewList extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Community,
        repositories: PropTypes.array,
    };

    static defaultProps = {
        repository: models.Community.build({
            Category: models.Category.build(),
        }),
        repositories: [],
    };

    state = {
        repository: Map(
            models.Community.build({
                Category: models.Category.build(),
            })
        ),
        community_picture: Map(),
        category_picture: Map(),
        submiting: false,
        new_category: false,
        options: List([{ value: '', label: '' }]),
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityNewList'
        );
    }

    componentWillMount() {
        this.setStateFromProps(this.props);
        this.setOptions(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setOptions(nextProps);
    }

    setOptions(props) {
        const { repositories } = props;
        const options =
            repositories.length == 0
                ? [{ value: '', label: '' }]
                : repositories.map(val => {
                      return { value: val.body, label: val.body };
                  });
        this.setState({ options: List(options) });
    }

    setStateFromProps(props) {
        let { repository } = this.props;

        this.setState({
            repository: Map(repository),
            community_picture: Map(
                FileEntities.build_from_urls([repository.picture]).toJSON()
            ),
            category_picture: Map(
                FileEntities.build_from_urls([
                    repository.Category.picture,
                ]).toJSON()
            ),
        });
    }

    onCommunityBodyChange(e) {
        let { repository } = this.state;

        repository = repository.toJS();
        repository.body = e.target.value;

        this.setState({
            repository: Map(repository),
        });
    }

    onCommunityPictureChange(e) {
        this.setState({
            community_picture: e,
        });
    }

    onCategoryBodySelect(e) {
        let { repository } = this.state;

        repository = repository.toJS();
        repository.Category.body = e ? e.value : '';

        this.setState({
            repository: Map(repository),
        });
    }

    onCategoryBodyChange(e) {
        let { repository } = this.state;

        repository = repository.toJS();
        repository.Category.body = e.target.value;

        this.setState({
            repository: Map(repository),
        });
    }

    onCategoryPictureChange(e) {
        this.setState({
            category_picture: e,
        });
    }

    onSubmit(e) {
        if (e.preventDefault) e.preventDefault();

        const { repositories } = this.props;

        let {
            repository,
            community_picture,
            category_picture,
            new_category,
        } = this.state;

        const { review, current_user } = this.props;

        repository = repository.toJS();

        if (!repository) {
            return;
        } else if (
            !repository.body ||
            repository.body == '' ||
            !repository.Category.body ||
            repository.Category.body == ''
        ) {
            return;
        }
        this.setState({ submiting: true });

        repository.picture = community_picture;
        repository.Category.picture = category_picture;

        review(repository);
    }

    onNewCategoryChange = e => {
        this.setState({
            new_category: e,
        });
    };

    render() {
        let {
            repository,
            submiting,
            community_picture,
            category_picture,
            new_category,
            options,
        } = this.state;

        const { repositories } = this.props;

        if (!repository) return <div />;

        repository = repository.toJS();

        return (
            <div className="community-new-list">
                <div className="community-new-list__title">
                    {tt('g.community_new')}
                </div>
                <form
                    className="community-new-list__form"
                    onSubmit={this.onSubmit}
                >
                    <div className="community-new-list__community">
                        <div className="community-new-list__community-label">
                            {tt('g.community_new')}
                        </div>
                        <div className="community-new-list__community-detail">
                            {tt('g.community_new_form')}
                        </div>
                        <div className="community-new-list__community-form">
                            <InputText
                                prelabel={tt('g.community')}
                                label={tt('g.please_enter', {
                                    data: tt('g.community'),
                                })}
                                onChange={this.onCommunityBodyChange}
                                placeholder={tt('g.please_enter', {
                                    data: tt('g.community'),
                                })}
                                value={repository.body}
                                focus={false}
                            />
                        </div>
                        <ImageUploadItem
                            className="community-new-list__community-image"
                            ref={'community-image'}
                            onChange={this.onCommunityPictureChange}
                            values={community_picture}
                        />
                    </div>
                    <div className="community-new-list__category">
                        <div className="community-new-list__category-switch">
                            <SwitchButton
                                active={new_category}
                                onChange={this.onNewCategoryChange}
                                title={tt('g.category_new')}
                            />
                        </div>
                        {!new_category ? (
                            <div>
                                <div className="community-new-list__category-label">
                                    {tt('g.category_choose')}
                                </div>
                                <div className="community-new-list__category-detail">
                                    {tt('g.category_new_form')}
                                </div>
                                <div className="community-new-list__category-form">
                                    <Select
                                        name="category-new"
                                        onChange={this.onCategoryBodySelect}
                                        options={options.toJS()}
                                        value={repository.Category.body}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="community-new-list__category-label">
                                    {tt('g.category_new')}
                                </div>
                                <div className="community-new-list__category-detail">
                                    {tt('g.category_new_form')}
                                </div>
                                <div className="community-new-list__category-form">
                                    <InputText
                                        prelabel={tt('g.category')}
                                        label={tt('g.please_enter', {
                                            data: tt('g.category'),
                                        })}
                                        onChange={this.onCategoryBodyChange}
                                        placeholder={tt('g.please_enter', {
                                            data: tt('g.category'),
                                        })}
                                        value={repository.Category.body}
                                        focus={false}
                                    />
                                </div>
                                <ImageUploadItem
                                    className="community-new-list__category-image"
                                    ref={'community-image'}
                                    onChange={this.onCategoryPictureChange}
                                    values={category_picture}
                                />
                            </div>
                        )}
                    </div>
                    <div className="community-new-list__detail">
                        {tt('g.community_new_detail')}
                    </div>
                    <div className="community-new-list__form-submit">
                        <GradationButton
                            submit={true}
                            value={tt('g.send')}
                            disabled={
                                submiting ||
                                repository.body.length <=
                                    data_config.heading_body_min_limit ||
                                repository.body.length >=
                                    data_config.heading_body_max_limit ||
                                repository.Category.body.length <=
                                    data_config.heading_body_min_limit ||
                                repository.Category.body.length >=
                                    data_config.heading_body_max_limit ||
                                (!new_category &&
                                    repositories.filter(
                                        val =>
                                            val.body == repository.Category.body
                                    ).length == 0)
                            }
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: communityActions.getReviewCommunity(state),
            repositories: categoryActions.getCategories(state),
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({
        review: community => {
            dispatch(communityActions.review({ community }));
        },
    })
)(CommunityNewList);
