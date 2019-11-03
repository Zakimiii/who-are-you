import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Ripple from '@elements/Ripple';

class TabItem extends React.Component {
    static propTypes = {
        mode: PropTypes.oneOf(['left', 'center', 'right']),
        title: PropTypes.string,
        onClick: PropTypes.func,
        selected: PropTypes.bool,
        key_index: PropTypes.number,
    };

    static defaultProps = {
        mode: 'center',
        title: '',
        selected: false,
        onClick: () => {},
    };

    constructor(props) {
        super(props);
        this.onClick = e => {
            const { onClick, key_index } = this.props;
            if (onClick) onClick(e, key_index);
        };
        this.onClick.bind(this);
    }

    componentWillMount() {}

    shouldComponentUpdate(nextProps, nextState) {
        const { mode, title, selected, onClick } = this.props;
        const n = nextProps;
        return (
            mode !== n.mode ||
            title !== n.title ||
            selected !== n.selected ||
            onClick !== n.onClick
        );
    }

    render() {
        const { mode, title, selected } = this.props;

        const { onClick } = this;

        const tabitem__classnames = classNames({
            'tab-item-left': mode == 'left',
            'tab-item-center': mode == 'center',
            'tab-item-right': mode == 'right',
            active: selected,
        });

        return (
            <Ripple>
                <Link className="tab-item__link" onClick={onClick}>
                    <div className={tabitem__classnames}>
                        <div className="tab-item__text">{title}</div>
                    </div>
                </Link>
            </Ripple>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(TabItem);
