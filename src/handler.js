const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

var handler = function (request, response) {
    var endpoint = request.url;

    if (endpoint === '/') {
        response.writeHead(200, { "Content-Type": "text/html" });

        fs.readFile(path.join(__dirname, '../public/index.html'), (error, file) => {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    } else if (endpoint.includes('/main.css')) {
        response.writeHead(200, { "Content-Type": "text/css" });

        fs.readFile(path.join(__dirname, '../public/main.css'), (error, file) => {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    } /*else if (endpoint.includes('/script.js')) {
        response.writeHead(200, { "Content-Type": "application/javascript" });

        fs.readFile(path.join(__dirname, '../public/script.js'), (error, file) => {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    }*/ else if (endpoint.includes('/image.jpg')) {
        response.writeHead(200, { "Content-Type": "image/jpg" });

        fs.readFile(path.join(__dirname, '../public/img/image.jpg'), (error, file) => {
            if (error) {
                console.log(error);
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
            response.writeHead(301, { 'Location': '/' });
            var convertedData = querystring.parse(allTheData);
            console.log(convertedData);
            response.end();
        });
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end('404 Content not found');
    }
}

module.exports = handler;