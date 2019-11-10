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
import classNames from 'classnames';
import autobind from 'class-autobind';
import tt from 'counterpart';

class AnswerCanvas extends React.Component {
    static propTypes = {
        repository: AppPropTypes.Answer,
        onShot: PropTypes.func,
    };

    static defaultProps = {
        repository: models.Answer.build(),
    };

    static Slimit = 62;
    static Mlimit = 93;
    static Llimit = 124;
    static limit = 155;

    state = {
        mounted: false,
    };

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AnswerCanvas'
        );
    }

    componentDidMount() {
        const { repository, onShot } = this.props;
        const { mounted } = this.state;
        if (!repository || !repository.Heading) return;
        canvas.get_shot_by_url('answer-canvas').then(data => {
            this.setState({ mounted: !!data });
            !!data &&
                onShot &&
                onShot(Map(new FileEntity({ file: data }).toJSON()));
            // const img = new Image();
            // img.src = dataUrl;
            // document.body.appendChild(img);
        });
    }

    getSize(text) {
        const n = text.length;
        if (n > 0 && n < AnswerCanvas.Slimit) {
            return 'S';
        } else if (n > AnswerCanvas.Slimit && n < AnswerCanvas.Mlimit) {
            return 'M';
        } else {
            return 'L';
        }
    }

    adjustTest(text) {
        text = text.replace('\n', ' ');
        const n = text.length;
        if (n > 0 && n < AnswerCanvas.limit) {
            return text;
        } else {
            return (
                text.slice(0, AnswerCanvas.limit) +
                '...\nつづきはWho are youで！'
            );
        }
    }

    onLoadProfile(e) {
        // if (e) e.preventDefault();
        // const { repository, onShot } = this.props;
        // const { mounted } = this.state;
        // if (!repository || !repository.Heading) return;
        // canvas.get_shot_by_url('answer-canvas').then(data => {
        //     this.setState({ mounted: !!data });
        //     !!data &&
        //         onShot &&
        //         onShot(Map(new FileEntity({ file: data }).toJSON()));
        //     // const img = new Image();
        //     // img.src = dataUrl;
        //     // document.body.appendChild(img);
        // });
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
                        <div className="answer-canvas__user-title">
                            {tt('g.of', {
                                data: repository.Heading.User.nickname,
                            }) + '　'}
                        </div>
                    </div>
                    <div className="answer-canvas__title">
                        {`${models.Heading.getBody(repository.Heading)}`}
                    </div>
                    <div className="answer-canvas__border" />
                    <div
                        className={classNames(
                            'answer-canvas__text',
                            this.getSize(repository.body)
                        )}
                    >
                        {`${this.adjustTest(repository.body)}`}
                    </div>
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
