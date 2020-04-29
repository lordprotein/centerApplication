const express = require('./node_modules/express');
const app = express();
const bodyParser = require('./node_modules/body-parser');
const cors = require('./node_modules/cors/lib')({
    origin: 'http://localhost:3000',
    credentials: true
});
const port = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

require('./routes/application.route')(app);

app.get('/check', (req, res) => {
    res.send('Succsessful');
})

app.listen(port, error => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${port}`);
})