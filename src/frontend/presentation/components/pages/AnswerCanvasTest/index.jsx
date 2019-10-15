import React from 'react';
import PropTypes from 'prop-types';
import AppPropTypes from '@extension/AppPropTypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import autobind from 'class-autobind';
import tt from 'counterpart';
import PictureItem from '@elements/PictureItem';
import Img from 'react-image';

class AnswerCanvasTest extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);
        autobind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(
            this,
            'AnswerCanvasTest'
        );
    }

    render() {
        return (
            <div
                className="answer-canvas"
                style={{
                    backgroundImage: "url('/images/brands/eye-catch-back.png')",
                }}
            >
                <div className="answer-canvas__container">
                    <div className="answer-canvas__user">
                        <div className="answer-canvas__user-image">
                            <PictureItem
                                url={
                                    'http://pbs.twimg.com/profile_images/1175304215427612672/azlHuabi_400x400.jpg'
                                }
                                width={64}
                                redius={32}
                            />
                        </div>
                        <div className="answer-canvas__user-title">
                            {'佐藤健さんの'}
                        </div>
                    </div>
                    <div className="answer-canvas__title">
                        {'「チャームポイント」'}
                    </div>
                    <div className="answer-canvas__border" />
                    <div className="answer-canvas__text">
                        {'めちゃくちゃかっこよすぎるんだよぼけがぁぁぁぁ'}
                    </div>
                </div>
                <Img
                    className="answer-canvas__image"
                    src={'/images/brands/who_are_you.png'}
                />
            </div>
        );
    }
}

module.exports = {
    path: '/answer/canvas/test',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {};
        }
    )(AnswerCanvasTest),
};
