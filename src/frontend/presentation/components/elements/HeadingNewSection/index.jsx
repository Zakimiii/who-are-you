import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import GradationButton from '@elements/GradationButton';
import InputText from '@elements/InputText';
import * as headingActions from '@redux/Heading/HeadingReducer';
import models from '@network/client_models';
import prototype_data from '@locales/prototype/ja.json';

class HeadingNewSection extends React.Component {
    static propTypes = {
        repository: AppPropTypes.User,
    };

    static defaultProps = {
        repository: models.User.build(),
    };

    state = {
        n: 0,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'HeadingNewSection'
        );
    }

    componentWillMount() {
        const count = Object.keys(prototype_data.headings).length;
        this.setState({
            n: Number.prototype.getRandomInt(0, count - 1),
        });
    }

    onClick(e) {
        const { showNew, repository } = this.props;
        showNew(repository);
    }

    render() {
        const { n } = this.state;
        const { repository } = this.props;

        if (!repository) return <div />;

        return (
            <div className="heading-new-section">
                <div className="heading-new-section__user">
                    <div className="heading-new-section__user-image">
                        <PictureItem
                            url={repository.picture_small}
                            width={32}
                            redius={16}
                            alt={repository.nickname}
                        />
                    </div>
                    <div className="heading-new-section__user-title">
                        {tt('g.add_theme')}
                    </div>
                </div>
                <div className="heading-new-section__body">
                    <InputText
                        label={tt('g.example_theme', {
                            data: tt(`headings.${n}`),
                        })}
                        disabled={true}
                        onClick={this.onClick}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({
        showNew: user => {
            dispatch(
                headingActions.setNew({
                    heading: models.Heading.build({
                        User: user,
                        UserId: user.id,
                    }),
                })
            );
            dispatch(headingActions.showNew());
        },
    })
)(HeadingNewSection);
