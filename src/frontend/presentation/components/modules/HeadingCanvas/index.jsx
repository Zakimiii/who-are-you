import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import PictureItem from '@elements/PictureItem';
import models from '@network/client_models';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import canvas from '@network/canvas';
import { FileEntity, FileEntities } from '@entity';
import { Map } from 'immutable';
import Img from 'react-image';
import autobind from 'class-autobind';
import tt from 'counterpart';

class HeadingCanvas extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Heading,
        onShot: PropTypes.func,
    };

    static defaultProps = {
        repository: models.Heading.build(),
    };

    state = {
        mounted: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'HeadingCanvas'
        );
    }

    componentDidMount() {
        const { repository, onShot } = this.props;
        const { mounted } = this.state;
        if (!process.env.BROWSER) return;
        if (!repository || !repository.User) return;
        canvas.get_shot_by_url('heading-canvas').then(data => {
            this.setState({ mounted: !!data });
            !!data &&
                !!onShot &&
                onShot(Map(new FileEntity({ file: data }).toJSON()));
            // const img = new Image();
            // img.src = dataUrl;
            // document.body.appendChild(img);
        });
    }

    onLoadProfile(e) {
        // if (e) e.preventDefault();
        // const { repository, onShot } = this.props;
        // const { mounted } = this.state;
        // if (!process.env.BROWSER) return;
        // if (!repository || !repository.User) return;
        // canvas.get_shot_by_url('heading-canvas').then(data => {
        //     this.setState({ mounted: !!data });
        //     !!data &&
        //         !!onShot &&
        //         onShot(Map(new FileEntity({ file: data }).toJSON()));
        //     // const img = new Image();
        //     // img.src = dataUrl;
        //     // document.body.appendChild(img);
        // });
    }

    render() {
        const { repository } = this.props;
        const { mounted } = this.state;

        if (!repository || !repository.User) return <div />;

        return (
            <div
                className="heading-canvas__wrapper"
                style={{ display: mounted ? 'none' : 'block' }}
            >
                <div className="heading-canvas">
                    <div className="heading-canvas__container">
                        <div className="heading-canvas__user">
                            <div className="heading-canvas__user-title">
                                {
                                    repository.User
                                        .nickname /*tt('g.of', { data: repository.User.nickname })*/
                                }
                            </div>
                        </div>
                        <div className="heading-canvas__title">
                            {`「${models.Heading.getBody(repository)}」`}
                        </div>
                        <div className="heading-canvas__text">
                            {tt('g.wanted_answer', {
                                data: repository.User.nickname,
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: headingActions.getScreenShotHeading(state),
        };
    },

    dispatch => ({})
)(HeadingCanvas);
