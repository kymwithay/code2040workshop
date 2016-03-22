var fs         = require('fs');
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

var taskApiRoutes = require('./routes/api/task');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));

app.use('/', express.static(path.join(__dirname, '../build')));

app.use('/api/v1/task', taskApiRoutes);

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
