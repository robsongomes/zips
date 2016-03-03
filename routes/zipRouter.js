var express = require('express')

var router = express.Router();

var Zip = require('../Zip.js');
var controller = require("../controllers/zipController.js")(Zip);

router.route('/')
    .post(controller.post)
    .get(controller.get);

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


module.exports = router;