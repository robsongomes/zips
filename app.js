var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//var db = mongoose.connect('mongodb://<<user>>:<<password>>@ds049181.mlab.com:49181/sample');
var db = mongoose.connect('mongodb://localhost/test');
var Zip = require('./Zip');

var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

router.route('/zips')
  .get((req, res) => {
    var query = {};

    for (var param in req.query) {
      if (Zip.schema.paths.hasOwnProperty(param)) {
        query[param] = req.query[param];
      }
    }

    Zip.find(query, (err, zips) => {
      res.json(zips);
    }).limit(5);
  });

router.route('/zips/:zipId')
  .get((req, res) => {
    Zip.findOne({"_id" : req.params.zipId}, (err, zip) => {
      res.json(zip);
    });
  });

app.get('/', (req,res) => {
  res.send('Welcome to Zip API');
});

app.use('/api', router);

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
