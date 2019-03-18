import {Color} from './Color'

function parseCssColor(cssColor) {
    if (/rgba/.test(cssColor)) {
        let rgba = cssColor.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.\d+)\)$/);
        return Color(rgba[1], rgba[2], rgba[3], rgba[4]);
    } else if (/rgb/.test(cssColor)) {
        let rgb = cssColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return Color(rgb[1], rgb[2], rgb[3], 1.0);
    } else {
        return null;
    }
}

function isNumber(value) {
    return /^\d+$|^\d+\.\d+$/.test(value);
}

function isDimension(value) {
    return /^\d+px$/.test(value);
}

function isColor(value) {
    return /^(rgb|rgba)\(.*\)$/.test(value)
}

/** Basic Functions **/
function getProperty(el, propName) {
    let prop = window.getComputedStyle(el, null).getPropertyValue(propName);
    let type;
    if (isNumber(prop)) {
        type = 'number';
    } else if (isDimension(prop)) {
        type = 'dimension';
    } else if (isColor(prop)) {
        type = 'color';
    } else {
        type = 'unknown';
    }
    return {
        type,
        get() {
            switch (type) {
                case 'number':
                    return parseFloat(prop);
                case 'dimension':
                    return parseFloat(prop.replace('px', ''));
                case 'color':
                    return parseCssColor(prop);
                default:
                    return prop;
            }
        },
        set(value) {
            if (value.constructor.name === 'String') {
                el.setProperty(propName, value);
                return;
            }
            switch (type) {
                case 'number':
                    el.style.setProperty(propName, value);
                    break;
                case 'dimension':
                    if (value.constructor.name === 'Number') {
                        el.style.setProperty(propName, `${parseInt(value)}px`);
                    }
                    break;
                case 'color':
                    if (value.constructor.name === 'Person') {
                        el.style.setProperty(propName, value);
                    }
                    break;
                default:
                    break;
            }
        },
        toString() {
            return prop;
        }
    }
}

/** Core Animation **/
const STAMP = 16;

function animateValue(target, value, time, step, interpolator, listener) {
    if (interpolator === undefined) {
        interpolator = value => value // Default Interpolator, which is an LinearInterpolator
    }
    let currentValue = 0;
    let currentTime = 0;
    clearInterval(target.timer);
    target.timer = setInterval(() => {
        currentTime += STAMP;
        if (currentTime >= time) {
            currentTime = time;
            clearInterval(target.timer)
        }
        currentValue = value * interpolator(currentTime / time);
        step(currentValue);
        if (listener) {
            listener(currentTime / time)
        }
    }, STAMP)
}

export {
    getProperty,
    animateValue,
}