import {Color} from "./Color";

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

Element.prototype.getProperty = (el, propName) => {
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
};

class Animation {
    set interpolator(value) {
        this._interpolator = value;
    }

    get interpolator() {
        return this._interpolator;
    }

    set duration(value) {
        this._duration = value;
    }

    get duration() {
        return this._duration;
    }

    get propertyName() {
        return this._propertyName;
    }

    get target() {
        return this._target;
    }

    set listener(value) {
        this._listener = value;
    }

    get listener() {
        return this._listener;
    }

    constructor(target, propertyName, startValue, endValue) {
        this._target = target;
        this._propertyName = propertyName;
        this._startValue = startValue;
        this._endValue = endValue;
    }

    start() {
        if (!this._interpolator) {
            this._interpolator = value => value;
        }
        this._start(this.interpolator)
    }

    _start(mInterpolator) {
        if (requestAnimationFrame !== undefined) {
            this._nativeAnim(mInterpolator)
        } else {
            this._manualAnim(mInterpolator)
        }
    }

    _nativeAnim(mInterpolator) {
        let current = this._startValue;
        let startTime = Date.now();
        let ratio;
        let step = (time) => {
            if (this._stop) return;
            ratio = mInterpolator((time - startTime) / this._duration);
            let property = this.target.getProperty(this.propertyName);
            if (ratio <= 1) {
                if (property.get().type === 'color') {
                    current = Color.fromHex(this._startValue).mid(Color.fromHex(this._endValue), ratio);
                } else {
                    current = (this._endValue - this._startValue) * ratio;
                }
                property.set(current);
                requestAnimationFrame(step);
                console.log(`Current: ${current.toFixed(2)}[${ratio.toFixed(2)}]`)
            } else {
                property.set(this._endValue);
                requestAnimationFrame(t => {
                });
                console.log('Done');
            }
            if (typeof this.listener === 'function') {
                this.listener(current, ratio);
            }
        };
        requestAnimationFrame((timestamp) => {
            startTime = timestamp;
            step(timestamp);
        })
    }

    _manualAnim(mInterpolator) {
        const STAMP = 16;
        let currentValue = 0;
        let currentTime = 0;
        clearInterval(target.timer);
        target.timer = setInterval(() => {
            if (this._stop) {
                clearInterval(target.timer)
            }
            currentTime += STAMP;
            if (currentTime >= this.duration) {
                currentTime = this.duration;
                clearInterval(target.timer)
            }
            let ratio = currentTime / this._duration;
            currentValue = value * mInterpolator(ratio);
            step(currentValue);
            if (typeof this.listener === 'function') {
                this.listener(currentValue, ratio)
            }
        }, STAMP)
    }

    stop() {
        this._stop = true;
    }

    reset() {
        stop();
        this.target.getProperty(this.propertyName).set(this._startValue)
    }

    reverse() {
        if (!this._interpolator) {
            this._interpolator = value => value;
        }
        this.reset();
        this._start((value) => 1 - this.interpolator(value))
    }

}

export {
    Animation
}