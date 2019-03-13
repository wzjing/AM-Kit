import Interpolator from './Interpolator.js';
import * as AnimationUtil from './AnimationUtil';

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
        let current = 0;
        let startTime = 0;
        requestAnimationFrame((timestamp) => {
            startTime = timestamp;
            ((time) => {
                let ratio  = (time - startTime)/this._duration;
                if () 
                requestAnimationFrame(arguments.callee)
            })(timestamp);
        })
    }

    _manualAnim() {

    }


}