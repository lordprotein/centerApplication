const Report = require('../models/report.model');


exports.read = (req, res) => {
    Report.read(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Report with status ${req.params.status}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Report with status ${req.params.status}`
                });
            }
        }
        else {
            res.send(data);
        }
    });
}


exports.readForUser = (req, res) => {
    Report.readForUser(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Report with status ${req.params.status}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Report with status ${req.params.status}`
                });
            }
        }
        else {
            res.send(data);
        }
    });
}