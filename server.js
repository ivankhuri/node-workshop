const http = require('http');

function handler (request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('Response good veri good');
    response.end();
}

var server = http.createServer(handler);

server.listen(3000, function () {

    console.log("Listening on port 3000");
});