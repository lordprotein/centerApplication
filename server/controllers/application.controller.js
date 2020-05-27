const Application = require('../models/application.model');


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Application.create(req, (err, data) => {
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
    Application.read(req, (err, data) => {
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


exports.readList = (req, res) => {
    Application.readList(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Application list with status ${req.params.status}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Application with status ${req.params.status}`
                });
            }
        }
        else {
            res.send(data);
        }
    });
}


exports.readExecutersList = (req, res) => {
    Application.readExecutersList(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found names list with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Application with id ${req.params.id}`
                });
            }
        }
        else {
            res.send(data);
        }
    });
}


exports.updatePriority = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Application.updatePriority(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update the priority.'
            });
        }
        else {
            res.send(data);
        }
    });
}


exports.updateStatus = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Application.updateStatus(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update the status.'
            });
        }
        else {
            res.send(data);
        }
    });
}


exports.updateCountExecuters = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Application.updateCountExecuters(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update the count executer.'
            });
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

    Application.delete(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while delete the Application with status ${req.body.ID}`
            });
        }
        else {
            res.send(data);
        }
    });
}