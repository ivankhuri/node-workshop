const http = require('http');
const handler = require('./src/handler.js');

var server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Listening on port 3000");
});