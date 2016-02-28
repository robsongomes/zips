var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    
var mongo_db = process.env.MONGO_URL || 'mongodb://localhost/test';     

var db = mongoose.connect(mongo_db);
var Zip = require('./Zip');

var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.route('/zips')
  .post((req, res) => {
    var zip = new Zip(req.body);
    zip.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(zip);
      }
    });
  })
  .get((req, res) => {
    var query = {};

    for (var param in req.query) {
      if (Zip.schema.paths.hasOwnProperty(param)) {
        query[param] = req.query[param];
      }
    }

    Zip.find(query, (err, zips) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(zips);
      }
    }).limit(5);
  });

router.route('/zips/:zipId')
  .get((req, res) => {
    Zip.findOne({"_id" : req.params.zipId}, (err, zip) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(zip);
      }
    });
  });

app.get('/', (req,res) => {
  res.send('Welcome to Zip API');
});

app.use('/api', router);

app.listen(port, ip, () => {
  console.log('Running on ' + ip + ":" + port);
});