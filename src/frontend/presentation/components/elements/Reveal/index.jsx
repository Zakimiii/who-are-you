import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-overlays/lib/Modal';
import Transition from 'react-overlays/lib/Transition';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';

class Reveal extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Reveal');
        autobind(this);
    }

    componentDidMount() {
        if (process.env.BROWSER)
            window.addEventListener(
                'touchmove',
                e => {
                    e.preventDefault();
                },
                true
            );
    }

    componentWillUnmount() {
        if (process.env.BROWSER)
            window.removeEventListener(
                'touchmove',
                e => {
                    e.preventDefault();
                },
                true
            );
    }

    render() {
        const { children, onHide, show, nightmodeEnabled } = this.props;

        const modalStyle = {
            bottom: 0,
            left: 0,
            overflowY: 'scroll',
            position: 'fixed',
            right: 0,
            top: 0,
            display: 'block',
            zIndex: 105,
        };

        const themeClass = nightmodeEnabled ? ' theme-dark' : ' theme-original';

        return (
            <Modal
                backdrop={true}
                transition={Transition}
                onHide={onHide}
                show={show}
                backdropClassName={'reveal-overlay'}
                backdropStyle={{ display: 'block' }}
                style={modalStyle}
                className={'reveal-modal'}
            >
                <div
                    className={'reveal fade-in--1 ' + themeClass}
                    role={'document'}
                    tabIndex={'-1'}
                    style={{ display: 'block' }}
                >
                    {children}
                </div>
            </Modal>
        );
    }
}

Reveal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default connect(
    state => {
        return {
            nightmodeEnabled: state.app.getIn([
                'user_preferences',
                'nightmode',
            ]),
        };
    },
    dispatch => ({})
)(Reveal);
