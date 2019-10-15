import React from 'react';
import { Link } from 'react-router';
import Icon from '@elements/Icon';
import * as routes from '@infrastructure/RouteInitialize';
import Img from 'react-image';
import tt from 'counterpart';

class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <div className="not-found__body">
                    <div className="not-found__body__logo">
                        <Img
                            className="not-found__body__logo-image"
                            src="/images/brands/who-are-you_logo.png"
                            alt={tt('alts.default')}
                        />
                    </div>
                    <div className="not-found__body__title">
                        {'Sorry, that page doesn’t exist!'}
                    </div>
                    <Link className="not-found__body__to-home" to={'/'}>
                        {'Home →'}
                    </Link>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: '*',
    component: NotFound,
};
