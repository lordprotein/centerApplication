const Executer = require('../controllers/executer.controller');


module.export = app => {
    app.get('/executer/:id', Executer.read);

    app.post('/executer/application/list/:status/:id', Executer.readApplications);
    app.post('/executer/application/accept/:userID');
}