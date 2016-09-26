'use strict'
const assert = require('assert');
const intersect = require('../intersect')

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 5, 8, 7, 1, 9, 4];

describe('Array intersection', function() {
    it('Should work...', function() {
      assert.deepEqual([5, 1, 4], intersect([arr1, arr2]));
    });
});