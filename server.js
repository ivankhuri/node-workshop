const http = require('http');
const fs = require('fs');

function handler(request, response) {
    var endpoint = request.url;
    console.log(endpoint);
    var method = request.method;
    console.log(method);

    switch (endpoint) {
        case '/': {
            response.writeHead(200, { "Content-Type": "text/html" });
            fs.readFile(__dirname + '/public/index.html', (error, file) => {
                if (error) {
                    console.log('Error failed to load file index.html');
                    return;
                }
                response.end(file);
            });
            break;
        }
        case '/node': {
            response.writeHead(200, { 'Content-type': 'text/html' });
            response.end('Node??');
            break;
        }
        case '/girls': {
            response.writeHead(200, { 'Content-type': 'text/html' });
            response.end('Girls????');
            break;
        }
        default: {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end('404 Content not found');
        }
    }
}

var server = http.createServer(handler);

server.listen(3000, function () {

    console.log("Listening on port 3000");
});