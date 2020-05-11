const Executer = require('../controllers/executer.controller');


module.exports = app => {
    app.get('/executer/:id', Executer.read);

    app.get('/executer/application/list/:status/:id', Executer.readApplications);
    app.post('/executer/application/accept/:userID', Executer.create);
    app.delete('/executer/application/reset/:userID/:appID', Executer.delete);
}