import {getProperty, animateValue} from "./AnimationUtil";

'./AnimationUtil';
import * as Interpolator from './Interpolator.js';
import {Color} from "./Color";

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

    get property() {
        return this._property;
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

    constructor(target, property, startValue, endValue) {
        this._target = target;
        this._property = property;
        this._startValue = startValue;
        this._endValue = endValue;
    }

    start() {
        if (requestAnimationFrame !== undefined) {
            this._nativeAnim()
        } else {
            this._manualAnim()
        }
    }

    _nativeAnim() {
        let current = this._startValue;
        let startTime = Date.now();
        let ratio;
        if (!this._interpolator) {
            this._interpolator = value => value;
        }
        let step = (time) => {
            ratio = this._interpolator((time - startTime) / this._duration);
            let property = getProperty(this._target, this._property);
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
            if (typeof this._listener === 'function') {
                this._listener(current, ratio);
            }
        };
        requestAnimationFrame((timestamp) => {
            startTime = timestamp;
            step(timestamp);
        })
    }

    _manualAnim() {

    }

}

export {
    Animation
}