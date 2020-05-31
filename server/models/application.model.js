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
    const array = [status];

    let select = 'SELECT * FROM applications WHERE status=?';

    if (status === 'free') {
        array.push('pending')
        select += ' OR status=?';
    }

    db.query(select, array, (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result(null, res);
    });
}


Application.readExecutersList = (req, result) => {
    const { id } = req.params;

    db.query('SELECT executers.full_name, executers.ID FROM applications INNER JOIN applications_of_executers, executers WHERE applications.ID = ? AND applications.ID = applications_of_executers.ID_APPLICATION AND applications_of_executers.ID_EXECUTER = executers.ID', id, (err, res) => {
        if (err) return result(err, null);

        result(null, res);
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


Application.updateCountExecuters = (req, result) => {
    const { count } = req.body;
    const { id } = req.params;

    if (count < 1) return result(null, null);

    db.query('SELECT current_count_executers FROM applications WHERE ID=? ', id, (err, res) => {
        if (err) return result(err, null);

        const currCountExecuters = res[0].current_count_executers;

        let newStatus = 'free';
        if (count < 1 || count <= currCountExecuters) return result(err, null);

        if (count > 1) newStatus = 'pending';

        db.query('UPDATE applications SET count_executer=?, status=? WHERE ID=?', [count, newStatus, id], (err, res) => {
            if (err) return result(err, null);

            return result(null, { newStatus });
        });

        // result(null, res);
    });


}


Application.delete = (req, result) => {
    const { id } = req.params;

    db.query('DELETE FROM applications WHERE ID=?', id, (err, res) => {
        if (err) return result(err, null);

        result(null, res);
    });
}


module.exports = Application;