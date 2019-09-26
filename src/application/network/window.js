export function getWindowSize() {
    if (!process.env.BROWSER)
        return {
            width: 0,
            height: 0,
        };
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = w.innerWidth || e.clientWidth || g.clientWidth,
        h = w.innerHeight || e.clientHeight || g.clientHeight;
    return {
        width: w,
        height: h,
    };
}

export const breakpointXs = 300;
export const breakpointSm = 400;
export const breakpointFm = 560;
export const breakpointMd = 768;
export const breakpointLg = 1000;
export const breakpointXl = 1200;
export const breakpointXxl = 1380;
