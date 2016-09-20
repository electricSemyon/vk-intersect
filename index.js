'use strict'
const express = require('express');
const core = require('./core');
const app = express();
const port = 3000;

app.get('/getIntersections', function (req, res) {
  console.log('Ну ёб твою мать, ещё один. Обрабатываю...')
  const groups = req.query.groups;

  core.getIntersections(groups, function(el){
  	console.log('Получайте! :');
  	console.log(el);
  
  	res.send(el);
  });
});

app.use(express.static('public'));

app.listen(port, function () {
  console.log('На работу вышел! Порт ' + port + '!');
});