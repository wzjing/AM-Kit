let assert = require('assert');

describe('Util', () => {
    let pattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.\d+)\)$/;
    it('RGBA-Rex', () => {
        let result = 'rgba(144, 128, 224, 1.0)'.match(pattern);
        assert.strictEqual(result[4], '1.0');
    });
    it('RGB-Rex', () => {
        let result = 'rgb(144, 128, 224)'.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        // assert.strictEqual(pattern.test('rgb(144, 128, 224)'), true);
        assert.strictEqual(result[3], '224');
    })
});