'use strict'

function intersect(array, _callback) {
    let iter = 1;
    let intersections = array[0];

    while (iter < array.length) {
        let temp = [];
        for (let i in array[iter]) {
            for (let j in intersections) {
                if (array[iter][i] === intersections[j]) {
                    temp.push(array[iter][i]);
                }
            }
        }
        intersections = temp;
        iter++;


        if (iter === array.length){
            return intersections;
        }
    }
    //console.log(intersections.length);
}

module.exports.intersect = intersect;