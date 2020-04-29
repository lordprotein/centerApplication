const Application = require('../controllers/application.controller');


module.exports = app => {
    app.get('/application/:id', Application.read);
    app.get('/application/list/:status', Application.readList);

    app.post('/application', Application.create);

    app.put('/application/priority/:id', Application.updatePriority);
    app.put('/application/status/:id',Application.updateStatus);

    app.delete('/application/:id', Application.delete);
}