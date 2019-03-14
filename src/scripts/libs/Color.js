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

export {
    Color
}