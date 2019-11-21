import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import * as communityActions from '@redux/Community/CommunityReducer';
import models from '@network/client_models';
import dummy from '@network/dummy';
import Responsible from '@modules/Responsible';
import TwitterBar from '@elements/TwitterBar';
import data_config from '@constants/data_config';

class CommunityShowHeader extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Community,
        _repository: AppPropTypes.Community,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
        _repository: dummy.Community,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'CommunityShowHeader'
        );
    }

    componentWillReceiveProps(nextProps) {}

    render() {
        let { _repository } = this.props;

        if (!_repository) {
            _repository = dummy.Community;
        }

        return (
            <div className="user-show-header">
                <div
                    className="user-show-header__background"
                    style={{
                        backgroundImage: `url('${_repository.picture}')`,
                    }}
                >
                    <div className="user-show-header__background-filter" />
                </div>
                <div className="user-show-header__foreground">
                    <Responsible
                        className="user-show-header__image"
                        defaultContent={
                            <PictureItem
                                width={120}
                                radius={60}
                                url={_repository.picture}
                                rollback_url={data_config.default_community_image}
                            />
                        }
                        breakingContent={
                            <PictureItem
                                width={80}
                                radius={40}
                                url={_repository.picture}
                                rollback_url={data_config.default_community_image}
                            />
                        }
                        breakFm={true}
                    />
                    <div className="user-show-header__name">
                        {_repository.body}
                    </div>
                    <div className="user-show-header__detail">
                        {tt('g.number_of_heading', { data: _repository.heading_count || 0 }) + '\n' + tt('g.number_of_answer', { data: _repository.answer_count || 0 })}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            _repository: communityActions.bind(props.repository, state),
        };
    },

    dispatch => ({})
)(CommunityShowHeader);
