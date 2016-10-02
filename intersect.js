'use strict'

/**
 * Finds intersections in array of arrays.
 * @example
 * // returns [1, 3]
 * intersect(0, [[1, 2, 3], [1, 3, 3, 7]])
 */
function intersect (A)
{
    const iter = (k, A) => {
        let n = A.length;
        if (k === n - 2)
           return intersectArrays(A[n - 2], A[n - 1]);
        else
           return intersectArrays(A[k], iter(k + 1,A));  
    } 

    return iter(0, A);
}

function intersectArrays (A,B)
{
    let m = A.length;
    let n = B.length;
    let c = 0;
    let C = [];

    for (let i = 0; i < m; i++)
    { 
        let j = 0;
        let k = 0;

        while (B[j] !== A[i] && j < n) 
            j++;
        while (C[k] !== A[i] && k < c) 
            k++;

        if (j != n && k == c) 
            C[c++] = A[i];
    }
   return C;
}

module.exports = intersect;
