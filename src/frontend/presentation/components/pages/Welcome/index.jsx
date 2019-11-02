import React from 'react';
import IndexComponentImpl from '@pages/IndexComponent';
import WelcomeList from '@cards/WelcomeList';

class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome">
                <WelcomeList />
            </div>
        );
    }
}

module.exports = {
    path: 'welcome',
    component: Welcome,
};
