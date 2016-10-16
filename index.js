'use strict'
var fs = require('fs');
var http = require('http');

var express = require('express');
var app = express();

var httpServer = http.createServer(app);

const getIntersections = require('./getIntersections');
const port = process.env.PORT || 80;

const tokenCreator = require('./tokenCreator');

let dataArray = [];

app.use(express.static('public'));

app.get('/getIntersections', function (req, res) {
	const reqToken = req.query.token;
	const groups = req.query.groups;

	if(reqToken === undefined) {
		const token = tokenCreator();
		console.log('Не видишь, перерыв? Вот тебе номерок: ' + token + '. Приходи позже.')

		getIntersections(groups, function(el){
	       console.log(el);
	       dataArray.push({data: el, token: token});
	    });
		res.send({token: token, status: 'processing'})
	}
	else {
		if(dataArray != undefined){
			console.log('Check...')
			dataArray.map(function(el, i){
				if(el.token === reqToken) {
					return res.send({data: el.data});
				}
				if(i === dataArray.length - 1) {
					return res.send({status: 'processing'});
				}
			})
		}
	}
});

httpServer.listen(port);