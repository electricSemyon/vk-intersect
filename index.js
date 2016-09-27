'use strict'
const express = require('express');
const getIntersections = require('./getIntersections');
const app = express();
const port = process.env.PORT || 80;

app.get('/getIntersections', function (req, res) {
    console.log('Got one more reqest...')
    const groups = req.query.groups;

    getIntersections(groups, function(el){
       console.log(el);
       res.send(el);
    });
});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Server started on port ' + port + '!');
});
