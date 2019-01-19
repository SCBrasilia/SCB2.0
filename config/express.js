var express = require('express');
module.exports = function(app){
    app.set('port', 3000);
    app.use(express.static("./public"));
}