Object.prototype.computeAttr = computeAttr;
Object.prototype.iLeft = elLeft;
Object.prototype.iTop = elTop;

/** Basic Functions **/
function computeAttr(attr) {
	let result = window.getComputedStyle(this, null).getPropertyValue(attr);
	let value = parseFloat(result.replace('px', ''));
	if (isNaN(value)) {
		return 0
	}
	return value
}

function elLeft(value) {
	if (value === undefined) {
		return this.computeAttr('left')
	} else {
		this.style.left = value + 'px'
	}
}

function elTop(value) {
	if (value === undefined) {
		return this.computeAttr('top')
	} else {
		this.style.top = value + 'px'
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