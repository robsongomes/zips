var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var mongo_db = process.env.MONGO_URL || 'mongodb://localhost/test';

mongoose.connect(mongo_db);

var Zip = require('./Zip');

var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || 'localhost';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/')
  .post((req, res) => {
    var zip = new Zip(req.body);
    zip.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
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
      }
      else {
        res.json(zips);
      }
    }).limit(5);
  });

router.use('/:zipId', (req, res, next) => {
  Zip.findById(req.params.zipId, (err, zip) => {
    if (err) {
      res.status(500).send(err);
    }
    else if (zip) {
      req.zip = zip;
      next();
    }
    else {
      res.status(404).send('No zip found');
    }
  });
});

router.route('/:zipId')
  .delete((req, res) => {
    req.zip.remove((err) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(204).send('Removed');
      }
    });
  })
  .put((req, res) => {
    req.zip.city = req.body.city;
    req.zip.pop = req.body.pop;
    req.zip.state = req.body.state;
    req.zip.loc = req.body.loc;
    req.zip.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(201).send(req.zip);
      }
    });
  })
  .patch((req, res) => {
    if (req.body._id)
      delete req.body._id;

    for (var p in req.body) {
      req.zip[p] = req.body[p];
    }

    req.zip.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.status(201).send(req.zip);
      }
    });
  })
  .get((req, res) => {
    res.json(req.zip);
  });

app.use('/api/zips', router);

app.get('/', (req, res) => {
  res.send('Welcome to Zip API');
});

app.listen(port, ip, () => {
  console.log('Running on ' + ip + ":" + port);
});