import Entity from '@entity/Entity';
import { Enum, defineEnum } from '@extension/Enum';

export const color_white = '#fff';
export const color_clear_white = 'rgba(255,255,255,0.7)';
export const color_black = '#000';
export const blur_black = 'rgba(0,0,0,0.5)';
export const color_clear_black = 'rgba(0,0,0,0.3)';
export const color_orenge = '#FFA500';
export const color_red_orenge = '#F87A1E';
export const color_gold = '#DAA520';
export const color_red = '#ff0264';
export const color_blue = '#13B4FC';
export const color_clear_blue = 'rgba(19,180,252,0.5)';
export const color_light_gray = '#F4F4F4';
export const color_gray = '#666666';
export const color_gradation_bright_blue = '#13FCD8';
export const color_gradation_dark_blue = '#1C8DFF';
export const color_gradation_bright_red = '#FFE943';
export const color_gradation_dark_red = color_red;
export const color_gradation_bright_orenge = color_orenge;
export const color_gradation_dark_orenge = color_gold;

export function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

export const COLOR = defineEnum({
    Base: {
        rawValue: 0,
        value: '',
        color: color_orenge,
    },
    Red: {
        rawValue: 1,
        value: 'red',
        color: color_red,
    },
    Blue: {
        rawValue: 2,
        value: 'blue',
        color: color_blue,
    },
    White: {
        rawValue: 3,
        value: '',
        color: color_white,
    },
});

module.exports = {
    color_white,
    color_clear_white,
    color_black,
    blur_black,
    color_clear_black,
    color_orenge,
    color_red_orenge,
    color_gold,
    color_red,
    color_blue,
    color_clear_blue,
    color_light_gray,
    color_gray,
    color_gradation_bright_blue,
    color_gradation_dark_blue,
    color_gradation_bright_red,
    color_gradation_dark_red,
    color_gradation_bright_orenge,
    color_gradation_dark_orenge,
    COLOR,
    rgbToHex,
    hexToRgb,
};
