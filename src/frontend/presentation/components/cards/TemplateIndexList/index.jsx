import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import { homeRoute, userShowRoute } from '@infrastructure/RouteInitialize';
import TemplateItem from '@modules/TemplateItem';
import Gallery from '@modules/Gallery';
import LoadingIndicator from '@elements/LoadingIndicator';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as userActions from '@redux/User/UserReducer';
import * as templateActions from '@redux/Template/TemplateReducer';
import * as appActions from '@redux/App/AppReducer';
import { isScrollEndByClass } from '@extension/scroll';

class TemplateIndexList extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {
        fetched: false,
    }

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'TemplateIndexList'
        );
    }

    componentWillMount() {
        if (process.env.BROWSER)
            window.addEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('scroll', this.onWindowScroll, false);
    }

    componentWillReceiveProps(nextProps) {
        const {
            more_loading,
            repositories,
        } = this.props;

        this.setState({
            fetched:
                more_loading &&
                !nextProps.more_loading &&
                repositories.length == nextProps.repositories.length,
        })
    }

    onWindowScroll() {
        const { getMore } = this.props;
        const { fetched } = this.state;
        const isEnd = isScrollEndByClass('user-show-list__body__items');
        if (isEnd && getMore && !fetched) getMore();
    }

    render() {
        const { repositories, loading, current_user, more_loading } = this.props;

        const renderItems = items =>
            items.map((item, key) => (
                <div className="user-show-list__body__template" key={key}>
                    <TemplateItem repository={item} show_user={current_user} />
                </div>
            ));

        return (
            <div className="template-index-list">
                <div className="user-show-list__body">
                    <div className="user-show-list__body__category">
                        {tt('g.trend_themes')}
                    </div>
                    <Gallery className="user-show-list__body__items">
                        {loading ? (
                            <div
                                style={{
                                    marginLeft: '48%',
                                    marginRight: '48%',
                                }}
                            >
                                <LoadingIndicator type={'circle'} />
                            </div>
                        ) : (
                            repositories &&
                            repositories.length > 0 &&
                            renderItems(repositories)
                        )}
                    </Gallery>
                    {more_loading && (
                        <center>
                            <LoadingIndicator
                                style={{ marginBottom: '2rem' }}
                                type={'circle'}
                            />
                        </center>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            loading: appActions.templateIndexPageLoading(state),
            repositories: templateActions.getHomeTemplate(state),
            current_user: authActions.getCurrentUser(state),
            more_loading: state.app.get('more_loading'),
        };
    },

    dispatch => ({
        getMoreTemplate: () => {
            dispatch(templateActions.getMoreHome());
        },
    })
)(TemplateIndexList);
