'use strict'
const groupsArray = [];
const membersArray = [];

let functionCalls = 0;

groupsArray.push('cigarettesmokeyeah');
groupsArray.push('chisto_dlya_menya');

const arrayIntersect = require('./arrayIntersect');
const VK = require('vkapi');

const vk = new VK({
	'appID': 5579903,
	'appSecret': 'vkRtsWFMX5X3pjgmZRsV',
	'mode': 'sig'
});

function getMillenium(offset, group_id, _callback, id) {
	console.log(group_id + ' ' + offset)
	vk.request('groups.getMembers', {
		'group_id': group_id,
		'offset': offset * 1000,
		'count': 1000
	}, 'done:groups.getMillenuim' + offset + group_id + functionCalls);

	vk.on('done:groups.getMillenuim' + offset + group_id + functionCalls, function(_o) {
		_callback(_o.response.users);
	});
}

function getMembers(group_id, _callback, id) {
	let arr = [];
	let count;

	let iterations;

	vk.request('groups.getMembers', {
		'group_id': group_id,
		'count': 0
	}, 'done:groups.getMembers' + group_id + id + functionCalls);

	vk.on('done:groups.getMembers' + group_id + id + functionCalls, function(_o) {
		count = _o.response.count;
		if (count > 1000) iterations = (count - count % 1000) / 1000 + 1;
		else iterations = 1;

		iter(0, iterations, 200);
	});


	function iter(i, count, pause) {
		setTimeout(function funct() {
			if (i <= count) {
				getMillenium(i, group_id, function(resp) {
					arr = arr.concat(resp);
					//console.log('loading...');
					i++;
					iter(i, count, pause);
				}, id)
			}

			if (i === count + 1) _callback(arr);
		}, 300);
	}
}

function getIntersections(groupsArray, _callback) {
	functionCalls++;
	
	let _arr = [];

	execute(0, groupsArray.length)

	function execute(i, count) {
		if (i === count) 
			return _callback(arrayIntersect.intersect(_arr));

		getMembers(groupsArray[i], function(a) {
			_arr[i] = a;

			execute(i + 1, count);
		}, i);
	}
}

//process.on('uncaughtException', function (err) {
//  console.error(err);
  //console.log("Node NOT Exiting...");
//});

module.exports.getIntersections = getIntersections;
//console.log(groupsArray)
//getIntersections(groupsArray, console.log);

///////////////////////////////[HOW IT WORKS]////////////////////////////////////



/*
let _arr = [
	[],
	[]
];

setTimeout(function funct() {
	getMembers('cigarettesmokeyeah', function(arr) {
		_arr[0] = arr;
	});
}, 0);

setTimeout(function funct() {
	getMembers('fukusakbichlife', function(arr) {
		_arr[1] = arr;
	});
}, 1000);

setTimeout(function funct() {
	arrayIntersect.intersect(_arr);
}, 3000);
*/