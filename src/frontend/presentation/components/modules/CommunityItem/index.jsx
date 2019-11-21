import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import models from '@network/client_models';
import { communityShowRoute } from '@infrastructure/RouteInitialize';
import * as communityActions from '@redux/Community/CommunityReducer';
import Img from 'react-image';
import data_config from '@constants/data_config';

class CommunityItem extends React.Component {

    static propTypes = {
        repository: AppPropTypes.Community,
    };

    static defaultProps = {
        repository: null,
    };

    state = {
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityItem')
    }

    render() {
        const {
            _repository,
        } = this.props;

        if (!_repository) return <div/>

        return (
            <Link
                className="community-item"
                to={communityShowRoute.getPath({
                    params: {
                        id: _repository.id
                    }
                })}
            >
                  <div className="community-item__back">
                      <Img
                          src={`/pictures/community/${_repository.id}`}
                          className="community-item__back-image"
                          unloader={
                              <img
                                  className="community-item__back-image"
                                  src={data_config.default_community_image}
                                  alt={_repository.body}
                              />
                          }
                          alt={_repository.body}
                      />
                  </div>
                  <div className="community-item__foot">
                      <div className="community-item__foot-title">
                          {_repository.body}
                      </div>
                  </div>
            </Link>
        )
    }
}

export default connect(
    (state, props) => {
        return {
            _repository: communityActions.bind(props.repository, state),
        };
    },

    dispatch => ({
    })
)(CommunityItem);
