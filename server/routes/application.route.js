const Application = require('../controllers/application.controller');
const Login = require('../controllers/login.controller');


module.exports = app => {
    app.get('/application/:id', Login.isLogin, Application.read);
    app.get('/application/list/:status', Application.readList); //TO DELETE
    app.get('/application/executers/:id', Login.isLogin, Application.readExecutersList);

    app.post('/application', Login.isLogin, Application.create);

    app.put('/application/priority/:id', Login.isLogin, Application.updatePriority);
    app.put('/application/status/:id', Login.isLogin, Application.updateStatus);
    app.put('/application/count/executer/:id', Login.isLogin, Application.updateCountExecuters);

    app.delete('/application/:id', Login.isLogin, Application.delete);
}