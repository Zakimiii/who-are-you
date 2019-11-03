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
import * as templateActions from '@redux/Template/TemplateReducer';
import AddHeadingButton from '@elements/AddHeadingButton';

class TemplateItem extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Template,
        _repository: AppPropTypes.Template,
    };

    static defaultProps = {
        repository: models.Template.build,
        _repository: models.Template.build,
    };

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'TemplateItem'
        );
    }

    render() {
        const { _repository } = this.props;

        return (
            <div
                className="template-item"
                style={{
                    backgroundImage: "url('/images/brands/eye-catch-back.png')",
                }}
            >
                <div className="template-item__head">
                    <div className="template-item__head__text">
                        {tt('g.your')}
                    </div>
                    <div className="template-item__head__count">
                        {tt('g.count_theme', {
                            data: _repository.count,
                        })}
                    </div>
                </div>
                <div className="template-item__body">
                    {`「${_repository.body}」`}
                </div>
                <div className="template-item__button">
                    <AddHeadingButton repository={_repository} />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            current_user: authActions.getCurrentUser(state),
            _repository: templateActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(TemplateItem);
