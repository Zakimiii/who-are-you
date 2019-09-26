import { useScroll } from 'react-router-scroll';
import ScrollBehavior from 'scroll-behavior';

const calcOffsetRoot = startEl => {
    let offset = 0;
    let el = startEl;
    while (el) {
        offset += el.offsetTop;
        el = el.offsetParent;
    }
    return offset;
};

//BEGIN: SCROLL CODE
/**
 * The maximum number of times to attempt scrolling to the target element/y position
 * (total seconds of attempted scrolling is given by (SCROLL_TOP_TRIES * SCROLL_TOP_DELAY_MS)/1000 )
 * @type {number}
 */
const SCROLL_TOP_TRIES = 50;
/**
 * The number of milliseconds to delay between scroll attempts
 * (total seconds of attempted scrolling is given by (SCROLL_TOP_TRIES * SCROLL_TOP_DELAY_MS)/1000 )
 * @type {number}
 */
const SCROLL_TOP_DELAY_MS = 100;
/**
 * The size of the vertical gap between the bottom of the fixed header and the top of the scrolled-to element.
 * @type {number}
 */
const SCROLL_TOP_EXTRA_PIXEL_OFFSET = 3;
/**
 * number of pixels the document can move in the 'wrong' direction (opposite of intended scroll) this covers accidental scroll movements by users.
 * @type {number}
 */
const SCROLL_FUDGE_PIXELS = 10;
/**
 * if document is being scrolled up this is set for prevDocumentInfo && documentInfo
 * @type {string}
 */
const SCROLL_DIRECTION_UP = 'up';
/**
 * if document is being scrolled down this is set for prevDocumentInfo && documentInfo
 * @type {string}
 */
const SCROLL_DIRECTION_DOWN = 'down';

/**
 * If an element with this id is present, the page does not want us to detect navigation history direction (clicking links/forward button or back button)
 * @type {string}
 */
const DISABLE_ROUTER_HISTORY_NAV_DIRECTION_EL_ID =
    'disable_router_nav_history_direction_check';

let scrollTopTimeout = null;

/**
 * raison d'être: support hash link navigation into slow-to-render page sections.
 *
 * @param {htmlElement} el - the element to which we wish to scroll
 * @param {number} topOffset - number of pixels to add to the scroll. (would be a negative number if fixed header)
 * @param {Object} prevDocumentInfo -
 *          .scrollHeight {number} - document.body.scrollHeight
 *          .scrollTop {number} - ~document.scrollingElement.scrollTop
 *          .scrollTarget {number} - the previously calculated scroll target
 * @param {number} triesRemaining - number of attempts remaining
 */
const scrollTop = (el, topOffset, prevDocumentInfo, triesRemaining) => {
    const documentInfo = {
        scrollHeight: document.body.scrollHeight,
        scrollTop: Math.ceil(document.scrollingElement.scrollTop),
        scrollTarget: calcOffsetRoot(el) + topOffset,
        direction: prevDocumentInfo.direction,
    };
    let doScroll = false;
    //for both SCROLL_DIRECTION_DOWN, SCROLL_DIRECTION_UP
    //We scroll if the document has 1. not been deliberately scrolled, AND 2. we have not passed our target scroll,
    //NOR has the document changed in a meaningful way since we last looked at it
    if (prevDocumentInfo.direction === SCROLL_DIRECTION_DOWN) {
        doScroll =
            prevDocumentInfo.scrollTop <=
                documentInfo.scrollTop + SCROLL_FUDGE_PIXELS &&
            (documentInfo.scrollTop < documentInfo.scrollTarget ||
                prevDocumentInfo.scrollTarget < documentInfo.scrollTarget ||
                prevDocumentInfo.scrollHeight < documentInfo.scrollHeight);
    } else if (prevDocumentInfo.direction === SCROLL_DIRECTION_UP) {
        doScroll =
            prevDocumentInfo.scrollTop >=
                documentInfo.scrollTop - SCROLL_FUDGE_PIXELS &&
            (documentInfo.scrollTop > documentInfo.scrollTarget ||
                prevDocumentInfo.scrollTarget > documentInfo.scrollTarget ||
                prevDocumentInfo.scrollHeight > documentInfo.scrollHeight);
    }

    if (doScroll) {
        window.scrollTo(0, documentInfo.scrollTarget);
        if (triesRemaining > 0) {
            scrollTopTimeout = setTimeout(
                () =>
                    scrollTop(el, topOffset, documentInfo, triesRemaining - 1),
                SCROLL_TOP_DELAY_MS
            );
        }
    }
};

/**
 * Custom scrolling behavior needed because we have chunky page loads and a fixed header.
 */
class OffsetScrollBehavior extends ScrollBehavior {
    /**
     * Raison d'être: on hash link navigation, assemble the needed info and pass it to scrollTop()
     * In cases where we're scrolling to a pixel offset, adjust the offset for the current header, and punt to default behavior.
     */
    scrollToTarget(element, target) {
        clearTimeout(scrollTopTimeout); //it's likely this will be called multiple times in succession, so clear and existing scrolling.
        const header = document.getElementsByTagName('header')[0]; //this dimension ideally would be pulled from a scss file.
        let topOffset = SCROLL_TOP_EXTRA_PIXEL_OFFSET * -1;
        if (header) {
            topOffset += header.offsetHeight * -1;
        }
        const newTarget = []; //x coordinate
        let el = false;
        if (typeof target === 'string') {
            el = document.getElementById(target.substr(1));
            if (!el) {
                el = document.getElementById(target);
            }
        } else {
            newTarget.push(target[0]);
            if (target[1] + topOffset > 0) {
                newTarget.push(target[1] + topOffset);
            } else {
                newTarget.push(0);
            }
        }

        if (el) {
            const documentInfo = {
                scrollHeight: document.body.scrollHeight,
                scrollTop: Math.ceil(document.scrollingElement.scrollTop),
                scrollTarget: calcOffsetRoot(el) + topOffset,
            };
            documentInfo.direction =
                documentInfo.scrollTop < documentInfo.scrollTarget
                    ? SCROLL_DIRECTION_DOWN
                    : SCROLL_DIRECTION_UP;
            scrollTop(el, topOffset, documentInfo, SCROLL_TOP_TRIES); //this function does the actual work of scrolling.
        } else {
            super.scrollToTarget(element, newTarget);
        }
    }
}

export default useScroll({
    createScrollBehavior: config => new OffsetScrollBehavior(config), //information assembler for has scrolling.
    shouldUpdateScroll: (prevLocation, { location }) => {
        // eslint-disable-line no-shadow
        //if there is a hash, we may want to scroll to it
        if (location.hash) {
            //if disableNavDirectionCheck exists, we want to always navigate to the hash (the page is telling us that's desired behavior based on the element's existence
            const disableNavDirectionCheck = document.getElementById(
                DISABLE_ROUTER_HISTORY_NAV_DIRECTION_EL_ID
            );
            //we want to navigate to the corresponding id=<hash> element on 'PUSH' navigation (prev null + POP is a new window url nav ~= 'PUSH')
            if (
                disableNavDirectionCheck ||
                (prevLocation === null && location.action === 'POP') ||
                location.action === 'PUSH'
            ) {
                return location.hash;
            }
        }
        return true;
    },
});

export function isScrollEndByClass(classname) {
    if (!process.env.BROWSER) return false;
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByClassName(classname)[0];
    if (!g) return false;
    const { top, height } = g.getBoundingClientRect();
    return top + height <= w.innerHeight;
}

export function isXScrollEndByClass(classname) {
    if (!process.env.BROWSER) return false;
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByClassName(classname)[0];
    if (!g) return false;
    const { scrollLeft, offsetWidth } = g;
    const { width, right, x } = g.getBoundingClientRect();
    var children = g.children;
    var totalWidth = 0;
    for (var i = 0; i < children.length; i++) {
        totalWidth += children[i].offsetWidth;
    }
    return width + scrollLeft <= totalWidth;
}

export function isXScrollStartByClass(classname) {
    if (!process.env.BROWSER) return false;
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByClassName(classname)[0];
    if (!g) return false;
    const { scrollLeft } = g;
    const { width } = g.getBoundingClientRect();
    return scrollLeft == 0;
}

export function isXScrollEnableByClass(classname) {
    if (!process.env.BROWSER) return false;
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByClassName(classname)[0];
    if (!g) return false;
    const { scrollLeft } = g;
    const { width } = g.getBoundingClientRect();
    var children = g.children;
    var totalWidth = 0;
    for (var i = 0; i < children.length; i++) {
        totalWidth += children[i].offsetWidth;
    }
    return width <= totalWidth;
}

export function createEventScrollX(ele) {
    this._past_scroll_left = 0;
    this.ev_scroll_x = new CustomEvent('scroll-x', {
        bubbles: true,
        cancelable: true,
    });
    this.dispatch_callback = function(ev) {
        var cuT = ev.currentTarget;
        var now_l = cuT.scrollLeft;
        if (now_l !== this.past_scroll_left) {
            ele.dispatchEvent(this.ev_scroll_x);
            this.past_scroll_left = now_l;
        }
    };

    var events = ['scroll', 'touchmove'];
    // var f = this.dispatch_callback;
    events.forEach(
        function(ev, idx, arr) {
            ele.addEventListener(ev, this.dispatch_callback.bind(this), {
                capture: true,
                passive: true,
            });
        }.bind(this)
    );
}
