var fs = require('fs');
var domino = require('domino');
var request = require('request');
var {getMetadata} = require('page-metadata-parser');
var domains = require('./domains');


function stringToDom(str) {
  return domino.createWindow(str).document;
}
function requestData(url) {
  var options = {
    url: url,
    timeout: 1000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }
  };
  return new Promise(function(resolve) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          const metadata = getMetadata(stringToDom(body), url);
          resolve(metadata);
        } catch(e) {
          console.log("Caught error", e, body);
        }
      }
      resolve(null);
    })
  });
}

var i = 0;
var data = [];
function processNext() {
  if (i < domains.length - 1) {
    requestData(domains[i]).then(function (metadata) {
      console.log(metadata);
      if (metadata) {
        data.push(metadata)
      }
      processNext();
    });
  } else {
    console.log("Done, processed " + data.length + " items");
    fs.writeFileSync('metadata.json', JSON.stringify(data, null, 2));
  }
  i++;
}
processNext();
