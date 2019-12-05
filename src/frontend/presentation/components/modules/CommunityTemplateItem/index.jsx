import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link, browswerHistory } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import models from '@network/client_models';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as communityTemplateActions from '@redux/CommunityTemplate/CommunityTemplateReducer';
import AddCommunityHeadingButton from '@elements/AddCommunityHeadingButton';

class CommunityTemplateItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.CommunityTemplate,
        _repository: AppPropTypes.CommunityTemplate,
        show_user: AppPropTypes.Community,
    };

    static defaultProps = {
        repository: models.CommunityTemplate.build,
        _repository: models.CommunityTemplate.build,
        show_community: null,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityTemplateItem'
        );
    }

    render() {
        const { _repository, show_community } = this.props;

        return (
            <div
                className="template-item"
                style={{
                    backgroundImage: "url('/images/brands/eye-catch-back.png')",
                }}
            >
                <div className="template-item__head">
                    {/*<div className="template-item__head-text">
                        {tt('g.your')}
                    </div>*/}
                    <div className="template-item__head-count">
                        {tt('g.count_theme', {
                            data: _repository.count,
                        })}
                    </div>
                </div>
                <div className="template-item__body">
                    {`「${_repository.body}」`}
                </div>
                <div className="template-item__button">
                    <AddCommunityHeadingButton
                        show_community={show_community}
                        repository={_repository}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            current_user: authActions.getCurrentUser(state),
            _repository: communityTemplateActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(CommunityTemplateItem);
