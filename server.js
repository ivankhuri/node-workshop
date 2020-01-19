const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

function handler(request, response) {
    var endpoint = request.url;
    console.log(endpoint);
    var method = request.method;
    console.log(method);

    if (endpoint === '/') {
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile(__dirname + '/public/index.html', (error, file) => {
            if (error) {
                console.log('Error failed to load file index.html');
                return;
            }
            response.end(file);
        });

    } else if (endpoint === '/create-post') {
        var allTheData = '';
        request.on('data', function (chunkOfData) {
            allTheData += chunkOfData;
        });

        request.on('end', function () {
            response.writeHead(301, {'Location': '/'});
            var convertedData = querystring.parse(allTheData);
            console.log(convertedData);
            response.end();
        });
    } else if (endpoint === '/node') {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end('Node??');
    } else if (endpoint === '/girls') {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end('Girls????');
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end('404 Content not found');
    }
}

var server = http.createServer(handler);

server.listen(3000, function () {
    console.log("Listening on port 3000");
});