function LinearInterpolator(value) {
	return value
}

/**
 * @return {number}
 */
function AcceleratedInterpolator(value) {
	return (value + (0.11 / (value + 0.1) - 0.1) * value) * value
}

/**
 * @return {number}
 */
function DeceleratedInterpolator(value) {
	return (-0.11 / (value + 0.1) + 1.1) * value * value
}

// noinspection JSUnusedGlobalSymbols
export default {
	LinearInterpolator,
	AcceleratedInterpolator,
	DeceleratedInterpolator
}