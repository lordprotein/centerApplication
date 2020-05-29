const Executer = require('../controllers/executer.controller');
const Login = require('../controllers/login.controller');


module.exports = app => {
    app.get('/executer', Login.isLogin, Executer.readExecutersList);
    app.get('/executer/:id', Executer.read);

    app.get('/executer/application/list/:status/:id', Executer.readApplications);
    app.post('/executer/application/accept/:userID', Executer.create);
    app.delete('/executer/application/reset/:userID/:appID', Executer.delete);
}