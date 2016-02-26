var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

router.route('/zips')
  .get((req, res) => {
    res.json({"_id":35005, "city": "ADAMSVILLE"});
  });

router.route('/zips/:zipId')
  .get((req, res) => {
    res.json({"_id": req.params.zipId, "city": "ADAMSVILLE"});
  });

app.get('/', (req,res) => {
  res.send('Welcome to Zip API');
});

app.use('/api', router);

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
