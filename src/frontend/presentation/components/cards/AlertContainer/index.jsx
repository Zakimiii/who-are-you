import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import ReactDOM from 'react-dom';
import AlertMessages from '@modules/AlertMessages';
import Alert from '@elements/Alert';
import tt from 'counterpart';

class AlertContainer extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AlertContainer'
        );
    }

    render() {
        const {} = this.props;

        return <div />;

        // return (
        //     <div className="alert-container">
        //     </div>
        // );
    }
}

/*
{show_accept_alert && (
    <AlertMessages>
        <Alert
            onCancel={() =>
                denyRequest(solving_requests[0], show_content)
            }
            onComplete={() =>
                acceptRequest(solving_requests[0], show_content)
            }
            onClose={hideAcceptAlert}
            isTimeLimit={false}
            title={tt('g.alert_request_title')}
            message={tt('g.alert_request_desc')}
            cancelText={tt('g.repayout')}
            completeText={tt('g.payout')}
        />
    </AlertMessages>
)}
*/

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(AlertContainer);
