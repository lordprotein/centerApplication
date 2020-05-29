const Login = require('../controllers/Login.controller');


module.exports = app => {
    app.post('/login', Login.create);
    app.post('/logout', Login.delete);
}