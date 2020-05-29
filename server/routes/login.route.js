const Login = require('../controllers/Login.controller');


module.exports = app => {
    app.post('/login', Login.create);
    app.get('/logout', Login.delete);
}