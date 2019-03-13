Element.prototype.property = property;

function toHex(value) {
    let temp = parseInt(value);
    if(temp < 0xF) {
        return `0${temp.toString(16)}`;
    } else {
        return temp.toString(16);
    }
}

function cssColor(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" +toHex(rgb[1]) + toHex(rgb[2]) + toHex(rgb[3]);
}

function isNumber(value) {
    return parseFloat(value).toString() !== 'NaN';
}

function isDimension(value) {
    return value.search('px') !== -1;
}

function isColor(value) {
    let pattern = /^(rgb|rgba)\(.*\)$/;
    let result = pattern.test(value);
    return result !== null;
}

/** Basic Functions **/
function property(propName) {
    let el = this;
    let prop = window.getComputedStyle(this, null).getPropertyValue(propName);
    return {
        get() {
            if (isNumber(prop)) {
                return parseFloat(prop);
            } else if (isColor(prop)) {
                return prop;
            } else {
                return prop;
            }
        },
        set(value) {
            eval(`el.style['${propName}']='${value}px'`);
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

function animate(target, from, to) {

}

/** Extension Animation Functions */

function offsetX(el, offset, time, interpolator, listener) {
    let startLeft = el.iLeft();
    animateValue(el, offset, time, value => {
        el.iLeft(startLeft + value)
    }, interpolator, listener)
}

function offsetY(el, offset, time, interpolator, listener) {
    let startTop = el.iTop();
    animateValue(el, offset, time, value => {
        el.iTop(startTop + value)
    }, interpolator, listener)
}

export {
    animateValue,
    offsetX,
    offsetY
}