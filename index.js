var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    privateKey = fs.readFileSync('cert/kombi-key.pem'),
    certificate = fs.readFileSync('cert/kombi-cert.pem'),
    credentials = {key: privateKey, cert: certificate},
    locals = require('./locals.json'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    compress = require('compression'),
    favicon = require('serve-favicon'),
    port = parseInt(process.env.PORT, 10) || 3000,
    portSecure = parseInt(process.env.PORTS, 10) || 3030;

// Settings
app.set('views', __dirname + '/public');
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compress());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
app.get('/', function(req, res) {
    res.render("index", locals);
});
app.use('/resources', express.static(__dirname + '/resources'));
app.use('/src', express.static(__dirname + '/src'));
app.get(/(.*)$/, function(req, res) {
    res.render(req.params[0].substr(1), locals);
});

// Errors
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

// Output
var httpServer = http.createServer(app),
    httpsServer = https.createServer(credentials, app);
httpServer.listen(port);
httpsServer.listen(portSecure);

console.log('Server listening at http://localhost:' + port);
console.log('Secure server listening at http://localhost:' + portSecure);