const Executer = require('../models/executer.model');


exports.read = (req, res) => {
    Executer.read(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Executer with id ${req.params.ID}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Executer with id ${req.params.ID}`
                });
            }
        }
        else {
            res.send(data);
        }
    });
}


exports.readApplications = (req, res) => {
    Executer.readApplications(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Application with id ${req.params.ID}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Application with id ${req.params.ID}`
                });
            }
        }
        else {
            res.send(data);
        }
    });
}