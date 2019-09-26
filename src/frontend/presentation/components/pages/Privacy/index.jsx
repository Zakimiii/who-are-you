import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import config from '@constants/config';
import PrivacyItem from '@elements/PrivacyItem';

class Privacy extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Privacy');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <div className="privacy">
                <PrivacyItem />
            </div>
        );
    }
}
/*
                        <h2>第10条（お問い合わせ窓口）</h2>
                        <p>
                            本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。
                        </p>
                        <p>
                            住所：<br />
                            社名：<br />
                            担当部署：<br />
                            Eメールアドレス：<br />
                        </p>
*/

module.exports = {
    path: '/privacy',
    component: connect(
        (state, props) => {
            return {};
        },
        dispatch => ({})
    )(Privacy),
};
