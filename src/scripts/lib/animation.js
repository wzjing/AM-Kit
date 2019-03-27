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
    Math.sin(Math.PI*value);
    return /^(\d|(\d\.\d))+px$/.test(value);
}

function isColor(value) {
    return /^(rgb|rgba)\(.*\)$/.test(value)
}


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

class Color {

    get r() {
        return this._r;
    }

    set r(value) {
        this._r = value;
    }

    get g() {
        return this._g;
    }

    set g(value) {
        this._g = value;
    }

    get b() {
        return this._b;
    }

    set b(value) {
        this._b = value;
    }

    get a() {
        return this._a;
    }

    set a(value) {
        this._a = value;
    }

    /**
     * constructor for color
     * @param r     un-sign int, range [0, 255]
     * @param g     un-sign int, range [0, 255]
     * @param b     un-sign int, range [0, 255]
     * @param a     float value, range[0, 1.0]
     */
    constructor(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    /**
     * Return a middle color between this and color
     * @param color     Color value
     * @param weight    middle weight value
     * @returns {Color}     a new Color object
     */
    mid(color, weight) {
        if (weight === undefined)
            weight = 0.5;
        return Color(
            this._r + (color.r - this._r) * weight,
            this._g + (color.g - this._g) * weight,
            this._b + (color.b - this._b) * weight,
            this._a + (color.a - this._a) * weight);
    }

    toCssColor() {
        return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }

    static fromHex(str) {
        if (str.length === 8) {
            let arr = /^#(\d{2})(\d{2}(\d{2})(\d{2}))/.match(str);
            return Color(
                parseInt(arr[2], 16),
                parseInt(arr[3], 16),
                parseInt(arr[4], 16),
                parseInt(arr[1], 16) / 255.0);
        } else if (str.length === 6) {
            let arr = /^#(\d{2})(\d{2}(\d{2}))/.match(str);
            return Color(
                parseInt(arr[1], 16),
                parseInt(arr[2], 16),
                parseInt(arr[3], 16),
                1.0);
        } else {
            return Color(255, 255, 255, 1.0);
        }
    }
}

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
        let step = (time) => {
            if (this._stop) return;
            let timeRatio = (time - startTime) > this.duration ? 1 : (time - startTime) / this.duration;
            let property = getProperty(this.target, this.propertyName);
            let ratio = mInterpolator(timeRatio);
            if (property.get().type === 'color') {
                current = Color.fromHex(this._startValue).mid(Color.fromHex(this._endValue), ratio);
            } else {
                current = (this._endValue - this._startValue) * ratio;
            }
            property.set(current);
            if (timeRatio < 1) {
                requestAnimationFrame(step);
                console.log(`Current: ${current.toFixed(2)}[${ratio.toFixed(2)}]`)
            } else {
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
        getProperty(this.target, this.propertyName).set(this._startValue)
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
    getProperty,
    Color,
    Animation
}