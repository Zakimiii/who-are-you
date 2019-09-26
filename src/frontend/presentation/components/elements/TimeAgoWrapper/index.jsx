/* eslint react/prop-types: 0 */
import React from 'react';
import { FormattedRelative } from 'react-intl';
import { injectIntl } from 'react-intl';
import LoadingIndicator from '@elements/LoadingIndicator';

class TimeAgoWrapper extends React.Component {
    render() {
        let { date, className } = this.props;
        if (date && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d$/.test(date)) {
            date = date + 'Z'; // Firefox really wants this Z (Zulu)
        }
        const dt = new Date(date);
        if (dt == 'Invalid Date') {
            return (
                <span title={dt} className={className}>
                    <LoadingIndicator type="circle" />
                </span>
            );
        }
        const date_time = `${this.props.intl.formatDate(
            dt
        )} ${this.props.intl.formatTime(dt)}`;
        return (
            <span title={date_time} className={className}>
                <FormattedRelative {...this.props} value={date} />
            </span>
        );
    }
}

export default injectIntl(TimeAgoWrapper);
