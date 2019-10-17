import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Icon from '@elements/Icon';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import Ripple from '@elements/Ripple';
import { browserHistory } from 'react-router';
import Responsible from '@modules/Responsible';

class SettingMenuItem extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        url: PropTypes.string,
        image: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        title: '',
        url: '',
        image: 'chevron-next',
    };

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'SettingMenuItem'
        );
    }

    render() {
        const { title, image, url, onClick } = this.props;

        return (
            <Ripple>
                <Link
                    className="setting-menu-item__link"
                    onClick={e => {
                        if (onClick) onClick();
                    }}
                    to={url}
                >
                    <div className="setting-menu-item">
                        <div className="setting-menu-item__title">{title}</div>
                        <div className="setting-menu-item__image">
                            <Responsible
                                defaultContent={
                                    <Icon src={image} size={'2_4x'} />
                                }
                                breakingContent={
                                    <Icon src={image} size={'2x'} />
                                }
                                breakFm={true}
                            />
                        </div>
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
)(SettingMenuItem);
