import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import Icon from '@elements/Icon';
import {
    answerShowRoute,
    headingShowRoute,
} from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import TwitterHandler from '@network/twitter';
import config from '@constants/config';
import data_config from '@constants/data_config';

class ShareButton extends React.Component {
    static propTypes = {
        repository: PropTypes.object,
    };

    static defaultProps = {
        repository: null,
    };

    static url = (pathname, id) => TwitterHandler.getShareUrl({ pathname, id });

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'ShareButton');
    }

    render() {
        const { repository } = this.props;

        if (!repository) return <div />;

        if (!models.Heading.isInstance(repository) && !repository.Heading)
            return <div />;

        const link = models.Heading.isInstance(repository)
            ? ShareButton.url(
                  headingShowRoute.getPath({
                      params: {
                          id: repository.id,
                      },
                  }),
                  repository.User.twitter_username
              )
            : ShareButton.url(
                  answerShowRoute.getPath({
                      params: {
                          id: repository.id,
                      },
                  }),
                  repository.Heading.User.twitter_username
              );

        return (
            <Link
                className="share-button"
                to={link}
                target={'_blank'}
                onClick={e => e.stopPropagation()}
            >
                <Icon src="share" size="2_4x" className="share-button__icon" />
            </Link>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(ShareButton);
