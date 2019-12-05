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
    communityAnswerShowRoute,
    communityHeadingShowRoute,
} from '@infrastructure/RouteInitialize';
import models from '@network/client_models';
import TwitterHandler from '@network/twitter';
import config from '@constants/config';
import data_config from '@constants/data_config';

class CommunityShareButton extends React.Component {
    static propTypes = {
        repository: PropTypes.object,
    };

    static defaultProps = {
        repository: null,
    };

    static url = (pathname, text) => TwitterHandler.getShareWithoutMentionUrl({ pathname, text });

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'CommunityShareButton');
    }

    render() {
        const { repository } = this.props;

        if (!repository) return <div />;

        if (!models.CommunityHeading.isInstance(repository) && !repository.Heading)
            return <div />;

        const link = models.CommunityHeading.isInstance(repository)
            ? CommunityShareButton.url(
                  communityHeadingShowRoute.getPath({
                      params: {
                          id: repository.id,
                      },
                  }),
                  repository.Community.body
              )
            : CommunityShareButton.url(
                  communityAnswerShowRoute.getPath({
                      params: {
                          id: repository.id,
                      },
                  }),
                  repository.Heading.Community.body
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
)(CommunityShareButton);
