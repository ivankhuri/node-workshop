const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const extensionType = {
    html: { 'Content-Type': 'text/html' },
    css: { 'Content-Type': 'text/css' },
    js: { 'Content-Type': 'application/js' },
    ico: { 'Content-Type': 'image/x-icon' },
    png: { 'Content-Type': 'image/png' },
    jpg: { 'Content-Type': 'image/jpg' }
};

var handler = function (request, response) {
    var url = (request.url === '/') ?
        path.join(__dirname, '..', 'public', 'index.html') :
        path.join(__dirname, '..', 'public', request.url);
    var extension = url.split('.')[1];

    console.log(url);
    console.log(extension);

    if (url.includes('create')) {
        var allTheData = '';
        request.on('data', function (chunkOfData) {
            allTheData += chunkOfData;
        });

        request.on('end', function () {
            response.writeHead(302, { 'Location': '/' });
            var convertedData = querystring.parse(allTheData);
            console.log(convertedData);
            response.end();
        });
        return;
    }

    fs.readFile(url, function (error, file) {
        if (error) {
            response.writeHead(404, extensionType.html);
            response.end('404 Content not found');
            return;
        }
        response.writeHead(200, extensionType[extension]);
        console.log('LOADED SUCCESSFULLY');
        response.end(file);
    });
}

module.exports = handler;
/*const fs = require('fs');
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
    } else if (endpoint.includes('/script.js')) {
        response.writeHead(200, { "Content-Type": "application/js" });

        fs.readFile(path.join(__dirname, '../public/script.js'), (error, file) => {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    } else if (endpoint.includes('posts')) {
        response.writeHead(200, { "Content-Type": "application/json" });

        fs.readFile(path.join(__dirname, '../src/posts.json'), (error, file) => {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    } else if (endpoint.includes('logo2.png')) {
        response.writeHead(200, { "Content-Type": "image/png" });

        fs.readFile(path.join(__dirname, '../public/img/logo2.png'), (error, file) => {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    } else if (endpoint.includes('/image.jpg')) {
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

module.exports = handler;*/