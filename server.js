var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/todos.json', function(req, res) {
  fs.readFile('todos.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/todos.json', function(req, res) {
  fs.readFile('todos.json', function(err, data) {
    var todos = JSON.parse(data);
    var newId = todos.length + 1;
    req.body.id = newId; 
    todos.unshift(req.body);
    fs.writeFile('todos.json', JSON.stringify(todos, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(todos);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
