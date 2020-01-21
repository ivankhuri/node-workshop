const http = require('http');
const handler = require('./src/handler.js');

http.createServer(handler).listen(3000, function() {
    console.log('Listening on 3000');
});
