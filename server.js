const http = require('http');
const fs = require('fs');

function handler(request, response) {
    var endpoint = request.url;
    console.log(endpoint);
    var method = request.method;
    console.log(method);

    if (endpoint === '/') {

        // ...
    } else if (endpoint === '/node') {

        //...
    } else if (endpoint === '/girls') {

        //...
    } else {

        // TODO - write your generic endpoint code here
    }
}

var server = http.createServer(handler);

server.listen(3000, function () {

    console.log("Listening on port 3000");
});