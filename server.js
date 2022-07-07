var express = new require("express");

var app = express();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080);
console.log('Express server started');