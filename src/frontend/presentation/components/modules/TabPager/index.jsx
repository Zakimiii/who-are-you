import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import TabItem from '@elements/TabItem';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';

class TabPager extends React.Component {
    static propTypes = {
        repositories: PropTypes.array,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        repositories: [],
        onClick: () => {},
    };

    static pushURL(title, url) {
        browserHistory.push(url);
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'TabPager');
        this.onClickItem = (e, key) => {
            const { onClick } = props;
            let { selected_list } = this.state;
            const { repositories } = this.props;

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
        const { repositories } = this.props;
        const { getMode } = this;

        this.setState({
            selected_list: repositories.map((val, index) => {
                return getMode(val, index) == 'left';
            }),
        });
    }

    componentWillReceiveProps(nextProps) {
        const { repositories } = this.props;
        const { pathname, search } = browserHistory.getCurrentLocation();
        const url = pathname + (search || '');
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
        // url == repositories[key].url
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
        const { repositories } = this.props;

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
        return {};
    },

    dispatch => ({})
)(TabPager);
