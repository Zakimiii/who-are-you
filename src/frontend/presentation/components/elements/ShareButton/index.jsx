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
import models from '@network/client_model';
import TwitterHandler from '@network/twitter';
import config from '@constants/config';
import data_config from '@constants/data_config';

class ShareButton extends React.Component {
    static propTypes = {
        repository: PropTypes.oneOf([
            AppPropTypes.Heading,
            AppPropTypes.Answer,
        ]),
    };

    static defaultProps = {
        repository: null,
    };

    static url = pathname =>
        `https://twitter.com/intent/tweet?url=${config.CURRENT_APP_URL +
            pathname}&hashtags=whoareyou,自己紹介・友達紹介&text=${data_config.post_text()}`;

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'ShareButton');
    }

    render() {
        const { repository } = this.props;

        if (!repository) return <div />;

        return (
            <Link
                className="share-button"
                to={ShareButton.url(
                    models.Heading.isInstance(repository)
                        ? headingShowRoute.getPath({
                              params: {
                                  id: repository.id,
                              },
                          })
                        : answerShowRoute.getPath({
                              params: {
                                  id: repository.id,
                              },
                          })
                )}
            >
                <Icon src="share" size="2_4x" />
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
