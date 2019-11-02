import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import config from '@constants/config';

class Contact extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Contact');
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <div className="contact">
                <div className="contact__body">
                    <h1>お問い合わせ</h1>
                    <p>
                        {`このページは，${
                            config.INC_FULL_NAME
                        }（以下，「当社」といいます。）がこのウェブサイト「${
                            config.APP_NAME
                        }」および「${
                            config.APP_NAME
                        }」を通じて提供されるサービス（以下,「本サービス」といいます。）やその他の製品に関するお問い合わせ先を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」または「会員」といいます。）には、下記の連絡先から連絡をしていただくことで、本サービスに連絡する事ができます。下記に書いてある連絡先以外から当社に連絡しても、不当な連絡とみなすものとし、当社は連絡に応じません。`}
                    </p>
                    <h2>メールアドレス</h2>
                    <p>selfinity018@gmail.com</p>
                    <h2>Twitter</h2>
                    <p>企業アカウント: {'https://twitter.com/selfinity1'}</p>
                    <p>
                        経営者アカウント: {'https://twitter.com/zakimiii_shota'}
                    </p>
                    <h2>Facebook</h2>
                    <p>
                        企業アカウント:{' '}
                        {'https://www.facebook.com/Selfinity-108639923826680/'}
                    </p>
                    <p>
                        経営者アカウント:{' '}
                        {
                            'https://www.facebook.com/profile.php?id=100021830537085'
                        }
                    </p>
                    <h2>会社住所</h2>
                    <p>{config.INC_ADDRESS}</p>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: '/contact',
    component: connect(
        (state, props) => {
            return {};
        },
        dispatch => ({})
    )(Contact),
};
