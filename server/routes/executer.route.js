const Executer = require('../controllers/executer.controller');
const Login = require('../controllers/login.controller');


module.exports = app => {
    app.get('/executer', Executer.readExecutersList);
    app.get('/executer/:id', Login.isLogin, Executer.read);

    app.get('/executer/application/list/:status/:id', Login.isLogin, Executer.readApplications);
    app.post('/executer/application/accept/:userID', Login.isLogin, Executer.create);
    app.delete('/executer/application/reset/:userID/:appID', Login.isLogin, Executer.delete);
}