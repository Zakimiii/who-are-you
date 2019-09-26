import React from 'react';
import PropTypes from 'prop-types';
import shouldComponentUpdate from '@extension/shouldComponentUpdate';

const rem_sizes = {
    '1x': '1.12',
    '1_5x': '1.5',
    '2x': '2',
    '2_4x': '2.4',
    '3x': '3',
    '3_4x': '4',
    '4x': '4.60',
    '5x': '5.75',
    '6x': '6.45',
    '7x': '7.45',
    '8x': '8.45',
    '10x': '10.0',
};

var pathRegexp = new RegExp('/icons/', 'g');
var extensionName = '.svg';
var extensionRegexp = new RegExp('/.svg/', 'g');

export default class Icon extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        size: PropTypes.oneOf([
            '1x',
            '1_5x',
            '2x',
            '2_4x',
            '3x',
            ('3_4x': '4'),
            '4x',
            '5x',
            '6x',
            '7x',
            '8x',
            '10x',
        ]),
        inverse: PropTypes.bool,
        className: PropTypes.string,
        forceStyle: PropTypes.object,
    };

    shouldComponentUpdate = shouldComponentUpdate(this, 'Icon');

    render() {
        const { src, size, className, forceStyle } = this.props;
        let name = src.replace(pathRegexp, '');
        name = src.replace(extensionName, '');
        let classes = 'Icon ' + name;
        let style = {
            display: 'inline-block',
            width: `${rem_sizes['1x']}rem`,
            height: `${rem_sizes['1x']}rem`,
        };
        if (size) {
            classes += ' Icon_' + size;
            style = {
                display: 'inline-block',
                width: `${rem_sizes[size]}rem`,
                height: `${rem_sizes[size]}rem`,
            };
        }
        if (className) {
            classes += ' ' + className;
        }

        if (forceStyle) {
            style = forceStyle;
        }

        return (
            <span
                className={classes}
                style={style}
                dangerouslySetInnerHTML={{
                    __html: require('@assets/icons/' + name + extensionName),
                }}
            />
        );
    }
}
