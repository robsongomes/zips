var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var mongo_db = process.env.MONGO_URL || 'mongodb://localhost/test';
var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';

mongoose.connect(mongo_db);

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/zips', require("./routes/zipRouter.js"));

app.get('/', (req, res) => {
  res.send('Welcome to Zip API');
});

app.listen(port, ip, () => {
  console.log('Running on ' + ip + ":" + port);
});