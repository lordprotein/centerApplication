const Report = require('../controllers/report.controller');


module.exports = app => {
    app.get('/report/status/:status', Report.read);
    app.get('/report/status/:status/:id', Report.readForUser);
}