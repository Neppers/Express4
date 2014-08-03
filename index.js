var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 3000;

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

console.log('Static server listening at localhost:' + port);
app.listen(port);