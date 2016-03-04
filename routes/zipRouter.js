var express = require('express')

var router = express.Router();

var Zip = require('../Zip.js');
var controller = require("../controllers/zipController.js")(Zip);

router.route('/')
    .post(controller.post)
    .get(controller.get);

router.use('/:zipId', controller.findById);

router.route('/:zipId')
    .delete(controller.del)
    .put(controller.put)
    .patch(controller.patch)
    .get(controller.getById);


module.exports = router;