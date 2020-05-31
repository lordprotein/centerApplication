const Login = require('../models/Login.model');


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Login.create(req, (err, data) => {
        if (err) {
            if (err.status === 'user_not_found') return res.status(403).send({message: err.message})
            
            res.status(500).send({
                message:
                    err.message || false
            });
        }
        else {
            res.send(data);
        }
    });
}


exports.delete = (req, res) => {
    Login.delete(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while authorization the Executer'
            });
        }
        else {
            res.send(data);
        }
    });
}


exports.isLogin = (req, res, next) => {
    Login.isLogin(req, next, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data);
        }
    });
}