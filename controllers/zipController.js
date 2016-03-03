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
    }
    
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
    }
    
    return {
        post : post,
        get  : get
    }
}

module.exports = zipController;