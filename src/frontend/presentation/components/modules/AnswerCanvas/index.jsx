import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import PictureItem from '@elements/PictureItem';
import models from '@network/client_models';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import canvas from '@network/canvas';
import { FileEntity, FileEntities } from '@entity';
import { Map } from 'immutable';
import Img from 'react-image';

class AnswerCanvas extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Answer,
        onShot: PropTypes.func,
    };

    static defaultProps = {
        repository: models.Answer.build(),
    };

    state = {
        mounted: false,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AnswerCanvas'
        );
    }

    componentDidMount() {
        const { repository } = this.props;
        const { mounted } = this.state;
        if (!repository || !repository.Heading) return;
        canvas.get_shot_by_url('answer-canvas').then(data => {
            this.setState({ mounted: !!data });
            !!data &&
                this.props.onShot &&
                this.props.onShot(Map(new FileEntity({ file: data }).toJSON()));
            // const img = new Image();
            // img.src = dataUrl;
            // document.body.appendChild(img);
        });
    }

    render() {
        const { repository } = this.props;
        const { mounted } = this.state;

        if (!repository || !repository.Heading) return <div />;

        return (
            <div
                className="answer-canvas__wrapper"
                style={{ display: mounted ? 'none' : 'block' }}
            >
                <div className="answer-canvas">
                    <div className="answer-canvas__user">
                        <div className="answer-canvas__user-image">
                            <PictureItem
                                url={repository.Heading.User.picture_small}
                                width={64}
                                redius={32}
                            />
                        </div>
                        <div className="answer-canvas__user-title">
                            {`${repository.Heading.User.nickname}の`}
                        </div>
                    </div>
                    <div className="answer-canvas__title">
                        {`「${repository.Heading.body}」`}
                    </div>
                    <div className="answer-canvas__border" />
                    <div className="answer-canvas__text">
                        {`${repository.body}`}
                    </div>
                    <Img
                        className="answer-canvas__image"
                        src={'/images/brands/who_are_you.png'}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {
            repository: answerActions.getScreenShotAnswer(state),
        };
    },

    dispatch => ({})
)(AnswerCanvas);
