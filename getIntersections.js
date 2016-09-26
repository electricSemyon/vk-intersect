'use strict'

const intersect = require('./intersect');
const VK = require('vksdk');
const dotenv = require('dotenv');

dotenv.config();

const vk = new VK({
    'appId': process.env.APPID,
    'appSecret': process.env.APPSECRET,
    'mode': 'sig'
});

let functionCalls = 0;

function getMillenium(offset, group_id, _callback, id) {
    vk.request('groups.getMembers', {
        'group_id': group_id,
        'offset': offset * 1000,
        'count': 1000
    }, function(res){
        _callback(res.response.items);
    });
}

function getMembers(group_id, _callback, id) {
    let arr = [];
    let count;

    let iterations;

    vk.request('groups.getMembers', {
        'group_id': group_id,
        'count': 0
    }, function(res){
        count = res.response.count;
        if (count > 1000) iterations = (count - count % 1000) / 1000 + 1;
        else iterations = 1;

        iter(0, iterations, 200);
    });


    function iter(i, count, pause) {
            console.log(group_id + ' ' + i)
            if (i <= count) {
                getMillenium(i, group_id, function(resp) {
                    arr = arr.concat(resp);
                    i++;
                    iter(i, count, pause);
                }, id)
            }
 
            if (i === count + 1) _callback(arr);
    }
}

function getIntersections(groupsArray, _callback) {
    functionCalls++;
    
    let _arr = [];

    execute(0, groupsArray.length)

    function execute(i, count) {
        if (i === count) 
            return _callback(intersect(_arr));

        getMembers(groupsArray[i], function(a) {
            _arr[i] = a;
            execute(i + 1, count);
        }, i);
    }
}

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Some exception!");
});

module.exports = getIntersections;