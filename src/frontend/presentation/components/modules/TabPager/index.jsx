import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TabItem from '@elements/TabItem';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import { List } from 'immutable';

class TabPager extends React.Component {
    static propTypes = {
        repositories: PropTypes.object,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        repositories: List([]),
        onClick: () => {},
    };

    static pushURL(title, url) {
        browserHistory.push(url);
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'コンポーネントのクラス名'
        );
        this.onClickItem = (e, key) => {
            const { onClick } = props;
            let { selected_list } = this.state;
            let { repositories } = this.props;

            repositories = repositories.toJS();

            if (e) e.preventDefault();
            selected_list = selected_list.map(val => false);
            selected_list[key] = true;
            this.setState({
                selected_list,
            });

            TabPager.pushURL(repositories[key].title, repositories[key].url);
            if (onClick) onClick(e);
        };
        this.onClickItem.bind(this);
    }

    componentWillMount() {
        let { repositories } = this.props;
        repositories = repositories.toJS();
        const { getMode } = this;

        this.setState({
            selected_list: repositories.map((val, index) => {
                return getMode(val, index) == 'left';
            }),
        });
    }

    componentWillReceiveProps(nextProps) {
        const { pathname, search, hash } = this.props;
        let { repositories } = this.props;
        repositories = repositories.toJS();
        const url = pathname + (search || '') + (hash || '');
        if (repositories.filter(val => val.url == url).length > 0) {
            let { selected_list } = this.state;
            selected_list = selected_list.map(val => false);
            let index;
            repositories.map((val, i) => {
                if (val.url == url) index = i;
            });
            selected_list[index] = true;
            this.setState({
                selected_list,
            });
        }
    }

    getMode = (items, index) => {
        switch (true) {
            case index == 0:
                return 'left';
            case items.length - 1 == index:
                return 'right';
            default:
                return 'center';
        }
    };

    render() {
        let { repositories } = this.props;
        repositories = repositories.toJS();

        const { onClickItem } = this;

        const { selected_list } = this.state;

        const renderItem = items =>
            items.map((item, key) => (
                <div className={`tab-pager__item-${items.length}`} key={key}>
                    <TabItem
                        key={key}
                        key_index={key}
                        mode={this.getMode(items, key)}
                        title={item.title}
                        selected={selected_list[key]}
                        onClick={onClickItem}
                    />
                </div>
            ));
        return (
            <div className="tab-pager">
                {repositories.length > 0 && renderItem(repositories)}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const { pathname, search, hash } = browserHistory.getCurrentLocation();
        return {
            pathname,
            search,
            hash,
        };
    },

    dispatch => ({})
)(TabPager);
