var fs = require('fs');
var parse = require('csv-parse');

var inputFile='top500.domains.11.16.csv';

var parser = parse(fs.readFileSync(inputFile), {delimiter: ','}, function (err, output) {
  var cleaned = output.slice(1).map(function(data) {
    return 'http://' + data[1];
  });

  fs.writeFile('domains.json', JSON.stringify(cleaned, null, 2));
})
