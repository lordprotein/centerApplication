const Executer = require('../models/executer.model');


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Executer.create(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Application.'
            });
        }
        else {
            res.send(data);
        }
    });
}

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


exports.delete = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Executer.delete(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while deleting the Application.'
            });
        }
        else {
            res.send(data);
        }
    });
}