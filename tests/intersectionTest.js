'use strict'
const assert = require('assert');
const intersect = require('../intersect')

describe('#intersect()', function() {
    it('returns intersections between arrays', function() {
        const arr1 = [1, 2, 3, 4, 5];
        const arr2 = [6, 5, 8, 7, 1, 9, 4];

        const intersection = intersect([arr1, arr2]);

        assert.deepEqual([5, 1, 4], intersection);
    });
});
