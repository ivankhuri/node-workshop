const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const posts = require('./posts.json')
const extensionType = {
    html: { 'Content-Type': 'text/html' },
    css: { 'Content-Type': 'text/css' },
    js: { 'Content-Type': 'application/js' },
    ico: { 'Content-Type': 'image/x-icon' },
    png: { 'Content-Type': 'image/png' },
    jpg: { 'Content-Type': 'image/jpg' },
    json: { 'Content-Type': 'application/json'}
};

var handler = function (request, response) {
    var url = (request.url === '/') ?
        path.join(__dirname, '..', 'public', 'index.html') :
        path.join(__dirname, '..', 'public', request.url);
    if (request.url.includes('posts')) {
        url = path.join(__dirname, request.url);
        url += '.json';
    }
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
            console.log('Data: ', convertedData);
            posts[Date.now()] = convertedData.post
            fs.writeFile(path.join(__dirname, './posts.json'), JSON.stringify(posts), (err) => {
                if (err) {
                    console.log(err)
                }


                response.end();
            })
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
