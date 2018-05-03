#!/usr/bin/env node 

var http = require("http");

const postData = JSON.stringify({
  text: 'Hello World!'
});

const options = {
  host: 'hooks.slack.com',
  port: 443,
  path: '/services/xxxxxx/yyyyy/zzzzz',
  method: 'POST',
  headers: {
	  'Content-Type': 'application/json',
	  'Content-Length': Buffer.byteLength(postData)
  }
};

var req = http.request(options, function(res) => {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) => {
    console.log('BODY: ' + chunk);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();