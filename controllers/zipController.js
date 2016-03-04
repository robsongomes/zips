var zipController = (Zip) => {
    
    var post = (req, res) => {
        var zip = new Zip(req.body);
        zip.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(201).send(zip);
            }
        });
    };
    
    var get = (req, res) => {
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
    };
    
    var getById = (req, res) => {
        res.json(req.zip);
    };
    
    var del = (req, res) => {
        req.zip.remove((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Removed');
            }
        });
    };
    
    var put = (req, res) => {
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
    };
    
    var patch = (req, res) => {
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
    };
    
    var findById = (req, res, next) => {
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
    };
    
    return {
        post : post,
        get  : get,
        del  : del,
        put  : put,
        patch : patch,
        getById : getById,
        findById : findById
    }
}

module.exports = zipController;