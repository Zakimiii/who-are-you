/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';
import HomeList from '@cards/HomeList';
import LoadingIndicator from '@elements/LoadingIndicator';
import * as appActions from '@redux/App/AppReducer';
import IndexComponent from '@pages/IndexComponent';
import canvas from '@network/canvas';

class Home extends React.Component {
    static pushURLState(title) {
        if (window) window.history.pushState({}, title, '/');
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'Home');
    }

    componentWillMount() {
        const { isHeaderVisible, location, addSuccess } = this.props;

        if (location.query.success_key) {
            addSuccess(tt(location.query.success_key));
            Home.pushURLState('Who are you?');
        }
    }

    componentDidMount() {
        canvas.get_template_shot();
        // const url1 = "http://localhost:8080/heading/id/canvas/";
        // function getByUrl(url, load){
        //   const xhr = new XMLHttpRequest()
        //   xhr.responseType  = "document"
        //   xhr.onload = function(e){ var dom = e.target.responseXML ;  load(dom)  }
        //   xhr.open("get", url)
        //   xhr.send()
        // }
        // getByUrl(url1, (dom) => {
        //     console.log(dom);
        //     const target = dom.getElementsByClassName("heading-canvas")[0];
        //     console.log(target)
        // });

        // var request = new XMLHttpRequest();
        // request.open("GET", url, true);
        // request.responseType = "document";
        // request.send("");
        // request.onreadystatechange = function() {
        //     if (request.readyState == 4 && request.status == 200) {
        //         var target = request.response.getElementsByClassName("heading-canvas")[0];
        //         console.log(target);
        //         const domtoimage = require('dom-to-image');
        //         domtoimage.toPng(target).then(dataUrl => {
        //             const img = new Image();
        //             img.src = dataUrl;
        //             document.body.appendChild(img);
        //         })
        //     }
        // }
    }

    render() {
        return (
            <IndexComponent>
                <HomeList />
            </IndexComponent>
        );
    }
}

module.exports = {
    path: '',
    component: connect(
        (state, ownProps) => {
            return {};
        },
        dispatch => {
            return {
                addSuccess: success =>
                    dispatch(
                        appActions.addSuccess({
                            success,
                        })
                    ),
            };
        }
    )(Home),
};
