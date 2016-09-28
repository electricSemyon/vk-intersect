'use strict'

function intersect(k, A)  // При вызовах всегда полагать k=0. А - это двумерный (!)
{                                   //  массив, элементы которого A[ i ] - также массивы,
    var n = A.length;               //  пересечение которых нужно найти.
    if (k == n-2)
       return intersectArrays( A[n-2], A[n-1] );   // Функцию IntersecArrays см. выше.
    else
       return intersectArrays( A[k], intersect(k+1,A) );   
}

function intersectArrays(A,B)
{
    var m = A.length, n = B.length, c = 0, C = [];
    for (var i = 0; i < m; i++)
     { var j = 0, k = 0;
       while (B[j] !== A[ i ] && j < n) j++;
       while (C[k] !== A[ i ] && k < c) k++;
       if (j != n && k == c) C[c++] = A[ i ];
     }
   return C;
}

module.exports = intersect;
