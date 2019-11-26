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
import { Map } from 'immutable';
import InputText from '@elements/InputText';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import Responsible from '@modules/Responsible';

class CommunityNewList extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    state = {
        repository: Map(models.Community.build()),
        submiting: false,
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityNewList')
    }

    componentWillMount() {
        this.setState({
            repository: Map(this.props.repository),
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
        let { repository } = this.state;

        repository = repository.toJS();
        repository.picture = e;

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
        let { repository } = this.state;

        repository = repository.toJS();
        repository.Category.picture = e;

        this.setState({
            repository: Map(repository),
        });
    }

    onSubmit(e) {
        if (e.preventDefault) e.preventDefault();

        let { repository } = this.state;

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

        review(Map(repository));
    }

    render() {
        return (
            <div className="community-new-list" >
            </div>
        )
    }
}

export default connect(
    (state, props) => {
        return {
            repository: communityActions.getReviewCommunity(state),
            current_user: authActions.getCurrentUser(state),
        };
    },

    dispatch => ({
        review: community => {
            dispatch(communityActions.review({ community }));
        },
    })
)(CommunityNewList);
