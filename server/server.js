const express = require('./node_modules/express');
const app = express();
const bodyParser = require('./node_modules/body-parser');
const cors = require('./node_modules/cors/lib')({
    origin: 'http://localhost:3000',
    credentials: true
});
const port = 3001;
const cookieSession = require('cookie-session')


app.use(cookieSession({
    name: 'session',
    secret: 'dsadfwg',
    maxAge: 1000 * 60 * 60 * 48
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

require('./routes/application.route')(app);
require('./routes/executer.route')(app);
require('./routes/login.route')(app);


app.get('/check', (req, res) => {
    req.session.msg = 'nice';
    req.session = null;
    res.send({res: req.session.msg});

})
app.get('/check2', (req, res) => {
    // req.session.msg = 'nice';
    res.send({res: req.session.auth});
})

app.listen(port, error => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${port}`);
})