const db = require('./db');

const Report = () => { };

Report.read = (req, result) => {
    const { status } = req.params;
    db.query(`SELECT executers.full_name as executer_name, applications.full_name as client_name, applications.task, applications.status, applications.date_start, applications.date_end FROM applications_of_executers JOIN applications ON applications_of_executers.ID_APPLICATION = applications.ID JOIN executers ON applications_of_executers.ID_EXECUTER = executers.ID WHERE applications.status = ?`, status, (err, res) => {

        if (err) return result(err, null);

        result(null, res);
    });
}

Report.readForUser = (req, result) => {
    const { status, id } = req.params;

    db.query(`SELECT executers.full_name as executer_name, applications.full_name as client_name, applications.task, applications.status, applications.date_start, applications.date_end FROM applications_of_executers 
    JOIN applications ON applications_of_executers.ID_APPLICATION = applications.ID 
    JOIN executers ON applications_of_executers.ID_EXECUTER = executers.ID
    WHERE applications.status = ?
    AND executers.ID = ?`, [status, id], (err, res) => {
        if (err) return result(err, null);

        result(null, res);
    });
}


module.exports = Report;