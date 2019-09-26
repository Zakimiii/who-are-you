import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import {
    breakpointXs,
    breakpointSm,
    breakpointFm,
    breakpointMd,
    breakpointLg,
    breakpointXl,
    breakpointXxl,
    getWindowSize,
} from '@network/window';
import classNames from 'classnames';

class Responsible extends React.Component {
    static propTypes = {
        breakXs: PropTypes.bool,
        breakSm: PropTypes.bool,
        breakFm: PropTypes.bool,
        breakMd: PropTypes.bool,
        breakLg: PropTypes.bool,
        breakXl: PropTypes.bool,
        breakXxl: PropTypes.bool,
        defaultContent: PropTypes.node,
        breakingContent: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        breakXs: false,
        breakSm: false,
        breakFm: false,
        breakMd: false,
        breakLg: false,
        breakXl: false,
        breakXxl: false,
    };

    state = {
        xs: false,
        sm: false,
        fm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Responsible');
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        var size = getWindowSize();
        const {
            breakXs,
            breakSm,
            breakFm,
            breakMd,
            breakLg,
            breakXl,
            breakXxl,
            defaultIcon,
        } = this.props;

        this.setState({
            xs: size.width < breakpointXs,
            sm: size.width < breakpointSm,
            fm: size.width < breakpointFm,
            md: size.width < breakpointMd,
            lg: size.width < breakpointLg,
            xl: size.width < breakpointXl,
            xxl: size.width < breakpointXxl,
        });
    }

    componentWillMount() {
        this.handleResize();
        if (process.env.BROWSER)
            window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const {
            breakXs,
            breakSm,
            breakFm,
            breakMd,
            breakLg,
            breakXl,
            breakXxl,
            defaultContent,
            breakingContent,
            className,
        } = this.props;

        const { xs, sm, fm, md, lg, xl, xxl } = this.state;

        const breaking =
            (xs && breakXs) ||
            (sm && breakSm) ||
            (fm && breakFm) ||
            (md && breakMd) ||
            (lg && breakLg) ||
            (xl && breakXl) ||
            (xxl && breakXxl);

        return (
            <div className={classNames('responsible-button', className)}>
                {breaking ? breakingContent : defaultContent}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(Responsible);
