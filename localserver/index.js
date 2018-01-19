var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../'));
app.listen(1337, function() {
  console.log('listening on port 1337!');
});