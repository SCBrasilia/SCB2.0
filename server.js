var http = require('http');
var express = require('express');
var app = express();
require('./config/express')(app);
http.createServer(app).listen(app.get('port'), function(){
    console.log('epress Server escutando na porta '+app.get('port'));
});