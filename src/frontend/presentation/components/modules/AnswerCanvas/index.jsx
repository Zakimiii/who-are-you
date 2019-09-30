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
        if (!process.env.BROWSER) return false;
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
        const { mounted } = this.state;

        return (
            <div
                className="answer-canvas__wrapper"
                style={{ display: mounted ? 'none' : 'block' }}
            >
                <div className="answer-canvas">
                    <div className="answer-canvas__user">
                        <div className="answer-canvas__user-image">
                            <PictureItem
                                url={
                                    'https://pbs.twimg.com/profile_images/1175304215427612672/azlHuabi_400x400.jpg'
                                }
                                width={64}
                                redius={32}
                            />
                        </div>
                        <div className="answer-canvas__user-title">
                            {'佐藤健さんの「チャームポイント」'}
                        </div>
                    </div>
                    <div className="answer-canvas__border" />
                    <div className="answer-canvas__text">
                        {'めちゃくちゃかっこいい'}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        return {};
    },

    dispatch => ({})
)(AnswerCanvas);
