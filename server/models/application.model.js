const db = require('./db');

const Application = app => { };

Application.create = (req, result) => {
    const { ID, date, fullName, caseNum, task, phoneNum } = req.body;
    const varList = [ID, date, fullName, caseNum, task, phoneNum];

    db.query('INSERT INTO applications (ID, date, full_name, case_num, task, phone_num) VALUES (?, ?, ?, ?, ?, ?)', varList, (err, res) => {
        if (err) return result(err, null);

        result(null, res);
    });
}


Application.read = (req, result) => {
    const { id } = req.params;

    db.query('SELECT * FROM applications WHERE ID=?', id, (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    });
}


Application.readList = (req, result) => {
    const { status } = req.params;

    db.query('SELECT * FROM applications WHERE status=?', status, (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    });
}


Application.updatePriority = (req, result) => {
    const { priority } = req.body;
    const { id } = req.params;
    const varList = [priority, id];

    db.query('UPDATE applications SET priority=? WHERE ID=?', varList, (err, res) => {
        if (err) return result(err, null);

        result(null, res);
    });
}


Application.updateStatus = (req, result) => {
    const { status } = req.body;
    const { id } = req.params;
    const varList = [status, id];

    db.query('UPDATE applications SET status=? WHERE ID=?', varList, (err, res) => {
        if (err) return result(err, null);

        result(null, res);
    });
}


Application.delete = (req, result) => {
    const { id } = req.params;

    db.query('DELETE FROM applications WHERE ID=?', id, (err, res) => {
        console.log(id)
        if (err) return result(err, null);

        result(null, res);
    });
}


module.exports = Application;